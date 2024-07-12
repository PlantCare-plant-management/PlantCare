if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { MongoClient, ObjectId } = require("mongodb");

const connectionString = process.env.MONGO_URI;

if (!connectionString) {
  throw new Error("Connection string not found");
}

let client;

const getMongoClientInstance = async () => {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }

  return client;
};

const getDb = async () => {
  const client = await getMongoClientInstance();
  const db = client.db("casemov");
  return db;
};

const seedProducts = async () => {
  const db = await getDb();
  const collection = db.collection("products");

  const products = [
    {
      _id: new ObjectId(),
      name: "Billiard Theory Of Evolution",
      slug: "Case Billiard Theory Of Evolution for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/c_thumb,w_450,g_face/v1720074774/billiardtheoryofevolution.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/c_thumb,w_450,g_face/v1720074774/billiardtheoryofevolution.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Pool Punk Explosion",
      slug: "Case Pool Punk Explosion for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/c_thumb,w_450,g_face/v1720074807/Our_Balance_Matters-hybrid_crystal.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/c_thumb,w_450,g_face/v1720074807/Our_Balance_Matters-hybrid_crystal.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Billiard Lesson",
      slug: "Case Billiard Lesson for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720074808/billiard_genius-hybrid_crystal_iphone_14-web_1024x1024_eobabj.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720074808/billiard_genius-hybrid_crystal_iphone_14-web_1024x1024_eobabj.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Rack Them Up",
      slug: "Case Rack Them Up for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720074808/RackThemUp-hybridcrystaliphone14-web_1024x1024_pc5nmt.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720074808/RackThemUp-hybridcrystaliphone14-web_1024x1024_pc5nmt.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Our Balance Matters",
      slug: "Case Our Balance Matters for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720074807/Our_Balance_Matters-hybrid_crystal.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720074807/Our_Balance_Matters-hybrid_crystal.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Kaiju",
      slug: "Case Kaiju for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720078324/Kaiju-hybridcrystaliphone14_1024x1024_1_ubwg2u.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720078324/Kaiju-hybridcrystaliphone14_1024x1024_1_ubwg2u.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "King Of Dragons",
      slug: "Case King Of Dragons for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["billiard", "sport"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720078324/hybridcrystaliphone14_1024x1024_1_glh64t.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720078324/hybridcrystaliphone14_1024x1024_1_glh64t.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Fake Behaviour",
      slug: "Case Fake Behaviour for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720078612/FakeBehaviourMockup-min_1024x1024_1_iypb26.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720078612/FakeBehaviourMockup-min_1024x1024_1_iypb26.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Savage",
      slug: "Case Savage for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720078702/iphonehybridcrystal-webmin_11a35dab-48cf-4989-8ebb-30035b1332e6_1024x1024_1_uigxtu.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720078702/iphonehybridcrystal-webmin_11a35dab-48cf-4989-8ebb-30035b1332e6_1024x1024_1_uigxtu.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Middle Way",
      slug: "Case Middle Way for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720078909/MiddleWay-iphonehybridcrystal-web_1024x1024_1_ntn7gf.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720078909/MiddleWay-iphonehybridcrystal-web_1024x1024_1_ntn7gf.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Dare To Dream",
      slug: "Case Dare To Dream for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079336/DareToDream-iphonehybridcrystal-web_1024x1024_1_v78e1i.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079336/DareToDream-iphonehybridcrystal-web_1024x1024_1_v78e1i.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Trust The Timing Of Your Life",
      slug: "Case Trust The Timing Of Your Life for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/geisha-iphone-hybridrubbercase_1024x1024_1_wiqclg.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/geisha-iphone-hybridrubbercase_1024x1024_1_wiqclg.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Seek The Future",
      slug: "Case Seek The Future for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079814/Seek-The-Future-Mockup-min_1024x1024_1_i6emhs.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079814/Seek-The-Future-Mockup-min_1024x1024_1_i6emhs.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Relax",
      slug: "Case Relax for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/Relax-Mockup-min_1024x1024_1_n3mqbc.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/Relax-Mockup-min_1024x1024_1_n3mqbc.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Insomnia",
      slug: "Case Insomnia for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079814/insomnia-web_1024x1024_1_rk1gdm.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079814/insomnia-web_1024x1024_1_rk1gdm.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Tengu",
      slug: "Case Tengu for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/tengu-web_1024x1024_1_tanshe.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/tengu-web_1024x1024_1_tanshe.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Cyborg Wolf",
      slug: "Case Cyborg Wolf for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/CyborgWolf_1024x1024_1_dgucu6.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/CyborgWolf_1024x1024_1_dgucu6.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Ronin Wolf",
      slug: "Case Ronin Wolf for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/RoninWolf_1024x1024_1_cj3ktt.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/RoninWolf_1024x1024_1_cj3ktt.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Oni Geisha",
      slug: "Case Oni Geisha for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/geisha-iphone-hybridrubbercase_1024x1024_1_wiqclg.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720079813/geisha-iphone-hybridrubbercase_1024x1024_1_wiqclg.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "The Meaning Of Life",
      slug: "Case The Meaning Of Life for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720080110/The_Meaning_Of_Life-min_1024x1024_1_xxm4be.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720080110/The_Meaning_Of_Life-min_1024x1024_1_xxm4be.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: new ObjectId(),
      name: "Feel Good Live Good",
      slug: "Case Feel Good Live Good for Iphone Android",
      description: "Perlindungan maksimal dan gaya modern dalam satu case yang cocok untuk iPhone, Samsung, Xiaomi, Poco, Realme, Oppo, dan banyak lagi. Desain tipis yang tidak menambah bulk, akses mudah ke semua tombol, dan pilihan warna stylish.",
      excerpt: "Perlindungan maksimal dan gaya modern",
      price: 99000,
      tags: ["art", "contributor"],
      thumbnail: "https://res.cloudinary.com/dszhu92hc/image/upload/v1720080110/Feel_Good_Live_Good-min_1024x1024_1_rcbrby.jpg",
      images: ["https://res.cloudinary.com/dszhu92hc/image/upload/v1720080110/Feel_Good_Live_Good-min_1024x1024_1_rcbrby.jpg"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  try {
    await collection.insertMany(products);
    console.log("Seeding data berhasil!");
  } catch (error) {
    console.error("Gagal melakukan seeding data:", error);
  } finally {
    await client.close();
  }
};

seedProducts();
