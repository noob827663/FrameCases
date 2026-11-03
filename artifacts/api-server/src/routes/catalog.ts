import { Router, type IRouter } from "express";
import https from "node:https";
import { GetCatalogQueryParams, GetCatalogResponse } from "@workspace/api-zod";

type ShopifyProduct = {
  id: number | string;
  title: string;
  handle: string;
  body_html?: string;
  tags?: string[] | string;
  images?: Array<{ src?: string; width?: number; height?: number }>;
  variants?: Array<{
    price?: string;
    compare_at_price?: string | null;
  }>;
};

type ShopifyCollectionResponse = {
  products?: ShopifyProduct[];
};

type CollectionSource = {
  slug: string;
  name: string;
  url: string;
};

const collections: CollectionSource[] = [
  { slug: "mens-collection", name: "Men's", url: "https://phonevilla.in/collections/mens-collection" },
  { slug: "girls-collection", name: "Women's", url: "https://phonevilla.in/collections/girls-collection" },
  { slug: "aesthetic-collection", name: "Aesthetic", url: "https://phonevilla.in/collections/aesthetic-collection" },
  { slug: "indian-aesthetic", name: "Indian Aesthetic", url: "https://phonevilla.in/collections/aesthetic-collection" },
  { slug: "ferrari-covers-cases", name: "Ferrari", url: "https://phonevilla.in/collections/ferrari-covers-cases" },
  { slug: "art-collection", name: "Arts & Scenery", url: "https://phonevilla.in/collections/art-collection" },
  { slug: "scenery", name: "Scenery", url: "https://phonevilla.in/collections/art-collection" },
  { slug: "zodiac-sign", name: "Astrology", url: "https://phonevilla.in/collections/zodiac-sign" },
  { slug: "butterfly", name: "Butterfly", url: "https://phonevilla.in/collections/butterfly" },
  { slug: "cats-collection", name: "Cats", url: "https://phonevilla.in/collections/cats-collection" },
  { slug: "cars-bikes-collection", name: "Cars & Bikes", url: "https://phonevilla.in/collections/cars-bikes-collection" },
  { slug: "evil-eye-nazar", name: "Evil Eye", url: "https://phonevilla.in/collections/evil-eye-nazar" },
  { slug: "flower", name: "Flowers", url: "https://phonevilla.in/collections/flower" },
  { slug: "heart-collection", name: "Hearts", url: "https://phonevilla.in/collections/heart-collection" },
  { slug: "quotes-collection", name: "Quotes", url: "https://phonevilla.in/collections/quotes-collection" },
  { slug: "space-moon", name: "Space & Moon", url: "https://phonevilla.in/collections/space-moon" },
  { slug: "stallion-collection", name: "Stallion", url: "https://phonevilla.in/collections/stallion-collection" },
  { slug: "that-girl-collection", name: "That Girl", url: "https://phonevilla.in/collections/that-girl-collection" },
  { slug: "spiderman-collection", name: "Spider-Man", url: "https://phonevilla.in/collections/spiderman-collection" },
  { slug: "superman-phone-cases", name: "Superman", url: "https://phonevilla.in/collections/superman-phone-cases" },
  { slug: "spiritual-collection", name: "Spiritual", url: "https://phonevilla.in/collections/spiritual-collection" },
  { slug: "new-arrivalss", name: "Newly Launched", url: "https://phonevilla.in/collections/new-arrivalss" },
  { slug: "new-designs", name: "New designs", url: "https://phonevilla.in/collections/new-arrivalss" },
  { slug: "best-sellers", name: "Top Selling", url: "https://phonevilla.in/collections/best-sellers" },
  { slug: "sports-collection", name: "Sports", url: "https://phonevilla.in/collections/sports-collection" },
];

const collectionBySlug = new Map(collections.map((collection) => [collection.slug, collection]));
const sourceCache = new Map<string, { expiresAt: number; products: ReturnType<typeof normalizeProduct>[]; hasNextPage: boolean }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

const toProductsJsonUrl = (url: string, page: number) => {
  const cleanUrl = url.replace(/\/$/, "");
  // Upstream Shopify returns page 1 by default without page parameter.
  // Start explicit pagination parameter with 2 (e.g. ?page=2) for subsequent pages.
  if (page <= 1) {
    return `${cleanUrl}/products.json?limit=100`;
  }
  return `${cleanUrl}/products.json?limit=100&page=${page}`;
};

