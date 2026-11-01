import { Router, type IRouter } from "express";
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
const searchCache = new Map<string, { expiresAt: number; products: ReturnType<typeof normalizeProduct>[]; hasNextPage: boolean }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

const toProductsJsonUrl = (url: string, page: number) => `${url.replace(/\/$/, "")}/products.json?limit=100&page=${page}`;

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
  const imageUrl: string | null = sourceImage?.startsWith("//") ? `https:${sourceImage}` : sourceImage;
  const compareAtPrice: string | null = variant?.compare_at_price
    ? `₹${variant.compare_at_price}`
    : (variant?.price ? `₹${variant.price}` : null);

  return {
    id: `${product.handle}`,
    title: product.title,
    description: normalizeDescription(product.body_html),
    imageUrl,
    price: "₹299",
    compareAtPrice: compareAtPrice as string | null,
    productUrl: `https://phonevilla.in/products/${product.handle}`,
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

async function fetchPhonevillaSearch(query: string, page: number) {
  const cacheKey = `${query.toLowerCase()}:${page}`;
  const cached = searchCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached;

  const url = `https://phonevilla.in/search?q=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 26_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Brave/1 Mobile/15E148 Safari/604.1",
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`PhoneVilla search returned ${response.status} for ${query}`);
  }

  const html = await response.text();
  const cards = html.split(/<li[^>]*class="[^"]*grid__item/g).slice(1);
  const products: ReturnType<typeof normalizeProduct>[] = [];
  const seenHandles = new Set<string>();

  for (const card of cards) {
    const handleMatch = card.match(/href="\/products\/([^"?]+)/);
    if (!handleMatch) continue;
    const handle = handleMatch[1];
    if (seenHandles.has(handle)) continue;
    seenHandles.add(handle);

    const titleMatch = card.match(/<h3[^>]*class="[^"]*card__heading[^"]*"[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, "").trim()) : handle.replace(/-/g, " ");

    const imgMatch = card.match(/<img[^>]+src="([^"]+)"/i);
    let imageUrl = imgMatch ? imgMatch[1] : null;
    if (imageUrl && imageUrl.startsWith("//")) imageUrl = `https:${imageUrl}`;

    const priceMatch = card.match(/class="price-item price-item--regular"[^>]*>([\s\S]*?)<\/span>/i);
    const rawPrice = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "₹449";
    const originalPrice = rawPrice.replace(/Rs\.?\s*/i, "₹").replace(/\.00$/, "");

    const compareMatch = card.match(/class="price-item price-item--sale"[^>]*>([\s\S]*?)<\/span>/i);
    const rawCompare = compareMatch ? compareMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : null;
    const originalCompare = rawCompare ? rawCompare.replace(/Rs\.?\s*/i, "₹").replace(/\.00$/, "") : null;
    const compareAtPrice: string | null = originalCompare || (originalPrice !== "₹299" ? originalPrice : null);

    products.push({
      id: handle,
      title,
      description: "A polished glass case with a glossy finish and protective silicon sides.",
      imageUrl: imageUrl ?? null,
      price: "₹299",
      compareAtPrice,
      productUrl: `https://phonevilla.in/products/${handle}`,
      collectionSlug: "phonevilla-search",
      collectionName: "Search results",
      tags: [query],
      isFeatured: false,
    });
  }

  const nextPageNum = page + 1;
  const hasNextPage =
    /aria-label="Next page"|aria-label="Next"|class="pagination__item--next"/.test(html) ||
    new RegExp(`aria-label="Page ${nextPageNum}"`).test(html) ||
    new RegExp(`page=${nextPageNum}`).test(html);

  const result = { expiresAt: Date.now() + CACHE_TTL_MS, products, hasNextPage };
  searchCache.set(cacheKey, result);
  return result;
}

const router: IRouter = Router();

router.get("/catalog", async (req, res) => {
  const parsed = GetCatalogQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid catalog query." });
    return;
  }

  const { collection, search, limit = 48, page = 1 } = parsed.data;
  const normalizedSearch = search?.trim();

  try {
    // If user provided a search query, query PhoneVilla search directly
    if (normalizedSearch) {
      const searchResult = await fetchPhonevillaSearch(normalizedSearch, page);
      const response = GetCatalogResponse.parse({
        products: searchResult.products.slice(0, limit),
        collections: collections.map((item) => ({
          slug: item.slug,
          name: item.name,
          count: 0,
        })),
        syncedAt: new Date().toISOString(),
        sourceOnline: true,
        page,
        hasNextPage: searchResult.hasNextPage,
      });

      res.json(response);
      return;
    }

    const sources = collection && collectionBySlug.has(collection)
      ? [collectionBySlug.get(collection)!]
      : collections;

    const results = await Promise.all(sources.map((source) => fetchCollection(source, page)));
    const rawProducts = results.flatMap((result) => result.products);

    // Deduplicate products across collections by handle
    const seenHandles = new Set<string>();
    const deduplicated: ReturnType<typeof normalizeProduct>[] = [];
    for (const p of rawProducts) {
      if (!seenHandles.has(p.id)) {
        seenHandles.add(p.id);
        deduplicated.push(p);
      }
    }

    const filtered = deduplicated.sort((a, b) => {
      const priority = (product: ReturnType<typeof normalizeProduct>) => {
        if (product.collectionSlug === "best-sellers") return 0;
        if (product.collectionSlug === "new-arrivalss" || product.collectionSlug === "new-designs") return 1;
        if (product.collectionSlug === "sports-collection") return 2;
        return 3;
      };
      return priority(a) - priority(b);
    });

    const collectionCounts = new Map<string, number>();
    rawProducts.forEach((product) => {
      collectionCounts.set(product.collectionSlug, (collectionCounts.get(product.collectionSlug) ?? 0) + 1);
    });

    const response = GetCatalogResponse.parse({
      products: filtered.slice(0, limit),
      collections: collections.map((item) => ({
        slug: item.slug,
        name: item.name,
        count: collectionCounts.get(item.slug) ?? 0,
      })),
      syncedAt: new Date().toISOString(),
      sourceOnline: true,
      page,
      hasNextPage: results.some((result) => result.hasNextPage),
    });

    res.json(response);
  } catch (error) {
    req.log.error({ err: error }, "Unable to sync PhoneVilla catalog");
    res.status(502).json({ error: "The live catalog is temporarily unavailable. Please try again shortly." });
  }
});

export default router;
