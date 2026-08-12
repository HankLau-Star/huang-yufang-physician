import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.resolve(projectRoot, "docs");
const clientDir = path.resolve(projectRoot, "dist", "client");
const workerPath = path.resolve(projectRoot, "dist", "server", "index.js");
const repositoryName = "huang-yufang-physician";
const basePath = `/${repositoryName}`;

if (path.dirname(outputDir) !== projectRoot || path.basename(outputDir) !== "docs") {
  throw new Error("Refusing to replace an unexpected output directory.");
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("static-export", String(Date.now()));
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://hanklau-star.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static rendering failed with HTTP ${response.status}.`);
}

let html = await response.text();
for (const assetPath of [
  "/_next/",
  "/huang-yufang-consultation.jpg",
  "/huang-yufang-practice.jpg",
  "/huang-yufang-service.jpg",
  "/huang-yufang-signature-portrait.png",
]) {
  html = html.replaceAll(assetPath, `${basePath}${assetPath}`);
}

html = html.replace(
  'width=device-width, initial-scale=1, maximum-scale=5',
  'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
);

await Promise.all([
  writeFile(path.join(outputDir, "index.html"), html, "utf8"),
  writeFile(path.join(outputDir, "404.html"), html, "utf8"),
  writeFile(path.join(outputDir, ".nojekyll"), "", "utf8"),
]);

console.log(`GitHub Pages export created at ${outputDir}`);
