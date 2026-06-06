import { cpSync, mkdirSync, writeFileSync, rmSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const out = resolve(root, ".vercel/output");

// Clean and recreate output dirs
rmSync(out, { recursive: true, force: true });
mkdirSync(`${out}/static`, { recursive: true });
mkdirSync(`${out}/functions/__server.func`, { recursive: true });

// Static assets (client build)
cpSync(`${dist}/client`, `${out}/static`, { recursive: true });

// Serverless function (server build)
cpSync(`${dist}/server`, `${out}/functions/__server.func`, { recursive: true });

// Vercel function config
writeFileSync(
  `${out}/functions/__server.func/.vc-config.json`,
  JSON.stringify({ runtime: "nodejs22.x", handler: "index.mjs", launcherType: "Nodejs" }, null, 2),
);

// Vercel routing config
writeFileSync(
  `${out}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        { src: "/assets/(.*)", headers: { "cache-control": "public, max-age=31536000, immutable" } },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/__server" },
      ],
    },
    null,
    2,
  ),
);

console.log("✅ .vercel/output/ ready for deployment");
