import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium, expect } from '@playwright/test';
import { getProducts } from '../assets/js/data/products.js';
import { getArticles } from '../assets/js/data/articles.js';
import { root, validate } from './check.mjs';

const server = spawn('python3', ['-m', 'http.server', '0', '--bind', '127.0.0.1'], { cwd: root, env: { ...process.env, PYTHONUNBUFFERED: '1' }, stdio: ['ignore', 'pipe', 'pipe'] });
let browser;
try {
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Static server startup timed out')), 10000);
    server.stdout.on('data', data => { const match = String(data).match(/port (\d+)/); if (match) { clearTimeout(timer); resolve(match[1]); } });
    server.on('error', reject);
    server.on('exit', code => reject(new Error(`Server exited: ${code}`)));
  });
  browser = await chromium.launch({ headless: true });
  console.log(`Chromium ${browser.version()}`);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && !response.url().includes('intentional-missing')) errors.push(`${response.status()} ${response.url()}`); });
  page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
  const go = async route => { await page.goto(`http://127.0.0.1:${port}/${route}`); await expect(page.locator('#site-header nav')).toBeAttached(); await expect(page.locator('main h1')).toHaveCount(1); };
  const products = getProducts();
  const articles = getArticles();
  const names = selector => page.locator(`${selector} h3`).allTextContents();
  const routes = ['index.html', 'bunga-papan.html', 'standing-flower.html', 'hand-buket.html', 'artikel.html', '404.html', ...products.map(product => `produk.html?slug=${product.slug}`), ...articles.map(article => `artikel-detail.html?slug=${article.slug}`), ...['produk.html', 'artikel-detail.html'].flatMap(route => [route, `${route}?slug=missing`, `${route}?slug=%3Cscript%3E`])];
  for (const route of routes) {
    await go(route);
    if (route.startsWith('produk.html?slug=') && products.some(product => route.endsWith(product.slug))) {
      const product = products.find(product => route.endsWith(product.slug));
      await expect(page.locator('h1')).toHaveText(product.name);
      await expect(page.locator('[data-order]')).toBeVisible();
      assert.equal(await page.locator('#related-products a').count(), Math.min(4, products.filter(item => item.type === product.type).length - 1));
    } else if (route.startsWith('artikel-detail.html?slug=') && articles.some(article => route.endsWith(article.slug))) {
      await expect(page.locator('h1')).toHaveText(articles.find(article => route.endsWith(article.slug)).title);
      await expect(page.locator('.article-content h2')).toHaveCount(1);
      await expect(page.locator('#related-articles article')).toHaveCount(3);
    } else if (/^(produk|artikel-detail)\.html/.test(route)) await expect(page.locator('h1')).toContainText('tidak ditemukan');
    await validate(await page.content(), route);
  }
  console.log(`PASS: ${routes.length} valid/invalid routes and rendered HTML`);
  for (const type of ['bunga-papan', 'standing-flower', 'hand-buket']) {
    await go(`${type}.html`);
    const pool = products.filter(product => product.type === type);
    assert.deepEqual(await names('#product-grid'), pool.slice(0, 12).map(product => product.name));
    if (pool.length > 12) {
      await page.locator('[data-page="2"]').click();
      assert.deepEqual(await names('#product-grid'), pool.slice(12).map(product => product.name));
      await page.goBack();
      await expect(page.locator('#product-grid article')).toHaveCount(12);
    }
    for (const order of ['harga-terendah', 'harga-tertinggi']) {
      await page.selectOption('#catalog-sort', order);
      const sorted = [...pool].sort((a, b) => a.priceMode === 'contact' || b.priceMode === 'contact' ? Number(a.priceMode === 'contact') - Number(b.priceMode === 'contact') : order === 'harga-terendah' ? a.price - b.price : b.price - a.price);
      assert.deepEqual(await names('#product-grid'), sorted.slice(0, 12).map(product => product.name));
    }
    if (type !== 'hand-buket') await page.locator('#catalog-filters [data-category="wedding"]').click();
    await page.fill('#catalog-query', type === 'hand-buket' ? 'Senja' : 'Wedding');
    await page.locator('#catalog-search button').click();
    assert.deepEqual(await names('#product-grid'), pool.filter(product => type === 'hand-buket' ? product.name.includes('Senja') : product.category === 'wedding').sort((a, b) => a.priceMode === 'contact' || b.priceMode === 'contact' ? Number(a.priceMode === 'contact') - Number(b.priceMode === 'contact') : b.price - a.price).map(product => product.name));
    await page.fill('#catalog-query', '<not-found>');
    await page.locator('#catalog-search button').click();
    await expect(page.locator('[data-reset]')).toBeVisible();
    await page.locator('[data-reset]').click();
    await expect(page.locator('#catalog-count')).toHaveText(`${pool.length} produk ditemukan`);
    await go(`${type}.html?kategori=invalid&urut=invalid&page=999`);
    await expect(page.locator('#catalog-sort')).toHaveValue('pilihan');
    assert.equal(new URL(page.url()).searchParams.get('page'), pool.length > 12 ? '2' : null);
    await go(`${type}.html?page=-5`);
    assert.deepEqual(await names('#product-grid'), pool.slice(0, 12).map(product => product.name));
    if (type === 'hand-buket') await expect(page.locator('#catalog-filters')).toBeHidden();
  }
  await go('artikel.html');
  assert.deepEqual(await names('#article-list'), articles.slice(0, 6).map(article => article.title));
  await page.locator('[data-page="2"]').click();
  assert.deepEqual(await names('#article-list'), articles.slice(6).map(article => article.title));
  await page.goBack();
  await expect(page.locator('#article-list article')).toHaveCount(6);
  await page.selectOption('#article-archive', '2026-08');
  await page.locator('#article-filters [data-category="tips-bunga"]').click();
  await page.fill('#article-query', 'warna');
  await page.locator('#article-search button').click();
  assert.deepEqual(await names('#article-list'), articles.filter(article => article.category === 'tips-bunga' && article.publishedAt.startsWith('2026-08') && `${article.title} ${article.excerpt}`.toLowerCase().includes('warna')).map(article => article.title));
  await page.reload();
  await expect(page.locator('#article-archive')).toHaveValue('2026-08');
  await page.fill('#article-query', 'zz-no-result');
  await page.locator('#article-search button').click();
  await page.locator('[data-reset]').click();
  await expect(page.locator('#article-count')).toHaveText('8 artikel ditemukan');
  await go('artikel.html?kategori=invalid&arsip=2026-99&page=999');
  assert.equal(new URL(page.url()).search, '?page=2');
  await page.locator('#article-list a').first().click();
  await page.goBack();
  await expect(page.locator('[data-page="2"]')).toHaveAttribute('aria-current', 'page');
  console.log('PASS: catalog search/category/sort/pagination/Back/reset and article search/category/archive/pagination/Back/reset');
  await go(`produk.html?slug=${products[0].slug}`);
  const zoom = page.locator('[data-zoom="0"]').first();
  await zoom.click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).toHaveCount(0);
  await expect(zoom).toBeFocused();
  await page.locator('[data-order]').click();
  await expect(page.locator('textarea')).toContainText(products[0].code);
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copied = text; } } }));
  await page.locator('[data-copy]').click();
  await expect(page.locator('[data-copy-status]')).toHaveText('Pesan berhasil disalin.');
  assert.equal(await page.evaluate(() => window.copied), await page.locator('textarea').inputValue());
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
  await page.locator('[data-copy]').click();
  await expect(page.locator('[data-copy-status]')).toContainText('Pesan gagal disalin');
  assert.ok(await page.locator('textarea').evaluate(element => element.selectionEnd - element.selectionStart === element.value.length));
  await validate(await page.content(), 'contact modal');
  await page.locator('[data-close]').click();
  await expect(page.locator('[data-order]')).toBeFocused();
  await page.evaluate(() => { document.querySelector('[data-zoom] img').src = 'assets/images/intentional-missing.jpg'; });
  await expect(page.locator('[data-zoom] img').first()).toHaveAttribute('data-fallback-applied', 'true');
  await expect(page.locator('[data-zoom] img').first()).toHaveJSProperty('complete', true);
  assert.ok(await page.locator('[data-zoom] img').first().evaluate(image => image.naturalWidth > 0));
  console.log('PASS: lightbox, Escape/focus restoration, message content, copy success/failure/manual selection and broken-image fallback');
  let overflowChecks = 0;
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['index.html', 'bunga-papan.html', 'standing-flower.html', 'hand-buket.html', 'artikel.html', '404.html', `produk.html?slug=${products[0].slug}`, `artikel-detail.html?slug=${articles[0].slug}`]) {
      await go(route);
      const overflow = async label => { assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px overflow: ${route} ${label}`); overflowChecks++; };
      await overflow('page');
      if (width < 1024) {
        await page.locator('#menu-toggle').click();
        await expect(page.locator('#primary-navigation')).toBeVisible();
        await page.locator('#primary-navigation summary').first().click();
        await overflow('menu');
        await page.keyboard.press('Escape');
        await page.locator('#menu-toggle').click();
      }
      await page.locator('#site-header [data-contact]').click();
      await expect(page.locator('dialog')).toBeVisible();
      await overflow('modal');
      await page.mouse.click(1, 1);
      await expect(page.locator('dialog')).toHaveCount(0);
    }
  }
  assert.deepEqual(errors, []);
  console.log(`PASS: ${overflowChecks} page/menu/modal overflow checks at 360/390/768/1440px; no unexpected HTTP/request/runtime errors`);
} finally {
  await browser?.close();
  server.kill();
}