const normalizeTags = (tags: ShopifyProduct["tags"]) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
};

const decodeHtmlEntities = (value: string) => value
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, "\"")
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">");

const normalizeDescription = (html: ShopifyProduct["body_html"]) => {
  if (!html) {
    return "A polished glass case with a glossy finish and protective silicon sides.";
  }

  const cleaned = decodeHtmlEntities(html)
    .replace(/<\/?(?:strong|b)[^>]*>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|li|div)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");

  return cleaned.trim() || "A polished glass case with a glossy finish and protective silicon sides.";
};

const normalizeProduct = (product: ShopifyProduct, collection: CollectionSource) => {
  const variant = product.variants?.[0];
  const sourceImage = product.images?.[0]?.src ?? null;
  const imageUrl = (sourceImage?.startsWith("//") ? `https:${sourceImage}` : sourceImage) as string | null;
  const compareAtPrice = (variant?.compare_at_price
    ? `₹${variant.compare_at_price}`
    : (variant?.price ? `₹${variant.price}` : null)) as string | null;

  return {
    id: `${product.handle}`,
    title: product.title,
    description: normalizeDescription(product.body_html),
    imageUrl,
    price: "₹299",
    compareAtPrice,
    productUrl: `/products/${product.handle}`,
    collectionSlug: collection.slug,
    collectionName: collection.name,
    tags: normalizeTags(product.tags),
    isFeatured:
      collection.slug === "new-arrivalss" ||
      collection.slug === "new-designs" ||
      collection.slug === "best-sellers" ||
      collection.slug === "sports-collection",
  };
};

