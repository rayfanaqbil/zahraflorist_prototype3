import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { HtmlValidate } from 'html-validate';
import { getProducts, getProduct } from '../assets/js/data/products.js';
import { getArticles, getArticle } from '../assets/js/data/articles.js';
import { typeLabels, categoryLabels, articleCategoryLabels } from '../assets/js/data/store.js';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const validator = new HtmlValidate({ extends: ['html-validate:recommended'], rules: { 'doctype-style': 'off', 'attribute-empty-style': 'off', 'attribute-boolean-style': 'off', 'no-inline-style': 'off', 'void-style': 'off', 'no-trailing-whitespace': 'off', 'prefer-native-element': 'off', 'heading-level': 'off', 'require-sri': 'off' } });
export async function validate(html, name) {
  const report = await validator.validateString(html, name);
  assert.ok(report.valid, `${name}\n${report.results.flatMap(result => result.messages.map(message => `${message.line}:${message.column} ${message.ruleId}: ${message.message}`)).join('\n')}`);
}
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.filter(entry => !['node_modules', '.git'].includes(entry.name)).map(entry => entry.isDirectory() ? files(`${directory}/${entry.name}`) : `${directory}/${entry.name}`))).flat();
}
const all = await files(root);
for (const file of all.filter(file => /\.(m?js)$/.test(file))) execFileSync(process.execPath, ['--check', file]);
const htmlFiles = all.filter(file => file.endsWith('.html'));
for (const file of htmlFiles) await validate(await readFile(file, 'utf8'), file);
const products = getProducts();
const articles = getArticles();
assert.equal(products.length, 30);
assert.equal(articles.length, 8);
for (const [type, count] of Object.entries({ 'bunga-papan': 14, 'standing-flower': 10, 'hand-buket': 6 })) assert.equal(products.filter(product => product.type === type).length, count);
for (const collection of [products, articles]) {
  assert.equal(new Set(collection.map(item => item.slug)).size, collection.length);
  assert.equal(new Set(collection.map(item => item.id)).size, collection.length);
}
for (const product of products) {
  assert.equal(getProduct(product.slug), product);
  assert.ok(typeLabels[product.type]);
  assert.ok(product.type === 'hand-buket' ? !product.category : categoryLabels[product.category]);
  assert.ok(product.priceMode === 'contact' ? product.price === null : Number.isFinite(product.price) && product.price >= 0);
  for (const image of product.images) { assert.ok(image.alt); await access(`${root}${image.src}`); }
}
for (const article of articles) {
  assert.equal(getArticle(article.slug), article);
  assert.ok(articleCategoryLabels[article.category]);
  assert.ok(Number.isFinite(Date.parse(article.publishedAt)));
  await access(`${root}${article.cover}`);
  await validate(`<!doctype html><html lang="id"><head><title>Fixture</title></head><body><main>${article.content}</main></body></html>`, article.slug);
}
for (const slug of [null, '', 'missing', '<script>']) { assert.equal(getProduct(slug), undefined); assert.equal(getArticle(slug), undefined); }
console.log(`PASS: syntax; ${htmlFiles.length} HTML pages; 30 product and 8 article fixtures, assets and article markup`);
