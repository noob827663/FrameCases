import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const clientDistPath = path.resolve(
  import.meta.dirname,
  "../../framecase/dist/public",
);

if (fs.existsSync(clientDistPath)) {
  const setHtmlAndFaviconCacheHeaders = (res: express.Response) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  };

  // Explicit favicon routes with no-cache headers to guarantee fresh favicons
  const faviconFiles = ["favicon.ico", "favicon.png", "favicon.svg", "favicon.jpeg", "favicon.jpg", "apple-touch-icon.png", "apple-touch-icon-precomposed.png"];
  for (const fav of faviconFiles) {
    app.get(`/${fav}`, (_req, res) => {
      setHtmlAndFaviconCacheHeaders(res);
      const targetFile = fav.startsWith("apple-touch-icon")
        ? (fs.existsSync(path.join(clientDistPath, "apple-touch-icon.png")) ? "apple-touch-icon.png" : "favicon.png")
        : fav;
      res.sendFile(path.join(clientDistPath, targetFile));
    });
  }

  // Static assets serving: ensure HTML and favicon files use no-cache, while hashed JS/CSS keep default caching
  app.use(express.static(clientDistPath, {
    setHeaders: (res, filePath) => {
      if (filePath.includes("favicon") || filePath.endsWith(".html") || filePath.endsWith("index.html")) {
        setHtmlAndFaviconCacheHeaders(res);
      }
    }
  }));

  // Whitelist of valid category slugs supported by the platform
  const VALID_CATEGORY_SLUGS = new Set([
    "aesthetic-collection",
    "cars-bikes-collection",
    "sports-collection",
    "new-designs",
    "new-arrivalss",
    "best-sellers",
    "art-collection",
    "zodiac-sign",
    "mens-collection",
    "girls-collection",
    "cats-collection",
    "evil-eye-nazar",
    "all",
  ]);

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  app.get("/{*splat}", async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    // Always ensure HTML document responses never cache stale contents or favicons
    setHtmlAndFaviconCacheHeaders(res);

    const indexPath = path.join(clientDistPath, "index.html");
    const rawProduct = (req.query.product as string) || (req.path.startsWith("/products/") ? req.path.replace("/products/", "") : "");

    const cleanPath = req.path.replace(/^\/|\/$/g, "");

    // 1. Product SSR SEO injection
    if (rawProduct) {
      try {
        const handle = rawProduct.trim().toLowerCase();
        // Disallow dangerous or unexpected product handles
        if (/^[a-z0-9_-]+$/i.test(handle)) {
          const url = `https://phonevilla.in/products/${encodeURIComponent(handle)}.js`;
          const pRes = await fetch(url, {
            headers: { "User-Agent": "Framecase Catalog Sync/1.0", Accept: "application/json" },
            signal: AbortSignal.timeout(4_000),
          });

          if (pRes.ok) {
            const data: any = await pRes.json();
            const rawTitle = data.title ? `${data.title} — Unique & Attractive Design Case (₹299) | Framecase` : "Framecase";
            const rawDesc = data.description ? data.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160) : "Shop unique & attractive design phone cases at ₹299.";
            let img = data.images?.[0] || "";
            if (img.startsWith("//")) img = `https:${img}`;

            const safeTitle = escapeHtml(rawTitle);
            const safeDesc = escapeHtml(rawDesc);
            const safeImg = escapeHtml(img);

            let html = fs.readFileSync(indexPath, "utf8");
            if (safeTitle) {
              html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${safeTitle}</title>`);
              html = html.replace(/<meta property="og:title" content="[^"]*"/i, () => `<meta property="og:title" content="${safeTitle}"`);
              html = html.replace(/<meta name="twitter:title" content="[^"]*"/i, () => `<meta name="twitter:title" content="${safeTitle}"`);
            }
            if (safeDesc) {
              html = html.replace(/<meta name="description" content="[^"]*"/i, () => `<meta name="description" content="${safeDesc}"`);
              html = html.replace(/<meta property="og:description" content="[^"]*"/i, () => `<meta property="og:description" content="${safeDesc}"`);
              html = html.replace(/<meta name="twitter:description" content="[^"]*"/i, () => `<meta name="twitter:description" content="${safeDesc}"`);
            }
            if (safeImg) {
              html = html.replace(/<meta property="og:image" content="[^"]*"/i, "");
              html = html.replace(/<meta name="twitter:image" content="[^"]*"/i, "");
              html = html.replace("</head>", () => `  <meta property="og:image" content="${safeImg}" />\n    <meta property="og:image:secure_url" content="${safeImg}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="1200" />\n    <meta name="twitter:image" content="${safeImg}" />\n  </head>`);
            }

            res.send(html);
            return;
          }
        }
      } catch {
        // Fallback to sending standard index.html
      }
    }

    // 2. View/Category SSR SEO injection (only for validated paths)
    if (cleanPath) {
      let pageTitle = "";
      let pageDesc = "";

      if (cleanPath === "about") {
        pageTitle = "About Us — Unique & Attractive Design Phone Cases | Framecase";
        pageDesc = "Discover Framecase: unique & attractive design phone cases featuring optical glass finish, flexible shockproof TPU borders, and accessible ₹299 pricing.";
      } else if (cleanPath === "faq") {
        pageTitle = "Frequently Asked Questions (FAQs) — Unique Design Phone Covers | Framecase";
        pageDesc = "Everything you need to know about Framecase phone cases, supported devices (iPhone, Samsung, OnePlus, Vivo, Oppo, Realme), shipping across India, and durability.";
      } else if (cleanPath === "blog") {
        pageTitle = "Framecase Journal — Unique & Attractive Phone Case Designs";
        pageDesc = "Read in-depth articles and guides about phone case aesthetics, everyday drop protection, and styling your smartphone carry.";
      } else if (VALID_CATEGORY_SLUGS.has(cleanPath)) {
        const catName = cleanPath.replace(/-/g, " ");
        pageTitle = `${catName.charAt(0).toUpperCase() + catName.slice(1)} Phone Cases — Unique & Attractive Covers (₹299) | Framecase`;
        pageDesc = `Shop ${catName} phone cases with unique, attractive designs for iPhone, Samsung, OnePlus and more at ₹299 with free shipping across India.`;
      }

      if (pageTitle && pageDesc) {
        const safeTitle = escapeHtml(pageTitle);
        const safeDesc = escapeHtml(pageDesc);

        let html = fs.readFileSync(indexPath, "utf8");
        html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${safeTitle}</title>`);
        html = html.replace(/<meta property="og:title" content="[^"]*"/i, () => `<meta property="og:title" content="${safeTitle}"`);
        html = html.replace(/<meta name="twitter:title" content="[^"]*"/i, () => `<meta name="twitter:title" content="${safeTitle}"`);
        html = html.replace(/<meta name="description" content="[^"]*"/i, () => `<meta name="description" content="${safeDesc}"`);
        html = html.replace(/<meta property="og:description" content="[^"]*"/i, () => `<meta property="og:description" content="${safeDesc}"`);
        html = html.replace(/<meta name="twitter:description" content="[^"]*"/i, () => `<meta name="twitter:description" content="${safeDesc}"`);
        res.send(html);
        return;
      }
    }

    res.sendFile(indexPath);
  });
}

export default app;
