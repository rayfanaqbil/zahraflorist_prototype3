import { getProducts } from './assets/js/data/products.js';
import { getArticles } from './assets/js/data/articles.js';
import { productCard, articleCard } from './assets/js/shared.js';

const featured = document.querySelector('#featured-products');
if (featured) {
  const products = getProducts();
  const picks = products.filter(product => product.featured);
  const list = [...picks, ...products.filter(product => !picks.includes(product))].slice(0, 8);
  featured.innerHTML = list.map(productCard).join('');
}

const latest = document.querySelector('#latest-articles');
if (latest) {
  latest.innerHTML = getArticles().slice(0, 3).map(articleCard).join('');
}
