import { Router } from "express";
import https from "node:https";
import zlib from "node:zlib";

const router = Router();

export interface SuggestQuery {
  text: string;
  url?: string;
}

export interface SuggestCollection {
  title: string;
  url: string;
  handle: string;
}

export interface SuggestProduct {
  title: string;
  url: string;
  handle: string;
  price?: string;
  compareAtPrice?: string;
  imageUrl?: string;
}

export interface SuggestResponse {
  query: string;
  queries: SuggestQuery[];
  collections: SuggestCollection[];
  products: SuggestProduct[];
}

// In-memory cache for fast repeated queries
const cache = new Map<string, { data: SuggestResponse; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function fetchPhonevillaSuggest(query: string): Promise<string> {
  const encodedQuery = encodeURIComponent(query);
  const path = `/search/suggest?q=${encodedQuery}&section_id=predictive-search`;

  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: "phonevilla.in",
      port: 443,
      path,
      method: "GET",
      family: 4, // force IPv4 to avoid network timeouts on IPv6
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        Referer: "https://phonevilla.in/",
        Host: "phonevilla.in",
        "Sec-Fetch-Dest": "empty",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 26_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Brave/1 Mobile/15E148 Safari/604.1",
        Accept: "*/*",
        Connection: "keep-alive",
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const encoding = res.headers["content-encoding"];

        try {
          if (encoding === "gzip") {
            zlib.gunzip(buffer, (err, decoded) => {
              if (err) reject(err);
              else resolve(decoded.toString("utf-8"));
            });
          } else if (encoding === "deflate") {
            zlib.inflate(buffer, (err, decoded) => {
              if (err) reject(err);
              else resolve(decoded.toString("utf-8"));
            });
          } else if (encoding === "br") {
            zlib.brotliDecompress(buffer, (err, decoded) => {
              if (err) reject(err);
              else resolve(decoded.toString("utf-8"));
            });
          } else {
            resolve(buffer.toString("utf-8"));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.on("timeout", () => {
      req.destroy(new Error("Request to phonevilla.in timed out"));
    });
    req.end();
  });
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function parseSuggestHtml(html: string, query: string): SuggestResponse {
  const queries: SuggestQuery[] = [];
  const collections: SuggestCollection[] = [];
  const products: SuggestProduct[] = [];

  const seenQueries = new Set<string>();
  const seenCollections = new Set<string>();
  const seenProducts = new Set<string>();

  // Extract query suggestions (usually predictive-search__item--term or queries section)
  // Matching <a href=".../search?q=..." ...>...</a> or predictive-search query items
  const queryRegex = /<a[^>]+href="([^"]*\/search\?[^"]*q=([^"&]+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let qMatch: RegExpExecArray | null;
  while ((qMatch = queryRegex.exec(html)) !== null) {
    const rawText = stripTags(qMatch[3]);
    if (rawText && !seenQueries.has(rawText.toLowerCase())) {
      seenQueries.add(rawText.toLowerCase());
      queries.push({
        text: rawText,
        url: qMatch[1],
      });
    }
  }

  // Extract collection links: href="/collections/..."
  const collectionRegex = /<a[^>]+href="([^"]*\/collections\/([^"/?#]+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let cMatch: RegExpExecArray | null;
  while ((cMatch = collectionRegex.exec(html)) !== null) {
    const rawUrl = cMatch[1];
    const handle = cMatch[2];
    const rawText = stripTags(cMatch[3]);
    // Exclude if it looks like a product link or empty text
    if (handle && rawText && !handle.includes("all") && !rawUrl.includes("/products/")) {
      const lower = handle.toLowerCase();
      if (!seenCollections.has(lower)) {
        seenCollections.add(lower);
        collections.push({
          title: rawText,
          url: rawUrl,
          handle,
        });
      }
    }
  }

  // Extract products: anchor tags pointing to /products/...
  // Typically contains an image, a title span, and price
  const productBlockRegex = /<a[^>]+href="([^"]*\/products\/([^"/?#]+)[^"]*)"[^>]*class="[^"]*predictive-search__item[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  let pMatch: RegExpExecArray | null;

  const parseProductBlock = (blockHtml: string, rawUrl: string, handle: string) => {
    // Look for image src
    let imageUrl: string | undefined;
    const imgMatch = /<img[^>]+(?:src|data-src)="([^"]+)"/i.exec(blockHtml);
    if (imgMatch) {
      imageUrl = imgMatch[1];
      if (imageUrl.startsWith("//")) {
        imageUrl = "https:" + imageUrl;
      }
    }

    // Look for product title (often in predictive-search__item-heading or h3 or span)
    let title = "";
    const titleMatch = /class="[^"]*predictive-search__item-heading[^"]*"[^>]*>([\s\S]*?)<\/(?:span|h3|h2|p|div)>/i.exec(
      blockHtml
    );
    if (titleMatch) {
      title = stripTags(titleMatch[1]);
    } else {
      // Fallback: title might be full text without prices
      const lines = stripTags(blockHtml)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      title = lines[0] || handle.replace(/-/g, " ");
    }

    // Look for price (Rs. or ₹ or price class)
    let price: string | undefined;
    const priceMatch = /(?:₹|Rs\.?)\s*[\d,]+(?:\.\d+)?/i.exec(blockHtml);
    if (priceMatch) {
      price = priceMatch[0];
    }

    if (title && !seenProducts.has(handle)) {
      seenProducts.add(handle);
      products.push({
        title,
        url: rawUrl,
        handle,
        price,
        imageUrl,
      });
    }
  };

  while ((pMatch = productBlockRegex.exec(html)) !== null) {
    parseProductBlock(pMatch[3], pMatch[1], pMatch[2]);
  }

  // If no products matched with specific class, try broader /products/ regex
  if (products.length === 0) {
    const generalProductRegex = /<a[^>]+href="([^"]*\/products\/([^"/?#]+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let gpMatch: RegExpExecArray | null;
    while ((gpMatch = generalProductRegex.exec(html)) !== null) {
      const inner = gpMatch[3];
      // Check if it has an image or price indicating a real product card
      if (inner.includes("<img") || /₹|Rs\./i.test(inner)) {
        parseProductBlock(inner, gpMatch[1], gpMatch[2]);
      }
    }
  }

  return {
    query,
    queries,
    collections,
    products,
  };
}

router.get("/suggest", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!query) {
    res.json({
      query: "",
      queries: [],
      collections: [],
      products: [],
    });
    return;
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    res.json(cached.data);
    return;
  }

  try {
    const rawHtml = await fetchPhonevillaSuggest(query);
    const parsed = parseSuggestHtml(rawHtml, query);

    cache.set(cacheKey, { data: parsed, timestamp: now });
    res.json(parsed);
  } catch (error: any) {
    res.status(502).json({
      error: "Failed to fetch suggestions from PhoneVilla",
      message: error?.message || String(error),
      query,
      queries: [],
      collections: [],
      products: [],
    });
  }
});

export default router;
