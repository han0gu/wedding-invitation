import test from 'node:test';
import assert from 'node:assert/strict';

const base = new URL(process.env.BASE_URL || 'http://127.0.0.1:4174');
const response = await fetch(base, { signal: AbortSignal.timeout(20000) });
const html = await response.text();
const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(([, key, value]) => [key, value])));
const og = Object.fromEntries(tags.filter(tag => tag.property?.startsWith('og:')).map(tag => [tag.property, tag.content]));

test('public HTML exposes complete sharing metadata without executing JavaScript', () => {
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  for (const name of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    assert.ok(og[name]?.trim(), `${name} must exist in the initial HTML`);
    assert.equal(tags.filter(tag => tag.property === name).length, 1, `${name} must not be duplicated`);
  }
  assert.equal(new URL(og['og:url']).origin, 'https://invitation.soowa.site');
  assert.equal(new URL(og['og:image']).origin, new URL(og['og:url']).origin);
  assert.equal(tags.find(tag => tag.name === 'description')?.content, og['og:description']);
});

test('sharing image is a publicly served JPEG rather than an HTML fallback', async () => {
  assert.ok(og['og:image'], 'sharing image URL must be present');
  // Preview/local runs fetch the same asset path from the deployment under test.
  const image = await fetch(new URL(new URL(og['og:image']).pathname, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type'), /image\/jpeg/);
  const bytes = new Uint8Array(await image.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 3)], [0xff, 0xd8, 0xff]);
  assert.ok(bytes.length > 1000, 'image must contain a usable payload');
});

test('entry scripts and preloaded artwork are accessible on the deployment', async () => {
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/gi)].map(([, url]) => url);
  const artwork = [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*href="([^"]+)"/gi)].map(([, url]) => url);
  assert.ok(scripts.length > 0);
  for (const path of [...scripts, ...artwork]) {
    const asset = await fetch(new URL(path, base), { signal: AbortSignal.timeout(20000) });
    assert.equal(asset.status, 200, path);
    assert.doesNotMatch(asset.headers.get('content-type') || '', /text\/html/, path);
  }
});
