import { store, typeLabels, categoryLabels, articleCategoryLabels, whatsappTemplates } from './data/store.js';
import { getProduct } from './data/products.js';

export const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const fallback = 'assets/images/fallback.svg';
const safeImage = src => {
  try {
    const url = new URL(src || fallback, document.baseURI);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : fallback;
  } catch { return fallback; }
};
export function price(product) {
  if (product.priceMode === 'contact' || !Number.isFinite(product.price) || product.price < 0) return 'Hubungi untuk harga';
  const amount = `Rp${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(product.price)}`;
  return product.priceMode === 'starting-from' ? `Mulai dari ${amount}` : amount;
}
export function image(src, alt = '', classes = '', eager = false) {
  return `<img src="${esc(safeImage(src))}" alt="${esc(alt)}" class="${esc(classes)}" width="800" height="800" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
}
export function productCard(product) {
  const cover = product.images?.[0] || { src: fallback, alt: 'Ilustrasi pengganti gambar produk' };
  return `<article class="group min-w-0"><a href="produk.html?slug=${encodeURIComponent(product.slug)}" class="block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315746]"><div class="aspect-square overflow-hidden rounded bg-[#EEDDD7]/50">${image(cover.src, cover.alt, 'h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105')}</div><p class="mt-4 text-sm text-[#26372D]/70">${esc([typeLabels[product.type], categoryLabels[product.category]].filter(Boolean).join(' · '))}</p><h3 class="mt-2 break-words font-serif text-xl leading-snug group-hover:underline">${esc(product.name)}</h3><p class="mt-3 font-medium text-[#315746]">${esc(price(product))}</p><span class="mt-3 inline-flex min-h-11 items-center border-b border-[#26372D]/20 text-sm">Lihat rangkaian <span aria-hidden="true" class="ml-3">↗</span></span></a></article>`;
}
export function articleCard(article) {
  const date = new Date(`${article.publishedAt}T12:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  return `<article class="min-w-0 border-b border-[#26372D]/15 pb-6"><a href="artikel-detail.html?slug=${encodeURIComponent(article.slug)}" class="group block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315746]"><div class="aspect-[16/9] overflow-hidden rounded bg-[#EEDDD7]/50">${image(article.cover, article.title, 'h-full w-full object-cover')}</div><p class="mt-4 text-sm text-[#26372D]/70">${esc(articleCategoryLabels[article.category] || article.category)} · <time datetime="${esc(article.publishedAt)}">${esc(date)}</time></p><h3 class="mt-3 font-serif text-2xl leading-snug group-hover:underline">${esc(article.title)}</h3><p class="mt-3 leading-relaxed text-[#26372D]/80">${esc(article.excerpt)}</p><span class="mt-4 inline-flex min-h-11 items-center border-b border-[#315746]">Baca Selengkapnya <span aria-hidden="true" class="ml-3">↗</span></span></a></article>`;
}

