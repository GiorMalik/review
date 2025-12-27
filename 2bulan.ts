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
    { n: "Raka Saputra", t: "Went ATV kemaren seru parah! abis itu badan semua kotor lumpur wkwk tapi worth it sih.", r: 5, l: "id" },
    { n: "Sari Rahayu", t: "Rafting di Ayung oke sih, cuman pas naik tangga balik ke parkiran otot betis gua sampe pegel bgt.", r: 4, l: "id" },
    { n: "Budi Santoso", t: "Trip ke Penida lumayan banget, fast boat delay dikit sih cuman driver di sana ngebantu banget.", r: 4, l: "id" },
    { n: "Citra Wulandari", t: "Watersport di Benoa seru! parasailing dapet harga lebih murah karena driver bantu nawar.", r: 5, l: "id" },
    { n: "Agus Prasetyo", t: "Sunrise Batur harus banget coba! udah pusing ngelanggar pagi-pagi tapi pas liat sunrise lupa semua lelah.", r: 5, l: "id" },
    { n: "Fitri Handayani", t: "Snorkeling di Manta Point ombaknya gedhe bgt gua sampe mabok, untung driver bawa obat mabok laut.", r: 4, l: "id" },
    { n: "Dewi Kartika", t: "Kecak di Uluwatu rame banget untung driver udah booking tiket dr mcm, ga perlu antri.", r: 5, l: "id" },
    { n: "Rina Kusuma", t: "Bali Swing tiketnya agak mahal sih tapi fotonya bagus bgt, driver sabar banget motretin aku.", r: 5, l: "id" },
    { n: "Doni Pratama", t: "Tour Penida Barat jalanannya rusak parah, mobil goncang terus. tapi AC dingin banget jadi enak.", r: 4, l: "id" },
    { n: "Maya Putri", t: "Minta driver anter ke gym di Canggu soalnya di hotel ga ada, eh taunya tau tempat gym yg bagus.", r: 5, l: "id" },
    { n: "Fajar Nugroho", t: "Cobain jet ski di Benoa seru! driver nunggu di warung kopi aja, ga rewel.", r: 5, l: "id" },
    { n: "Wulan Sari", t: "Main ke Monkey Forest tadi hampir ketipu monyet, untung driver sigap banget ngusirnya wkwk.", r: 5, l: "id" },
    { n: "Reza Mahendra", t: "Hitung-hitungan sewa mobil + bensin + tiket wisata masih jauh lebih murah dibanding order grab terus.", r: 5, l: "id" },
    { n: "Anita Permata", t: "Ke Desa Penglipuran tenang bgt suasananya, driver jelasin sejarah desanya dengan detail.", r: 5, l: "id" },
    { n: "Rudi Hermawan", t: "Makan seafood di Jimbaran pas sunset, driver booking meja paling depan di pantai. view-nya bagus.", r: 5, l: "id" },
    { n: "Lestari Pertiwi", t: "Ke Safari Park bawa ponakan, driver bantu angkat stroller naik turun mobil. baik bgt.", r: 5, l: "id" },
    { n: "Kiki Rahayu", t: "Coba spa di Ubud yg direkomendasi driver, tempatnya enak banget beneran rileks.", r: 5, l: "id" },
    { n: "Eko Prasetyo", t: "Surfing di Canggu bawa papan selancar, driver iket papannya kuat banget ga takut jatuh.", r: 5, l: "id" },
    { n: "Ratna Dewi", t: "Shopping di Krisna kalap banget belanja oleh-oleh, mobil penuh tapi driver bantuin nyusun baju.", r: 5, l: "id" },
    { n: "Toni Susanto", t: "GWK panas banget serasa mau gosong, untung driver nyalain AC duluan sebelum kita balik ke mobil.", r: 5, l: "id" },
    { n: "Susi Anggraini", t: "Zoo tiketnya lumayan mahal sih tapi fasilitasnya oke. driver nungguin seharian tanpa komplain.", r: 5, l: "id" },
    { n: "Bambang Sutrisno", t: "Taman Ujung Karangasem jauh banget perjalanannya, tapi pemandangannya bagus. driver nyetirnya pelan.", r: 5, l: "id" },
    { n: "Rina Marlina", t: "Trekking ke air terjun Sekumpul capek bgt tangganya banyak, driver terus semangatin wkwk.", r: 5, l: "id" },
    { n: "Dina Safitri", t: "Pengen ke day club di Uluwatu tapi full, driver bantu cek slot lewat temennya.", r: 5, l: "id" },
    { n: "Purwanto", t: "Nonton Kecak di Batubulan lebih sepi drpd Uluwatu enak nontonnya. driver emang pinter.", r: 5, l: "id" },
    { n: "Hartono", t: "Naik VW Safari seru bgt anginnya seger, driver tau jalan tikus biar ga ketemu macet.", r: 5, l: "id" },
    { n: "Mulyani", t: "Anak saya seneng banget liat lumba-lumba di Lovina, padahal harus bangun pagi banget.", r: 5, l: "id" },
    { n: "Suryadi", t: "Makan babi guling di Pak Malen antrinya panjang, driver sabar nungguin di mobil.", r: 5, l: "id" },
    { n: "Wahyudi", t: "Ke Pura Besakih harus pake sarung, untung udah disiapin driver di mobil jadi ga perlu sewa.", r: 5, l: "id" },
    { n: "Joko", t: "Harga paket watersport transparan, pas bayar ga ada biaya tambahan lagi.", r: 5, l: "id" },

    // --- ENGLISH (25 Items) ---
    { n: "Sarah Mitchell", t: "ATV was crazy fun! Got completely covered in mud lol but definitely worth it.", r: 5, l: "en" },
    { n: "James Wilson", t: "Boat to Penida was so bumpy I almost threw up. Driver on the island was super helpful though.", r: 4, l: "en" },
    { n: "Emily Chen", t: "Rafting stairs were insane! My legs were burning. But the river guide was funny.", r: 5, l: "en" },
    { n: "Michael Brown", t: "Waited 3 hours for the Lempuyang photo. Driver waited with us without complaining.", r: 5, l: "en" },
    { n: "Jessica Taylor", t: "Sunrise jeep tour at Batur is a must! Breakfast was simple but the view was insane.", r: 5, l: "en" },
    { n: "David Lee", t: "Driver got us discounts on watersports prices. Saved us like IDR 300k.", r: 5, l: "en" },
    { n: "Amanda White", t: "Cycling in Kintamani was chill. Mostly downhill so not too tiring.", r: 5, l: "en" },
    { n: "Ryan Garcia", t: "Traffic leaving Uluwatu after sunset was terrible but driver stayed calm and knew shortcuts.", r: 4, l: "en" },
    { n: "Sophie Martin", t: "Snorkeling gear looked kinda old but we saw so many turtles! Worth it.", r: 4, l: "en" },
    { n: "Daniel Kim", t: "Tegalalang rice terrace is beautiful but way too crowded. Driver showed us a quieter spot.", r: 5, l: "en" },
    { n: "Olivia Johnson", t: "Went to Cretya River Club. Driver booked a daybed for us in advance. Nice touch.", r: 5, l: "en" },
    { n: "Matthew Anderson", t: "Monkey Forest was fun but the monkeys are aggressive! Driver warned us beforehand.", r: 5, l: "en" },
    { n: "Hannah Scott", t: "Seafood dinner at Jimbaran was great. Table on the sand felt so romantic.", r: 5, l: "en" },
    { n: "Chris Turner", t: "Full day rental was much cheaper than taking Grab everywhere. Driver was patient.", r: 5, l: "en" },
    { n: "Nancy Lewis", t: "Did Campuhan Ridge Walk at noon - big mistake. Too hot! Driver brought cold water.", r: 4, l: "en" },
    { n: "Andrew Clark", t: "Surf lesson in Kuta was harder than I thought. Driver recommended a good instructor.", r: 5, l: "en" },
    { n: "Michelle Young", t: "Tanah Lot sunset was beautiful. Driver knew where to park to avoid the crowd.", r: 5, l: "en" },
    { n: "Joshua Martinez", t: "ATV boots smelled a bit funky but the ride itself was super fun!", r: 4, l: "en" },
    { n: "Ashley Robinson", t: "Bali Zoo package included lunch. Kids had a blast.", r: 5, l: "en" },
    { n: "Brandon Walker", t: "Uluwatu cliff views are amazing. Just watch out for the monkeys stealing stuff!", r: 5, l: "en" },
    { n: "Stephanie Hall", t: "Hidden Canyon trek was slippery and muddy but super adventurous. Driver watched our bags.", r: 5, l: "en" },
    { n: "Kevin Adams", t: "Did the eco-cycling tour. We got to plant a tree. Cool experience.", r: 5, l: "en" },
    { n: "Rachel Green", t: "Traffic was terrible but car AC was cold and driver was chill about it.", r: 5, l: "en" },
    { n: "Thomas Baker", t: "Was training for triathlon nearby. Driver knew quiet roads for running.", r: 5, l: "en" },
    { n: "Jennifer King", t: "Nusa Dua area is so clean and organized. Different vibe from Kuta.", r: 5, l: "en" },

    // --- CHINESE (10 Items) ---
    { n: "Wang Wei", t: "ATV 很好玩，虽然弄得满身泥，但很刺激！", r: 5, l: "zh" },
    { n: "Li Na", t: "佩尼达岛路太颠了，晕车药一定要带。风景很美。", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "在蓝梦岛浮潜看到了魔鬼鱼，太幸运了！", r: 5, l: "zh" },
    { n: "Liu Yang", t: "乌布秋千排队很久，司机帮忙拍照人很好。", r: 5, l: "zh" },
    { n: "Chen Jie", t: "金巴兰海鲜价格稍微贵点，但环境不错。", r: 4, l: "zh" },
    { n: "Yang Xi", t: "天空之门排队要3小时，幸好司机很有耐心。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "德格拉朗梯田很晒，记得涂防晒。", r: 5, l: "zh" },
    { n: "Huang Jing", t: "情人崖的猴子很凶，抢了我的帽子！司机帮我抢回来了。", r: 5, l: "zh" },
    { n: "Wu Gang", t: "阿勇河漂流的楼梯好多，腿都软了，但很好玩。", r: 5, l: "zh" },
    { n: "Zhou Xun", t: "包车价格公道，没有隐形消费。", r: 5, l: "zh" },

    // --- KOREAN (10 Items) ---
    { n: "Kim Min-jun", t: "바투르 지프 투어 강력 추천! 사진 찍기 최고.", r: 5, l: "ko" },
    { n: "Lee Ji-eun", t: "우붓 시장에서 물건 살 때 기사님이 가격 깎아줘서 좋았어요.", r: 5, l: "ko" },
    { n: "Park Seo-joon", t: "서핑 수업 받았는데 파도가 너무 쎄서 힘들었어요.", r: 4, l: "ko" },
    { n: "Choi Woo-shik", t: "렘푸양 대기시간이 너무 길어요. 새벽에 가세요.", r: 5, l: "ko" },
    { n: "Jennie Kim", t: "래프팅 가이드가 한국말 잘해서 재밌었어요.", r: 5, l: "ko" },
    { n: "Kim Tae-hyung", t: "발리 스윙 드레스 대여비 포함된 패키지로 예약했어요.", r: 5, l: "ko" },
    { n: "Lisa Manoban", t: "누사페니다 도로가 정말 안좋아요. 멀미 조심하세요.", r: 4, l: "ko" },
    { n: "Son Heung-min", t: "울루와두 일몰 정말 멋져요.", r: 5, l: "ko" },
    { n: "Bae Suzy", t: "원숭이 숲 원숭이 귀엽지만 조심해야 해요.", r: 5, l: "ko" },
    { n: "Park Bo-gum", t: "기사님이 추천해준 현지 식당 나시고랑 진짜 맛있어요!", r: 5, l: "ko" },

    // --- JAPANESE (10 Items) ---
    { n: "Tanaka Sato", t: "レンボンガン島のマングローブツアーに参加。静かでよかった。", r: 5, l: "ja" },
    { n: "Suzuki Ichiro", t: "ケチャックのチケット手配してくれて、良い席で見れた。", r: 5, l: "ja" },
    { n: "Yamada Taro", t: "ラフティングの階段きついけど、川下りは最高。", r: 5, l: "ja" },
    { n: "Honda Keisuke", t: "ATV体験は泥だらけになるけど、着替え場所は綺麗。", r: 5, l: "ja" },
    { n: "Miyazaki Hayao", t: "ウブドの渋滞すごいけど、ドライバーは抜け道知ってる。", r: 5, l: "ja" },
    { n: "Oda Eiichiro", t: "ライステラスの景色絶景。写真撮るの必須。", r: 5, l: "ja" },
    { n: "Kishimoto Masashi", t: "ゴアガジャ遺跡の歴史詳しく説明してくれた。", r: 5, l: "ja" },
    { n: "Toriyama Akira", t: "マリンスポーツの価格交渉手伝ってくれて助かった。", r: 5, l: "ja" },
    { n: "Kubo Tite", t: "バリ動物園は家族連れに最適。", r: 5, l: "ja" },
    { n: "Murakami Haruki", t: "とても親切なドライバーさんでした。", r: 5, l: "ja" },

    // --- RUSSIAN (8 Items) ---
    { n: "Ivan Petrov", t: "Квадроциклы - это мощно! Джунгли, грязь, адреналин.", r: 5, l: "ru" },
    { n: "Dmitry Volkov", t: "Рафтинг отличный, но вода холодная.", r: 5, l: "ru" },
    { n: "Anna Smirnova", t: "Нуса Пенида красивые скалы, но дорога ужасная.", r: 4, l: "ru" },
    { n: "Sergei Popov", t: "Водитель помог найти обменник без комиссии.", r: 5, l: "ru" },
    { n: "Maria Sokolova", t: "Закат в Улувату потрясающий, но много людей.", r: 5, l: "ru" },
    { n: "Vladimir Ivanov", t: "Логистика тура продумана идеально.", r: 5, l: "ru" },
    { n: "Alexey Kuznetsov", t: "Серфинг сложно, но инструктор хороший.", r: 5, l: "ru" },
    { n: "Elena Ivanova", t: "Вернусь снова. Бали прекрасен.", r: 5, l: "ru" },

    // --- ARABIC (7 Items) ---
    { n: "Ahmed Ali", t: "تجربة التجديف كانت ممتعة جداً للعائلة.", r: 5, l: "ar" },
    { n: "Mohamed Salah", t: "السائق يعرف مطاعم حلال جيدة بعد جولة ال ATV.", r: 5, l: "ar" },
    { n: "Fatima Hassan", t: "جزيرة نوسا بينيدا جميلة جداً، السائق كان متعاوناً.", r: 5, l: "ar" },
    { n: "Omar Farooq", t: "أسعار الأنشطة البحرية كانت معقولة.", r: 5, l: "ar" },
    { n: "Khalid Rahman", t: "الغروب في تاناه لوت كان ساحراً.", r: 5, l: "ar" },
    { n: "Yusuf Amir", t: "السائق أمين ومحترم.", r: 5, l: "ar" },
    { n: "Aisha Karim", t: "خدمة ممتازة، شكراً جزيلاً.", r: 5, l: "ar" }
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
