const articleData = [
  {
    title: "Memilih Bunga Papan yang Tepat untuk Setiap Acara",
    category: "panduan-memilih-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-08-04",
    excerpt: "Panduan singkat menentukan warna, ukuran, dan ucapan bunga papan agar sesuai dengan suasana acara.",
    cover: "assets/images/papan.svg",
    content: `<h2>Menyesuaikan Papan dengan Acara</h2><p>Bunga papan menyampaikan pesan sebelum kata-kata terbaca. Memilih warna dan ukuran yang tepat membuat ucapan Anda terasa pas dengan suasana acara, baik perayaan maupun belasungkawa.</p><h3>Perhatikan Hal Berikut</h3><ul><li>Warna cerah untuk perayaan, warna netral untuk dukacita.</li><li>Ukuran papan menyesuaikan luas area penerimaan.</li><li>Teks ucapan singkat agar mudah dibaca dari kejauhan.</li></ul><p>Setelah menentukan konsep, tim kami membantu menyelaraskan detail akhir bersama Anda.</p><p>Lihat pilihan lengkap pada <a href="bunga-papan.html">koleksi Bunga Papan</a>.</p>`
  },
  {
    title: "Arti Warna Bunga dalam Ucapan Selamat",
    category: "tips-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-08-12",
    excerpt: "Warna bunga membawa pesan tersendiri. Kenali maknanya agar ucapan selamat terasa lebih bermakna.",
    cover: "assets/images/standing.svg",
    content: `<h2>Warna Membawa Pesan</h2><p>Setiap warna bunga memiliki kesan yang berbeda. Memahami maknanya membantu Anda memilih rangkaian yang selaras dengan perasaan yang ingin disampaikan.</p><h3>Panduan Warna</h3><ul><li>Kuning dan oranye untuk semangat dan kebahagiaan.</li><li>Merah muda untuk kehangatan dan apresiasi.</li><li>Putih untuk ketulusan dan ketenangan.</li></ul><p>Kombinasi warna yang tepat membuat ucapan selamat terasa personal.</p><p>Temukan rangkaian berdiri di <a href="standing-flower.html">koleksi Standing Flower</a>.</p>`
  },
  {
    title: "Tiga Ide Hadiah Bunga untuk Orang Terdekat",
    category: "inspirasi-hadiah",
    author: "Tim Zahraflorist",
    publishedAt: "2026-08-19",
    excerpt: "Dari wisuda hingga ulang tahun, berikut ide hand buket yang cocok untuk menyenangkan orang terdekat.",
    cover: "assets/images/buket.jpg",
    content: `<h2>Hadiah yang Menghangatkan</h2><p>Buket bunga adalah hadiah yang sederhana namun berkesan. Memilih buket sesuai momen membuat perhatian Anda terasa lebih tulus.</p><h3>Ide Berdasarkan Momen</h3><ul><li>Wisuda: buket cerah dengan nuansa kuning.</li><li>Ulang tahun: buket pastel yang lembut.</li><li>Ucapan terima kasih: buket putih yang bersahaja.</li></ul><p>Setiap buket dapat disesuaikan dengan warna favorit penerima.</p><p>Pilih buket favorit Anda di <a href="hand-buket.html">koleksi Hand Buket</a>.</p>`
  },
  {
    title: "Merawat Bunga Potong agar Tahan Lebih Lama",
    category: "tips-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-08-27",
    excerpt: "Beberapa langkah sederhana membantu bunga potong tetap segar dan indah lebih lama di rumah.",
    cover: "assets/images/standing.svg",
    content: `<h2>Menjaga Kesegaran Bunga</h2><p>Bunga potong tetap cantik lebih lama bila dirawat dengan benar. Perawatan ini mudah dilakukan di rumah tanpa alat khusus.</p><h3>Langkah Perawatan</h3><ul><li>Ganti air vas setiap dua hari sekali.</li><li>Potong ujung batang secara miring sebelum ditata.</li><li>Jauhkan dari sinar matahari langsung dan buah matang.</li></ul><p>Perawatan rutin membuat rangkaian bunga bertahan beberapa hari lebih lama.</p><p>Butuh rangkaian baru? Kunjungi <a href="hand-buket.html">koleksi Hand Buket</a>.</p>`
  },
  {
    title: "Etika Mengirim Bunga Dukacita",
    category: "panduan-memilih-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-09-03",
    excerpt: "Mengirim bunga dukacita memerlukan kepekaan. Berikut hal yang perlu diperhatikan agar tetap sopan.",
    cover: "assets/images/papan.svg",
    content: `<h2>Menyampaikan Belasungkawa</h2><p>Bunga dukacita menyampaikan simpati dengan cara yang lembut. Memilih rangkaian yang tepat menunjukkan rasa hormat kepada keluarga yang berduka.</p><h3>Yang Perlu Diperhatikan</h3><ul><li>Pilih warna netral seperti putih dan hijau.</li><li>Tulis ucapan yang singkat dan menenangkan.</li><li>Pastikan nama pengirim tercantum dengan jelas.</li></ul><p>Konfirmasikan waktu penerimaan dan alamat bersama admin sebelum menyepakati pengiriman.</p><p>Lihat pilihan pada <a href="bunga-papan.html?kategori=duka-cita">Bunga Papan Duka Cita</a>.</p>`
  },
  {
    title: "Inspirasi Dekorasi Bunga untuk Pernikahan",
    category: "inspirasi-hadiah",
    author: "Tim Zahraflorist",
    publishedAt: "2026-09-11",
    excerpt: "Standing flower dan bunga papan dapat mempercantik area pelaminan serta penyambutan tamu.",
    cover: "assets/images/standing.svg",
    content: `<h2>Mempercantik Hari Bahagia</h2><p>Dekorasi bunga menambah kesan hangat pada pernikahan. Perpaduan standing flower dan bunga papan menciptakan suasana yang berkesan bagi tamu.</p><h3>Ide Penempatan</h3><ul><li>Standing flower di sisi pelaminan.</li><li>Bunga papan ucapan di area penyambutan.</li><li>Buket kecil untuk meja tamu penting.</li></ul><p>Komposisi warna disesuaikan dengan tema acara Anda.</p><p>Mulai dari <a href="standing-flower.html?kategori=wedding">Standing Flower Wedding</a>.</p>`
  },
  {
    title: "Memahami Ukuran Standing Flower",
    category: "panduan-memilih-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-09-18",
    excerpt: "Ukuran standing flower memengaruhi kesan dan kebutuhan ruang. Kenali agar pilihan Anda lebih tepat.",
    cover: "assets/images/standing.svg",
    content: `<h2>Memilih Ukuran yang Pas</h2><p>Standing flower hadir dalam beberapa ukuran. Menyesuaikan tinggi rangkaian dengan ruang acara membuat tampilannya lebih seimbang.</p><h3>Panduan Umum</h3><ul><li>Ukuran sedang untuk ruang indoor yang terbatas.</li><li>Ukuran tinggi untuk area outdoor atau aula luas.</li><li>Perhatikan jalur lalu lintas tamu di sekitar rangkaian.</li></ul><p>Tim kami membantu merekomendasikan ukuran sesuai lokasi Anda.</p><p>Jelajahi <a href="standing-flower.html">koleksi Standing Flower</a>.</p>`
  },
  {
    title: "Tips Menulis Kartu Ucapan Bunga",
    category: "tips-bunga",
    author: "Tim Zahraflorist",
    publishedAt: "2026-09-25",
    excerpt: "Ucapan yang singkat dan tulus membuat rangkaian bunga terasa lebih personal dan berkesan.",
    cover: "assets/images/buket.jpg",
    content: `<h2>Pesan yang Berkesan</h2><p>Kartu ucapan melengkapi rangkaian bunga dengan sentuhan personal. Pesan yang singkat namun tulus sering kali paling diingat penerima.</p><h3>Cara Menulisnya</h3><ul><li>Sebutkan nama penerima agar terasa personal.</li><li>Gunakan kalimat singkat dan jujur.</li><li>Tutup dengan nama pengirim yang jelas.</li></ul><p>Anda dapat menyampaikan isi ucapan saat konfirmasi pesanan bersama admin.</p><p>Pilih rangkaian di <a href="hand-buket.html">koleksi Hand Buket</a>.</p>`
  }
];

export const articles = articleData.map((article, index) => ({
  id: `article-${String(index + 1).padStart(3, "0")}`,
  title: article.title,
  slug: article.title.toLowerCase().replaceAll(" ", "-"),
  excerpt: article.excerpt,
  content: article.content,
  cover: article.cover,
  category: article.category,
  author: article.author,
  publishedAt: article.publishedAt,
  status: "published",
  metaTitle: `${article.title} — Zahraflorist`,
  metaDescription: article.excerpt
}));

export function getArticles() {
  return articles
    .filter(article => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getArticle(slug) {
  return articles.find(article => article.status === "published" && article.slug === slug);
}
