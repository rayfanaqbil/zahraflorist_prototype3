# PRD Prototype Zahraflorist dengan HTML dan Tailwind CSS

## 1. Instruksi untuk OpenCode

Bangun prototype website Zahraflorist berdasarkan dokumen ini. Kerjakan implementasinya sampai dapat dijalankan dan seluruh alur utama berfungsi. Jangan berhenti hanya pada rencana, wireframe, atau penjelasan kode.

Mulai dengan memeriksa repository, struktur proyek, instruksi AGENTS.md jika tersedia, aset, dan script yang sudah ada. Pertahankan pekerjaan pengguna. Jangan menimpa file atau konfigurasi yang tidak terkait.

**Stack wajib: HTML5 dan Tailwind CSS.** Gunakan JavaScript biasa (vanilla JavaScript) secukupnya untuk dropdown, menu mobile, pencarian, filter, pagination, galeri, dan pratinjau WhatsApp. JavaScript hanya mendukung interaksi; struktur halaman tetap berupa file HTML.

Jangan gunakan React, Next.js, Vue, Angular, TypeScript, Vite, Bootstrap, atau framework aplikasi lainnya. Tidak perlu backend, database, maupun SPA router. Jika repository berisi aplikasi lain, tempatkan prototype statis dalam folder terpisah agar pekerjaan lama tetap aman.

Gunakan Tailwind CSS untuk styling utama. CSS tambahan hanya untuk kebutuhan kecil seperti font, animasi, atau gaya isi artikel. Siapkan stylesheet Tailwind hasil kompilasi lokal di `assets/css/tailwind.css`, sehingga pengguna akhir dapat menjalankan hasil prototype tanpa npm atau proses build. Tailwind CLI boleh digunakan hanya sebagai alat pembuat CSS; tidak perlu bundler aplikasi. Sertakan sumber CSS dan instruksi kompilasi ulang untuk pengembang. Pastikan utility class dalam file HTML dan JavaScript ikut terdeteksi; gunakan nama kelas lengkap, bukan rangkaian nama dinamis yang hilang saat kompilasi.

Jalankan preview melalui server file statis sederhana dan dokumentasikan caranya. Server ini hanya menyajikan file; bukan backend aplikasi. Navigasi menggunakan file HTML dan query parameter agar tidak membutuhkan rewrite URL.

Sampaikan rencana singkat, lalu implementasikan secara bertahap sampai selesai. Ambil keputusan desain yang wajar tanpa meminta konfirmasi untuk detail kecil. Ajukan pertanyaan hanya bila ada hambatan yang benar-benar menghalangi pengerjaan. Jangan mengklaim perintah atau pengujian berhasil jika belum dijalankan.

## 2. Konteks Produk

- Nama merek: **Zahraflorist**. Gunakan ejaan ini di seluruh website dan metadata.
- Jenis usaha: toko bunga dengan produk Bunga Papan, Standing Flower, dan Hand Buket.
- Target tahap ini: prototype interaktif untuk dipresentasikan kepada klien.
- Arah tampilan: modern, simpel, elegan, hangat, dan nyaman digunakan melalui ponsel.
- Bahasa antarmuka: Bahasa Indonesia.
- Pengembangan berikutnya: CMS agar klien dapat mengisi produk, mengunggah foto, mengubah informasi toko, dan menulis artikel sendiri.
- Usulan alur pemesanan: pengunjung memilih produk kemudian menghubungi toko melalui WhatsApp.

Keberhasilan prototype ditentukan oleh kualitas visual, kemudahan menemukan produk, kejelasan informasi, dan kelengkapan interaksi. Website harus terasa seperti katalog florist yang siap dipresentasikan, dengan konten contoh yang konsisten.

## 3. Batas Lingkup

### Wajib dibuat sekarang

1. Home.
2. Katalog Bunga Papan beserta tiga kategori.
3. Katalog Standing Flower beserta tiga kategori.
4. Katalog Hand Buket.
5. Halaman detail produk.
6. Daftar artikel dengan pola blog seperti Blogspot.
7. Halaman detail artikel.
8. Pencarian, filter, pengurutan produk, pagination, galeri, serta navigasi responsif.
9. Pratinjau pesan WhatsApp untuk produk yang dipilih.
10. Tampilan saat hasil kosong, gambar gagal dimuat, dan rute tidak ditemukan.

### Belum dibuat pada tahap ini

