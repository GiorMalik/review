import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 7-9 bulan terakhir
function getDate7to9MonthsAgo() {
  const now = new Date()
  const nineMonthsAgo = new Date(now.getTime() - (270 * 24 * 60 * 60 * 1000))
  const sevenMonthsAgo = new Date(now.getTime() - (210 * 24 * 60 * 60 * 1000))
  return new Date(nineMonthsAgo.getTime() + Math.random() * (sevenMonthsAgo.getTime() - nineMonthsAgo.getTime()))
}

async function seedQuarter3Reviews() {
  console.log('🌱 Seeding 150 Reviews (7-9 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Gilang Ramadhan", t: "Drivernya orangnya asik, bisa diajak ketawa sepanjang jalan. Ga kerasa capek.", r: 5, l: "id" },
    { n: "Indah Permatasari", t: "Mobilnya ada charger buat semua jenis HP. Banyak banget colokan!", r: 5, l: "id" },
    { n: "Rendi Pratama", t: "Drivernya pinter cari jalan pas macet berat di Canggu.", r: 5, l: "id" },
    { n: "Linda Wati", t: "Bawa anak kecil, driver sabar banget nungguin ganti popok.", r: 5, l: "id" },
    { n: "Agus Setiawan", t: "Drivernya ga banyak nanya, cuma nyetir aja. Pede banget.", r: 5, l: "id" },
    { n: "Dewi Sartika", t: "Musiknya request sendiri, driver playlistin lagu favorit kita.", r: 5, l: "id" },
    { n: "Budi Kurniawan", t: "AC mobilnya dingin bgt, cocok banget buat panasnya Bali.", r: 5, l: "id" },
    { n: "Rina Anggraini", t: "Drivernya tau tempat oleh-oleh yg murah dan asli.", r: 5, l: "id" },
    { n: "Hendra Wijaya", t: "Harganya udah net, ga ada narik-narik lagi pas bayar.", r: 5, l: "id" },
    { n: "Siti Nurhaliza", t: "Drivernya bisa bhs Mandarin dikit, tamu dr China bisa ngobrol.", r: 5, l: "id" },
    { n: "Dimas Pratama", t: "Mobilnya bersih banget, ga ada bau apek sama sekali.", r: 5, l: "id" },
    { n: "Mega Pertiwi", t: "Drivernya bantuin angkatin stroller bayi naik turun mobil.", r: 5, l: "id" },
    { n: "Yudi Setiawan", t: "Drivernya bawa minum mineral di mobil, gratis buat kita.", r: 5, l: "id" },
    { n: "Fitria Handayani", t: "Drivernya nyetir hati-hati bgt, cocok bawa orang tua.", r: 5, l: "id" },
    { n: "Reza Permana", t: "Booking via WA cepet bgt, balesnya ga sampe 5 menit.", r: 5, l: "id" },
    { n: "Anita Kusuma", t: "Drivernya tau rute jalan yg indah buat foto view.", r: 5, l: "id" },
    { n: "Ratna Sari", t: "Drivernya bawa payung, pas kehujanan tinggal pake.", r: 5, l: "id" },
    { n: "Fajar Santoso", t: "Drivernya bisa jadi tour guide, jelasin tmpt wisata.", r: 5, l: "id" },
    { n: "Wulan Maharani", t: "Mobilnya empuk suspensi-nya, ga bikin badan pegel.", r: 5, l: "id" },
    { n: "Eko Nugroho", t: "Drivernya tau waktu terbaik buat ke tempat wisata.", r: 5, l: "id" },
    { n: "Susi Wulandari", t: "Drivernya sabar nungguin kita belanja di Krisna 2 jam.", r: 5, l: "id" },
    { n: "Toni Hermawan", t: "Harga sewanya termasuk driver bensin, tinggal duduk santai.", r: 5, l: "id" },
    { n: "Rina Pertiwi", t: "Drivernya ga merokok di mobil. Wangi banget!", r: 5, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "Daniel Wright", t: "Driver was so fun to talk to, trip went by fast!", r: 5, l: "en" },
    { n: "Rachel Green", t: "Car has chargers for all phone types. So many outlets!", r: 5, l: "en" },
    { n: "Chris Harris", t: "Driver knows routes when Canggu traffic gets bad.", r: 5, l: "en" },
    { n: "Emily Brown", t: "Traveling with a baby, driver patiently waited for diaper changes.", r: 5, l: "en" },
    { n: "Michael Lee", t: "Driver focused on driving, didn't talk much. Professional.", r: 5, l: "en" },
    { n: "Sarah Miller", t: "Requested our own music playlist, driver played it!", r: 5, l: "en" },
    { n: "James Taylor", t: "AC was freezing cold. Perfect for Bali's heat!", r: 5, l: "en" },
    { n: "Olivia Anderson", t: "Driver knew authentic cheap souvenir shops.", r: 5, l: "en" },
    { n: "David Moore", t: "Transparent pricing! No surprises when paying.", r: 5, l: "en" },
    { n: "Jennifer Clark", t: "Driver speaks some Mandarin. Chinese guests could chat.", r: 5, l: "en" },
    { n: "Robert Lewis", t: "Car was super clean, no weird smells at all.", r: 5, l: "en" },
    { n: "Amanda Walker", t: "Helped with baby stroller in and out of car.", r: 5, l: "en" },
    { n: "Joshua Hall", t: "Driver provided free mineral water. Nice touch!", r: 5, l: "en" },
    { n: "Michelle Young", t: "Safe driving style. Great for elderly passengers.", r: 5, l: "en" },
    { n: "Andrew King", t: "WhatsApp booking was super quick. Reply within 5 minutes.", r: 5, l: "en" },
    { n: "Stephanie Wright", t: "Driver knows scenic routes with great views for photos.", r: 5, l: "en" },
    { n: "Kevin Garcia", t: "Car had umbrellas ready when it rained.", r: 5, l: "en" },
    { n: "Ashley Martinez", t: "Driver doubled as tour guide. Explained everything!", r: 5, l: "en" },
    { n: "Ryan Robinson", t: "Car suspension was so comfortable, no body aches.", r: 5, l: "en" },
    { n: "Sophie Lewis", t: "Driver knows the best times to visit tourist spots.", r: 5, l: "en" },
    { n: "Daniel Walker", t: "Patiently waited while we shopped for 2 hours.", r: 5, l: "en" },
    { n: "Emma Hall", t: "Price included driver and petrol. Just sat back and relaxed.", r: 5, l: "en" },
    { n: "Michael Young", t: "Driver doesn't smoke in car. Smells so fresh!", r: 5, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Chen Wei", t: "司机很有趣，一路上聊天很开心。", r: 5, l: "zh" },
    { n: "Li Na", t: "车里各种手机充电器都有。很多插座！", r: 5, l: "zh" },
    { n: "Zhang Qiang", t: "苍古堵车的时候知道绕路。", r: 5, l: "zh" },
    { n: "Liu Mei", t: "带小宝宝，司机等换尿布很耐心。", r: 5, l: "zh" },
    { n: "Wang Fang", t: "司机专心开车，话不多。专业。", r: 5, l: "zh" },
    { n: "Yang Li", t: "我们点歌，司机播放了我们的歌单。", r: 5, l: "zh" },
    { n: "Zhao Hua", t: "空调很冷，巴厘岛这么热正好。", r: 5, l: "zh" },
    { n: "Wu Yan", t: "司机知道便宜正宗的纪念品店。", r: 5, l: "zh" },
    { n: "Sun Ming", t: "价格透明，付款时没有意外。", r: 5, l: "zh" },
    { n: "Li Na", t: "司机会说一点普通话，中国客人可以聊天。", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "车很干净，没有任何异味。", r: 5, l: "zh" },
    { n: "Liu Yang", t: "帮忙抬婴儿车进出车。", r: 5, l: "zh" },
    { n: "Chen Jie", t: "车里提供免费矿泉水。很贴心！", r: 5, l: "zh" },
    { n: "Yang Xi", t: "开车很稳，适合带老人。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "WhatsApp预订很快，5分钟内回复。", r: 5, l: "zh" },
    { n: "Wu Gang", t: "知道风景好的路线，适合拍照。", r: 5, l: "zh" },
    { n: "Zhou Xun", t: "下雨的时候有雨伞可用。", r: 5, l: "zh" },
    { n: "Ma Yun", t: "司机也当导游，解释得很清楚。", r: 5, l: "zh" },
    { n: "Pony Ma", t: "车很舒服，不累。", r: 5, l: "zh" },
    { n: "Lei Jun", t: "知道去景点的最佳时间。", r: 5, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Park Ji-sung", t: "기사님이 재밌어서 여행이 빨라가요.", r: 5, l: "ko" },
    { n: "Lee Young", t: "모든 폰 충전기 있어요. 충전구많아요!", r: 5, l: "ko" },
    { n: "Kim Min-jun", t: "찡구 막힐 때 우회로 알아요.", r: 5, l: "ko" },
    { n: "Choi Soo-young", t: "아기랑 가는데 기사님이 기다려줘요.", r: 5, l: "ko" },
    { n: "Son Heung-min", t: "기사님이 운전에만 집중해요.", r: 5, l: "ko" },
    { n: "Lee Ji-eun", t: "우리 노래 신청했는데 들어줘요.", r: 5, l: "ko" },
    { n: "Park Seo-joon", t: "에어컨 진짜 시원해요. 발리 더위 딱!", r: 5, l: "ko" },
    { n: "Hyun Bin", t: "싸고 진짜인 기프샵 알아요.", r: 5, l: "ko" },
    { n: "Song Hye-kyo", t: "가격 투명해요. 결제할 때 놀람 없어요.", r: 5, l: "ko" },
    { n: "Kim Tae-hee", t: "기사님이 중국어 조금 해요.", r: 5, l: "ko" },
    { n: "Lee Na-young", t: "차 깨끗하고 냄새 없어요.", r: 5, l: "ko" },
    { n: "Jung Yong-hwan", t: "유모차 들여주고 빼주세요.", r: 5, l: "ko" },
    { n: "Park So-dam", t: "무료 생수 있어요. 다정해요!", r: 5, l: "ko" },
    { n: "Lee Chan-ho", t: "운전 부드러워서 어른 모시기 좋아요.", r: 5, l: "ko" },
    { n: "Kim Se-jin", t: "예약 빨라요. 5분내 답장.", r: 5, l: "ko" },
    { n: "Yoon Doo-joon", t: "경치 좋은 길 알아요. 사진 잘 나와요.", r: 5, l: "ko" },
    { n: "Choi Min-soo", t: "비 올 때 우산 있어요.", r: 5, l: "ko" },
    { n: "Park Ji-yoon", t: "가이드도 되면서 설명해줘요.", r: 5, l: "ko" },
    { n: "Lee Kyung-soo", t: "차 편해서 안 피곤해요.", r: 5, l: "ko" },
    { n: "Kim Byung-hoon", t: "관광지 가는 타이밍 잘 알아요.", r: 5, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Carlos Santos", t: "Motorista muito divertido, viagem passou rápido.", r: 5, l: "pt" },
    { n: "Ana Costa", t: "Carro tem carregadores para todos os celulares.", r: 5, l: "pt" },
    { n: "João Oliveira", t: "Sabe desviar quando Canggu tem trânsito.", r: 5, l: "pt" },
    { n: "Maria Lima", t: "Com bebê, motorista esperou com paciência.", r: 5, l: "pt" },
    { n: "Pedro Ferreira", t: "Motorista focou em dirigir, não falou muito.", r: 5, l: "pt" },
    { n: "Lucas Alves", t: "Pedimos playlist, ele tocou!", r: 5, l: "pt" },
    { n: "Juliana Rodrigues", t: "Ar geladinho! Perfeito para calor de Bali.", r: 5, l: "pt" },
    { n: "Rafael Gomes", t: "Sabe lojas de souvenir baratas e autênticas.", r: 5, l: "pt" },
    { n: "Bruna Pereira", t: "Preço transparente, sem surpresas no pagamento.", r: 5, l: "pt" },
    { n: "Diego Martins", t: "Fala chinês um pouco. Chineses puderam conversar.", r: 5, l: "pt" },
    { n: "Camila Rocha", t: "Carro super limpo, sem cheiro nenhum.", r: 5, l: "pt" },
    { n: "Felipe Viana", t: "Ajudou com carrinho de bebê.", r: 5, l: "pt" },
    { n: "Patricia Castro", t: "Tinha água mineral grátis. Muito atencioso!", r: 5, l: "pt" },
    { n: "Gustavo Nunes", t: "Dirige com cuidado, ótimo para idosos.", r: 5, l: "pt" },
    { n: "Renata Carvalho", t: "Reserva via WhatsApp muito rápida.", r: 5, l: "pt" },
    { n: "André Ribeiro", t: "Conhece rotas cênicas para fotos.", r: 5, l: "pt" },
    { n: "Lívia Mendes", t: "Tinha guarda-chuva disponível quando choveu.", r: 5, l: "pt" },
    { n: "Rafael Dias", t: "Serviu como guia também. Explicou tudo!", r: 5, l: "pt" },
    { n: "Fernanda Souza", t: "Suspensão confortável, sem dor no corpo.", r: 5, l: "pt" },
    { n: "Marcos Moreira", t: "Sabe os melhores horários para visitar.", r: 5, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Ahmed Hassan", t: "السائق ممتع، الرحلة سريعة.", r: 5, l: "ar" },
    { n: "Fatima Ali", t: "السيارة تحتوي على شواحنات لجميع الهواتف.", r: 5, l: "ar" },
    { n: "Omar Khaled", t: "يعرف طرق بديلة عند ازدحام تشنغو.", r: 5, l: "ar" },
    { n: "Layla Mahmoud", t: "مع طفل صغير، صبور جداً.", r: 5, l: "ar" },
    { n: "Karim Ahmed", t: "السائق يركز على القيادة فقط. مهني.", r: 5, l: "ar" },
    { n: "Dina Hassan", t: "طلبنا قائمة تشغيل، شغلها!", r: 5, l: "ar" },
    { n: "Youssef Ali", t: "المكيف بارد جداً! مثالي لحرارة بالي.", r: 5, l: "ar" },
    { n: "Nadia Khaled", t: "يعرف متاجر الهدايا الرخيصة وال أصلية.", r: 5, l: "ar" },
    { n: "Tariq Mahmoud", t: "السعر شفاف، لا مفاجآت عند الدفع.", r: 5, l: "ar" },
    { n: "Sara Ali", t: "يتحدث الماندارين قليلاً، الصينيون يمكنهم التحدث.", r: 5, l: "ar" },
    { n: "Amir Hassan", t: "السيارة نظيفة جداً، لا روائح.", r: 5, l: "ar" },
    { n: "Fatima Khaled", t: "ساعد في عربة الأطفال.", r: 5, l: "ar" },
    { n: "Youssef Ali", t: "مياه معدنية مجانية. لطيف جداً!", r: 5, l: "ar" },
    { n: "Nadia Mahmoud", t: "قيادة حذرة، مثالي للمسنين.", r: 5, l: "ar" },
    { n: "Tariq Ahmed", t: "الحجز عبر واتساب سريع جداً.", r: 5, l: "ar" },
    { n: "Sara Hassan", t: "يعرف طرق ذات مناظر جميلة للصور.", r: 5, l: "ar" },
    { n: "Amir Khaled", t: "مظلات متاحة عند المطر.", r: 5, l: "ar" },
    { n: "Fatima Ali", t: "عمل أيضاً كدليل، شرح كل شيء!", r: 5, l: "ar" },
    { n: "Youssef Mahmoud", t: "السيارة مريحة، لا ألم في الجسم.", r: 5, l: "ar" },
    { n: "Sara Ali", t: "يعرف أفضل الأوقات لزيارة الأماكن السياحية.", r: 5, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Dmitri Petrov", t: "Водитель веселый, поездка прошла быстро.", r: 5, l: "ru" },
    { n: "Elena Smirnova", t: "В машине зарядки для всех телефонов.", r: 5, l: "ru" },
    { n: "Andrey Volkov", t: "Знает объездные пути когда Чангу пробки.", r: 5, l: "ru" },
    { n: "Natalia Ivanova", t: "С маленьким ребенком, водитель терпелив.", r: 5, l: "ru" },
    { n: "Sergei Kuznetsov", t: "Водитель сфокусировался на вождении. Профессиональный.", r: 5, l: "ru" },
    { n: "Tatiana Popova", t: "Просили плейлист, включил!", r: 5, l: "ru" },
    { n: "Pavel Smirnov", t: "Кондер супер! Идеально для жары Бали.", r: 5, l: "ru" },
    { n: "Olga Volkova", t: "Знает дешевые аутентичные сувенирные магазины.", r: 5, l: "ru" },
    { n: "Alexei Kuznetsov", t: "Цена прозрачная, без сюрпризов при оплате.", r: 5, l: "ru" },
    { n: "Svetlana Ivanova", t: "Говорит немного китайский. Китайцы могут общаться.", r: 5, l: "ru" },
    { n: "Mikhail Smirnov", t: "Машина очень чистая, нет запахов.", r: 5, l: "ru" },
    { n: "Maria Volkova", t: "Помог с детской коляской.", r: 5, l: "ru" },
    { n: "Igor Kuznetsov", t: "Бесплатная вода в машине. Очень внимательный!", r: 5, l: "ru" },
    { n: "Natalia Ivanova", t: "Осторожная езда, идеально для пожилых.", r: 5, l: "ru" },
    { n: "Sergei Smirnov", t: "Бронирование через WhatsApp очень быстрое.", r: 5, l: "ru" },
    { n: "Tatiana Volkova", t: "Знает живописные маршруты для фото.", r: 5, l: "ru" },
    { n: "Pavel Smirnov", t: "Были зонты когда пошел дождь.", r: 5, l: "ru" },
    { n: "Olga Ivanova", t: "Работал и как гида. Объяснил всё!", r: 5, l: "ru" },
    { n: "Alexei Kuznetsov", t: "Подвеска комфортная, нет болей в теле.", r: 5, l: "ru" },
    { n: "Svetlana Volkova", t: "Знает лучшие времена для посещения.", r: 5, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Ahmet Demir", t: "Sürücü eğlenceli, yolculuk hızlı geçti.", r: 5, l: "tr" },
    { n: "Ayşe Kaya", t: "Tüm telefonlar için şarj cihazları var.", r: 5, l: "tr" },
    { n: "Mehmet Özkan", t: "Canggu'da trafik varken alternatif yollar biliyor.", r: 5, l: "tr" },
    { n: "Fatma Yıldız", t: "Bebekle giderken sabırlı bekliyor.", r: 5, l: "tr" },
    { n: "Ali Çelik", t: "Sadece sürüşe odaklanıyor. Profesyonel.", r: 5, l: "tr" },
    { n: "Zeynep Arslan", t: "Playlist istedik, oynattı!", r: 5, l: "tr" },
    { n: "Mustafa Koç", t: "Klima süper soğuk! Bali sıcağı için ideal.", r: 5, l: "tr" },
    { n: "Elif Şahin", t: "Ucuz orijinal hediyelik dükkanları biliyor.", r: 5, l: "tr" },
    { n: "Burak Demir", t: "Fiyat şeffaf, ödeme sürpriz yok.", r: 5, l: "tr" },
    { n: "Selin Yılmaz", t: "Biraz Çince konuşuyor. Çinliler konuşabilir.", r: 5, l: "tr" },
    { n: "Emre Kaya", t: "Araba çok temiz, koku yok.", r: 5, l: "tr" },
    { n: "Deniz Özkan", t: "Bebek arabasıyla yardımcı oldu.", r: 5, l: "tr" },
    { n: "Ceren Arslan", t: "Arabada ücretsiz su var. Çok ilgili!", r: 5, l: "tr" },
    { n: "Can Demir", t: "Dikkatli sürüş, yaşlılar için ideal.", r: 5, l: "tr" },
    { n: "Merve Kaya", t: "WhatsApp rezervasyonu çok hızlı.", r: 5, l: "tr" },
    { n: "Tolga Özkan", t: "Fotoğraf için manzaralı yollar biliyor.", r: 5, l: "tr" },
    { n: "Buse Arslan", t: "Yağmur yağınca şemsiye hazır var.", r: 5, l: "tr" },
    { n: "Oğuz Demir", t: "Rehber gibi çalıştı, her şeyi anlattı!", r: 5, l: "tr" },
    { n: "Selin Yılmaz", t: "Araba rahat, ağrı yok.", r: 5, l: "tr" },
    { n: "Emre Kaya", t: "Gezilecek en iyi zamanları biliyor.", r: 5, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDate7to9MonthsAgo()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (7-9 Months ago)!`)
}

seedQuarter3Reviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
