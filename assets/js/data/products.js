const specifications = [
  ["BP-001", "Papan Wedding Harmoni", "bunga-papan", "wedding", "Nuansa putih dan blush dengan ruang ucapan yang lapang untuk merayakan pernikahan.", "200 × 125 cm", "fixed", 650000, true],
  ["BP-002", "Papan Wedding Kasih", "bunga-papan", "wedding", "Komposisi merah muda lembut dengan aksen dedaunan untuk ucapan bahagia kepada pasangan.", "200 × 125 cm", "starting-from", 700000, true],
  ["BP-003", "Papan Wedding Seruni", "bunga-papan", "wedding", "Susunan bunga bernuansa krem dengan tulisan kontras yang mudah dibaca di area penerimaan.", "200 × 150 cm", "fixed", 800000, false],
  ["BP-004", "Papan Wedding Anggun", "bunga-papan", "wedding", "Bingkai bunga simetris berwarna putih dan ungu muda untuk perayaan yang tenang dan elegan.", "200 × 150 cm", "starting-from", 850000, false],
  ["BP-005", "Papan Wedding Istimewa", "bunga-papan", "wedding", "Konsep papan dengan hiasan bunga lebih penuh; komposisi dan ucapan disesuaikan bersama admin.", "250 × 150 cm", "contact", null, false],
  ["BP-006", "Papan Duka Damai", "bunga-papan", "duka-cita", "Palet putih dan hijau yang sederhana untuk menyampaikan belasungkawa dengan penuh hormat.", "200 × 125 cm", "fixed", 600000, true],
  ["BP-007", "Papan Duka Kenangan", "bunga-papan", "duka-cita", "Bingkai putih dengan aksen kuning lembut dan ruang nama pengirim yang jelas.", "200 × 125 cm", "starting-from", 650000, false],
  ["BP-008", "Papan Duka Hening", "bunga-papan", "duka-cita", "Rangkaian papan bersahaja dengan bunga bernuansa netral untuk ungkapan simpati.", "200 × 150 cm", "fixed", 750000, false],
  ["BP-009", "Papan Duka Penghormatan", "bunga-papan", "duka-cita", "Komposisi bunga putih yang lebih luas untuk penghormatan dari keluarga atau rekan kerja.", "250 × 150 cm", "contact", null, false],
  ["BP-010", "Papan Sukses Semangat", "bunga-papan", "sukses", "Warna kuning dan oranye yang cerah untuk menyambut pembukaan usaha atau pencapaian baru.", "200 × 125 cm", "fixed", 650000, true],
  ["BP-011", "Papan Sukses Gemilang", "bunga-papan", "sukses", "Bunga merah dan kuning membingkai ucapan selamat dengan komposisi tegas dan ceria.", "200 × 150 cm", "starting-from", 750000, false],
  ["BP-012", "Papan Sukses Cemerlang", "bunga-papan", "sukses", "Perpaduan warna hangat untuk peresmian kantor, toko, atau perayaan kerja sama.", "200 × 150 cm", "fixed", 850000, false],
  ["BP-013", "Papan Sukses Berkarya", "bunga-papan", "sukses", "Papan dengan aksen hijau dan putih untuk ucapan profesional yang tetap hangat.", "250 × 150 cm", "starting-from", 950000, false],
  ["BP-014", "Papan Sukses Perayaan", "bunga-papan", "sukses", "Rangkaian papan berukuran besar dengan pilihan warna yang dibahas sesuai identitas acara.", "300 × 150 cm", "contact", null, false],
  ["SF-001", "Standing Wedding Putih", "standing-flower", "wedding", "Rangkaian berdiri putih dan hijau untuk melengkapi area penyambutan pernikahan.", "Tinggi sekitar 160 cm", "fixed", 800000, true],
  ["SF-002", "Standing Wedding Blush", "standing-flower", "wedding", "Nuansa merah muda lembut dengan dedaunan ringan untuk suasana perayaan yang hangat.", "Tinggi sekitar 170 cm", "starting-from", 900000, false],
  ["SF-003", "Standing Wedding Pesona", "standing-flower", "wedding", "Komposisi krem dan putih dengan bentuk menjulang yang rapi untuk sudut acara.", "Tinggi sekitar 180 cm", "fixed", 1100000, false],
  ["SF-004", "Standing Wedding Megah", "standing-flower", "wedding", "Rangkaian berdiri berisi lebih penuh dengan palet warna yang dapat dikonsultasikan.", "Tinggi sekitar 190 cm", "contact", null, false],
  ["SF-005", "Standing Duka Teduh", "standing-flower", "duka-cita", "Bunga putih dengan aksen hijau untuk ungkapan belasungkawa yang tenang dan tulus.", "Tinggi sekitar 160 cm", "fixed", 750000, true],
  ["SF-006", "Standing Duka Tulus", "standing-flower", "duka-cita", "Susunan bunga netral dalam bentuk memanjang dengan kartu ucapan singkat.", "Tinggi sekitar 170 cm", "starting-from", 850000, false],
  ["SF-007", "Standing Duka Abadi", "standing-flower", "duka-cita", "Komposisi putih yang lebih penuh untuk penghormatan bersama dari keluarga atau organisasi.", "Tinggi sekitar 180 cm", "contact", null, false],
  ["SF-008", "Standing Sukses Ceria", "standing-flower", "sukses", "Warna kuning dan oranye dengan dedaunan hijau untuk ucapan pembukaan usaha.", "Tinggi sekitar 160 cm", "fixed", 800000, false],
  ["SF-009", "Standing Sukses Bersinar", "standing-flower", "sukses", "Rangkaian bernuansa merah dan kuning untuk merayakan pencapaian atau peresmian.", "Tinggi sekitar 175 cm", "starting-from", 950000, false],
  ["SF-010", "Standing Sukses Prestasi", "standing-flower", "sukses", "Komposisi bunga hangat yang seimbang untuk mengirimkan apresiasi profesional.", "Tinggi sekitar 180 cm", "fixed", 1150000, false],
  ["HB-001", "Buket Senja", "hand-buket", "", "Buket genggam bernuansa hangat dengan pembungkus sederhana untuk hadiah personal.", "Diameter sekitar 25 cm", "fixed", 250000, true],
  ["HB-002", "Buket Rona", "hand-buket", "", "Komposisi merah muda lembut untuk ucapan terima kasih atau perayaan kecil.", "Diameter sekitar 28 cm", "starting-from", 300000, true],
  ["HB-003", "Buket Embun", "hand-buket", "", "Bunga bernuansa putih dan hijau dengan bentuk ringkas untuk hadiah yang bersahaja.", "Diameter sekitar 25 cm", "fixed", 275000, false],
  ["HB-004", "Buket Mentari", "hand-buket", "", "Palet kuning cerah dan dedaunan segar untuk menyampaikan semangat pada hari istimewa.", "Diameter sekitar 30 cm", "starting-from", 350000, false],
  ["HB-005", "Buket Peluk", "hand-buket", "", "Buket berukuran sedang dalam warna pastel untuk wisuda, ulang tahun, atau apresiasi.", "Diameter sekitar 32 cm", "fixed", 425000, false],
  ["HB-006", "Buket Cerita", "hand-buket", "", "Buket personal dengan palet dan komposisi yang dibicarakan sesuai kebutuhan penerima.", "Disesuaikan bersama admin", "contact", null, false]
];

