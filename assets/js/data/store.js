export const typeLabels = {
  "bunga-papan": "Bunga Papan",
  "standing-flower": "Standing Flower",
  "hand-buket": "Hand Buket"
};

export const categoryLabels = {
  wedding: "Wedding",
  "duka-cita": "Duka Cita",
  sukses: "Sukses"
};

export const priceModeLabels = {
  fixed: "Harga tetap",
  "starting-from": "Mulai dari",
  contact: "Hubungi untuk harga"
};

export const articleCategoryLabels = {
  "tips-bunga": "Tips Bunga",
  "inspirasi-hadiah": "Inspirasi Hadiah",
  "panduan-memilih-bunga": "Panduan Memilih Bunga"
};

export const store = {
  name: "Zahraflorist",
  logo: "",
  whatsapp: "",
  address: "",
  businessHours: "",
  serviceAreas: [],
  socialLinks: {
    instagram: "",
    facebook: "",
    tiktok: ""
  },
  demoNotice: "Foto, produk, harga, dan artikel di situs ini masih berupa contoh untuk keperluan presentasi.",
  homeContent: {
    hero: {
      title: "Rangkaian bunga untuk setiap momen berarti.",
      description: "Zahraflorist merangkai bunga papan, standing flower, dan hand buket dengan sentuhan hangat untuk ucapan, perayaan, dan momen penuh makna.",
      primaryAction: { label: "Lihat Koleksi", target: "#koleksi" },
      secondaryAction: { label: "Hubungi Kami", target: "contact" }
    },
    collections: [
      {
        type: "bunga-papan",
        title: "Bunga Papan",
        description: "Ucapan selamat maupun dukacita dalam papan bunga yang rapi dan berkelas.",
        href: "bunga-papan.html",
        image: "assets/images/papan.svg"
      },
      {
        type: "standing-flower",
        title: "Standing Flower",
        description: "Rangkaian berdiri yang elegan untuk pelaminan, peresmian, dan ungkapan duka.",
        href: "standing-flower.html",
        image: "assets/images/standing.svg"
      },
      {
        type: "hand-buket",
        title: "Hand Buket",
        description: "Buket genggam yang hangat untuk hadiah personal dan momen spesial.",
        href: "hand-buket.html",
        image: "assets/images/buket.jpg"
      }
    ],
    about: {
      title: "Tentang Zahraflorist",
      body: "Zahraflorist adalah toko bunga yang merangkai bunga papan, standing flower, dan hand buket untuk berbagai kebutuhan. Setiap rangkaian dikerjakan dengan perhatian pada detail, pilihan bunga yang segar, dan komposisi warna yang selaras dengan suasana acara."
    },
    orderSteps: [
      {
        title: "Pilih rangkaian",
        description: "Telusuri katalog dan pilih produk yang sesuai dengan kebutuhan Anda."
      },
      {
        title: "Sampaikan kebutuhan",
        description: "Beri tahu tanggal, tujuan pengiriman, warna, dan ucapan yang diinginkan."
      },
      {
        title: "Konfirmasi bersama admin",
        description: "Admin membantu memastikan ketersediaan, harga, dan detail pengiriman."
      }
    ]
  }
};

export const whatsappTemplates = {
  product: "Halo Zahraflorist, saya tertarik dengan [nama produk] ([kode produk]). Mohon informasi harga dan ketersediaan untuk tanggal [tanggal], tujuan [lokasi], serta ucapan [ucapan]. Detail produk: [URL produk].",
  general: "Halo Zahraflorist, saya ingin menanyakan informasi produk dan ketersediaannya."
};

export default store;
