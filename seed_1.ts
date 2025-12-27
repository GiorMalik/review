import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 1-3 bulan terakhir
function getDateLast3Months() {
  const now = new Date()
  const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))
  return new Date(threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime()))
}

async function seedRecentReviews() {
  console.log('🌱 Seeding 150 Reviews (1-3 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Raka Saputra", t: "Driver-nya asik banget diajak ngobrol, pas macet ga kerasa bosen. Recommended!", r: 5, l: "id" },
    { n: "Sari Rahayu", t: "Mobilnya bersih bgt, wangi segar. AC dingin pol cocok buat cuaca Bali yg panas bgt.", r: 5, l: "id" },
    { n: "Budi Santoso", t: "Harga udah net, pas nyampe ga ada tambahan biaya lg. Transparan.", r: 5, l: "id" },
    { n: "Citra Wulandari", t: "Anak-anak seneng bgt sama drivernya, sabar nungguin kita macet-macetan.", r: 5, l: "id" },
    { n: "Agus Prasetyo", t: "Jemput di bandara on time, driver udah nunggu dengan papan nama. Mantap!", r: 5, l: "id" },
    { n: "Fitri Handayani", t: "Drivernya hapal jalan tikus biar ga ketemu macet. Pinter banget sih.", r: 5, l: "id" },
    { n: "Dewi Kartika", t: "Minta stop buat beli minum, driver langsung bantuin cari indomaret yg deket.", r: 5, l: "id" },
    { n: "Rina Kusuma", t: "Mobilnya enak banget, suspensi empuk. Tidur pules pas di jalan.", r: 5, l: "id" },
    { n: "Doni Pratama", t: "Drivernya bisa bhs inggris dikit-dikit, temen saya dr luar negara bs ngobrol.", r: 4, l: "id" },
    { n: "Maya Putri", t: "Bookingnya gampang bgt, tinggal WA langsung dikonfirm. Ga ribet.", r: 5, l: "id" },
    { n: "Fajar Nugroho", t: "Drivernya ramah banget, senyum terus. Bikin perjalanan jadi nyaman.", r: 5, l: "id" },
    { n: "Wulan Sari", t: "Harga sewa mobilnya pas dikantong, buat budget pas-pasan oke.", r: 5, l: "id" },
    { n: "Reza Mahendra", t: "Drivernya sabar nungguin kita makan sampe 2 jam, ga ngerusak mood.", r: 5, l: "id" },
    { n: "Anita Permata", t: "Mobilnya baru kayaknya, bersih rapi. Interiornya oke.", r: 5, l: "id" },
    { n: "Rudi Hermawan", t: "Drivernya sopan banget, buka pintu kita smpe bantuin angkat koper.", r: 5, l: "id" },
    { n: "Lestari Pertiwi", t: "Worth it bgt sewa mobil disini. Driver-nya jagoan sih.", r: 5, l: "id" },
    { n: "Kiki Rahayu", t: "Drivernya ga ngebut, nyetir pelan aman. Cocok bawa keluarga.", r: 5, l: "id" },
    { n: "Eko Prasetyo", t: "Musik di mobil enak-enak, ga bikin pusing.", r: 4, l: "id" },
    { n: "Ratna Dewi", t: "Drivernya asli orang Bali, tau tempat makan yg enak dan murah.", r: 5, l: "id" },
    { n: "Toni Susanto", t: "Driver sabar banget nungguin kita foto-foto di tiap spot.", r: 5, l: "id" },
    { n: "Susi Anggraini", t: "Pelayanan bintang lima, harga bintang tiga. Murah bgt!", r: 5, l: "id" },
    { n: "Bambang Sutrisno", t: "Drivernya bisa jadi tour guide juga, jelasin tmpt wisata dgn detail.", r: 5, l: "id" },
    { n: "Rina Marlina", t: "Aman banget naik mobil ini, driver hati-hati bgt di jalan.", r: 5, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "Sarah Mitchell", t: "Driver was super friendly and funny! Made the long drive to Ubud enjoyable.", r: 5, l: "en" },
    { n: "James Wilson", t: "Car was spotless and smelled amazing. AC was freezing cold, perfect!", r: 5, l: "en" },
    { n: "Emily Chen", t: "No hidden fees! Price quoted was exactly what we paid. Very honest.", r: 5, l: "en" },
    { n: "Michael Brown", t: "Our kids loved the driver. He was so patient with them.", r: 5, l: "en" },
    { n: "Jessica Taylor", t: "Airport pickup was smooth. Driver was waiting with sign, no drama.", r: 5, l: "en" },
    { n: "David Lee", t: "Driver knew all the shortcuts to avoid traffic. Saved us so much time!", r: 5, l: "en" },
    { n: "Amanda White", t: "Asked to stop at a convenience store and driver immediately found the nearest one.", r: 5, l: "en" },
    { n: "Ryan Garcia", t: "Car suspension was so comfortable, I fell asleep on the way back.", r: 5, l: "en" },
    { n: "Sophie Martin", t: "Driver speaks good English. Communication was easy throughout.", r: 4, l: "en" },
    { n: "Daniel Kim", t: "Booking via WhatsApp was super easy and quick. Very responsive.", r: 5, l: "en" },
    { n: "Olivia Johnson", t: "Such a friendly driver! Always smiling and polite. Great service.", r: 5, l: "en" },
    { n: "Matthew Anderson", t: "Very reasonable prices compared to other options. Budget-friendly!", r: 5, l: "en" },
    { n: "Hannah Scott", t: "Waited for us while we ate for 2 hours without complaining. So patient!", r: 5, l: "en" },
    { n: "Chris Turner", t: "Car feels brand new. Clean interior and well-maintained.", r: 5, l: "en" },
    { n: "Nancy Lewis", t: "Very polite driver. Opened doors for us and helped with luggage.", r: 5, l: "en" },
    { n: "Andrew Clark", t: "Definitely worth it! Best driver we've had in Bali.", r: 5, l: "en" },
    { n: "Michelle Young", t: "Safe driver! Didn't speed, felt secure with my family.", r: 5, l: "en" },
    { n: "Joshua Martinez", t: "Music in the car was good, not too loud. Nice vibes.", r: 4, l: "en" },
    { n: "Ashley Robinson", t: "Driver is originally from Bali, took us to amazing local food spots!", r: 5, l: "en" },
    { n: "Brandon Walker", t: "Super patient while we took photos at every stop. Never rushed us.", r: 5, l: "en" },
    { n: "Stephanie Hall", t: "5-star service for 3-star price. Such a bargain!", r: 5, l: "en" },
    { n: "Kevin Adams", t: "Driver doubled as a tour guide, explained everything in detail.", r: 5, l: "en" },
    { n: "Rachel Green", t: "Felt very safe throughout the trip. Driver drives carefully.", r: 5, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Wang Wei", t: "司机很友好，一路上很愉快。推荐！", r: 5, l: "zh" },
    { n: "Li Na", t: "车很干净，空调很凉。满意。", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "价格透明，没有额外收费。", r: 5, l: "zh" },
    { n: "Liu Yang", t: "司机很耐心，对孩子很好。", r: 5, l: "zh" },
    { n: "Chen Jie", t: "机场接机很准时，司机举着牌子等。", r: 5, l: "zh" },
    { n: "Yang Xi", t: "司机知道抄近路，避开堵车。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "让我们停在便利店买东西，司机很配合。", r: 5, l: "zh" },
    { n: "Huang Jing", t: "车很舒服，我在路上睡着了。", r: 5, l: "zh" },
    { n: "Wu Gang", t: "司机会说一点英语，沟通没问题。", r: 4, l: "zh" },
    { n: "Zhou Xun", t: "WhatsApp预订很方便，回复很快。", r: 5, l: "zh" },
    { n: "Ma Yun", t: "司机很热情，一直微笑。", r: 5, l: "zh" },
    { n: "Pony Ma", t: "价格很合理，性价比很高。", r: 5, l: "zh" },
    { n: "Lei Jun", t: "等我们吃了两个小时，没有怨言。", r: 5, l: "zh" },
    { n: "Cheng Long", t: "车很新，内饰很干净。", r: 5, l: "zh" },
    { n: "Jet Li", t: "司机很有礼貌，帮忙提行李。", r: 5, l: "zh" },
    { n: "Stephen Chow", t: "非常值得！巴厘岛最好的司机。", r: 5, l: "zh" },
    { n: "Donnie Yen", t: "开车很稳，带家人很放心。", r: 5, l: "zh" },
    { n: "Jackie Chan", t: "车里音乐很好，不吵。", r: 4, l: "zh" },
    { n: "Andy Lau", t: "司机是本地人，带我们去吃了好吃的。", r: 5, l: "zh" },
    { n: "Tony Leung", t: "拍照时很有耐心，不催我们。", r: 5, l: "zh" },
    { n: "Gong Li", t: "服务很好，价格也便宜。", r: 5, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Kim Min-jun", t: "기사님이 친절해서 여행이 즐거웠어요.", r: 5, l: "ko" },
    { n: "Lee Ji-eun", t: "차가 깨끗하고 에어컨이 시원해요.", r: 5, l: "ko" },
    { n: "Park Seo-joon", t: "가격 투명해서 좋아요. 추가비용 없음.", r: 5, l: "ko" },
    { n: "Choi Woo-shik", t: "아이들에게 잘해주시는 기사님이에요.", r: 5, l: "ko" },
    { n: "Song Joong-ki", t: "공항 픽업 제시간에 와있고 팻트 있어요.", r: 5, l: "ko" },
    { n: "Hyun Bin", t: "지름길 알아서 정체 피했어요.", r: 5, l: "ko" },
    { n: "Son Ye-jin", t: "편의점 들러서 물 사는데 친절히 도와줘요.", r: 5, l: "ko" },
    { n: "Lee Min-ho", t: "차가 편해서 길에서 잤어요.", r: 5, l: "ko" },
    { n: "Kim Go-eun", t: "영어 좀 통해서 의사소통 문제 없었어요.", r: 4, l: "ko" },
    { n: "Suzy", t: "카톡으로 예약 쉽고 빨라요.", r: 5, l: "ko" },
    { n: "Gong Hyo-jin", t: "항상 웃는 기사님이라 좋아요.", r: 5, l: "ko" },
    { n: "So Ji-sub", t: "가격 합리해서 부담 없이 이용했어요.", r: 5, l: "ko" },
    { n: "Jun Ji-hyun", t: "우리 식사할 때 2시간이나 기다려줘요.", r: 5, l: "ko" },
    { n: "Park Bo-gum", t: "차가 새것처럼 깨끗해요.", r: 5, l: "ko" },
    { n: "Lee Jong-suk", t: "짐 들어주시고 문 열어주시고 정중해요.", r: 5, l: "ko" },
    { n: "Hwang Hee-chan", t: "발리 최고 기사님!", r: 5, l: "ko" },
    { n: "Lee Kang-in", t: "운전이 부드러워서 안전해요.", r: 5, l: "ko" },
    { n: "Kim Min-jae", t: "음악 좋고 소리 크지 않아요.", r: 4, l: "ko" },
    { n: "Kim Tae-hyung", t: "현지 분이라 맛집 잘 알아요.", r: 5, l: "ko" },
    { n: "Jennie", t: "사진 찍을 때 늘 기다려줘요.", r: 5, l: "ko" },
    { n: "V", t: "서비스 좋고 가격 저렴해요.", r: 5, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Carlos Silva", t: "Motorista muito simpático! Viagem foi muito agradável.", r: 5, l: "pt" },
    { n: "Ana Santos", t: "Carro muito limpo, ar geladinho. Perfeito!", r: 5, l: "pt" },
    { n: "João Oliveira", t: "Preço transparente, sem custos extras.", r: 5, l: "pt" },
    { n: "Maria Costa", t: "Motorista muito paciente com as crianças.", r: 5, l: "pt" },
    { n: "Pedro Lima", t: "Busca no aeroporto pontual. Muito bom.", r: 5, l: "pt" },
    { n: "Lucas Ferreira", t: "Sabe atalhos para evitar trânsito.", r: 5, l: "pt" },
    { n: "Juliana Rodrigues", t: "Parou em mercado quando pedimos.", r: 5, l: "pt" },
    { n: "Rafael Alves", t: "Carro confortável, dormi no caminho.", r: 5, l: "pt" },
    { n: "Bruna Pereira", t: "Fala inglês, comunicação fácil.", r: 4, l: "pt" },
    { n: "Diego Gomes", t: "Reserva fácil via WhatsApp.", r: 5, l: "pt" },
    { n: "Camila Martins", t: "Motorista sempre sorrindo, muito simpático!", r: 5, l: "pt" },
    { n: "Felipe Rocha", t: "Preço muito razoável.", r: 5, l: "pt" },
    { n: "Patricia Carvalho", t: "Esperou 2 horas com paciência.", r: 5, l: "pt" },
    { n: "Gustavo Nunes", t: "Carro novo e bem cuidado.", r: 5, l: "pt" },
    { n: "Renata Castro", t: "Muito educado, ajudou com as malas.", r: 5, l: "pt" },
    { n: "André Melo", t: "Melhor motorista de Bali!", r: 5, l: "pt" },
    { n: "Carolina Barros", t: "Dirige com segurança, ótimo.", r: 5, l: "pt" },
    { n: "Rodrigo Viana", t: "Música boa no carro.", r: 4, l: "pt" },
    { n: "Fernanda Ribeiro", t: "Conhece restaurantes locais ótimos.", r: 5, l: "pt" },
    { n: "Marcos Dias", t: "Muito paciente para fotos.", r: 5, l: "pt" },
    { n: "Lívia Mendes", t: "Serviço ótimo, preço barato.", r: 5, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Ahmed Ali", t: "السائق ودود جداً! رحلة ممتعة.", r: 5, l: "ar" },
    { n: "Mohamed Salah", t: "السيارة نظيفة جداً، مكيف ممتاز.", r: 5, l: "ar" },
    { n: "Fatima Hassan", t: "السعر شفاف، لا يوجد تكاليف إضافية.", r: 5, l: "ar" },
    { n: "Omar Farooq", t: "السائق صبور مع الأطفال.", r: 5, l: "ar" },
    { n: "Khalid Rahman", t: "الاستقبال في المطار في الوقت المحدد.", r: 5, l: "ar" },
    { n: "Yusuf Amir", t: "السائق يعرف الطرق المختصرة لتجنب الزحام.", r: 5, l: "ar" },
    { n: "Aisha Karim", t: "أوقف عند المتجر عندما طلبنا.", r: 5, l: "ar" },
    { n: "Nasser Al-Attiyah", t: "السيارة مريحة، نمت أثناء الطريق.", r: 5, l: "ar" },
    { n: "Dina Ahmed", t: "يتحدث الإنجليزية قليلاً، التواصل سهل.", r: 4, l: "ar" },
    { n: "Hassan Mohamed", t: "الحجز عبر واتساب سهل وسريع.", r: 5, l: "ar" },
    { n: "Mona Ali", t: "السائق يبتسم دائماً، لطيف جداً.", r: 5, l: "ar" },
    { n: "Karim Mahmoud", t: "السعر معقول جداً.", r: 5, l: "ar" },
    { n: "Layla Hussein", t: "انتظرنا ساعتين بصبر دون شكوى.", r: 5, l: "ar" },
    { n: "Omar Khaled", t: "السيارة جديدة ونظيفة.", r: 5, l: "ar" },
    { n: "Sara Ahmed", t: "مؤدب جداً، ساعد في حمل الحقائب.", r: 5, l: "ar" },
    { n: "Tariq Mohamed", t: "أفضل سائق في بالي!", r: 5, l: "ar" },
    { n: "Nadia Farooq", t: "قيادة آمنة ومريحة للعائلة.", r: 5, l: "ar" },
    { n: "Amir Hassan", t: "الموسيقى في السيارة جيدة.", r: 4, l: "ar" },
    { n: "Fatima Khaled", t: "يعرف مطاعم محلية رائعة.", r: 5, l: "ar" },
    { n: "Youssef Ali", t: "صبور جداً عند التقاط الصور.", r: 5, l: "ar" },
    { n: "Dalia Mahmoud", t: "خدمة ممتازة، سعر مناسب.", r: 5, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Ivan Petrov", t: "Очень дружелюбный водитель! Отличная поездка.", r: 5, l: "ru" },
    { n: "Anna Smirnova", t: "Машина чистая, кондиционер работает отлично.", r: 5, l: "ru" },
    { n: "Dmitry Volkov", t: "Прозрачные цены, без скрытых платежей.", r: 5, l: "ru" },
    { n: "Maria Sokolova", t: "Водитель очень терпелив с детьми.", r: 5, l: "ru" },
    { n: "Sergei Popov", t: "Встреча в аэропорту точно по времени.", r: 5, l: "ru" },
    { n: "Vladimir Ivanov", t: "Знает объездные пути от пробок.", r: 5, l: "ru" },
    { n: "Elena Ivanova", t: "Остановился в магазине, когда попросили.", r: 5, l: "ru" },
    { n: "Alexey Kuznetsov", t: "Машина удобная, уснул по дороге.", r: 5, l: "ru" },
    { n: "Olga Petrova", t: "Говорит немного английский, общение легкое.", r: 4, l: "ru" },
    { n: "Andrey Rublev", t: "Бронирование через WhatsApp просто и быстро.", r: 5, l: "ru" },
    { n: "Natalia Volkova", t: "Водитель всегда улыбается, очень вежливый.", r: 5, l: "ru" },
    { n: "Mikhail Gorbachev", t: "Цена очень разумная.", r: 5, l: "ru" },
    { n: "Katya Ivanova", t: "Ждал нас 2 часа с терпением.", r: 5, l: "ru" },
    { n: "Pavel Smirnov", t: "Машина новая и ухоженная.", r: 5, l: "ru" },
    { n: "Tatiana Popova", t: "Очень вежлив, помог с багажом.", r: 5, l: "ru" },
    { n: "Dmitri Kuznetsov", t: "Лучший водитель в Бали!", r: 5, l: "ru" },
    { n: "Svetlana Ivanova", t: "Безопасная вождение для семьи.", r: 5, l: "ru" },
    { n: "Alexei Volkov", t: "Хорошая музыка в машине.", r: 4, l: "ru" },
    { n: "Olga Rubleva", t: "Знает отличные местные рестораны.", r: 5, l: "ru" },
    { n: "Igor Smirnov", t: "Очень терпелив при фото.", r: 5, l: "ru" },
    { n: "Marina Kuznetsova", t: "Отличный сервис, хорошая цена.", r: 5, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Ahmet Yilmaz", t: "Çok nazik sürücü! Yolculuk harika.", r: 5, l: "tr" },
    { n: "Ayşe Demir", t: "Araba çok temiz, klima süper.", r: 5, l: "tr" },
    { n: "Mehmet Kaya", t: "Fiyat şeffaf, ekstra ücret yok.", r: 5, l: "tr" },
    { n: "Fatma Özkan", t: "Çocuklara çok sabırlı.", r: 5, l: "tr" },
    { n: "Ali Çelik", t: "Havalimanı transferi tam zamanında.", r: 5, l: "tr" },
    { n: "Zeynep Yildiz", t: "Trafikten kaçmak için kısa yollar biliyor.", r: 5, l: "tr" },
    { n: "Mustafa Arslan", t: "İstediğimizde markete durdu.", r: 5, l: "tr" },
    { n: "Elif Şahin", t: "Araba rahat, yolda uyudum.", r: 5, l: "tr" },
    { n: "Burak Koç", t: "Az ingilizce biliyor, iletişim kolay.", r: 4, l: "tr" },
    { n: "Selin Yilmaz", t: "WhatsApp ile rezervasyon kolay.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Her zaman gülüyor, çok kibar.", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Fiyat çok makul.", r: 5, l: "tr" },
    { n: "Ceren Özkan", t: "2 saat sabırla bekledi.", r: 5, l: "tr" },
    { n: "Can Arslan", t: "Araba yeni ve bakımlı.", r: 5, l: "tr" },
    { n: "Selin Şahin", t: "Çok nazik, bavullarla yardımcı oldu.", r: 5, l: "tr" },
    { n: "Oğuz Koç", t: "Bali'nin en iyi sürücüsü!", r: 5, l: "tr" },
    { n: "Merve Yildiz", t: "Güvenli sürüş, aile için iyi.", r: 5, l: "tr" },
    { n: "Tolga Demir", t: "Arabadaki müzik güzel.", r: 4, l: "tr" },
    { n: "Buse Kaya", t: "Harika yerel restoranlar biliyor.", r: 5, l: "tr" },
    { n: "Emre Arslan", t: "Fotoğraf çekerken çok sabırlı.", r: 5, l: "tr" },
    { n: "Deniz Özkan", t: "Harika servis, uygun fiyat.", r: 5, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDateLast3Months()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (1-3 Months ago)!`)
}

seedRecentReviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
