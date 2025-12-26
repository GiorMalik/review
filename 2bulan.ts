import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 0-60 hari terakhir
function getDateLast2Months() {
  const now = new Date()
  const twoMonthsAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000))
  return new Date(twoMonthsAgo.getTime() + Math.random() * (now.getTime() - twoMonthsAgo.getTime()))
}

async function seedActivityReviews() {
  console.log('🌊 Seeding 100 Activity & Price Focused Reviews (Last 2 Months)...')

  // 100 DATA REVIEW LENGKAP
  const reviews = [
    // --- INDONESIA (30 Items) ---
    { n: "Dimas Anggara", t: "Ambil paket ATV Kuber lewat sini harganya lebih miring dari publish rate. Track-nya gila sih, lumpur semua!", r: 5, l: "id" },
    { n: "Siska Kohl", t: "Rafting di Sungai Ayung seru abis! Cuma tangganya itu lho, pas naik balik ke parkiran bikin betis meledak. Tapi driver sabar nungguin.", r: 5, l: "id" },
    { n: "Fadly Faisal", t: "Ke Nusa Penida ambil paket one day trip. Fast boat nya agak telat dikit, tapi driver di Penida nya jago fotoin kita di Kelingking Beach.", r: 4, l: "id" },
    { n: "Fuji An", t: "Watersport di Tanjung Benoa seru! Parasailing-nya aman. Driver bantu nego harga jadi dapet diskon lumayan.", r: 5, l: "id" },
    { n: "Atta Halilintar", t: "Sewa Jeep buat Sunrise Gunung Batur. Driver jeep-nya asik, kita diajak ngopi dulu di atas sambil nunggu matahari.", r: 5, l: "id" },
    { n: "Ria Ricis", t: "Snorkeling di Manta Point ombaknya gede banget, mabok laut. Untung driver mobil nyediain minyak angin pas jemput di pelabuhan.", r: 5, l: "id" },
    { n: "Arief Muhammad", t: "Tiket Tari Kecak Uluwatu udah dipesenin online sama driver, jadi kita ga perlu antri tiket on the spot yg panjang uler.", r: 5, l: "id" },
    { n: "Rachel Vennya", t: "Bali Swing di Ubud mahal sih tiketnya, tapi hasil fotonya emang bagus. Driver bantu bawain dress ganti.", r: 5, l: "id" },
    { n: "Keanu Agl", t: "Capek banget tour Nusa Penida Barat, jalannya rusak parah menuju Broken Beach. Tapi AC mobil adem, jadi terobati.", r: 4, l: "id" },
    { n: "Deddy Corbuzier", t: "Gym di hotel kurang lengkap, minta dianter ke gym umum di Canggu. Driver tau tempat yg oke.", r: 5, l: "id" },
    { n: "Reza Arap", t: "Main Jet Ski di Benoa, instruktur nya gokil. Driver nungguin di warung sambil ngopi santai.", r: 5, l: "id" },
    { n: "Wendy Walters", t: "Healing ke Monkey Forest, eh kacamata hampir diambil monyet. Driver sigap banget ngusir monyetnya.", r: 5, l: "id" },
    { n: "Jerome Polin", t: "Hitung-hitungan harga sewa mobil + bensin + tiket wisata jatuhnya worth it banget dibanding naik taksi online pisah-pisah.", r: 5, l: "id" },
    { n: "Maudy Ayunda", t: "Tour ke Desa Penglipuran, suasananya tenang. Driver jelasin soal budaya desa adat dengan fasih.", r: 5, l: "id" },
    { n: "Vidi Aldiano", t: "Makan Seafood di Jimbaran pas sunset. Driver reservasiin tempat yg paling depan pinggir pantai.", r: 5, l: "id" },
    { n: "Isyana Sarasvati", t: "Ke Bali Safari Park bawa ponakan. Driver bantu angkat stroller naik turun mobil.", r: 5, l: "id" },
    { n: "Raisa Andriana", t: "Spa treatment di Ubud rekomendasi driver enak banget, tempatnya hidden gem pinggir sungai.", r: 5, l: "id" },
    { n: "Hamish Daud", t: "Surfing di Canggu, papan selancar muat di atas mobil. Tali pengikatnya kuat.", r: 5, l: "id" },
    { n: "Nagita Slavina", t: "Belanja di Krisna Oleh-Oleh kalap banget, bagasi mobil penuh tapi driver pinter nyusunnya.", r: 5, l: "id" },
    { n: "Raffi Ahmad", t: "GWK panasnya pol-polan. Driver stand by nyalain AC 10 menit sebelum kita balik ke parkiran.", r: 5, l: "id" },
    { n: "Baim Wong", t: "Zoo tiketnya lumayan pricey ya, tapi fasilitas oke. Driver nungguin seharian full.", r: 5, l: "id" },
    { n: "Paula Verhoeven", t: "Taman Ujung Karangasem jauh banget, tapi view-nya cantik. Driver nyetirnya stabil ga bikin pusing.", r: 5, l: "id" },
    { n: "Denny Sumargo", t: "Trekking ke air terjun Sekumpul, tangganya ratusan. Kaki gempor, tapi driver semangatin terus.", r: 5, l: "id" },
    { n: "Luna Maya", t: "Day Club di Uluwatu waiting list, driver bantu cek ketersediaan table lewat temennya.", r: 5, l: "id" },
    { n: "Ayu Dewi", t: "Kecak Batubulan lebih sepi dari Uluwatu, enak nontonnya. Rekomendasi driver emang top.", r: 5, l: "id" },
    { n: "Gading Marten", t: "Tour naik VW Safari seru juga, angin sepoi-sepoi. Drivernya hapal jalan tikus.", r: 5, l: "id" },
    { n: "Gisella Anastasia", t: "Gempi seneng banget liat lumba-lumba di Lovina, meski harus bangun jam 3 pagi.", r: 5, l: "id" },
    { n: "Sule", t: "Makan Babi Guling Pak Malen, antri panjang. Driver sabar nungguin kita makan.", r: 5, l: "id" },
    { n: "Andre Taulany", t: "Ke Pura Besakih wajib pake sarung, driver udah nyediain di mobil jadi ga usah sewa.", r: 5, l: "id" },
    { n: "Parto", t: "Harga paket watersport nya transparan, ga ada hidden cost pas bayar.", r: 5, l: "id" },

    // --- ENGLISH (25 Items) ---
    { n: "Lewis Hamilton", t: "The ATV track was intense! Through the tunnel and waterfalls. Muddy but fun.", r: 5, l: "en" },
    { n: "Max Verstappen", t: "Fast boat ride to Nusa Penida was very bumpy, almost got seasick. Driver on the island was great though.", r: 4, l: "en" },
    { n: "Lando Norris", t: "White water rafting stairs are a killer workout! But the river guide was hilarious.", r: 5, l: "en" },
    { n: "Charles Leclerc", t: "Gateway of Heaven (Lempuyang) queue was 3 hours for a photo. Driver waited patiently.", r: 5, l: "en" },
    { n: "Daniel Ricciardo", t: "Sunrise Jeep tour at Mount Batur is a must! The breakfast on the volcano was simple but nice.", r: 5, l: "en" },
    { n: "George Russell", t: "Watersport prices at Benoa were negotiable thanks to the driver. Saved us some money.", r: 5, l: "en" },
    { n: "Valtteri Bottas", t: "Cycling tour in Kintamani was peaceful. Mostly downhill, easy ride.", r: 5, l: "en" },
    { n: "Fernando Alonso", t: "The Kecak fire dance at sunset was crowded, traffic out of Uluwatu was bad. Driver stayed calm.", r: 5, l: "en" },
    { n: "Carlos Sainz", t: "Snorkeling equipment was a bit old, but the turtles we saw were amazing.", r: 4, l: "en" },
    { n: "Pierre Gasly", t: "Tegalalang Rice Terrace is beautiful but very commercial now. Driver showed us a quieter spot nearby.", r: 5, l: "en" },
    { n: "Esteban Ocon", t: "Cretya River Club pool was nice. Driver booked the daybed for us in advance.", r: 5, l: "en" },
    { n: "Alex Albon", t: "Monkey Forest is fun but scary! Driver warned us about the aggressive monkeys.", r: 5, l: "en" },
    { n: "Sergio Perez", t: "Great seafood dinner at Jimbaran Bay. The table setup on the sand was romantic.", r: 5, l: "en" },
    { n: "Nico Hulkenberg", t: "Full day tour price was very reasonable compared to Grab or Gojek for long distance.", r: 5, l: "en" },
    { n: "Kevin Magnussen", t: "Campuhan Ridge Walk is hot at midday. Go early! Driver brought cold water for us.", r: 5, l: "en" },
    { n: "Yuki Tsunoda", t: "Surfing lesson in Kuta was hard, but the instructor recommended by the driver was patient.", r: 5, l: "en" },
    { n: "Oscar Piastri", t: "Tanah Lot temple at sunset is iconic. Driver knew where to park to exit quickly.", r: 5, l: "en" },
    { n: "Logan Sargeant", t: "ATV boots provided were a bit smelly, but the ride itself was adrenaline pumping.", r: 4, l: "en" },
    { n: "Lance Stroll", t: "Bali Zoo package included lunch. Good day out for the family.", r: 5, l: "en" },
    { n: "Guanyu Zhou", t: "Uluwatu cliff views are stunning. Watch out for glasses-stealing monkeys!", r: 5, l: "en" },
    { n: "Mick Schumacher", t: "Hidden Canyon trekking was slippery but adventurous. Driver looked after our bags.", r: 5, l: "en" },
    { n: "Sebastian Vettel", t: "Eco-cycling tour was informative. We planted a tree. Good initiative.", r: 5, l: "en" },
    { n: "Kimi Raikkonen", t: "Bwoah, the traffic was bad, but the car AC was cold. Good enough.", r: 5, l: "en" },
    { n: "Jenson Button", t: "Triathlon training nearby, driver knew the quiet roads for running.", r: 5, l: "en" },
    { n: "Mark Webber", t: "Nusa Dua is very clean and manicured. A different vibe from Kuta. Relaxing drive.", r: 5, l: "en" },

    // --- CHINESE (10 Items) ---
    { n: "Lin Dan", t: "ATV越野车非常刺激，还要穿过一个长长的隧道！", r: 5, l: "zh" }, // ATV very exciting, went through long tunnel!
    { n: "Chen Long", t: "佩尼达岛的路太颠簸了，晕车药一定要带。景色很美。", r: 5, l: "zh" }, // Penida roads too bumpy, bring motion sickness pills. View beautiful.
    { n: "Li Chong Wei", t: "蓝梦岛浮潜看到了魔鬼鱼（Manta），太幸运了！", r: 5, l: "zh" }, // Saw Manta rays snorkeling at Lembongan, so lucky!
    { n: "Tao Taufik", t: "乌布的大秋千（Bali Swing）排队人很多，司机帮我们拍照。", r: 5, l: "zh" }, // Ubud Bali Swing queue long, driver took photos.
    { n: "Wang Yibo", t: "金巴兰海鲜大餐价格有点贵，但是氛围很好。", r: 4, l: "zh" }, // Jimbaran seafood pricey, but atmosphere good.
    { n: "Xiao Zhan", t: "天空之门拍照要排队3个小时，还好司机很有耐心。", r: 5, l: "zh" }, // Gate of Heaven queue 3 hours, luckily driver patient.
    { n: "Jackson Yee", t: "德格拉朗梯田很晒，记得涂防晒霜。", r: 5, l: "zh" }, // Tegalalang terrace very sunny, remember sunscreen.
    { n: "Dilraba", t: "情人崖的猴子很凶，抢了我的帽子！司机帮我拿回来了。", r: 5, l: "zh" }, // Uluwatu monkeys fierce, took my hat! Driver got it back.
    { n: "Yang Mi", t: "阿勇河漂流有很多台阶，腿都软了，但是很好玩。", r: 5, l: "zh" }, // Ayung rafting has many steps, legs weak, but fun.
    { n: "Zhao Liying", t: "包车价格很公道，没有任何隐形消费。", r: 5, l: "zh" }, // Charter price fair, no hidden costs.

    // --- KOREAN (10 Items) ---
    { n: "Son Heung-min", t: "바투르 산 지프 투어 강력 추천합니다. 인생샷 찍었어요.", r: 5, l: "ko" }, // Batur Jeep tour highly recommended. Got life shot.
    { n: "Lee Kang-in", t: "우붓 시장에서 흥정할 때 기사님이 도와주셨어요 ㅋㅋ", r: 5, l: "ko" }, // Driver helped bargain at Ubud market lol.
    { n: "Park Ji-sung", t: "서핑 강습 받았는데 파도가 너무 쎄서 힘들었어요.", r: 4, l: "ko" }, // Took surf lesson but waves too strong, was hard.
    { n: "Kim Min-jae", t: "렘푸양 사원 대기시간이 너무 길어요. 새벽에 가세요.", r: 5, l: "ko" }, // Lempuyang wait time too long. Go at dawn.
    { n: "Hwang Hee-chan", t: "래프팅 가이드가 한국말을 잘해서 재밌었어요.", r: 5, l: "ko" }, // Rafting guide spoke Korean well, was fun.
    { n: "Jennie", t: "발리 스윙 드레스 대여비가 포함된 패키지로 예약했어요.", r: 5, l: "ko" }, // Booked package including Bali Swing dress rental.
    { n: "Jisoo", t: "누사페니다 도로는 정말 험하네요. 멀미 조심하세요.", r: 4, l: "ko" }, // Nusa Penida roads really rough. Watch out for motion sickness.
    { n: "Rose", t: "울루와뚜 일몰은 정말 환상적입니다.", r: 5, l: "ko" }, // Uluwatu sunset is fantastic.
    { n: "Lisa", t: "몽키 포레스트 원숭이들이 귀엽지만 조심해야 해요.", r: 5, l: "ko" }, // Monkey forest monkeys cute but be careful.
    { n: "V", t: "운전기사님이 추천해준 현지 식당 나시고랭 최고!", r: 5, l: "ko" }, // Local Nasi Goreng driver recommended was best!

    // --- JAPANESE (10 Items) ---
    { n: "Shohei Ohtani", t: "レンボンガン島のマングローブツアーに参加しました。静かで癒されました。", r: 5, l: "ja" }, // Joined Lembongan mangrove tour. Quiet and healing.
    { n: "Naomi Osaka", t: "ケチャダンスのチケットを手配してくれました。良い席で見れました。", r: 5, l: "ja" }, // Arranged Kecak tickets. Saw from good seat.
    { n: "Keisuke Honda", t: "ラフティングの階段はきついですが、川下りは最高です。", r: 5, l: "ja" }, // Rafting stairs tough, but going down river is best.
    { n: "Shinji Kagawa", t: "ATV体験は泥だらけになりますが、着替え場所も綺麗でした。", r: 5, l: "ja" }, // ATV gets you muddy, but changing room was clean.
    { n: "Yuto Nagatomo", t: "ウブドの交通渋滞はすごいですが、ドライバーは抜け道を知っています。", r: 5, l: "ja" }, // Ubud traffic terrible, but driver knows shortcuts.
    { n: "Takefusa Kubo", t: "ライステラスの景色は絶景です。写真は必須。", r: 5, l: "ja" }, // Rice terrace view is superb. Photos a must.
    { n: "Kaoru Mitoma", t: "ゴアガジャ遺跡の歴史を詳しく説明してくれました。", r: 5, l: "ja" }, // Explained Goa Gajah history in detail.
    { n: "Ritsu Doan", t: "マリンスポーツの価格交渉をしてくれて助かりました。", r: 5, l: "ja" }, // Helped negotiate marine sports price.
    { n: "Takumi Minamino", t: "バリ動物園は家族連れに最適です。", r: 5, l: "ja" }, // Bali Zoo perfect for families.
    { n: "Daichi Kamada", t: "とても親切なドライバーさんでした。", r: 5, l: "ja" }, // Very kind driver.

    // --- RUSSIAN (8 Items) ---
    { n: "Khabib", t: "Квадроциклы - это мощь! Джунгли, грязь, адреналин.", r: 5, l: "ru" }, // ATVs are power! Jungle, mud, adrenaline.
    { n: "Makhachev", t: "Рафтинг был отличный, но вода холодная.", r: 5, l: "ru" }, // Rafting was great, but water cold.
    { n: "Sharapova", t: "Нуса Пенида - очень красивые скалы, но дорога ужасная.", r: 4, l: "ru" }, // Nusa Penida - very beautiful cliffs, but road terrible.
    { n: "Medvedev", t: "Водитель помог найти хороший обменник без комиссии.", r: 5, l: "ru" }, // Driver helped find good exchanger with no commission.
    { n: "Rublev", t: "Закат в Улувату потрясающий, но много людей.", r: 5, l: "ru" }, // Sunset in Uluwatu amazing, but many people.
    { n: "Kasparov", t: "Логистика тура продумана идеально.", r: 5, l: "ru" }, // Tour logistics thought out perfectly.
    { n: "Yashin", t: "Серфинг - это сложно, но инструктор был хорош.", r: 5, l: "ru" }, // Surfing is hard, but instructor was good.
    { n: "Drago", t: "Я вернусь снова. Бали прекрасен.", r: 5, l: "ru" }, // I will return. Bali is beautiful.

    // --- ARABIC (7 Items) ---
    { n: "Mo Salah", t: "تجربة التجديف (Rafting) كانت ممتعة جداً للعائلة.", r: 5, l: "ar" }, // Rafting experience very fun for family.
    { n: "Benzema", t: "السائق يعرف مطاعم حلال جيدة بعد جولة الدراجات الرباعية.", r: 5, l: "ar" }, // Driver knows good Halal restaurants after ATV tour.
    { n: "Hakimi", t: "جزيرة نوسا بينيدا جميلة جداً، السائق كان متعاوناً.", r: 5, l: "ar" }, // Nusa Penida island very beautiful, driver was helpful.
    { n: "Mahrez", t: "أسعار الأنشطة البحرية كانت معقولة.", r: 5, l: "ar" }, // Marine activity prices were reasonable.
    { n: "Ziyech", t: "الغروب في تاناه لوت كان ساحراً.", r: 5, l: "ar" }, // Sunset at Tanah Lot was magical.
    { n: "Mane", t: "السائق أمين ومحترم.", r: 5, l: "ar" }, // Driver honest and respectful.
    { n: "Kante", t: "خدمة ممتازة، شكراً جزيلاً.", r: 5, l: "ar" } // Excellent service, thank you very much.
  ]

  // Insert to DB
  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    // Kategori difokuskan ke aktivitas
    category: ['activity_package', 'price_value', 'driver_service', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDateLast2Months()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} Activity & Price reviews (0-2 Months ago)!`)
}

seedActivityReviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
