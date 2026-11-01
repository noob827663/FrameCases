import { Router, type IRouter } from "express";

type ShopifyProductDetail = {
  id: number | string;
  title: string;
  handle: string;
  description?: string;
  tags?: string[] | string;
  images?: string[];
  variants?: Array<{
    price?: number;
    compare_at_price?: number | null;
  }>;
};

const productCache = new Map<string, { expiresAt: number; product: any }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

const decodeHtmlEntities = (value: string) => value
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;/gi, "\"")
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">");

const normalizeDescription = (html?: string) => {
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

const normalizeTags = (tags: ShopifyProductDetail["tags"]) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
};

const router: IRouter = Router();

router.get("/products/:handle", async (req, res) => {
  const { handle } = req.params;
  if (!handle) {
    res.status(400).json({ error: "Product handle is required" });
    return;
  }

  const cleanHandle = handle.trim().toLowerCase();
  const cached = productCache.get(cleanHandle);
  if (cached && cached.expiresAt > Date.now()) {
    res.json(cached.product);
    return;
  }

  try {
    const url = `https://phonevilla.in/products/${encodeURIComponent(cleanHandle)}.js`;
    const response = await fetch(url, {
      headers: { "User-Agent": "Framecase Catalog Sync/1.0", Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      res.status(response.status).json({ error: "Product not found on PhoneVilla" });
      return;
    }

    const payload = (await response.json()) as ShopifyProductDetail;
    const variant = payload.variants?.[0];
    const sourceImage = payload.images?.[0] ?? null;
    const imageUrl = sourceImage?.startsWith("//") ? `https:${sourceImage}` : sourceImage;

    const price = variant?.price ? `₹${(variant.price / 100).toFixed(0)}` : "₹449";
    const compareAtPrice = variant?.compare_at_price ? `₹${(variant.compare_at_price / 100).toFixed(0)}` : null;

    const normalized = {
      id: String(payload.id),
      title: payload.title,
      description: normalizeDescription(payload.description),
      imageUrl,
      price,
      compareAtPrice,
      productUrl: `https://phonevilla.in/products/${payload.handle}`,
      collectionSlug: "phonevilla-search",
      collectionName: "PhoneVilla Collection",
      tags: normalizeTags(payload.tags),
      isFeatured: true,
    };

    productCache.set(cleanHandle, { expiresAt: Date.now() + CACHE_TTL_MS, product: normalized });
    res.json(normalized);
  } catch (err: any) {
    req.log.error({ err }, `Failed to fetch product ${cleanHandle}`);
    res.status(502).json({ error: "Failed to fetch product details" });
  }
});

export default router;
