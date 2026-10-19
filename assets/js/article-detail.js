import { getArticles, getArticle } from './data/articles.js';
import { articleCategoryLabels } from './data/store.js';
import { esc, image, articleCard, notFound } from './shared.js';

const slug = new URLSearchParams(location.search).get('slug');
const article = slug ? getArticle(slug) : null;
const content = document.querySelector('#article-content');
const relatedWrap = document.querySelector('#related-articles');

if (!article) {
  notFound('Artikel tidak ditemukan');
  document.title = 'Artikel tidak ditemukan — Zahraflorist';
} else {
  renderArticle();
  renderRelated();
}

function renderArticle() {
  document.title = article.metaTitle || `${article.title} — Zahraflorist`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', article.metaDescription || article.excerpt);
  const date = new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const category = articleCategoryLabels[article.category] || article.category;
  content.innerHTML = `
    <nav aria-label="Breadcrumb" class="mb-6 text-sm text-[#26372D]/70">
      <ol class="flex flex-wrap items-center gap-2">
        <li class="flex items-center gap-2"><a href="index.html" class="hover:text-[#315746]">Beranda</a><span aria-hidden="true">/</span></li>
        <li class="flex items-center gap-2"><a href="artikel.html" class="hover:text-[#315746]">Artikel</a><span aria-hidden="true">/</span></li>
        <li><span aria-current="page" class="text-[#26372D]">${esc(article.title)}</span></li>
      </ol>
    </nav>
    <article>
      <header class="mb-8">
        <p class="text-sm uppercase tracking-wide text-[#315746]">${esc(category)}</p>
        <h1 class="mt-2 font-serif text-3xl leading-tight text-[#26372D] md:text-4xl">${esc(article.title)}</h1>
        <p class="mt-3 text-sm text-[#26372D]/70">${esc(date)} • ${esc(article.author)}</p>
      </header>
      <div class="aspect-[16/9] overflow-hidden rounded-xl bg-[#EEDDD7]">${image(article.cover, article.title, 'h-full w-full object-cover', true)}</div>
      <div class="article-content mx-auto mt-8 max-w-[70ch] space-y-4 leading-relaxed text-[#26372D]/90">${article.content}</div>
      <div class="mt-10">
        <a href="artikel.html" class="inline-flex min-h-11 items-center rounded-lg border border-[#315746] px-6 py-3 text-[#315746]">Kembali ke daftar artikel</a>
      </div>
    </article>`;
}

function renderRelated() {
  if (!relatedWrap) return;
  const pool = getArticles().filter(item => item.slug !== article.slug);
  const sameCategory = pool.filter(item => item.category === article.category);
  const related = [...sameCategory, ...pool.filter(item => !sameCategory.includes(item))].slice(0, 3);
  if (!related.length) { relatedWrap.hidden = true; return; }
  relatedWrap.innerHTML = `
    <h2 class="font-serif text-2xl text-[#26372D]">Artikel Terkait</h2>
    <div class="mt-6 grid gap-6 md:grid-cols-3">${related.map(articleCard).join('')}</div>`;
}
