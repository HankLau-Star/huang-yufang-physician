import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
}

test("server-renders Huang Yufang's physician profile", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(html, /<title>黄玉芳医师 \| HUANG YUFANG PHYSICIAN<\/title>/i);
  assert.match(html, /property="og:image"[^>]+og\.png/i);
  assert.match(html, /海军军医大学第一附属医院/);
  assert.match(html, /国家卫健委“西医学习中医”两年期培训/);
  assert.match(html, /href="tel:15038264053"/);
  assert.match(html, /150 3826 4053/);
  assert.match(html, /本网站内容仅作医师个人经历与专业方向介绍|本站内容仅作医师个人经历与专业方向介绍/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the three supplied physician photographs and accessible structure", async () => {
  await Promise.all([
    access(new URL("../public/huang-yufang-consultation.jpg", import.meta.url)),
    access(new URL("../public/huang-yufang-practice.jpg", import.meta.url)),
    access(new URL("../public/huang-yufang-service.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  const [page, layout, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<main id="main-content">/);
  assert.match(page, /aria-label="主导航"/);
  assert.match(page, /prefers-reduced-motion|data-reveal/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /@media \(max-width: 520px\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
