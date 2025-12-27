import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 19-24 bulan terakhir
function getDate19to24MonthsAgo() {
  const now = new Date()
  const twentyFourMonthsAgo = new Date(now.getTime() - (720 * 24 * 60 * 60 * 1000))
  const nineteenMonthsAgo = new Date(now.getTime() - (570 * 24 * 60 * 60 * 1000))
  return new Date(twentyFourMonthsAgo.getTime() + Math.random() * (nineteenMonthsAgo.getTime() - twentyFourMonthsAgo.getTime()))
}

async function seedYear3Reviews() {
  console.log('🌱 Seeding 150 Reviews (19-24 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Fajar Nugroho", t: "Drivernya lumayan sih, tp mobilnya agak tua. Masih jalan.", r: 3, l: "id" },
    { n: "Dewi Sartika", t: "Harganya lumayan mahal, ga sebanding sama pelayanan.", r: 3, l: "id" },
    { n: "Andi Wijaya", t: "Drivernya sering telat jemput, nunggu lama banget.", r: 3, l: "id" },
    { n: "Siti Aminah", t: "AC mobilnya ga dingin banget, panas di dalem. Ga enak.", r: 3, l: "id" },
    { n: "Budi Kurniawan", t: "Drivernya ga hapal jalan ke Nusa Penida, sesak.", r: 3, l: "id" },
    { n: "Rina Anggraini", t: "Mobilnya berdebu banget, jarang kayaknya dicuci.", r: 3, l: "id" },
    { n: "Hendra Wijaya", t: "Drivernya suka nyalakan music keras, ga ditanya dulu.", r: 3, l: "id" },
    { n: "Mega Pertiwi", t: "Driver kurang sabar, suka marah-marah di jalan.", r: 3, l: "id" },
    { n: "Yudi Pratama", t: "Drivernya oke tp kurang ramah ke tamu.", r: 3, l: "id" },
    { n: "Fitria Handayani", t: "Booking-nya ribet, WA sering ga dibales.", r: 3, l: "id" },
    { n: "Reza Permana", t: "Drivernya asik diajak ngobrol, teman saya suka.", r: 5, l: "id" },
    { n: "Anita Kusuma", t: "Drivernya pinter cari jalan pas macet parah.", r: 4, l: "id" },
    { n: "Ratna Sari", t: "Drivernya bantuin banget, bawain barang sampe ke hotel.", r: 5, l: "id" },
    { n: "Dimas Pratama", t: "Drivernya sabar nungguin kita foto-foto setiap spot.", r: 5, l: "id" },
    { n: "Wulan Maharani", t: "Mobilnya bersih banget, wangi segar. Nyaman.", r: 5, l: "id" },
    { n: "Eko Nugroho", t: "Drivernya bisa bhs inggris lumayan, bule bisa ngobrol.", r: 4, l: "id" },
    { n: "Susi Wulandari", t: "Harga udah termasuk bensin sama driver, jadi ga ribet.", r: 4, l: "id" },
    { n: "Toni Hermawan", t: "Jemput di bandara pas waktu, driver stand by di lobi.", r: 4, l: "id" },
    { n: "Rina Pertiwi", t: "Drivernya tau tempat makan halal yg enak.", r: 4, l: "id" },
    { n: "Doni Setiawan", t: "Drivernya jaga privacy banget, ga kepo urusan pribadi.", r: 5, l: "id" },
    { n: "Maya Anggraini", t: "Drivernya sopan banget, buka pintu dan bantuin koper.", r: 5, l: "id" },
    { n: "Gilang Ramadhan", t: "Drivernya bawa minum mineral di mobil, gratis buat kita.", r: 4, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "John Miller", t: "Driver was okay but car was quite old. Still works.", r: 3, l: "en" },
    { n: "Emily Chen", t: "Price was quite expensive, not worth the service.", r: 3, l: "en" },
    { n: "James Wilson", t: "Driver was often late for pickup, waited a long time.", r: 3, l: "en" },
    { n: "Sarah Davis", t: "AC wasn't cold at all, very hot inside. Uncomfortable.", r: 3, l: "en" },
    { n: "Michael Brown", t: "Driver didn't know Nusa Penida roads well, got lost.", r: 3, l: "en" },
    { n: "Jessica Taylor", t: "Car was very dusty, seems rarely washed.", r: 3, l: "en" },
    { n: "David Anderson", t: "Driver liked playing loud music without asking first.", r: 3, l: "en" },
    { n: "Olivia Moore", t: "Driver had no patience, got angry on the road.", r: 3, l: "en" },
    { n: "Daniel Lee", t: "Driver was okay but not very friendly to guests.", r: 3, l: "en" },
    { n: "Sophie Harris", t: "Booking was difficult, WhatsApp often not replied.", r: 3, l: "en" },
    { n: "Chris Martinez", t: "Driver was fun to talk to, my friend liked him!", r: 5, l: "en" },
    { n: "Emma Clark", t: "Driver skilled at finding routes when traffic was bad.", r: 4, l: "en" },
    { n: "Matthew Lewis", t: "Driver was very helpful, carried luggage to hotel room.", r: 5, l: "en" },
    { n: "Jennifer Walker", t: "Driver was patient waiting for photos at each spot.", r: 5, l: "en" },
    { n: "Robert Young", t: "Car was super clean, smelled fresh. Comfortable.", r: 5, l: "en" },
    { n: "Amanda Garcia", t: "Driver speaks decent English, foreigners can chat.", r: 4, l: "en" },
    { n: "Joshua King", t: "Price included petrol and driver. No hassle.", r: 4, l: "en" },
    { n: "Ashley Robinson", t: "Airport pickup was on time, driver was standing by.", r: 4, l: "en" },
    { n: "Ryan Hall", t: "Driver knows good halal restaurants.", r: 4, l: "en" },
    { n: "Stephanie White", t: "Driver respected privacy, didn't pry into personal stuff.", r: 5, l: "en" },
    { n: "Kevin Davis", t: "Driver was very polite, opened doors, helped with luggage.", r: 5, l: "en" },
    { n: "Michelle Brown", t: "Driver provided free mineral water. Nice touch!", r: 4, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Wang Wei", t: "司机还好，但车比较旧。还能用。", r: 3, l: "zh" },
    { n: "Li Na", t: "价格有点贵，服务不值这个价钱。", r: 3, l: "zh" },
    { n: "Zhang Qiang", t: "司机经常迟到，等了很久。", r: 3, l: "zh" },
    { n: "Liu Mei", t: "空调一点都不冷，里面很热。不舒服。", r: 3, l: "zh" },
    { n: "Chen Wei", t: "司机不太熟悉佩尼达岛的路，迷路了。", r: 3, l: "zh" },
    { n: "Yang Li", t: "车很脏，好像很少洗。", r: 3, l: "zh" },
    { n: "Zhao Hua", t: "司机喜欢大声放音乐，不先问我们。", r: 3, l: "zh" },
    { n: "Wu Yan", t: "司机没有耐心，路上会生气。", r: 3, l: "zh" },
    { n: "Sun Ming", t: "司机还可以，但对客人不太友好。", r: 3, l: "zh" },
    { n: "Li Na", t: "预订很困难，WhatsApp经常不回。", r: 3, l: "zh" },
    { n: "Zhang Wei", t: "司机很有趣，我的朋友喜欢他！", r: 5, l: "zh" },
    { n: "Liu Yang", t: "堵车时很会找路。", r: 4, l: "zh" },
    { n: "Chen Jie", t: "司机很帮忙，把行李送到房间。", r: 5, l: "zh" },
    { n: "Yang Xi", t: "在每个景点等我们拍照很有耐心。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "车超级干净，闻起来很新鲜。舒服。", r: 5, l: "zh" },
    { n: "Wu Gang", t: "会说一点英语，外国人可以聊天。", r: 4, l: "zh" },
    { n: "Zhou Xun", t: "价格已经包含油费和司机，不麻烦。", r: 4, l: "zh" },
    { n: "Ma Yun", t: "机场接机准时，司机在等。", r: 4, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Kim Min-jun", t: "기사님 괜찮은데 차 좀 오래됐어요. 돌아가요.", r: 3, l: "ko" },
    { n: "Lee Ji-eun", t: "가격 좀 비싸요. 서비스가 이 가격에 안 맞아요.", r: 3, l: "ko" },
    { n: "Park Seo-joon", t: "자주 지각해서 기다리는 시간 김어요.", r: 3, l: "ko" },
    { n: "Choi Woo-shik", t: "에어컨 전혀 안시워요. 안에 덥어요.", r: 3, l: "ko" },
    { n: "Song Joong-ki", t: "누사페니다 길을 잘 몰라서 헤맸어요.", r: 3, l: "ko" },
    { n: "Hyun Bin", t: "차 더러워요. 잘 안 씻는 것 같아요.", r: 3, l: "ko" },
    { n: "Son Ye-jin", t: "먼저 묻지 않고 음악 크게 틀어요.", r: 3, l: "ko" },
    { n: "Lee Min-ho", t: "기사님이 인내심이 없어요. 길에서 화내요.", r: 3, l: "ko" },
    { n: "Kim Go-eun", t: "기사님 괜찮은데 손님한테 별로 친절하지 않아요.", r: 3, l: "ko" },
    { n: "Suzy", t: "예약하기 어려워요. 카톡 답장 안 와요.", r: 3, l: "ko" },
    { n: "Gong Yoo", t: "기사님이 재밌어서 칭구가 좋아해요!", r: 5, l: "ko" },
    { n: "Jun Ji-hyun", t: "막힐 때 길 잘 찾아요.", r: 4, l: "ko" },
    { n: "Park Bo-gum", t: "짐 들여서 방까지 도와줘요.", r: 5, l: "ko" },
    { n: "Lee Jong-suk", t: "모든 관광지서 사진 찍을 때 인내심 있게 기다려줘요.", r: 5, l: "ko" },
    { n: "Kim Tae-hyung", t: "차 엄청 깨끗하고 냄새 좋아요. 편해요.", r: 5, l: "ko" },
    { n: "Jennie", t: "영어 조금 해서 외국인이랑 대화돼요.", r: 4, l: "ko" },
    { n: "V", t: "가격에 기름값이랑 기사님 요금 포함돼있어요.", r: 4, l: "ko" },
    { n: "Rose", t: "공항 픽업 제시간에 와서 기다리고 있어요.", r: 4, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Carlos Santos", t: "Motorista okay mas carro era bem velho. Ainda funciona.", r: 3, l: "pt" },
    { n: "Ana Costa", t: "Preço bastante caro, serviço não vale o preço.", r: 3, l: "pt" },
    { n: "João Oliveira", t: "Motorista frequentemente atrasado, espera longa.", r: 3, l: "pt" },
    { n: "Maria Lima", t: "AC não gelava nada, muito quente dentro. Desconfortável.", r: 3, l: "pt" },
    { n: "Pedro Ferreira", t: "Motorista não conhecia bem Nusa Penida, perdeu-se.", r: 3, l: "pt" },
    { n: "Lucas Alves", t: "Carro muito empoeirado, parece raramente lavado.", r: 3, l: "pt" },
    { n: "Juliana Rodrigues", t: "Motorista gostava de música alta sem perguntar.", r: 3, l: "pt" },
    { n: "Rafael Gomes", t: "Motorista sem paciência, ficava bravo na rua.", r: 3, l: "pt" },
    { n: "Bruna Pereira", t: "Motorista okay mas não muito simpático com hóspedes.", r: 3, l: "pt" },
    { n: "Diego Martins", t: "Reserva difícil, WhatsApp raramente respondia.", r: 3, l: "pt" },
    { n: "Camila Rocha", t: "Motorista divertido, meu amigo gostou dele!", r: 5, l: "pt" },
    { n: "Felipe Viana", t: "Encontra rotas bem quando o trânsito estava ruim.", r: 4, l: "pt" },
    { n: "Patricia Castro", t: "Muito prestativo, levou malas até o quarto.", r: 5, l: "pt" },
    { n: "Gustavo Nunes", t: "Paciente esperando fotos em cada ponto.", r: 5, l: "pt" },
    { n: "Renata Carvalho", t: "Carro super limpo, cheiro fresco. Confortável.", r: 5, l: "pt" },
    { n: "André Ribeiro", t: "Fala inglês razoável, estrangeiros conversam.", r: 4, l: "pt" },
    { n: "Lívia Mendes", t: "Preço inclui gasolina e motorista. Sem estresse.", r: 4, l: "pt" },
    { n: "Rafael Dias", t: "Pickup aeroporto no horário, motorista esperando.", r: 4, l: "pt" },
    { n: "Fernanda Souza", t: "Motorista respeitou privacidade, não mexeu em pessoal.", r: 5, l: "pt" },
    { n: "Marcos Moreira", t: "Muito educado, abriu portas, ajudou com malas.", r: 5, l: "pt" },
    { n: "Bruna Lima", t: "Tinha água mineral grátis. Bom toque!", r: 4, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Ahmed Ali", t: "السائق جيد لكن السيارة قديمة قليلاً. لا تزال تعمل.", r: 3, l: "ar" },
    { n: "Fatima Hassan", t: "السعر غالي جداً، الخدمة لا تستحق هذا السعر.", r: 3, l: "ar" },
    { n: "Omar Farooq", t: "السائق كثيراً يتأخر، الانتظار طويل.", r: 3, l: "ar" },
    { n: "Khalid Rahman", t: "المكيف لا يعمل، داخل حار جداً. غير مريح.", r: 3, l: "ar" },
    { n: "Yusuf Amir", t: "السائق لا يعرف جيداً نوسا بينيد، ضاع.", r: 3, l: "ar" },
    { n: "Aisha Karim", t: "السيارة متسخة جداً، يبدو أنها لا تغسل.", r: 3, l: "ar" },
    { n: "Nasser Al-Attiyah", t: "السائق يحب الموسيقى الصاخبة دون سؤال أولاً.", r: 3, l: "ar" },
    { n: "Dina Ahmed", t: "السائق لا يتحمل، يغضب على الطريق.", r: 3, l: "ar" },
    { n: "Hassan Mohamed", t: "السائق جيد لكنه ليس ودياً جداً مع الضيوف.", r: 3, l: "ar" },
    { n: "Mona Ali", t: "الحجز صعب، واتساب نادراً ما يرد.", r: 3, l: "ar" },
    { n: "Karim Mahmoud", t: "السائق ممتع، صديقي يحبه!", r: 5, l: "ar" },
    { n: "Layla Hussein", t: "يجيد الطرق البديلة عند الازدحام.", r: 4, l: "ar" },
    { n: "Tariq Mohamed", t: "متعبت جداً، حمل الحقائب إلى الغرفة.", r: 5, l: "ar" },
    { n: "Sara Ahmed", t: "صبور جداً عند التقاط الصور في كل نقطة.", r: 5, l: "ar" },
    { n: "Amir Hassan", t: "السيارة نظيفة جداً، ورائحة منعشة. مريحة.", r: 5, l: "ar" },
    { n: "Fatima Khaled", t: "يتحدث الإنجليزية بشكل معقول، الأجانب يمكنهم التحدث.", r: 4, l: "ar" },
    { n: "Youssef Ali", t: "السعر يشمل البنزين والسائق. بدون متاعب.", r: 4, l: "ar" },
    { n: "Nadia Mahmoud", t: "الاستقبال في المطار في الوقت المحدد، السائق ينتظر.", r: 4, l: "ar" },
    { n: "Hassan Farooq", t: "السائق يحترم الخصوصية، لا يسأل عن أشياء شخصية.", r: 5, l: "ar" },
    { n: "Mona Ali", t: "مؤدب جداً، يفتح الأبواب ويساعد في الحقائب.", r: 5, l: "ar" },
    { n: "Tariq Mohamed", t: "كان هناك مياه معدنية مجانية. لطيف!", r: 4, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Ivan Petrov", t: "Водитель неплох но мащина довольно старая. Едет.", r: 3, l: "ru" },
    { n: "Anna Smirnova", t: "Цена довольно высокая, сервис не оправдывает.", r: 3, l: "ru" },
    { n: "Dmitry Volkov", t: "Водитель часто опаздывал, долгое ожидание.", r: 3, l: "ru" },
    { n: "Maria Sokolova", t: "Кондер вообще не работал, внутри жарко. Некомфортно.", r: 3, l: "ru" },
    { n: "Sergei Popov", t: "Водитель плохо знал Нуса Пенида, терялся.", r: 3, l: "ru" },
    { n: "Vladimir Ivanov", t: "Машина очень пыльная, редко моется похоже.", r: 3, l: "ru" },
    { n: "Elena Kuznetsova", t: "Водитель любил громкую музыку без спроса.", r: 3, l: "ru" },
    { n: "Alexey Smirnov", t: "У водителя нет терпения, злился на дороге.", r: 3, l: "ru" },
    { n: "Natalia Volkova", t: "Водитель ок но не очень дружелюбен с гостями.", r: 3, l: "ru" },
    { n: "Pavel Ivanov", t: "Бронирование сложно, WhatsApp редко отвечал.", r: 3, l: "ru" },
    { n: "Tatiana Popova", t: "Водитель веселый, друг ему понравился!", r: 5, l: "ru" },
    { n: "Igor Kuznetsov", t: "Находит альтернативные маршруты при пробках.", r: 4, l: "ru" },
    { n: "Olga Smirnova", t: "Очень помог, нёс чемодан до номера.", r: 5, l: "ru" },
    { n: "Andrey Volkov", t: "Терпеливо ждал пока мы фотографировали в каждой точке.", r: 5, l: "ru" },
    { n: "Maria Kuznetsova", t: "Машина супер чистая, свежая. Комфортно.", r: 5, l: "ru" },
    { n: "Dmitri Ivanov", t: "Говорит анлийский прилично, иностранные могут общаться.", r: 4, l: "ru" },
    { n: "Anna Volkova", t: "Цена включает бензин и водителя. Без хлопот.", r: 4, l: "ru" },
    { n: "Sergei Kuznetsov", t: "Встреча в аэропорту вовремя, водитель ждал.", r: 4, l: "ru" },
    { n: "Natalia Popova", t: "Водитель уважал приватность, не лез в личное.", r: 5, l: "ru" },
    { n: "Pavel Ivanov", t: "Очень вежлив, открывал двери, помог с багажом.", r: 5, l: "ru" },
    { n: "Tatiana Smirnova", t: "Была бесплатная вода. Хороший жест!", r: 4, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Ahmet Yilmaz", t: "Sürücü iyi ama araba biraz eski. Hala gidiyor.", r: 3, l: "tr" },
    { n: "Ayşe Demir", t: "Fiyat biraz pahalı, hizmet bu fiyatı haketmez.", r: 3, l: "tr" },
    { n: "Mehmet Kaya", t: "Sürücü sıkça geç kalıyor, beklemek uzun.", r: 3, l: "tr" },
    { n: "Fatma Özkan", t: "Klima hiç çalışmıyor, içerisi çok sıcak. Rahatsız.", r: 3, l: "tr" },
    { n: "Ali Çelik", t: "Sürücü Nusa Penida yollarını iyi bilmiyor, kayboldu.", r: 3, l: "tr" },
    { n: "Zeynep Yildiz", t: "Araba çok tozlu, nadiren yıkanıyormuş gibi.", r: 3, l: "tr" },
    { n: "Mustafa Arslan", t: "Sürücü sorunsuz yüksek sesli müzik seviyor.", r: 3, l: "tr" },
    { n: "Elif Şahin", t: "Sürücünün sabrı yok, yolda kızıyor.", r: 3, l: "tr" },
    { n: "Burak Koç", t: "Sürücü iyi ama misafirlere çok kibar değil.", r: 3, l: "tr" },
    { n: "Selin Yilmaz", t: "Rezervasyon zor, WhatsApp cevap vermiyor.", r: 3, l: "tr" },
    { n: "Emre Demir", t: "Sürücü eğlenceli, arkadaşı sevdi!", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Trafik sıkıştığında iyi alternatif yol buluyor.", r: 4, l: "tr" },
    { n: "Ceren Özkan", t: "Çok yardımcı, bavajaları odaya kadar taşıdı.", r: 5, l: "tr" },
    { n: "Can Arslan", t: "Her noktada fotoğraf çekerken sabırla bekledi.", r: 5, l: "tr" },
    { n: "Merve Yildiz", t: "Araba çok temiz, taz kokuyor. Rahat.", r: 5, l: "tr" },
    { n: "Tolga Demir", t: "Biraz İngilizce konuşuyor, yabancılarla konuşabilir.", r: 4, l: "tr" },
    { n: "Buse Kaya", t: "Fiyat benzin ve sürücüyü dahil ediyor. Sorun yok.", r: 4, l: "tr" },
    { n: "Oğuz Arslan", t: "Havalimanı transferi zamanında, sürücü bekliyor.", r: 4, l: "tr" },
    { n: "Selin Yilmaz", t: "Mahremiyete saygı duyuyor, kişisel şeyler sormuyor.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Çok nazik, kapıları açtı, bavullara yardımcı oldu.", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Bedava maden suyu vardı. İyi jest!", r: 4, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDate19to24MonthsAgo()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (19-24 Months ago)!`)
}

seedYear3Reviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
