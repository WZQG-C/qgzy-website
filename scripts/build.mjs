import { cp, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
const assets = ['index.html', 'css', 'js', 'robots.txt', 'sitemap.xml'];

await mkdir(output, { recursive: true });

for (const asset of assets) {
  await cp(new URL(asset, root), new URL(asset, output), { recursive: true });
}

console.log('Cloudflare Pages 发布文件已生成到 dist/');