- Dashboard CMS, login admin, dan editor konten.
- Backend, API produksi, database, serta penyimpanan unggahan.
- Akun pelanggan, keranjang, checkout, pembayaran, dan pelacakan pesanan.
- Integrasi platform Blogger atau migrasi posting Blogspot.
- Komentar artikel, newsletter, dan layanan email.
- Deployment publik, pembelian domain, atau layanan berbayar.

Persiapkan struktur data dan komponen agar mudah dihubungkan ke CMS nanti. Jangan membangun CMS hanya karena disebut dalam rencana lanjutan.

## 4. Struktur Navigasi dan Rute

Gunakan tepat lima menu utama berikut. Menu kontak atau tentang tidak perlu ditambahkan pada navigasi utama; informasinya dapat muncul di Home dan footer.

| Menu | Submenu | Rute |
| --- | --- | --- |
| Home | — | `index.html` |
| Bunga Papan | Semua Bunga Papan | `bunga-papan.html` |
| Bunga Papan | Bunga Papan Wedding | `bunga-papan.html?kategori=wedding` |
| Bunga Papan | Bunga Papan Duka Cita | `bunga-papan.html?kategori=duka-cita` |
| Bunga Papan | Bunga Papan Sukses | `bunga-papan.html?kategori=sukses` |
| Standing Flower | Semua Standing Flower | `standing-flower.html` |
| Standing Flower | Standing Flower Wedding | `standing-flower.html?kategori=wedding` |
| Standing Flower | Standing Flower Duka Cita | `standing-flower.html?kategori=duka-cita` |
| Standing Flower | Standing Flower Sukses | `standing-flower.html?kategori=sukses` |
| Hand Buket | — | `hand-buket.html` |
| Artikel | — | `artikel.html` |
| Detail produk | Diakses dari kartu produk | `produk.html?slug=:slug` |
| Detail artikel | Diakses dari daftar artikel | `artikel-detail.html?slug=:slug` |

Gunakan tautan relatif antarfile HTML dan URLSearchParams untuk membaca query. Parameter `kategori`, `q`, `urut`, `page`, dan `arsip` dipakai sesuai halaman. Nilai `:slug` pada tabel diganti dengan slug produk atau artikel yang dipilih. Setiap URL harus dapat dibuka langsung melalui server statis.

Navigasi desktop memakai dropdown yang dapat dibuka dengan klik dan keyboard. Pada mobile, gunakan menu dengan submenu accordion. Logo selalu mengarah ke Home. Status halaman aktif harus terlihat. Perpindahan halaman menutup menu mobile.

## 5. Arahan Visual

### Identitas tampilan

Bangun kesan butik florist modern. Gunakan foto bunga yang kuat, tata letak lapang, komposisi teks yang rapi, dan detail visual yang tenang. Hindari tampilan dashboard, dekorasi berlebihan, gradien mencolok, terlalu banyak badge, dan carousel otomatis.

| Elemen | Arahan |
| --- | --- |
| Latar utama | Ivory `#FAF7F2` |
| Teks utama | Hijau sangat gelap `#26372D` |
| Tombol utama | Hijau `#315746` dengan teks terang |
| Aksen lembut | Blush `#EEDDD7` |
| Judul | Serif elegan yang tetap mudah dibaca |
| Isi dan navigasi | Sans serif bersih; maksimal dua keluarga font |
| Bentuk | Sudut sedikit membulat, border tipis, bayangan halus |
| Lebar konten | Sekitar 1200 px pada desktop |
| Foto produk | Frame konsisten; produk tidak terpotong secara merusak |

Warna ini adalah titik awal; koreksi jika kontras tidak memadai. Jangan menggunakan warna aksen lembut untuk teks kecil. Sediakan fallback font agar tampilan tetap layak tanpa font eksternal.

### Responsivitas

- Desktop: ruang antarbagian luas dan katalog empat kolom.
- Tablet: katalog dua atau tiga kolom sesuai ruang tersedia.
- Mobile: katalog dua kolom jika informasi masih terbaca; turun ke satu kolom bila diperlukan.
- Artikel pada mobile menggunakan satu kolom yang nyaman dibaca.
- Teks isi minimal 16 px; target sentuh sekitar 44 × 44 px.
- Gunakan transisi singkat dan dukung preferensi reduced motion.
- Tombol mengambang tidak boleh menutupi konten atau kontrol lain.

