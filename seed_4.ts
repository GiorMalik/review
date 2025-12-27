import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 10-12 bulan terakhir
function getDate10to12MonthsAgo() {
  const now = new Date()
  const twelveMonthsAgo = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000))
  const tenMonthsAgo = new Date(now.getTime() - (300 * 24 * 60 * 60 * 1000))
  return new Date(twelveMonthsAgo.getTime() + Math.random() * (tenMonthsAgo.getTime() - twelveMonthsAgo.getTime()))
}

async function seedYear1Reviews() {
  console.log('🌱 Seeding 150 Reviews (10-12 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Feri Irawan", t: "Drivernya lumayan sih, cuma telat jemput 15 menit. Masih tolerable.", r: 4, l: "id" },
    { n: "Siska Amelia", t: "AC mobilnya kurang dingin dikit sih panas-panas, tp lajarnya oke.", r: 3, l: "id" },
    { n: "Dedi Kurniawan", t: "Drivernya ga banyak tahu jalan di Nusa Penida, sesat几次 muter-muner.", r: 3, l: "id" },
    { n: "Putri Ayu", t: "Mobilnya lumayan bersih tp joknya agak berdebu. Mungkin jarang dicuci.", r: 3, l: "id" },
    { n: "Andi Wijaya", t: "Harganya standar sih, ga murah-murah banget tp ga mahal juga.", r: 4, l: "id" },
    { n: "Ratna Dewi", t: "Drivernya oke sih tp agak pendiam gitu. Ga diajak ngobrol banyak.", r: 4, l: "id" },
    { n: "Budi Santoso", t: "Walaupun macet parah, driver sabar ngelewatin semua. Emang pinter.", r: 4, l: "id" },
    { n: "Anita Sari", t: "Drivernya ramah banget! Anak saya suka diajak ngobrol sama dia.", r: 5, l: "id" },
    { n: "Yudi Pratama", t: "Mobilnya empuk suspensi-nya, tidur pules pas jalan jauh.", r: 4, l: "id" },
    { n: "Fitria Handayani", t: "Drivernya tau jalan tikus, bisa ngelewatin macet di Canggu.", r: 5, l: "id" },
    { n: "Reza Mahendra", t: "Booking-nya gampang, tinggal WA langsung dibales cepet.", r: 4, l: "id" },
    { n: "Dewi Kartika", t: "Drivernya bisa bahasa inggris lumayan, temen saya bule bisa ngobrol.", r: 4, l: "id" },
    { n: "Agus Setiawan", t: "Drivernya sopan banget, bantuin angkatin barang bawaan.", r: 5, l: "id" },
    { n: "Mega Pertiwi", t: "Mobil Hiace-nya muat banyak, kita rombongan 11 orang masih muat.", r: 4, l: "id" },
    { n: "Hendra Wijaya", t: "Harga udah termasuk bensin, jadi ga perlu mikir biaya lg.", r: 4, l: "id" },
    { n: "Siti Nurhaliza", t: "Drivernya sabar nungguin kita makan sampe 1.5 jam.", r: 4, l: "id" },
    { n: "Dimas Nugroho", t: "Musiknya dikit terlalu keras pas awal naik, tp pas dimauin kecilin mau.", r: 3, l: "id" },
    { n: "Rina Anggraini", t: "Drivernya asli orang Bali, jelasin budaya lokal dengan detail.", r: 5, l: "id" },
    { n: "Doni Hermawan", t: "Mobilnya agak tua sih tp masih bersih dan berfungsi baik.", r: 3, l: "id" },
    { n: "Wulan Sari", t: "Drivernya bisa nawarin harga diskon buat tiket wisata.", r: 4, l: "id" },
    { n: "Eko Pertiwi", t: "Jalan tikus yg dia tau beneran ampuh ngelwatin macet.", r: 5, l: "id" },
    { n: "Susi Wulandari", t: "Drivernya jaga etika banget, ga merokok di mobil.", r: 5, l: "id" },
    { n: "Toni Setiawan", t: "Harga sewanya bersahabat banget sama rental yg laen.", r: 5, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "John Miller", t: "Driver was okay but arrived 15 minutes late. Still acceptable.", r: 4, l: "en" },
    { n: "Emily Chen", t: "AC wasn't cold enough on hot days. Otherwise fine.", r: 3, l: "en" },
    { n: "Michael Brown", t: "Driver got lost a few times in Nusa Penida. Went in circles.", r: 3, l: "en" },
    { n: "Sarah Davis", t: "Car was somewhat clean but seats had some dust. Rarely washed maybe.", r: 3, l: "en" },
    { n: "James Wilson", t: "Standard pricing, not the cheapest but not expensive either.", r: 4, l: "en" },
    { n: "Jessica Taylor", t: "Driver was okay but kinda quiet. Not much conversation.", r: 4, l: "en" },
    { n: "David Anderson", t: "Traffic was terrible but driver patiently got through it. Smart.", r: 4, l: "en" },
    { n: "Emma Moore", t: "Driver was so friendly! My kids loved chatting with him.", r: 5, l: "en" },
    { n: "Chris Lee", t: "Car suspension was comfortable, slept the whole way.", r: 4, l: "en" },
    { n: "Olivia Harris", t: "Driver knows shortcuts to avoid Canggu traffic!", r: 5, l: "en" },
    { n: "Matthew Clark", t: "Booking via WhatsApp was easy, quick response.", r: 4, l: "en" },
    { n: "Jennifer Lewis", t: "Driver speaks decent English, foreign guests can chat.", r: 4, l: "en" },
    { n: "Robert Walker", t: "Driver was very polite, helped carry our luggage.", r: 5, l: "en" },
    { n: "Amanda Young", t: "Hiace van fit all 11 of us comfortably.", r: 4, l: "en" },
    { n: "Daniel King", t: "Price already included petrol, no extra costs.", r: 4, l: "en" },
    { n: "Sophie Wright", t: "Waited patiently while we ate for 1.5 hours.", r: 4, l: "en" },
    { n: "Andrew Garcia", t: "Music was a bit loud at first, but turned down when asked.", r: 3, l: "en" },
    { n: "Michelle Martinez", t: "Driver is Balinese, explained local culture in detail.", r: 5, l: "en" },
    { n: "Joshua Robinson", t: "Car was a bit old but still clean and working well.", r: 3, l: "en" },
    { n: "Ashley Hall", t: "Driver could get discount prices for attraction tickets.", r: 4, l: "en" },
    { n: "Ryan White", t: "The shortcuts he knows really work to avoid traffic!", r: 5, l: "en" },
    { n: "Stephanie Brown", t: "Driver was very respectful, didn't smoke in the car.", r: 5, l: "en" },
    { n: "Kevin Davis", t: "Rental price is very competitive with others.", r: 5, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Wang Wei", t: "司机还不错，但是迟到了15分钟。还可以接受。", r: 4, l: "zh" },
    { n: "Li Na", t: "空调不够冷，其他还好。", r: 3, l: "zh" },
    { n: "Zhang Qiang", t: "在佩尼达岛迷路了几次，绕了圈。", r: 3, l: "zh" },
    { n: "Liu Mei", t: "车还算干净，但座椅有灰。可能不常洗。", r: 3, l: "zh" },
    { n: "Chen Wei", t: "价格一般，不便宜也不贵。", r: 4, l: "zh" },
    { n: "Yang Li", t: "司机还好，但有点不爱说话。", r: 4, l: "zh" },
    { n: "Zhao Hua", t: "堵车很严重，但司机耐心地通过了。", r: 4, l: "zh" },
    { n: "Wu Yan", t: "司机很友好，孩子喜欢和他聊天。", r: 5, l: "zh" },
    { n: "Sun Ming", t: "车很舒服，路上睡着了。", r: 4, l: "zh" },
    { n: "Li Na", t: "司机知道避开苍古堵车的近路！", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "WhatsApp预订方便，回复快。", r: 4, l: "zh" },
    { n: "Liu Yang", t: "司机会一点英语，外国客人可以交流。", r: 4, l: "zh" },
    { n: "Chen Jie", t: "司机很有礼貌，帮忙拿行李。", r: 5, l: "zh" },
    { n: "Yang Xi", t: "海狮车坐11个人很宽松。", r: 4, l: "zh" },
    { n: "Zhao Lei", t: "价格已经包含油费，没有额外费用。", r: 4, l: "zh" },
    { n: "Wu Gang", t: "我们吃饭等了1.5小时，司机很有耐心。", r: 4, l: "zh" },
    { n: "Zhou Xun", t: "音乐一开始有点大声，但要求后调小了。", r: 3, l: "zh" },
    { n: "Ma Yun", t: "司机是巴厘岛人，详细解释了当地文化。", r: 5, l: "zh" },
    { n: "Pony Ma", t: "车有点旧，但很干净工作良好。", r: 3, l: "zh" },
    { n: "Lei Jun", t: "司机能拿到景点门票的折扣价。", r: 4, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Kim Min-jun", t: "기사님 괜찮아요, 15분 늦엤. 받아들여요.", r: 4, l: "ko" },
    { n: "Lee Ji-eun", t: "에어컨 덥게, 그 외엔 괜찮아요.", r: 3, l: "ko" },
    { n: "Park Seo-joon", t: "누사페니다에서 길 잃어버려서 몇 번 돌았어요.", r: 3, l: "ko" },
    { n: "Choi Woo-shik", t: "차 좀 깨끗한데 시트에 먼지 있어요.", r: 3, l: "ko" },
    { n: "Song Joong-ki", t: "가격 그냥 평균이에요. 너무 안 비싸.", r: 4, l: "ko" },
    { n: "Hyun Bin", t: "기사님 괜찮은데 말이 별로 없어요.", r: 4, l: "ko" },
    { n: "Son Ye-jin", t: "막힐 심한데 기사님이 침착해서 통과했어요.", r: 4, l: "ko" },
    { n: "Lee Min-ho", t: "기사님이 친절해서 아이들이 좋아해요.", r: 5, l: "ko" },
    { n: "Kim Go-eun", t: "차가 편해서 길에서 잤어요.", r: 4, l: "ko" },
    { n: "Suzy", t: "찡구 막힐 때 피하는 지름길 알아요.", r: 5, l: "ko" },
    { n: "Gong Yoo", t: "카톡으로 예약 쉽고 빨라요.", r: 4, l: "ko" },
    { n: "Jun Ji-hyun", t: "영어 좀 해서 외국 손님이랑 대화돼요.", r: 4, l: "ko" },
    { n: "Park Bo-gum", t: "기사님이 정중해서 짐 들어줘요.", r: 5, l: "ko" },
    { n: "Lee Jong-suk", t: "히아체 차에 11명 편하게 타여요.", r: 4, l: "ko" },
    { n: "Kim Tae-hyung", t: "가격에 기름값 포함돼있어요.", r: 4, l: "ko" },
    { n: "Jennie", t: "우리 밥 먹을 때 1.5시간이나 기다려줘요.", r: 4, l: "ko" },
    { n: "V", t: "음악 처음에 좀 큰데 줄여달라니 줄였어요.", r: 3, l: "ko" },
    { n: "Rose", t: "발리 원인이라 문화 자세히 설명해줘요.", r: 5, l: "ko" },
    { n: "Lisa", t: "차 좀 오래됐지만 깨끗하고 잘 돌아가요.", r: 3, l: "ko" },
    { n: "BTS Jimin", t: "관광지 티켓 할인받을 수 있어요.", r: 4, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Carlos Silva", t: "Motorista okay mas chegou 15 minutos atrasado.", r: 4, l: "pt" },
    { n: "Ana Santos", t: "AC não estava frio o suficiente no calor.", r: 3, l: "pt" },
    { n: "João Oliveira", t: "Motorista se perdeu algumas vezes em Nusa Penida.", r: 3, l: "pt" },
    { n: "Maria Costa", t: "Carro razoávelmente limpo mas bancos com pó.", r: 3, l: "pt" },
    { n: "Pedro Lima", t: "Preço padrão, não muito barato nem caro.", r: 4, l: "pt" },
    { n: "Lucas Ferreira", t: "Motorista okay mas meio quieto. Pouca conversa.", r: 4, l: "pt" },
    { n: "Juliana Rodrigues", t: "Trânsito terrível mas motorista paciente.", r: 4, l: "pt" },
    { n: "Rafael Alves", t: "Motorista muito simpático! Crianças adoraram.", r: 5, l: "pt" },
    { n: "Bruna Pereira", t: "Suspensão confortável, dormi o caminho.", r: 4, l: "pt" },
    { n: "Diego Gomes", t: "Conhece atalhos para evitar trânsito Canggu.", r: 5, l: "pt" },
    { n: "Camila Martins", t: "Reserva fácil via WhatsApp, resposta rápida.", r: 4, l: "pt" },
    { n: "Felipe Rocha", t: "Fala inglês razoável, estrangeiros conversam.", r: 4, l: "pt" },
    { n: "Patricia Carvalho", t: "Muito educado, ajudou com as malas.", r: 5, l: "pt" },
    { n: "Gustavo Nunes", t: "Hiace acomoda todos confortavelmente.", r: 4, l: "pt" },
    { n: "Renata Castro", t: "Preço inclui gasolina. Sem custos extras.", r: 4, l: "pt" },
    { n: "André Melo", t: "Paciente esperando comermos 1.5 hora.", r: 4, l: "pt" },
    { n: "Carolina Barros", t: "Música alta no início, mas baixou quando pediu.", r: 3, l: "pt" },
    { n: "Rodrigo Viana", t: "Motorista é balinês, explicou cultura local.", r: 5, l: "pt" },
    { n: "Fernanda Ribeiro", t: "Carro um pouco antigo mas limpo e funcional.", r: 3, l: "pt" },
    { n: "Marcos Dias", t: "Consegue desconto em ingressos de atrações.", r: 4, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Ahmed Ali", t: "السائق جيد لكن تأخر 15 دقيقة. مقبول.", r: 4, l: "ar" },
    { n: "Fatima Hassan", t: "المكيف ليس بارداً بما فيه الكفاية. الباقي جيد.", r: 3, l: "ar" },
    { n: "Omar Farooq", t: "السائق ضاع الطريق عدة مرات في نوسا بينيد.", r: 3, l: "ar" },
    { n: "Khalid Rahman", t: "السيارة نظيفة إلى حد ما لكن المقاعد بها غبار.", r: 3, l: "ar" },
    { n: "Yusuf Amir", t: "السعر معتدل، ليس رخيصاً ولا غالياً.", r: 4, l: "ar" },
    { n: "Aisha Karim", t: "السائق جيد لكنه لا يتحدث كثيراً.", r: 4, l: "ar" },
    { n: "Nasser Al-Attiyah", t: "الازدحام سيء لكن السائق صابر.", r: 4, l: "ar" },
    { n: "Dina Ahmed", t: "السائق ودود جداً! الأطفال يحبونه.", r: 5, l: "ar" },
    { n: "Hassan Mohamed", t: "السيارة مريحة، نمت طوال الطريق.", r: 4, l: "ar" },
    { n: "Mona Ali", t: "يعرف الطرق المختصرة لتجنب الازدحام.", r: 5, l: "ar" },
    { n: "Karim Mahmoud", t: "الحجز عبر واتساب سهل وسريع.", r: 4, l: "ar" },
    { n: "Layla Hussein", t: "يتحدث الإنجليزية بشكل معقول، الأجانب يمكنهم التحدث.", r: 4, l: "ar" },
    { n: "Tariq Mohamed", t: "مؤدب جداً، ساعد في حمل الحقائب.", r: 5, l: "ar" },
    { n: "Sara Farooq", t: "حافلة هايس تتسع جميعنا بشكل مريح.", r: 4, l: "ar" },
    { n: "Youssef Ali", t: "السعر يشمل البنزين. بدون تكاليف إضافية.", r: 4, l: "ar" },
    { n: "Amir Hassan", t: "صبر علينا أثناء الأكل 1.5 ساعة.", r: 4, l: "ar" },
    { n: "Fatima Mahmoud", t: "الموسيقى كانت عالية في البداية لكن خفضها.", r: 3, l: "ar" },
    { n: "Nadia Ahmed", t: "السائق من بالي، شرح الثقافة المحلية بالتفصيل.", r: 5, l: "ar" },
    { n: "Hassan Farooq", t: "السيارة قديمة قليلاً ولكن نظيفة وجيدة.", r: 3, l: "ar" },
    { n: "Mona Khaled", t: "يمكن الحصول على خصم على تذاكر المعالم.", r: 4, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Ivan Petrov", t: "Водитель неплохой но опоздал на 15 минут. Допустимо.", r: 4, l: "ru" },
    { n: "Anna Smirnova", t: "Кондер недостаточно холодный. В остальном ок.", r: 3, l: "ru" },
    { n: "Dmitry Volkov", t: "Водитель несколько раз потерялся на Нуса Пенида.", r: 3, l: "ru" },
    { n: "Maria Sokolova", t: "Машина чистая но на сиденьях пыль.", r: 3, l: "ru" },
    { n: "Sergei Popov", t: "Цена стандартная, не дешево но и не дорого.", r: 4, l: "ru" },
    { n: "Vladimir Ivanov", t: "Водитель ок но молчаливый. Мало разговоров.", r: 4, l: "ru" },
    { n: "Elena Kuznetsova", t: "Трафик ужасный но водитель терпелив.", r: 4, l: "ru" },
    { n: "Alexey Smirnov", t: "Водитель очень дружелюбный! Дети его любят.", r: 5, l: "ru" },
    { n: "Natalia Volkova", t: "Машина удобная, уснул по дороге.", r: 4, l: "ru" },
    { n: "Pavel Ivanov", t: "Знает объездные пути от трафика Чангу.", r: 5, l: "ru" },
    { n: "Tatiana Popova", t: "Бронирование через WhatsApp простое и быстрое.", r: 4, l: "ru" },
    { n: "Igor Kuznetsov", t: "Говорит анлийский прилично, иностранные общаются.", r: 4, l: "ru" },
    { n: "Olga Smirnova", t: "Очень вежлив, помог с багажом.", r: 5, l: "ru" },
    { n: "Andrey Volkov", t: "Хиас вмещает всех комфортно.", r: 4, l: "ru" },
    { n: "Maria Kuznetsova", t: "Цена включает бензин. Скрытых платежей нет.", r: 4, l: "ru" },
    { n: "Dmitri Ivanov", t: "Терпеливо ждал пока мы ели 1.5 часа.", r: 4, l: "ru" },
    { n: "Anna Volkova", t: "Музыка громкая в начале но убавил когда попросили.", r: 3, l: "ru" },
    { n: "Sergei Kuznetsov", t: "Водитель балинец, объяснил местную культуру.", r: 5, l: "ru" },
    { n: "Natalia Smirnova", t: "Машина старовата но чистая и рабочая.", r: 3, l: "ru" },
    { n: "Pavel Popov", t: "Можно получить скидку на билеты на достопримечательности.", r: 4, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Ahmet Yilmaz", t: "Sürücü iyi ama 15 dakika geç geldi. Kabul edilebilir.", r: 4, l: "tr" },
    { n: "Ayşe Demir", t: "Klima yeterince soğuk değil. Digerleri iyi.", r: 3, l: "tr" },
    { n: "Mehmet Kaya", t: "Nusa Penida'da birkaç kez yoldan kaydı.", r: 3, l: "tr" },
    { n: "Fatma Özkan", t: "Araba temiz ama koltuklarda toz var.", r: 3, l: "tr" },
    { n: "Ali Çelik", t: "Fiyat standart, çok ucuz değil ama çok da pahalı değil.", r: 4, l: "tr" },
    { n: "Zeynep Yildiz", t: "Sürücü iyi ama çok konuşmuyor.", r: 4, l: "tr" },
    { n: "Mustafa Arslan", t: "Trafik berbat ama sürücü sabırlı.", r: 4, l: "tr" },
    { n: "Elif Şahin", t: "Sürücü çok nazik! Cocuklar seviyor.", r: 5, l: "tr" },
    { n: "Burak Koç", t: "Araba rahat, yolda uyudum.", r: 4, l: "tr" },
    { n: "Selin Yilmaz", t: "Canggu trafigini kaçmak için kestirmeleri biliyor.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "WhatsApp ile rezervasyon kolay ve hızlı.", r: 4, l: "tr" },
    { n: "Deniz Kaya", t: "İngilizce biraz konuşuyor, yabancılarla konuşabilir.", r: 4, l: "tr" },
    { n: "Ceren Özkan", t: "Çok nazik, bavullarla yardımcı oldu.", r: 5, l: "tr" },
    { n: "Can Arslan", t: "Hiace herkesi rahatça alıyor.", r: 4, l: "tr" },
    { n: "Merve Yildiz", t: "Fiyat benzini dahil ediyor. Ekstra ücret yok.", r: 4, l: "tr" },
    { n: "Tolga Demir", t: "Yemek yerken 1.5 saat sabırla bekledi.", r: 4, l: "tr" },
    { n: "Buse Kaya", t: "Başta müzik yüksek ama isteince kısalttı.", r: 3, l: "tr" },
    { n: "Oğuz Arslan", t: "Sürücü Bali'li, yerel kültürünü anlattı.", r: 5, l: "tr" },
    { n: "Selin Yilmaz", t: "Araba biraz eski ama temiz ve çalışıyor.", r: 3, l: "tr" },
    { n: "Emre Demir", t: "Turistik yer biletlerinde indirim alabiliyor.", r: 4, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDate10to12MonthsAgo()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (10-12 Months ago)!`)
}

seedYear1Reviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