function modal(title, contents) {
  const previous = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'w-full max-w-2xl rounded-lg border border-[#26372D]/20 bg-[#FAF7F2] p-5 text-[#26372D] shadow-xl backdrop:bg-black/60 md:p-8';
  dialog.style.maxWidth = 'min(42rem, calc(100vw - 2rem))';
  dialog.style.maxHeight = '90dvh';
  dialog.setAttribute('aria-labelledby', 'shared-dialog-title');
  document.querySelectorAll('dialog[data-shared]').forEach(other => other.close());
  dialog.dataset.shared = '';
  dialog.innerHTML = `<div class="mb-5 flex items-start justify-between gap-4"><h2 id="shared-dialog-title" class="font-serif text-2xl">${esc(title)}</h2><button type="button" data-close autofocus aria-label="Tutup dialog" class="min-h-11 min-w-11 rounded border border-[#26372D]/20 text-xl">×</button></div>${contents}`;
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  let backdropStart = false;
  const outside = event => { const rect = dialog.getBoundingClientRect(); return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom; };
  dialog.addEventListener('pointerdown', event => { backdropStart = outside(event); });
  dialog.addEventListener('click', event => { if (event.target === dialog && backdropStart && outside(event)) dialog.close(); });
  dialog.addEventListener('close', () => { dialog.remove(); if (previous?.isConnected) previous.focus(); }, { once: true });
  document.body.append(dialog);
  dialog.showModal();
  return dialog;
}
export function contact(product) {
  const url = new URL('produk.html', document.baseURI);
  if (product) url.searchParams.set('slug', product.slug);
  const message = product ? whatsappTemplates.product.replace('[nama produk]', product.name).replace('[kode produk]', product.code).replace('[URL produk]', url.href) : whatsappTemplates.general;
  const number = String(store.whatsapp || '').trim();
  if (/^\+?[1-9]\d{7,14}$/.test(number)) {
    window.open(`https://wa.me/${number.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    return;
  }
  const dialog = modal('Pratinjau pesan WhatsApp', `<p class="mb-5 leading-relaxed">Demo pemesanan — nomor WhatsApp toko belum diatur</p><label for="contact-message" class="mb-2 block font-medium">Pesan Anda</label><textarea id="contact-message" readonly rows="8" class="w-full rounded border border-[#26372D]/25 bg-white p-4 leading-relaxed">${esc(message)}</textarea><button type="button" data-copy class="mt-5 min-h-11 rounded bg-[#315746] px-6 py-3 text-white">Salin Pesan</button><p role="status" aria-live="polite" data-copy-status class="mt-3 text-sm"></p>`);
  dialog.querySelector('[data-copy]').addEventListener('click', async () => {
    const status = dialog.querySelector('[data-copy-status]');
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Pesan berhasil disalin.';
    } catch {
      status.textContent = 'Pesan gagal disalin. Pilih teks pesan dan salin secara manual.';
      dialog.querySelector('textarea').focus();
      dialog.querySelector('textarea').select();
    }
  });
}
export function openLightbox(src, alt = '') {
  return modal('Detail rangkaian', `<figure>${image(src, alt, 'max-h-[65vh] w-full object-contain', true)}<figcaption class="mt-4 text-sm leading-relaxed">${esc(alt)}</figcaption></figure>`);
}
export function notFound(title = 'Halaman tidak ditemukan') {
  const main = document.querySelector('main');
  if (!main) return;
  document.title = `${title} — Zahraflorist`;
  main.innerHTML = `<section class="mx-auto max-w-[1200px] px-5 py-20 text-center"><p class="text-sm uppercase tracking-[0.2em]">Tidak ditemukan</p><h1 class="mt-4 font-serif text-4xl">${esc(title)}</h1><p class="mt-5 leading-relaxed">Tautan ini tidak tersedia. Silakan kembali untuk menemukan rangkaian atau artikel lainnya.</p><a href="index.html" class="mt-8 inline-flex min-h-11 items-center rounded bg-[#315746] px-6 py-3 text-white">Kembali ke Home</a></section>`;
}

function initialize() {
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const product = currentFile === 'produk.html' ? getProduct(new URLSearchParams(location.search).get('slug')) : null;
  const activeFile = product ? `${product.type}.html` : currentFile === 'artikel-detail.html' ? 'artikel.html' : currentFile;
  const header = document.querySelector('#site-header');
  const entries = [['Home', 'index.html'], ['Bunga Papan', 'bunga-papan.html'], ['Standing Flower', 'standing-flower.html'], ['Hand Buket', 'hand-buket.html'], ['Artikel', 'artikel.html']];
  const link = (label, href, active) => `<a href="${esc(href)}"${active ? ' aria-current="page"' : ''} class="block min-h-11 rounded px-3 py-3 ${active ? 'bg-[#EEDDD7] font-semibold' : 'hover:bg-[#EEDDD7]/50'}">${esc(label)}</a>`;
  if (header) {
    header.className = 'relative z-30 border-b border-[#26372D]/15 bg-[#FAF7F2]';
    header.innerHTML = `<div class="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8"><a href="index.html" aria-label="Zahraflorist — Home" class="font-serif text-3xl tracking-tight">Zahraflorist<span aria-hidden="true" class="text-[#315746]">.</span></a><button type="button" id="menu-toggle" aria-expanded="false" aria-controls="primary-navigation" class="min-h-11 rounded border border-[#26372D]/25 px-4 lg:hidden">☰ <span>Menu</span></button><nav id="primary-navigation" aria-label="Navigasi utama" class="hidden w-full lg:block lg:w-auto"><ul class="flex flex-col gap-1 lg:flex-row lg:items-center">${entries.map(([label, href], index) => {
      const active = activeFile === href;
      if (index !== 1 && index !== 2) return `<li>${link(label, href, active)}</li>`;
      return `<li class="relative"><details><summary class="min-h-11 cursor-pointer rounded px-3 py-3 ${active ? 'bg-[#EEDDD7] font-semibold' : 'hover:bg-[#EEDDD7]/50'}"${active ? ' aria-current="true"' : ''}>${esc(label)}</summary><ul class="z-40 min-w-64 space-y-1 rounded border border-[#26372D]/15 bg-[#FAF7F2] p-2 lg:absolute lg:left-0 lg:top-full lg:shadow-lg"><li>${link(`Semua ${label}`, href, active && !location.search)}</li>${Object.entries(categoryLabels).map(([key, name]) => `<li>${link(`${label} ${name}`, `${href}?kategori=${key}`, active && new URLSearchParams(location.search).get('kategori') === key)}</li>`).join('')}</ul></details></li>`;
    }).join('')}</ul></nav><button type="button" data-contact class="min-h-11 rounded bg-[#315746] px-5 py-3 text-white">Hubungi Kami</button></div>`;
    const toggle = header.querySelector('#menu-toggle');
    const nav = header.querySelector('nav');
    const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.add('hidden'); header.querySelectorAll('details').forEach(details => { details.open = false; }); };
    toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(expanded)); nav.classList.toggle('hidden', !expanded); });
    header.addEventListener('click', event => { if (event.target.closest('nav a')) closeMenu(); });
    header.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => { if (details.open) header.querySelectorAll('details').forEach(other => { if (other !== details) other.open = false; }); }));
    document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
    header.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const details = event.target.closest('details[open]');
      if (details) { details.open = false; details.querySelector('summary').focus(); } else { closeMenu(); toggle.focus(); }
      event.preventDefault();
    });
    window.addEventListener('popstate', () => { closeMenu(); header.querySelectorAll('a[aria-current]').forEach(anchor => anchor.removeAttribute('aria-current')); header.querySelectorAll('nav a').forEach(anchor => { const target = new URL(anchor.href); if (target.pathname === location.pathname && target.search === location.search) anchor.setAttribute('aria-current', 'page'); }); });
  }
  const footer = document.querySelector('#site-footer');
  if (footer) {
    footer.className = 'border-t border-[#26372D]/15 bg-[#EEDDD7]/30';
    footer.innerHTML = `<div class="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-3 md:px-8"><div><a href="index.html" class="font-serif text-3xl">Zahraflorist.</a><p class="mt-4 leading-relaxed">Rangkaian bunga untuk setiap momen berarti.</p></div><nav aria-label="Navigasi footer"><h2 class="mb-3 font-medium">Jelajahi koleksi</h2>${entries.map(([label, href]) => `<a href="${href}" class="block min-h-11 py-2 hover:underline">${label}</a>`).join('')}</nav><div><h2 class="font-medium">Mari bicarakan rangkaian Anda</h2><p class="mt-3 leading-relaxed">${esc(store.address || 'Informasi kontak resmi akan dilengkapi.')}</p>${store.businessHours ? `<p class="mt-3">${esc(store.businessHours)}</p>` : ''}<button type="button" data-contact class="mt-5 min-h-11 rounded border border-[#315746] px-5 py-3">Hubungi Kami</button></div><p class="border-t border-[#26372D]/15 pt-5 text-sm leading-relaxed md:col-span-3">Prototype presentasi — ${esc(store.demoNotice)}</p></div>`;
  }
}
document.addEventListener('error', event => {
  const img = event.target;
  if (!(img instanceof HTMLImageElement) || img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';
  img.removeAttribute('srcset');
  img.alt = 'Ilustrasi pengganti — gambar tidak tersedia, bukan foto produk';
  if (img.src !== new URL(fallback, document.baseURI).href) img.src = fallback;
}, true);
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-contact]');
  if (!trigger) return;
  event.preventDefault();
  const slug = trigger.dataset.product || trigger.dataset.contact;
  contact(slug ? getProduct(slug) : undefined);
});
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
else initialize();