## 6. Spesifikasi Home

Susun bagian berikut secara berurutan:

1. **Header** — wordmark/logo Zahraflorist, lima menu utama, serta tombol Hubungi Kami.
2. **Hero** — foto rangkaian bunga sebagai fokus, judul singkat, deskripsi, dan dua aksi.
   - Contoh judul: “Rangkaian bunga untuk setiap momen berarti.”
   - Aksi utama: “Lihat Koleksi”, menuju bagian pilihan koleksi.
   - Aksi sekunder: “Hubungi Kami”, membuka alur kontak.
   - Buat komposisi desktop dan mobile secara sengaja; jangan hanya mengecilkan layout desktop.
3. **Pilihan koleksi** — tiga kartu visual untuk Bunga Papan, Standing Flower, dan Hand Buket.
4. **Produk pilihan** — enam sampai delapan produk lintas jenis dengan foto, nama, kategori, dan harga contoh.
5. **Tentang Zahraflorist** — pengenalan singkat dengan teks contoh yang netral.
6. **Cara pesan** — pilih rangkaian, sampaikan kebutuhan, lalu konfirmasi bersama admin.
7. **Artikel terbaru** — tiga artikel dengan sampul, judul, ringkasan, serta tautan baca.
8. **Footer** — wordmark, navigasi ringkas, serta informasi kontak yang tersedia.

Logo resmi belum tersedia: buat wordmark tipografi sederhana. Jangan membuat klaim jumlah pelanggan, rating, testimoni, pengiriman instan, toko 24 jam, atau cakupan kota tertentu tanpa data klien.

## 7. Spesifikasi Katalog

Gunakan tiga file HTML katalog dengan struktur yang konsisten dan fungsi vanilla JavaScript bersama. Tentukan jenis dari atribut halaman dan kategori dari query URL.

### Komponen

- Breadcrumb, judul halaman, dan pengantar pendek.
- Input pencarian nama produk dengan label yang jelas.
- Filter Semua, Wedding, Duka Cita, dan Sukses untuk Bunga Papan serta Standing Flower.
- Hand Buket tidak memerlukan kategori tambahan pada tahap ini.
- Pengurutan: Pilihan Toko, Harga Terendah, dan Harga Tertinggi.
- Jumlah hasil dan tombol Atur Ulang Filter.
- Grid kartu dan pagination 12 produk per halaman.

### Perilaku

- Pencarian dan filter bekerja bersama, bukan sekadar elemen dekoratif.
- Perubahan pencarian/filter mengembalikan pagination ke halaman pertama.
- Simpan pencarian, kategori, urutan, dan halaman di query URL agar tombol Back mengembalikan konteks sebelumnya. Jika memakai History API untuk memperbarui URL tanpa reload, tangani popstate dan render ulang state dari URL.
- Produk dengan mode harga hubungi ditempatkan terakhir saat pengurutan harga.
- Untuk mode mulai dari, pengurutan memakai nilai harga awal yang disimpan.
- Kartu produk mengarah ke detail produk yang benar.
- Gunakan format harga Indonesia, misalnya `Rp450.000`.
- Mode harga: harga tetap, mulai dari, atau Hubungi untuk harga.

Saat hasil kosong, tampilkan pesan “Tidak ada produk yang cocok” dan tombol untuk menghapus filter. Jangan mengganti hasil kosong dengan produk yang tidak sesuai.

## 8. Spesifikasi Detail Produk

Halaman detail memuat:

- Breadcrumb dan akses kembali ke koleksi.
- Foto utama serta thumbnail galeri.
- Galeri yang bisa diperbesar melalui modal/lightbox sederhana.
- Nama dan kode produk.
- Jenis, kategori, deskripsi, dan ukuran bila tersedia.
- Informasi harga sesuai mode harga.
- Penjelasan bahwa ucapan, tanggal kebutuhan, warna, dan tujuan pengiriman dikonfirmasi bersama admin.
- Tombol Pesan via WhatsApp.
- Maksimal empat produk terkait; utamakan kategori yang sama kemudian jenis yang sama, tanpa menampilkan produk yang sedang dibuka.

Modal dapat ditutup dengan tombol, klik backdrop, dan Escape. Kelola fokus saat modal dibuka dan kembalikan fokus saat ditutup. Slug produk tidak valid harus menghasilkan halaman tidak ditemukan.

## 9. Kontak dan WhatsApp