async function fetchCollection(collection: CollectionSource, page: number) {
  const cacheKey = `${collection.slug}:${page}`;
  const cached = sourceCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached;

  const response = await fetch(toProductsJsonUrl(collection.url, page), {
    headers: { Accept: "application/json", "User-Agent": "Framecase Catalog Sync/1.0" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`PhoneVilla returned ${response.status} for ${collection.slug}`);
  }

  const payload = (await response.json()) as ShopifyCollectionResponse;
  const products = (payload.products ?? []).map((product) => normalizeProduct(product, collection));
  const linkHeader = response.headers.get("link") ?? "";
  const hasNextPage = /rel=["']next["']/.test(linkHeader) || products.length >= 100;
  const result = { expiresAt: Date.now() + CACHE_TTL_MS, products, hasNextPage };
  sourceCache.set(cacheKey, result);
  return result;
}

function fetchSuggestJson(query: string): Promise<any> {
  const encodedQuery = encodeURIComponent(query);
  const path = `/search/suggest.json?q=${encodedQuery}&resources[type]=query,product`;

  return new Promise((resolve) => {
    const options: https.RequestOptions = {
      hostname: "phonevilla.in",
      port: 443,
      path,
      method: "GET",
      family: 4,
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 26_2 like Mac OS X) AppleWebKit/605.1.15",
      },
      timeout: 8000,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });

    req.on("error", () => resolve(null));
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

async function searchLiveProducts(query: string): Promise<ReturnType<typeof normalizeProduct>[]> {
  try {
    const primaryData = await fetchSuggestJson(query);
    const primaryRaw = (primaryData?.resources?.results?.products || []) as any[];
    const subQueries = ((primaryData?.resources?.results?.queries || []) as { text: string }[])
      .map((q) => q.text)
      .filter((q) => q && q.toLowerCase() !== query.toLowerCase())
      .slice(0, 4);

    const subResults = await Promise.all(subQueries.map((sq) => fetchSuggestJson(sq)));
    const productMap = new Map<string, any>();

    for (const p of primaryRaw) {
      if (p.handle) productMap.set(p.handle, p);
    }

    const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);

    for (const sub of subResults) {
      const subProducts = (sub?.resources?.results?.products || []) as any[];
      for (const sp of subProducts) {
        if (!sp.handle || productMap.has(sp.handle)) continue;
        const text = `${sp.title || ""} ${(sp.tags || []).join(" ")}`.toLowerCase();
        // Include if matches any token from the user's search or CR7 if searching Ronaldo
        const matches =
          queryTokens.some((tok) => text.includes(tok)) ||
          (query.toLowerCase().includes("ronaldo") && text.includes("cr7"));
        if (matches) {
          productMap.set(sp.handle, sp);
        }
      }
    }

    return [...productMap.values()].map((p) => {
      const sourceImage = p.featured_image?.url || p.image || null;
      const imageUrl = (sourceImage?.startsWith("//") ? `https:${sourceImage}` : sourceImage) as string | null;
      return {
        id: p.handle,
        title: p.title,
        description: "Protection & Durability - Boss. A polished glass case with a glossy finish and protective silicon sides.",
        imageUrl,
        price: "₹299",
        compareAtPrice: p.compare_at_price_max ? `₹${p.compare_at_price_max}` : "₹599.00",
        productUrl: `/products/${p.handle}`,
        collectionSlug: "all",
        collectionName: "Search",
        tags: Array.isArray(p.tags) ? p.tags : [],
        isFeatured: true,
      };
    });
  } catch {
    return [];
  }
}

const router: IRouter = Router();

router.get("/catalog", async (req, res) => {
  const parsed = GetCatalogQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid catalog query." });
    return;
  }

  const { collection, search, limit = 48, page = 1 } = parsed.data;
  const sources = collection && collectionBySlug.has(collection)
    ? [collectionBySlug.get(collection)!]
    : collections;

  try {
    const normalizedSearch = search?.trim().toLowerCase();

    // If searching across all collections, check both multiple pages of collections and live search
    const pagesToFetch = normalizedSearch && !collection ? [1, 2] : [page];
    const results = await Promise.all(
      sources.flatMap((source) => pagesToFetch.map((p) => fetchCollection(source, p)))
    );

    const collectionProducts = results.flatMap((result) => result.products);

    // Live search query expansion
    let liveProducts: ReturnType<typeof normalizeProduct>[] = [];
    if (normalizedSearch) {
      liveProducts = await searchLiveProducts(normalizedSearch);
    }

    // Merge collection products and live search products with deduplication by product id/handle
    const productMap = new Map<string, ReturnType<typeof normalizeProduct>>();

    // Prioritize live search products if searching
    for (const prod of liveProducts) {
      if (!productMap.has(prod.id)) {
        productMap.set(prod.id, prod);
      }
    }

    for (const prod of collectionProducts) {
      if (!productMap.has(prod.id)) {
        productMap.set(prod.id, prod);
      }
    }

    const allMerged = [...productMap.values()];

    const filtered = allMerged
      .filter((product) => {
        if (!normalizedSearch) return true;
        const text = `${product.title} ${product.collectionName} ${product.tags.join(" ")}`.toLowerCase();
        const searchTokens = normalizedSearch.split(/\s+/).filter(Boolean);
        return (
          text.includes(normalizedSearch) ||
          searchTokens.every((token) => text.includes(token)) ||
          (normalizedSearch.includes("ronaldo") && text.includes("cr7"))
        );
      })
      .sort((a, b) => {
        const priority = (product: ReturnType<typeof normalizeProduct>) => {
          if (product.collectionSlug === "best-sellers") return 0;
          if (product.collectionSlug === "new-arrivalss" || product.collectionSlug === "new-designs") return 1;
          if (product.collectionSlug === "sports-collection") return 2;
          return 3;
        };
        return priority(a) - priority(b);
      });

    const collectionCounts = new Map<string, number>();
    collectionProducts.forEach((product) => {
      collectionCounts.set(product.collectionSlug, (collectionCounts.get(product.collectionSlug) ?? 0) + 1);
    });

    // When a specific page is fetched from upstream, `filtered` contains the products of that page.
    // Return products up to `limit` for that page without skipping products already segmented by upstream.
    const paginatedProducts = filtered.slice(0, limit);
    const hasNextPage = results.some((result) => result.hasNextPage) || filtered.length > limit;

    const response = GetCatalogResponse.parse({
      products: paginatedProducts,
      collections: collections.map((item) => ({
        slug: item.slug,
        name: item.name,
        count: collectionCounts.get(item.slug) ?? 0,
      })),
      syncedAt: new Date().toISOString(),
      sourceOnline: true,
      page,
      hasNextPage,
    });

    res.json(response);
  } catch (error) {
    req.log.error({ err: error }, "Unable to sync PhoneVilla catalog");
    res.status(502).json({ error: "The live catalog is temporarily unavailable. Please try again shortly." });
  }
});

export default router;