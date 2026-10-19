import { getProducts, getProduct } from './data/products.js';
import { typeLabels, categoryLabels, priceModeLabels } from './data/store.js';
import { esc, image, price, contact, openLightbox, productCard, notFound } from './shared.js';

const slug = new URLSearchParams(location.search).get('slug');
const product = slug ? getProduct(slug) : null;
const content = document.querySelector('#product-content');
const relatedWrap = document.querySelector('#related-products');

if (!product) {
  notFound('Produk tidak ditemukan');
  document.title = 'Produk tidak ditemukan — Zahraflorist';
} else {
  renderProduct();
  renderRelated();
}

function catalogHref() {
  const map = { 'bunga-papan': 'bunga-papan.html', 'standing-flower': 'standing-flower.html', 'hand-buket': 'hand-buket.html' };
  return map[product.type] || 'index.html';
}

function renderProduct() {
  document.title = `${product.name} — Zahraflorist`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', product.description.slice(0, 160));
  const cover = product.images[0] || { src: 'assets/images/papan.svg', alt: product.name };
  const category = categoryLabels[product.category];
  const breadcrumb = [
    { label: 'Beranda', href: 'index.html' },
    { label: typeLabels[product.type], href: catalogHref() },
    { label: product.name }
  ];
  content.innerHTML = `
    <nav aria-label="Breadcrumb" class="mb-6 text-sm text-[#26372D]/70">
      <ol class="flex flex-wrap items-center gap-2">
        ${breadcrumb.map((item, index) => `<li class="flex items-center gap-2">${item.href ? `<a href="${esc(item.href)}" class="hover:text-[#315746]">${esc(item.label)}</a>` : `<span aria-current="page" class="text-[#26372D]">${esc(item.label)}</span>`}${index < breadcrumb.length - 1 ? '<span aria-hidden="true">/</span>' : ''}</li>`).join('')}
      </ol>
    </nav>
    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <div class="aspect-[4/5] overflow-hidden rounded-xl bg-[#EEDDD7]">
          <button type="button" data-zoom="0" class="h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315746]" aria-label="Perbesar ${esc(cover.alt)}">${image(cover.src, cover.alt, 'h-full w-full object-cover', true)}</button>
        </div>
        ${product.images.length > 1 ? `<div class="mt-4 flex gap-3">${product.images.map((img, index) => `<button type="button" data-zoom="${index}" class="aspect-square w-20 overflow-hidden rounded-lg border border-[#26372D]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315746]" aria-label="Perbesar ${esc(img.alt)}">${image(img.src, img.alt, 'h-full w-full object-cover')}</button>`).join('')}</div>` : ''}
      </div>
      <div>
        <p class="text-sm uppercase tracking-wide text-[#315746]">${esc([typeLabels[product.type], category].filter(Boolean).join(' • '))}</p>
        <h1 class="mt-2 font-serif text-3xl text-[#26372D]">${esc(product.name)}</h1>
        <p class="mt-2 text-sm text-[#26372D]/70">Kode produk: ${esc(product.code)}</p>
        <p class="mt-4 text-2xl font-semibold text-[#315746]">${esc(price(product))}</p>
        <p class="mt-1 text-sm text-[#26372D]/70">${esc(priceModeLabels[product.priceMode])}</p>
        <dl class="mt-6 space-y-3 text-sm">
          <div class="flex gap-2"><dt class="w-28 font-semibold text-[#26372D]">Jenis</dt><dd>${esc(typeLabels[product.type])}</dd></div>
          ${category ? `<div class="flex gap-2"><dt class="w-28 font-semibold text-[#26372D]">Kategori</dt><dd>${esc(category)}</dd></div>` : ''}
          ${product.size ? `<div class="flex gap-2"><dt class="w-28 font-semibold text-[#26372D]">Ukuran</dt><dd>${esc(product.size)}</dd></div>` : ''}
        </dl>
        <p class="mt-6 leading-relaxed text-[#26372D]/90">${esc(product.description)}</p>
        <p class="mt-4 rounded-lg bg-[#EEDDD7] px-4 py-3 text-sm text-[#26372D]">Ucapan, tanggal kebutuhan, warna, dan tujuan pengiriman dikonfirmasi bersama admin.</p>
        <button type="button" data-order class="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#315746] px-6 py-3 text-white">Pesan via WhatsApp</button>
      </div>
    </div>`;
  content.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    const img = product.images[Number(button.dataset.zoom)] || cover;
    openLightbox(img.src, img.alt);
  }));
  content.querySelector('[data-order]').addEventListener('click', () => contact(product));
}

function renderRelated() {
  if (!relatedWrap) return;
  const pool = getProducts().filter(item => item.slug !== product.slug);
  const sameCategory = product.category ? pool.filter(item => item.type === product.type && item.category === product.category) : [];
  const sameType = pool.filter(item => item.type === product.type && !sameCategory.includes(item));
  const related = [...sameCategory, ...sameType].slice(0, 4);
  if (!related.length) { relatedWrap.hidden = true; return; }
  relatedWrap.innerHTML = `
    <h2 class="font-serif text-2xl text-[#26372D]">Produk Terkait</h2>
    <div class="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">${related.map(productCard).join('')}</div>`;
}