Simpan nomor WhatsApp dalam konfigurasi toko, bukan tersebar di komponen. Nilai awal kosong karena nomor resmi belum diberikan.

Jika nomor kosong, tombol Hubungi Kami atau Pesan via WhatsApp membuka dialog pratinjau dengan keterangan “Demo pemesanan — nomor WhatsApp toko belum diatur”. Dialog menunjukkan pesan dan menyediakan tombol Salin Pesan. Tampilkan status berhasil/gagal setelah penyalinan. Jangan membuka nomor dummy atau mengirim pesan otomatis.

Jika nomor resmi sudah diisi dalam format internasional yang valid, tombol dapat membuka WhatsApp dengan pesan yang di-encode dengan benar. Pengguna tetap mengirim pesan sendiri di WhatsApp.

Template pesan produk:

> Halo Zahraflorist, saya tertarik dengan [nama produk] ([kode produk]). Mohon informasi harga dan ketersediaan untuk tanggal [tanggal], tujuan [lokasi], serta ucapan [ucapan]. Detail produk: [URL produk].

Kontak umum memakai pesan umum tanpa nama produk. Konfigurasi kontak/alamat/media sosial yang belum tersedia tidak boleh menghasilkan tautan rusak, nomor acak, atau alamat fiktif yang terkesan resmi.

## 10. Artikel Bergaya Blogspot

Pola Blogspot berarti pengalaman blog dengan daftar tulisan, kategori, arsip, sidebar, dan halaman baca lengkap. Ini bukan permintaan integrasi Blogger dan tidak harus meniru tampilan lama Blogspot.

### Daftar artikel

- Artikel diurutkan berdasarkan tanggal terbit terbaru.
- Setiap item menampilkan sampul, judul, tanggal, kategori, ringkasan, dan Baca Selengkapnya.
- Desktop: daftar posting di kolom utama dan sidebar di samping.
- Sidebar: pencarian, kategori, arsip bulan/tahun, serta artikel terbaru.
- Mobile: pencarian dan filter di atas daftar; sidebar lainnya di bawah.
- Pagination enam artikel per halaman.
- Pencarian berdasarkan judul dan ringkasan.
- Pencarian, kategori, serta arsip dapat digabungkan dan di-reset.
- Filter dan pagination dipertahankan melalui query URL.
- Arsip dihitung dari tanggal terbit dalam data, bukan daftar statis yang tidak berfungsi.

### Detail artikel

- Judul, sampul, tanggal, penulis, kategori, dan isi lengkap.
- Isi mendukung heading, paragraf, daftar, gambar, serta tautan.
- Lebar teks desktop sekitar 65–75 karakter per baris.
- Artikel terkait dari kategori sama; gunakan artikel terbaru sebagai fallback dan kecualikan artikel yang sedang dibaca.
- Tautan ke koleksi relevan jika sesuai isi.
- Tombol kembali ke daftar artikel.

Kategori contoh: Tips Bunga, Inspirasi Hadiah, dan Panduan Memilih Bunga. Siapkan minimal delapan artikel dengan isi utuh yang ringkas, tersebar di tiga kategori dan minimal dua bulan arsip. Hindari lorem ipsum dan tanggal terbit masa depan. Jangan membuat tombol komentar, newsletter, atau bagikan yang tidak berfungsi.

## 11. Data Contoh dan Aset

Siapkan minimal 30 produk contoh:

- 14 Bunga Papan.
- 10 Standing Flower.
- 6 Hand Buket.
- Setiap subkategori Wedding, Duka Cita, dan Sukses memiliki minimal dua produk pada jenis terkait.
- Setidaknya beberapa produk mempunyai dua foto galeri.
- Sertakan ketiga mode harga untuk menguji tampilannya.

Gunakan nama produk, harga, dan deskripsi yang masuk akal sebagai data demo. Tampilkan pemberitahuan ringkas bahwa foto, produk, harga, dan artikel masih berupa contoh untuk presentasi.

Utamakan aset yang sudah tersedia di repository. Jika mengambil aset tambahan, gunakan sumber dengan izin penggunaan yang sesuai dan catat sumbernya. Foto harus sesuai jenis produk: Bunga Papan jangan diwakili hand buket. Hindari hotlink yang tidak stabil. Bila tidak tersedia foto yang cocok, gunakan placeholder rapi yang jujur; jangan memasukkan foto yang menyesatkan.

