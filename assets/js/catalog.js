import { getProducts } from './data/products.js';
import { typeLabels, categoryLabels } from './data/store.js';
import { esc, productCard } from './shared.js';

const type = document.body.dataset.type;
const title = typeLabels[type] || 'Koleksi Bunga';
const form = document.querySelector('#catalog-search');
const input = form.querySelector('[name="q"]');
const sort = document.querySelector('#catalog-sort');
const filters = document.querySelector('#catalog-filters');
const grid = document.querySelector('#product-grid');
const pager = document.querySelector('#pagination');
const reset = document.querySelector('#catalog-reset');
const categories = type === 'hand-buket' ? {} : categoryLabels;
const sorts = ['pilihan', 'harga-terendah', 'harga-tertinggi'];
let state;

document.querySelector('#catalog-title').textContent = title;
document.querySelector('#catalog-intro').textContent = `Temukan ${title.toLowerCase()} untuk menyampaikan perhatian di setiap momen berarti.`;
document.title = `${title} — Zahraflorist`;
sort.innerHTML = '<option value="pilihan">Pilihan Toko</option><option value="harga-terendah">Harga Terendah</option><option value="harga-tertinggi">Harga Tertinggi</option>';

function urlFor(values) {
  const url = new URL(location.href);
  ['q', 'kategori', 'urut', 'page'].forEach(key => url.searchParams.delete(key));
  if (values.q) url.searchParams.set('q', values.q);
  if (values.kategori) url.searchParams.set('kategori', values.kategori);
  if (values.urut !== 'pilihan') url.searchParams.set('urut', values.urut);
  if (values.page > 1) url.searchParams.set('page', values.page);
  return `${url.pathname}${url.search}${url.hash}`;
}

function render() {
  const params = new URLSearchParams(location.search);
  state = {
    q: (params.get('q') || '').trim(),
    kategori: Object.hasOwn(categories, params.get('kategori')) ? params.get('kategori') : '',
    urut: sorts.includes(params.get('urut')) ? params.get('urut') : 'pilihan',
    page: /^\d+$/.test(params.get('page') || '') ? Math.max(1, Number(params.get('page'))) : 1
  };
  const results = getProducts().filter(product => product.type === type && (!state.kategori || product.category === state.kategori) && product.name.toLocaleLowerCase('id').includes(state.q.toLocaleLowerCase('id')));
  if (state.urut !== 'pilihan') results.sort((a, b) => {
    if (a.priceMode === 'contact' || b.priceMode === 'contact') return Number(a.priceMode === 'contact') - Number(b.priceMode === 'contact');
    return state.urut === 'harga-terendah' ? a.price - b.price : b.price - a.price;
  });
  const pages = Math.max(1, Math.ceil(results.length / 12));
  state.page = Math.min(state.page, pages);
  history.replaceState(null, '', urlFor(state));
  input.value = state.q;
  sort.value = state.urut;
  filters.hidden = type === 'hand-buket';
  filters.innerHTML = Object.entries({ '': 'Semua', ...categories }).map(([key, label]) => `<a href="${esc(urlFor({ ...state, kategori: key, page: 1 }))}" data-category="${esc(key)}" ${state.kategori === key ? 'aria-current="true"' : ''} class="inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm ${state.kategori === key ? 'border-[#315746] bg-[#315746] text-white' : 'border-[#26372D]/20 text-[#26372D] hover:bg-[#EEDDD7]'}">${esc(label)}</a>`).join('');
  document.querySelector('#catalog-count').textContent = `${results.length} produk ditemukan`;
  grid.innerHTML = results.length ? results.slice((state.page - 1) * 12, state.page * 12).map(productCard).join('') : '<div class="col-span-full py-16 text-center"><h2 class="font-serif text-2xl">Tidak ada produk yang cocok</h2><p class="mt-3">Coba kata kunci lain atau hapus filter Anda.</p><button type="button" data-reset class="mt-6 min-h-11 rounded border px-6 py-3">Hapus filter</button></div>';
  pager.innerHTML = pages > 1 ? Array.from({ length: pages }, (_, index) => `<a href="${esc(urlFor({ ...state, page: index + 1 }))}" data-page="${index + 1}" aria-label="Halaman ${index + 1}" ${state.page === index + 1 ? 'aria-current="page"' : ''} class="inline-flex min-h-11 min-w-11 items-center justify-center rounded border px-3 ${state.page === index + 1 ? 'bg-[#315746] text-white' : 'hover:bg-[#EEDDD7]'}">${index + 1}</a>`).join('') : '';
}

function update(values) {
  history.pushState(null, '', urlFor({ ...state, page: 1, ...values }));
  render();
}

form.addEventListener('submit', event => { event.preventDefault(); update({ q: input.value.trim() }); });
sort.addEventListener('change', () => update({ urut: sort.value }));
filters.addEventListener('click', event => {
  const link = event.target.closest('[data-category]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); update({ kategori: link.dataset.category });
});
pager.addEventListener('click', event => {
  const link = event.target.closest('[data-page]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); update({ page: Number(link.dataset.page) });
});
const clear = () => update({ q: '', kategori: '', urut: 'pilihan' });
reset.addEventListener('click', clear);
grid.addEventListener('click', event => { if (event.target.closest('[data-reset]')) clear(); });
window.addEventListener('popstate', render);
render();
