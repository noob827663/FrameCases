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
  app.use(express.static(clientDistPath));

  app.get("/{*splat}", async (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    const indexPath = path.join(clientDistPath, "index.html");
    const rawProduct = (req.query.product as string) || (req.path.startsWith("/products/") ? req.path.replace("/products/", "") : "");

    if (rawProduct) {
      try {
        const handle = rawProduct.trim().toLowerCase();
        const url = `https://phonevilla.in/products/${encodeURIComponent(handle)}.js`;
        const pRes = await fetch(url, {
          headers: { "User-Agent": "Framecase Catalog Sync/1.0", Accept: "application/json" },
          signal: AbortSignal.timeout(4_000),
        });

        if (pRes.ok) {
          const data: any = await pRes.json();
          const title = data.title ? `${data.title} — Unique & Attractive Design Case (₹299) | Framecase` : "Framecase";
          const desc = data.description ? data.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160) : "Shop unique & attractive design phone cases at ₹299.";
          let img = data.images?.[0] || "";
          if (img.startsWith("//")) img = `https:${img}`;

          let html = fs.readFileSync(indexPath, "utf8");
          if (title) {
            html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
            html = html.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${title}"`);
            html = html.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${title}"`);
          }
          if (desc) {
            html = html.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${desc}"`);
            html = html.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${desc}"`);
            html = html.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${desc}"`);
          }
          if (img) {
            html = html.replace(/<meta property="og:image" content="[^"]*"/i, "");
            html = html.replace(/<meta name="twitter:image" content="[^"]*"/i, "");
            html = html.replace("</head>", `  <meta property="og:image" content="${img}" />\n    <meta property="og:image:secure_url" content="${img}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="1200" />\n    <meta name="twitter:image" content="${img}" />\n  </head>`);
          }

          res.send(html);
          return;
        }
      } catch {
        // Fallback to sending standard index.html
      }
    }

    res.sendFile(indexPath);
  });
}

export default app;
