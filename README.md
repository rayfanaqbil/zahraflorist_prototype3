# Zahraflorist — prototype katalog

Prototype statis HTML5, Tailwind CSS lokal, dan vanilla JavaScript. Tidak memakai framework aplikasi, backend, database, atau CMS. Seluruh konten merupakan contoh presentasi, bukan penawaran resmi toko.

## Menjalankan

Dari direktori proyek:

```sh
python3 -m http.server 8080
```

Buka `http://localhost:8080/index.html`. Tidak perlu npm untuk preview; CSS hasil kompilasi sudah tersedia. Gunakan server HTTP, bukan membuka file lewat `file://`, karena JavaScript menggunakan ES modules. Hentikan server dengan Ctrl+C.

## Pengembangan

Node.js 22 digunakan untuk pemeriksaan. Instal alat pengembang dan kompilasi ulang CSS setelah mengubah kelas Tailwind:

```sh
npm install --workspaces=false --legacy-peer-deps
npm run build:css
npm run lint
npx playwright install chromium
npm test
```

Opsi instalasi di atas diperlukan pada lingkungan pengerjaan karena `npm install` biasa gagal dengan error npm `edgesOut`. Tidak diperlukan saat sekadar preview. Sumber CSS: `assets/css/input.css`; konfigurasi: `tailwind.config.js`; hasil: `assets/css/tailwind.css`; tambahan kecil: `assets/css/custom.css`. Pemindaian kelas mencakup HTML dan JavaScript. Gunakan nama utility lengkap.

## Halaman dan interaksi

- Home lengkap: hero, tiga koleksi, delapan produk pilihan, tentang, cara pesan, dan tiga artikel terbaru.
- `bunga-papan.html`, `standing-flower.html`, `hand-buket.html`: pencarian, kategori yang relevan, tiga urutan harga, reset, jumlah hasil, pagination 12 produk.
- `produk.html?slug=papan-wedding-harmoni`: detail dari record katalog yang sama, galeri/lightbox, produk terkait, dan pesan WhatsApp.
- `artikel.html`: delapan tulisan, pencarian, kategori, arsip berdasarkan tanggal fixture, pagination enam tulisan.
- `artikel-detail.html?slug=...`: isi utuh, metadata, artikel terkait, tautan koleksi.
- `404.html`: halaman tidak ditemukan. Slug tidak valid juga menampilkan kondisi tidak ditemukan. Pemakaian 404.html untuk file yang tidak ada harus dikonfigurasi pada hosting; server Python standar tidak otomatis memakainya.

Filter tersimpan pada query URL dan mendukung reload serta Back. Navigasi mobile memakai menu dan accordion; desktop dropdown dapat digunakan melalui keyboard. Modal mendukung Escape, backdrop, dan pengembalian fokus. Gambar gagal menggunakan fallback lokal satu kali.

## Data dan konfigurasi CMS

- `assets/js/data/store.js`: nama, kontak, WhatsApp, informasi toko, label, template pesan, dan konten Home contoh. Nomor WhatsApp awal kosong. Isi nomor internasional resmi untuk mengaktifkan tautan WhatsApp; tanpa nomor, tombol membuka pratinjau dengan salin pesan serta status berhasil/gagal.
- `assets/js/data/products.js`: 30 record (14 Bunga Papan, 10 Standing Flower, 6 Hand Buket), diakses melalui `getProducts()` dan `getProduct(slug)`.
- `assets/js/data/articles.js`: delapan record artikel, melalui `getArticles()` dan `getArticle(slug)`.
- `assets/js/shared.js`: kartu, header/footer, dialog, format harga, dan fallback gambar.
- Logika halaman berada pada modul terpisah; Home memakai `home.js` di root.

Product berisi id, code, name, slug, type, category, description, size, priceMode, price, images, featured, sortOrder, status. Image berisi src dan alt. Mode harga: fixed, starting-from, contact (price null). Article berisi id, title, slug, excerpt, content (HTML tepercaya), cover, category, author, publishedAt, status, metaTitle, metaDescription. Hanya published yang ditampilkan. Saat mengganti fixture dengan API CMS, validasi record dan sanitasi HTML artikel sebelum dirender.

## Aset

Foto disimpan lokal, bukan hotlink. Foto referensi Unsplash digunakan dengan Unsplash License (https://unsplash.com/license):

- `hero.jpg`: https://images.unsplash.com/photo-1525310072745-f49212b5ac6d — foto suasana bunga.
- `buket.jpg`: https://images.unsplash.com/photo-1563241527-3004b7be0ffd — foto referensi buket.

Foto bukan dokumentasi produk toko. Bunga Papan dan Standing Flower menggunakan ilustrasi SVG placeholder yang dibuat untuk prototype, diberi label jujur; tidak digantikan dengan foto buket yang menyesatkan. Beberapa produk sengaja berbagi aset. Ganti `images[].src`/`alt` dan `cover` dengan foto klien berizin sebelum publikasi. Optimalkan ukuran, pertahankan rasio dan dimensi, serta jangan lazy-load hero. Gunakan alt deskriptif. Font memakai fallback lokal Georgia/system sans, sehingga tidak memerlukan layanan font eksternal.

## Hasil pemeriksaan aktual

- Kompilasi Tailwind lokal: berhasil; keluaran sekitar 16 KB. Ada peringatan database Browserslist usang, bukan kegagalan build.
- `npm run lint`: lulus sintaks JS, struktur delapan HTML, isi artikel, model/slug/harga fixture, serta keberadaan aset.
- `npm test`: lulus pada Chromium 156.0.8078.4 melalui server Python sementara: 50 rute valid/tidak valid; pencarian/filter/sort/pagination/Back/reset; arsip artikel; lightbox/Escape/fokus; pesan dan salin berhasil/gagal; fallback gambar.
- 88 pemeriksaan overflow halaman/menu/modal pada 360, 390, 768, 1440 px: lulus. Tidak ditemukan error HTTP/request/runtime tak terduga pada pengujian tersebut.
- Typecheck TypeScript tidak berlaku karena seluruh kode vanilla JavaScript.
- Lighthouse belum dijalankan; skor Performance 85 tidak diklaim.
- Instalasi npm melaporkan tujuh kerentanan dependensi alat pengembang (dua moderate, lima high). Tidak ada dependensi npm yang dimuat pengunjung; temuan ini tetap perlu ditinjau sebelum memperluas toolchain.

## Batasan dan tahap berikutnya

Belum ada nomor resmi, alamat, foto produk asli, integrasi API, pembayaran, atau deployment. Konfirmasi data nyata dengan klien sebelum publikasi dan hapus noindex hanya setelah konten siap. Pengujian otomatis tidak menggantikan persetujuan visual klien atau pengujian perangkat fisik.

Backlog CMS setelah prototype disetujui: login admin, CRUD produk/galeri/kategori, editor artikel dengan sanitasi, draft/publikasi, media library dan validasi unggahan, pengaturan Home/kontak, hak akses, backup. Tidak diimplementasikan pada tahap ini.