Optimalkan ukuran gambar, tetapkan dimensi untuk menjaga layout, dan gunakan lazy loading untuk gambar di bawah area awal. Jangan lazy-load foto hero utama. Sediakan fallback gambar yang tidak menyebabkan error berulang.

## 12. Struktur agar Siap CMS

Pisahkan file HTML, stylesheet, data contoh, logika interaksi, fungsi render DOM, dan konfigurasi toko. Simpan produk serta artikel dalam file JavaScript data; kartu dan detail mengambil record yang sama. Dokumentasikan bentuk objek melalui komentar atau JSDoc, tanpa TypeScript. HTML memuat struktur semantik halaman; JavaScript mengisi bagian yang berbasis data.

Struktur proyek yang disarankan:

```text
index.html
bunga-papan.html
standing-flower.html
hand-buket.html
produk.html
artikel.html
artikel-detail.html
404.html
assets/
  css/
    input.css
    tailwind.css
    custom.css
  js/
    data/
      products.js
      articles.js
      store.js
    shared.js
    home.js
    catalog.js
    product-detail.js
    articles.js
    article-detail.js
  images/
README.md
```

File konfigurasi atau package manifest boleh ditambahkan hanya jika diperlukan untuk kompilasi Tailwind. JavaScript boleh memakai ES modules yang dilayani server statis. Jangan memerlukan fetch ke API eksternal untuk data demo. Header/footer harus konsisten antarfile; gunakan markup yang sama atau fungsi DOM sederhana, tanpa sistem komponen framework.

### Model data minimum

| Entitas | Field |
| --- | --- |
| Product | id, code, name, slug, type, category, description, size, priceMode, price, images, featured, sortOrder, status |
| ProductImage | src, alt |
| Article | id, title, slug, excerpt, content, cover, category, author, publishedAt, status, metaTitle, metaDescription |
| StoreSettings | name, logo, whatsapp, address, businessHours, serviceAreas, socialLinks, homeContent |

Aturan data:

- Product.type: bunga-papan, standing-flower, atau hand-buket.
- Product.category: wedding, duka-cita, sukses; boleh kosong untuk hand-buket.
- priceMode: fixed, starting-from, atau contact.
- price wajib bernilai angka nonnegatif untuk fixed dan starting-from; kosong untuk contact.
- status: draft, published, atau archived. Halaman publik hanya menampilkan published.
- Slug unik pada masing-masing entitas.
- Kartu dan detail selalu mengambil record yang sama.

Gunakan fungsi akses data sederhana sebagai titik penggantian ke API nanti. Tidak perlu membuat service backend, sistem plugin, autentikasi, atau abstraksi rumit untuk prototype.

### Backlog CMS setelah prototype disetujui

Login admin; pengelolaan produk dan galeri; kategori; editor artikel; draft dan publikasi; media library; pengaturan Home; kontak toko; validasi unggahan; hak akses; backup. Catat sebagai pekerjaan lanjutan, jangan implementasikan sekarang.

## 13. Kualitas Teknis

- Semua file HTML beserta query parameter dapat dibuka langsung dan di-refresh melalui server statis tanpa rewrite. Produk/artikel dengan slug salah menampilkan kondisi tidak ditemukan. Sediakan 404.html; dokumentasikan bahwa pemakaiannya untuk file yang tidak ada bergantung pada konfigurasi hosting.
- Atur judul dokumen per halaman, deskripsi, dan satu H1 utama.
- Tandai prototype noindex agar konten demo tidak ditujukan untuk pengindeksan publik.
- Tidak ada horizontal overflow pada lebar 360, 390, 768, dan 1440 px.
- Kontrol memiliki label, fokus keyboard terlihat, dan gambar mempunyai alt text sesuai konteks.
- Gunakan elemen button untuk aksi dan link untuk navigasi.
- Tidak ada tombol utama yang hanya dekoratif, tautan `#` tanpa tujuan, atau error console yang belum ditangani.
- Hindari dependensi besar untuk fungsi yang bisa diselesaikan secara sederhana.
- Verifikasi struktur HTML, sintaks JavaScript, keberhasilan kompilasi Tailwind, pemuatan aset, dan tautan antarhalaman. Jalankan lint bila tersedia; tidak perlu typecheck TypeScript atau build framework. Jangan menonaktifkan aturan pemeriksaan hanya untuk membuatnya lulus.
- Sasaran performa: Lighthouse mobile Performance minimal 85 apabila alatnya tersedia; catat kondisi pengujian dan hasil sebenarnya. Ini target, bukan angka untuk diklaim tanpa pengukuran.