const imageSets = {
  "bunga-papan": ["assets/images/papan.svg", "assets/images/papan-detail.svg"],
  "standing-flower": ["assets/images/standing.svg", "assets/images/standing-detail.svg"],
  "hand-buket": ["assets/images/buket.jpg"]
};

export const products = specifications.map(([code, name, type, category, description, size, priceMode, price, featured], index) => ({
  id: `product-${String(index + 1).padStart(3, "0")}`,
  code,
  name,
  slug: name.toLowerCase().replaceAll(" ", "-"),
  type,
  category,
  description: `${description} Produk, ukuran, dan harga merupakan contoh presentasi. ${type === "hand-buket" ? "Foto buket merupakan referensi demo, bukan dokumentasi produk ini." : "Gambar merupakan ilustrasi placeholder, bukan foto produk asli."} Jenis bunga, warna, ucapan, tanggal kebutuhan, serta tujuan pengiriman dikonfirmasi bersama admin.`,
  size,
  priceMode,
  price,
  images: imageSets[type].slice(0, featured ? 2 : 1).map((src, imageIndex) => ({
    src,
    alt: type === "hand-buket"
      ? `Foto referensi buket untuk ${name}; bukan dokumentasi produk asli`
      : `${imageIndex ? "Detail ilustrasi" : "Ilustrasi placeholder"} ${name}; bukan foto produk asli`
  })),
  featured,
  sortOrder: index + 1,
  status: "published"
}));

export function getProducts() {
  return products.filter(product => product.status === "published").sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProduct(slug) {
  return products.find(product => product.status === "published" && product.slug === slug);
}
