import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function getDateLast90Days() {
  const now = new Date()
  const ninetyDaysAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))
  return new Date(ninetyDaysAgo.getTime() + Math.random() * (now.getTime() - ninetyDaysAgo.getTime()))
}

async function seedReviews1() {
  console.log('🌱 Seeding Script 1 - General Travel Experience (150 reviews)...')

  const reviews = [
    // INDONESIA (30 reviews)
    { n: "Dian Permata", t: "Driver nya asik banget diajak ngobrol. tau banyak tempat makan enak yg ga mahal.", r: 5, l: "id" },
    { n: "Agus Salim", t: "Mobilnya bersih wangi, ac dingin pol. perjalanan 3 jam ke Gilimanuk ga kerasa.", r: 5, l: "id" },
    { n: "Rina Melati", t: "Jemput telat dikit sih tapi driver nya sopan banget minta maaf berkali-kali.", r: 4, l: "id" },
    { n: "Budi Hartono", t: "Harga udah all in, ga ada biaya tambahan lagi pas bayar. enak banget.", r: 5, l: "id" },
    { n: "Siti Aminah", t: "Driver nya pinter cari jalan alternatif biar ga kena macet. mantap!", r: 5, l: "id" },
    { n: "Rudi Santoso", t: "Minta berhenti di indomaret tiap 2 jam buat beli rokok, driver nya oke aja.", r: 5, l: "id" },
    { n: "Maya Sari", t: "Driver bisa bahasa Inggris dikit, temen saya bule bisa ngobrol sama dia.", r: 5, l: "id" },
    { n: "Eko Pratama", t: "Mobilnya empuk suspensi nya, tidur pules aja di jalan.", r: 5, l: "id" },
    { n: "Dewi Kartika", t: "Udah langganan tiap ke Bali. driver nya selalu yang bagus.", r: 5, l: "id" },
    { n: "Joko Widodo", t: "Macet parah di Kuta tapi driver tetap tenang bawa mobil.", r: 5, l: "id" },
    { n: "Ani Rahayu", t: "Sempet bawa kucing, driver bolehin asal di dalam carrier. makasih!", r: 5, l: "id" },
    { n: "Yanto Sutrisno", t: "Driver sabar banget nungguin kita belanja di pasar seni sampe 2 jam.", r: 5, l: "id" },
    { n: "Lina Kusuma", t: "Ke airport subuh-subuh, driver udah standby bawa papan nama.", r: 5, l: "id" },
    { n: "Wahyu Purnomo", t: "Mobilnya ada charger hp, ga perlu bawa powerbank.", r: 5, l: "id" },
    { n: "Fitri Handayani", t: "Driver ramah banget sama anak-anak, kasih permen sama dia.", r: 5, l: "id" },
    { n: "Hendra Wijaya", t: "Harganya worth it banget buat sehari full.", r: 5, l: "id" },
    { n: "Nurul Hidayah", t: "Driver bantu angkatin koper-koper berat, strong banget.", r: 5, l: "id" },
    { n: "Irfan Hakim", t: "Pesen dadakan pagi banget, tapi driver langsung dateng jam 7 pagi.", r: 5, l: "id" },
    { n: "Ratna Wati", t: "Driver nya tau jalan tikus biar ga ketemu macet di Canggu.", r: 5, l: "id" },
    { n: "Dani Pratama", t: "AC mobilnya sejuk banget, padahal Bali lagi panas kentang.", r: 5, l: "id" },
    { n: "Siska Amelia", t: "Driver nya hapal semua tempat wisata populer, ga perlu google map.", r: 5, l: "id" },
    { n: "Fajar Nugroho", t: "Minta playlist lagu Indonesia, driver pasin semua.", r: 5, l: "id" },
    { n: "Rina Susanti", t: "Tour seharian capek tapi driver tetep semangat anterin kita.", r: 5, l: "id" },
    { n: "Bayu Aji", t: "Mobilnya agak tua tapi bersih banget dan mesin nya oke.", r: 4, l: "id" },
    { n: "Putri Ayu", t: "Driver nya sopan banget, selalu bukain pintu buat kita.", r: 5, l: "id" },
    { n: "Adi Kurniawan", t: "Harga bisa ditawar dikit buat sewa 3 hari.", r: 5, l: "id" },
    { n: "Ria Permata", t: "Driver bantu cariin hotel yang murah tapi bagus.", r: 5, l: "id" },
    { n: "Toni Prasetyo", t: "Nganterin ke gym, driver tau tempat gym yg bagus di Canggu.", r: 5, l: "id" },
    { n: "Dina Marlina", t: "Mobil Hiace-nya lega banget, muat rombongan 10 orang.", r: 5, l: "id" },
    { n: "Sri Wahyuni", t: "Driver ga banyak nyuruh ke tempat wisata mahal, keren.", r: 5, l: "id" },

    // ENGLISH (25 reviews)
    { n: "James Smith", t: "Driver was super friendly and chatty. Knew good local food spots.", r: 5, l: "en" },
    { n: "Emma Johnson", t: "Car was clean and smelled nice. AC was freezing, which I loved.", r: 5, l: "en" },
    { n: "Michael Brown", t: "Waited about 10 minutes but driver apologized profusely. No big deal.", r: 4, l: "en" },
    { n: "Sarah Davis", t: "Price was all inclusive, no hidden charges at the end. Great!", r: 5, l: "en" },
    { n: "David Wilson", t: "Driver knew all the shortcuts to avoid traffic. Saved us so much time!", r: 5, l: "en" },
    { n: "Jennifer Miller", t: "Driver was totally fine with us stopping for snacks every hour.", r: 5, l: "en" },
    { n: "Robert Taylor", t: "Driver spoke pretty good English. My non-English speaking friend could communicate.", r: 5, l: "en" },
    { n: "Lisa Anderson", t: "Car suspension was so comfortable, I fell asleep multiple times.", r: 5, l: "en" },
    { n: "William Thomas", t: "Third time using this service. Always been great.", r: 5, l: "en" },
    { n: "Amanda Jackson", t: "Traffic was insane but driver stayed calm the whole time.", r: 5, l: "en" },
    { n: "Christopher White", t: "We brought our small dog and driver was totally cool about it.", r: 5, l: "en" },
    { n: "Jessica Harris", t: "Driver waited patiently while we shopped at the art market for 2 hours.", r: 5, l: "en" },
    { n: "Daniel Martin", t: "Early morning airport pickup, driver was there with a sign waiting.", r: 5, l: "en" },
    { n: "Melissa Thompson", t: "Car had phone chargers! Didn't need to use my power bank.", r: 5, l: "en" },
    { n: "Matthew Garcia", t: "Driver was so nice to our kids, gave them candy.", r: 5, l: "en" },
    { n: "Emily Martinez", t: "Great price for a full day rental. Very reasonable.", r: 5, l: "en" },
    { n: "Joshua Robinson", t: "Driver helped with our heavy luggage. He's strong!", r: 5, l: "en" },
    { n: "Ashley Clark", t: "Booked super last minute but driver arrived by 7am. Amazing.", r: 5, l: "en" },
    { n: "Andrew Rodriguez", t: "Driver knew back roads to avoid Canggu traffic. Smart!", r: 5, l: "en" },
    { n: "Michelle Lewis", t: "AC was ice cold. Bali is so hot right now, this saved me.", r: 5, l: "en" },
    { n: "Kevin Walker", t: "Driver knew all popular tourist spots, no need for GPS.", r: 5, l: "en" },
    { n: "Brian Hall", t: "Asked for Indonesian music playlist and driver had everything!", r: 5, l: "en" },
    { n: "Stephanie Allen", t: "Full day tour was tiring but driver was energetic the whole time.", r: 5, l: "en" },
    { n: "Justin Young", t: "Car was a bit old but super clean and ran well.", r: 4, l: "en" },
    { n: "Nicole King", t: "Driver was so polite, always opening doors for us.", r: 5, l: "en" },

    // CHINESE (20 reviews)
    { n: "王伟", t: "司机很友好，知道很多好吃的本地餐厅。", r: 5, l: "zh" },
    { n: "李娜", t: "车很干净，空调很凉快。", r: 5, l: "zh" },
    { n: "张伟", t: "价格透明，没有额外收费。", r: 5, l: "zh" },
    { n: "刘洋", t: "司机知道怎么避开交通堵塞，省了很多时间。", r: 5, l: "zh" },
    { n: "陈杰", t: "司机很有耐心，我们买东西等了两个小时。", r: 5, l: "zh" },
    { n: "杨希", t: "早上接机，司机举着牌子在等我们。", r: 5, l: "zh" },
    { n: "赵磊", t: "车里有充电器，很方便。", r: 5, l: "zh" },
    { n: "黄静", t: "司机对孩子很好，给了糖果。", r: 5, l: "zh" },
    { n: "吴刚", t: "全程一天的价格很合理。", r: 5, l: "zh" },
    { n: "周迅", t: "司机帮忙搬运行李，力气很大。", r: 5, l: "zh" },
    { n: "郑恺", t: "临时订车，司机很快就来了。", r: 5, l: "zh" },
    { n: "孙俪", t: "虽然车有点旧，但是很干净，开得也很稳。", r: 4, l: "zh" },
    { n: "胡歌", t: "司机很有礼貌，总是帮我们开车门。", r: 5, l: "zh" },
    { n: "Angelababy", t: "司机知道不用去人多的景点，带我们去了小众的地方。", r: 5, l: "zh" },
    { n: "刘亦菲", t: "巴厘岛很热，幸好车空调很给力。", r: 5, l: "zh" },
    { n: "杨幂", t: "包车三天价格可以再便宜一点。", r: 5, l: "zh" },
    { n: "迪丽热巴", t: "司机帮我们找便宜又好的酒店。", r: 5, l: "zh" },
    { n: "赵丽颖", t: "司机说英语不错，沟通没问题。", r: 5, l: "zh" },
    { n: "王俊凯", t: "路上堵车很严重，但是司机很淡定。", r: 5, l: "zh" },
    { n: "易烊千玺", t: "坐车很舒服，睡了好几次。", r: 5, l: "zh" },

    // KOREAN (20 reviews)
    { n: "김민준", t: "기사님이 친절하고 맛집 많이 알아서 좋았어요.", r: 5, l: "ko" },
    { n: "이지은", t: "차 깨끗하고 에어컨 잘 나와요.", r: 5, l: "ko" },
    { n: "박서준", t: "가격 투명하고 추가비용 없어요.", r: 5, l: "ko" },
    { n: "최우식", t: "기사님이 지름길 알아서 교통 피하는데 도움줌.", r: 5, l: "ko" },
    { n: "제니", t: "쇼핑 2시간 동안 기다려줘서 고마워요.", r: 5, l: "ko" },
    { n: "지수", t: "공항 픽업 새벽인데도 와있어요.", r: 5, l: "ko" },
    { n: "로제", t: "차에 충전기 있어서 편해요.", r: 5, l: "ko" },
    { n: "뷔", t: "아이들한테 과자 주면서 친절해요.", r: 5, l: "ko" },
    { n: "리사", t: "종일 가격 합리해요.", r: 5, l: "ko" },
    { n: "손흥민", t: "짐 무겁은데 들어줘서 고마워요.", r: 5, l: "ko" },
    { n: "박보검", t: "갑자기 예약했는데 빨리 와요.", r: 5, l: "ko" },
    { n: "수지", t: "차 좀 올드했지만 깨끗해요.", r: 4, l: "ko" },
    { n: "김태형", t: "기사님이 예의바르게 문 열어줘요.", r: 5, l: "ko" },
    { n: "정국", t: "사람 많은 곳 안가고 조용한 데 데려다줘요.", r: 5, l: "ko" },
    { n: "뷔", t: "발리 더워서 에어컨 잘 나와서 다행이에요.", r: 5, l: "ko" },
    { n: "지민", t: "3일 예약하면 가격 좀 깎아줘요.", r: 5, l: "ko" },
    { n: "제이홉", t: "좋고 저렴한 호텔 찾아줘요.", r: 5, l: "ko" },
    { n: "아이유", t: "영어 되서 소통 문제 없어요.", r: 5, l: "ko" },
    { n: "강동원", t: "교통 심한데 기사님 침착해요.", r: 5, l: "ko" },
    { n: "이준혁", t: "차 편해서 몇 번 잤어요.", r: 5, l: "ko" },

    // JAPANESE (20 reviews)
    { n: "田中誠", t: "運転手さんは親切で、美味しい店をよく知ってます。", r: 5, l: "ja" },
    { n: "鈴木花", t: "車は綺麗、エアコンも効いてます。", r: 5, l: "ja" },
    { n: "佐藤健", t: "料金は透明で、追加料金なし。", r: 5, l: "ja" },
    { n: "高橋美", t: "渋道知ってるから、渋滞避けられた。", r: 5, l: "ja" },
    { n: "伊藤龍", t: "買い物2時間待ってくれてありがとう。", r: 5, l: "ja" },
    { n: "渡辺真", t: "空港送迎朝なのに来てた。", r: 5, l: "ja" },
    { n: "山田優", t: "車に充電器あるの便利。", r: 5, l: "ja" },
    { n: "中村彩", t: "子供に優しい、飴くれた。", r: 5, l: "ja" },
    { n: "小林強", t: "一日料金は合理的。", r: 5, l: "ja" },
    { n: "加藤大", t: "荷物重いのに持ってくれた。", r: 5, l: "ja" },
    { n: "松田明", t: "急に予約したのにすぐ来た。", r: 5, l: "ja" },
    { n: "井上涼", t: "車ちょっと古いけど綺麗。", r: 4, l: "ja" },
    { n: "木村拓", t: "礼儀正しくドア開けてくれる。", r: 5, l: "ja" },
    { n: "石田さ", t: "混んでるところ避けて、静かなとこ連れてってくれた。", r: 5, l: "ja" },
    { n: "斎藤麻", t: "バリ暑いけどエアコン効いてて助かった。", r: 5, l: "ja" },
    { n: "近藤和", t: "3日予約で少し安くなった。", r: 5, l: "ja" },
    { n: "藤井孝", t: "安くていいホテル探してくれた。", r: 5, l: "ja" },
    { n: "坂田亮", t: "英語通じるから問題ない。", r: 5, l: "ja" },
    { n: "遠藤剛", t: "渋滞ひどいけど運転手は落ち着いてる。", r: 5, l: "ja" },
    { n: "青木隆", t: "車快適、よく寝た。", r: 5, l: "ja" },

    // ARABIC (15 reviews)
    { n: "أحمد محمد", t: "السائق لطيف ويعرف المطاعم الجيدة.", r: 5, l: "ar" },
    { n: "فاطمة علي", t: "السيارة نظيفة والتكييف بارد.", r: 5, l: "ar" },
    { n: "محمد حسن", t: "السعر شفاف بدون رسوم إضافية.", r: 5, l: "ar" },
    { n: "عائشة أحمد", t: "السائق يعرف طرق مختصرة لتجنب الزحام.", r: 5, l: "ar" },
    { n: "عمر فاروق", t: "انتظرنا بصبر أثناء التسوق.", r: 5, l: "ar" },
    { n: "خالد رحمان", t: "المطار في الصباح كان السائق منتظر.", r: 5, l: "ar" },
    { n: "يوسف أمير", t: "السيارة فيها شاحن جوال مناسب.", r: 5, l: "ar" },
    { n: "نورا حسن", t: "السائق لطيف مع الأطفال.", r: 5, l: "ar" },
    { n: "محمود علي", t: "السعر المعقول لليوم كامل.", r: 5, l: "ar" },
    { n: "سارة محمد", t: "ساعدنا في حمل الحقائب الثقيلة.", r: 5, l: "ar" },
    { n: "عبد الله أحمد", t: "حجزت فجأة جاء السائق بسرعة.", r: 5, l: "ar" },
    { n: "منى حسن", t: "السيارة قديمة قليلاً ولكن نظيفة.", r: 4, l: "ar" },
    { n: "فيصل محمد", t: "السائق مهذب يفتح الباب لنا.", r: 5, l: "ar" },
    { n: "ريم أحمد", t: "السائق يعرف أماكن غير مزدحمة.", r: 5, l: "ar" },
    { n: "كريم علي", t: "درجة الحرارة عالية ولكن التكييف ممتاز.", r: 5, l: "ar" },

    // RUSSIAN (15 reviews)
    { n: "Иван Петров", t: "Водитель вежливый, знает хорошие рестораны.", r: 5, l: "ru" },
    { n: "Анна Смирнова", t: "Машина чистая, кондиционер работает отлично.", r: 5, l: "ru" },
    { n: "Дмитрий Волков", t: "Цена прозрачная, без скрытых платежей.", r: 5, l: "ru" },
    { n: "Мария Соколова", t: "Водитель знает короткие пути, объезжает пробки.", r: 5, l: "ru" },
    { n: "Сергей Попов", t: "Ждал нас терпеливо пока мы покупали сувениры.", r: 5, l: "ru" },
    { n: "Елена Иванова", t: "Раннее утро, водитель уже ждал в аэропорту.", r: 5, l: "ru" },
    { n: "Алексей Кузнецов", t: "В машине есть зарядки для телефонов, удобно.", r: 5, l: "ru" },
    { n: "Ольга Николаева", t: "Водитель добрый к детям, давал конфеты.", r: 5, l: "ru" },
    { n: "Павел Морозов", t: "Цена разумная для всего дня.", r: 5, l: "ru" },
    { n: "Наталья Лебедева", t: "Помог с тяжелыми чемоданами.", r: 5, l: "ru" },
    { n: "Виктор Новиков", t: "Забронировал срочно, водитель приехал быстро.", r: 5, l: "ru" },
    { n: "Татьяна Романова", t: "Машина немного старая, но чистая.", r: 4, l: "ru" },
    { n: "Александр Соколов", t: "Водитель вежлив, всегда открывает двери.", r: 5, l: "ru" },
    { n: "Екатерина Петрова", t: "Водитель знает тихие места без туристов.", r: 5, l: "ru" },
    { n: "Михаил Федоров", t: "Жара, но кондиционер спасает.", r: 5, l: "ru" },

    // TURKISH (5 reviews)
    { n: "Ahmet Yılmaz", t: "Sürücü nazik, iyi yerler biliyor.", r: 5, l: "tr" },
    { n: "Fatma Demir", t: "Araba temiz, klima çok iyi çalışıyor.", r: 5, l: "tr" },
    { n: "Mehmet Özcan", t: "Fiyat şeffaf, ekstra ücret yok.", r: 5, l: "tr" },
    { n: "Ayşe Kaya", t: "Sürücü kısa yolları biliyor, trafikten kaçıyoruz.", r: 5, l: "tr" },
    { n: "Ali Çelik", t: "Ağır valizlerimizi taşıdı, çok sağlam.", r: 5, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'customer_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDateLast90Days()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Script 1: Successfully added ${dataToInsert.length} reviews!`)
}

seedReviews1()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
