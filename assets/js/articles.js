import { getArticles } from './data/articles.js';
import { articleCategoryLabels } from './data/store.js';
import { esc, articleCard } from './shared.js';

const articles = getArticles();
const form = document.querySelector('#article-search');
const input = form.querySelector('[name="q"]');
const filters = document.querySelector('#article-filters');
const archive = document.querySelector('#article-archive');
const list = document.querySelector('#article-list');
const pager = document.querySelector('#pagination');
const months = [...new Set(articles.map(article => article.publishedAt.slice(0, 7)))].sort().reverse();
let state;
const monthLabel = month => new Date(`${month}-01T12:00:00`).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
archive.innerHTML = '<option value="">Semua arsip</option>' + months.map(month => `<option value="${month}">${esc(monthLabel(month))} (${articles.filter(article => article.publishedAt.startsWith(month)).length})</option>`).join('');
document.title = 'Artikel — Zahraflorist';
const recent = document.querySelector('#recent-articles');
if (recent) recent.innerHTML = articles.slice(0, 3).map(article => `<a class="block border-b border-[#26372D]/15 py-4 font-serif text-lg hover:underline" href="artikel-detail.html?slug=${esc(article.slug)}">${esc(article.title)}</a>`).join('');

function urlFor(values) {
  const url = new URL(location.href);
  ['q', 'kategori', 'arsip', 'page'].forEach(key => url.searchParams.delete(key));
  ['q', 'kategori', 'arsip'].forEach(key => { if (values[key]) url.searchParams.set(key, values[key]); });
  if (values.page > 1) url.searchParams.set('page', values.page);
  return `${url.pathname}${url.search}${url.hash}`;
}

function render() {
  const params = new URLSearchParams(location.search);
  state = {
    q: (params.get('q') || '').trim(),
    kategori: Object.hasOwn(articleCategoryLabels, params.get('kategori')) ? params.get('kategori') : '',
    arsip: months.includes(params.get('arsip')) ? params.get('arsip') : '',
    page: /^\d+$/.test(params.get('page') || '') ? Math.max(1, Number(params.get('page'))) : 1
  };
  const results = articles.filter(article => (!state.kategori || article.category === state.kategori) && (!state.arsip || article.publishedAt.startsWith(state.arsip)) && `${article.title} ${article.excerpt}`.toLocaleLowerCase('id').includes(state.q.toLocaleLowerCase('id')));
  const pages = Math.max(1, Math.ceil(results.length / 6));
  state.page = Math.min(state.page, pages);
  history.replaceState(null, '', urlFor(state));
  input.value = state.q;
  archive.value = state.arsip;
  filters.innerHTML = Object.entries({ '': 'Semua Artikel', ...articleCategoryLabels }).map(([key, label]) => `<a href="${esc(urlFor({ ...state, kategori: key, page: 1 }))}" data-category="${key}" ${state.kategori === key ? 'aria-current="true"' : ''} class="block min-h-11 rounded px-4 py-3 ${state.kategori === key ? 'bg-[#315746] text-white' : 'hover:bg-[#EEDDD7]'}">${esc(label)}</a>`).join('');
  document.querySelector('#article-count').textContent = `${results.length} artikel ditemukan`;
  list.innerHTML = results.length ? results.slice((state.page - 1) * 6, state.page * 6).map(articleCard).join('') : '<section class="py-16 text-center"><h2 class="font-serif text-2xl">Tidak ada artikel yang cocok</h2><p class="mt-3">Coba kata kunci lain atau hapus filter Anda.</p><button type="button" data-reset class="mt-6 min-h-11 rounded border px-6 py-3">Hapus filter</button></section>';
  pager.innerHTML = pages > 1 ? Array.from({ length: pages }, (_, index) => `<a href="${esc(urlFor({ ...state, page: index + 1 }))}" data-page="${index + 1}" aria-label="Halaman ${index + 1}" ${state.page === index + 1 ? 'aria-current="page"' : ''} class="inline-flex min-h-11 min-w-11 items-center justify-center rounded border px-3 ${state.page === index + 1 ? 'bg-[#315746] text-white' : 'hover:bg-[#EEDDD7]'}">${index + 1}</a>`).join('') : '';
}
function update(values) {
  history.pushState(null, '', urlFor({ ...state, page: 1, ...values }));
  render();
}
form.addEventListener('submit', event => { event.preventDefault(); update({ q: input.value.trim() }); });
archive.addEventListener('change', () => update({ arsip: archive.value }));
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
const clear = () => update({ q: '', kategori: '', arsip: '' });
document.querySelector('#article-reset').addEventListener('click', clear);
list.addEventListener('click', event => { if (event.target.closest('[data-reset]')) clear(); });
window.addEventListener('popstate', render);
render();