## 14. Tahapan Implementasi

Jalankan tahapan berikut dalam satu rangkaian pekerjaan. Tidak perlu menunggu persetujuan pada setiap tahap kecuali ada hambatan atau perubahan lingkup yang signifikan.

1. **Pemeriksaan proyek** — identifikasi stack, instruksi repository, aset, script, serta perubahan lokal yang harus dipertahankan.
2. **Fondasi visual** — token warna/spacing Tailwind, tipografi, file HTML, header, footer, tombol, kartu, tautan antarhalaman, dan data contoh.
3. **Home** — selesaikan komposisi desktop dan mobile beserta navigasi ke koleksi.
4. **Katalog dan detail** — kategori, pencarian, urutan, pagination, galeri, produk terkait, dan alur kontak.
5. **Artikel** — daftar, sidebar, pencarian, kategori, arsip, pagination, dan halaman baca.
6. **Penyempurnaan** — kondisi kosong, 404, gambar gagal, keyboard, responsivitas, serta konsistensi konten.
7. **Verifikasi dan serah terima** — jalankan pemeriksaan yang tersedia, perbaiki temuan, lalu dokumentasikan cara menjalankan proyek.

## 15. Kriteria Selesai

| ID | Pemeriksaan | Hasil yang diwajibkan |
| --- | --- | --- |
| AC01 | Navigasi | Lima menu utama dan enam submenu menuju halaman yang benar. |
| AC02 | Katalog | Pencarian, kategori, pengurutan, reset, serta pagination bekerja dengan data nyata dari fixture. |
| AC03 | Detail produk | Kartu dan detail konsisten; galeri dan produk terkait dapat digunakan. |
| AC04 | WhatsApp | Pratinjau sesuai produk; nomor kosong tidak membuka kontak acak; salin pesan memberi umpan balik. |
| AC05 | Artikel | Delapan artikel dapat dibaca; kategori, pencarian, arsip, dan pagination berfungsi. |
| AC06 | Mobile | Tidak ada elemen terpotong atau gulir horizontal pada ukuran pemeriksaan. |
| AC07 | Aksesibilitas | Menu, filter, dan modal dapat dioperasikan dengan keyboard; fokus tetap jelas. |
| AC08 | Kondisi khusus | Hasil kosong, gambar gagal, slug salah, dan rute tidak ditemukan ditangani. |
| AC09 | Kesiapan CMS | Data dan konfigurasi terpisah dari komponen; belum ada backend atau admin di luar lingkup. |
| AC10 | File statis | HTML, CSS Tailwind lokal, dan vanilla JavaScript berjalan melalui server statis; kompilasi CSS berhasil dan tidak ada ketergantungan framework aplikasi. |
| AC11 | Presentasi | Konten Bahasa Indonesia konsisten, foto relevan, penanda demo terlihat, dan aksi utama berfungsi. |

Lakukan pemeriksaan visual di browser bila tersedia. Uji secara manual alur Home → kategori → produk → pesan serta Artikel → filter → detail → kembali. Periksa tombol Back dan pembukaan URL langsung. Gunakan pengujian otomatis seperlunya untuk logika yang berisiko, bukan menambahkan suite besar yang hanya meniru implementasi.

## 16. Hasil yang Harus Diserahkan OpenCode

1. Kode prototype yang telah diimplementasikan di repository.
2. README dengan cara menjalankan server statis, perintah kompilasi ulang Tailwind untuk pengembang, lokasi konfigurasi toko, data contoh, dan penggantian foto. Sertakan CSS hasil kompilasi agar preview tidak memerlukan instalasi dependensi.
3. Catatan sumber aset bila memakai aset tambahan.
4. Ringkasan halaman dan fitur yang selesai.
5. Daftar pemeriksaan yang benar-benar dijalankan beserta hasilnya.
6. Keterbatasan tersisa dan backlog CMS, bila ada.

Jangan menyatakan prototype selesai jika yang tersedia baru Home, tombol belum berfungsi, atau halaman detail masih kosong. Jika alat tertentu tidak tersedia, jelaskan keterbatasan verifikasinya secara spesifik tanpa mengada-adakan hasil.
