import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 4-6 bulan terakhir
function getDate4to6MonthsAgo() {
  const now = new Date()
  const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
  const fourMonthsAgo = new Date(now.getTime() - (120 * 24 * 60 * 60 * 1000))
  return new Date(sixMonthsAgo.getTime() + Math.random() * (fourMonthsAgo.getTime() - sixMonthsAgo.getTime()))
}

async function seedQuarter2Reviews() {
  console.log('🌱 Seeding 150 Reviews (4-6 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Rian Pratama", t: "Ke Ubud jalanannya macet banget, tapi driver tetep tenang. Sabar banget sih.", r: 5, l: "id" },
    { n: "Dewi Sartika", t: "Drivernya tau restoran halal yg enak di Seminyak. Rekomendasi beneran mantap.", r: 5, l: "id" },
    { n: "Hendra Wijaya", t: "Mobil Hiace-nya muat rombongan 10 orang, semua koper masuk. Lega banget.", r: 5, l: "id" },
    { n: "Mega Pertiwi", t: "Drivernya bisa bahasa Korea dikit, temen saya dr Korea bisa ngobrol.", r: 5, l: "id" },
    { n: "Yudi Setiawan", t: "Harganya udah include bensin sama tol. Ga perlu korting lagi.", r: 5, l: "id" },
    { n: "Rina Anggraini", t: "Drivernya pinter fotoin kita pas di Uluwatu. Hasilnya bagus-bagus.", r: 5, l: "id" },
    { n: "Agus Kurniawan", t: "Minta dijemput subuh buat sunrise Batur, driver dateng lebih pagi dari janjian.", r: 5, l: "id" },
    { n: "Siti Nurhaliza", t: "Drivernya ga baper pas kita cancel some spot karena hujan. Ngerti banget.", r: 5, l: "id" },
    { n: "Bambang Suryadi", t: "Naik mobil Alphard, jok kulitnya empuk. Merasa bintang lima wkwk.", r: 5, l: "id" },
    { n: "Fitria Handayani", t: "Drivernya tau tempat ATM yg ga ada biaya admin. Ngebantu banget.", r: 5, l: "id" },
    { n: "Reza Permana", t: "Drivernya asli orang Bali, jelasin sejarah Pura dengan detail.", r: 5, l: "id" },
    { n: "Anita Kusuma", t: "Mobilnya ada WiFi, anak-anak bisa nonton YouTube sepanjang jalan.", r: 5, l: "id" },
    { n: "Dimas Pratama", t: "Drivernya pinter nyetir, ngerem halus. Ga bikin mabok darat.", r: 5, l: "id" },
    { n: "Ratna Sari", t: "Walaupun hujan deres, driver tetep semangat anterin kita ke semua spot.", r: 5, l: "id" },
    { n: "Fajar Santoso", t: "Drivernya tau jalan tikus di Kuta biar ga ketemu macet parah.", r: 5, l: "id" },
    { n: "Wulan Maharani", t: "Bantuin angkutin barang belanjaan banyak banget sampe muat mobil. Pinter nyusun.", r: 5, l: "id" },
    { n: "Eko Nugroho", t: "Drivernya santai aja pas kita butuh ketenangan di mobil. Ga kepo.", r: 5, l: "id" },
    { n: "Susi Wulandari", t: "Mobilnya ada seat belt buat semua. Safety first!", r: 5, l: "id" },
    { n: "Toni Hermawan", t: "Drivernya jago cari tempat parkir yg deket dgn pintu masuk wisata.", r: 5, l: "id" },
    { n: "Rina Pertiwi", t: "Bookingnya gampang, tinggal bilang tanggal sama jam. Langsung fix.", r: 5, l: "id" },
    { n: "Doni Setiawan", t: "Drivernya tau jam-jam sepi buat selfie di tempat wisata.", r: 5, l: "id" },
    { n: "Maya Anggraini", t: "Harganya lebih murah drpd sewa di hotel. Worth it!", r: 5, l: "id" },
    { n: "Raka Kusuma", t: "Drivernya bisa baca peta offline, pas ga sinyal masih nemu jalan.", r: 5, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "Thomas Wright", t: "Traffic to Ubud was insane but driver stayed calm throughout.", r: 5, l: "en" },
    { n: "Emma Johnson", t: "Driver took us to amazing halal restaurant in Seminyak. Delicious!", r: 5, l: "en" },
    { n: "Michael Davis", t: "Hiace van fit all 10 of us comfortably. Lots of legroom.", r: 5, l: "en" },
    { n: "Sophie Brown", t: "Driver speaks a bit of Korean. My friend could communicate!", r: 5, l: "en" },
    { n: "James Miller", t: "Price included petrol and toll. No hidden costs at all.", r: 5, l: "en" },
    { n: "Olivia Taylor", t: "Driver took amazing photos of us at Uluwatu. Great shots!", r: 5, l: "en" },
    { n: "David Anderson", t: "Requested 4AM pickup for Batur sunrise. Driver came early!", r: 5, l: "en" },
    { n: "Jennifer Wilson", t: "Driver understood when we cancelled some spots due to rain. Very flexible.", r: 5, l: "en" },
    { n: "Robert Moore", t: "Alphard was so comfortable with leather seats. Felt like luxury!", r: 5, l: "en" },
    { n: "Emily Clark", t: "Driver knew ATM with no fees. Super helpful for tourists.", r: 5, l: "en" },
    { n: "Christopher Lee", t: "Driver is Balinese, explained temple history in detail.", r: 5, l: "en" },
    { n: "Jessica White", t: "Car had WiFi! Kids watched YouTube the whole ride.", r: 5, l: "en" },
    { n: "Daniel Harris", t: "Smooth braking, no sudden stops. Didn't get car sick.", r: 5, l: "en" },
    { n: "Sarah Martin", t: "Heavy rain but driver was still enthusiastic about visiting spots.", r: 5, l: "en" },
    { n: "Matthew Thompson", t: "Knows shortcuts in Kuta to avoid terrible traffic.", r: 5, l: "en" },
    { n: "Amanda Garcia", t: "Helped fit all our shopping bags. Packed everything smartly.", r: 5, l: "en" },
    { n: "Joshua Martinez", t: "Driver respected our privacy when we wanted quiet time.", r: 5, l: "en" },
    { n: "Ashley Robinson", t: "Seatbelts for everyone. Safety conscious driver!", r: 5, l: "en" },
    { n: "Andrew Lewis", t: "Always finds parking spots close to entrance. Saves walking!", r: 5, l: "en" },
    { n: "Michelle Walker", t: "Simple booking process. Just said date and time, done!", r: 5, l: "en" },
    { n: "Ryan Hall", t: "Knows the best times to visit popular spots to avoid crowds.", r: 5, l: "en" },
    { n: "Stephanie Young", t: "Much cheaper than hotel rates. Great value!", r: 5, l: "en" },
    { n: "Kevin King", t: "Driver can read offline maps. Found way even without signal.", r: 5, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Li Ming", t: "去乌布堵车很严重，但司机很有耐心。", r: 5, l: "zh" },
    { n: "Wang Fang", t: "司机推荐的水上乐园餐厅很好吃。", r: 5, l: "zh" },
    { n: "Zhang Qiang", t: "海狮车坐10个人很宽松，都能坐下。", r: 5, l: "zh" },
    { n: "Liu Mei", t: "司机会说一点韩语，跟韩国朋友能交流。", r: 5, l: "zh" },
    { n: "Chen Wei", t: "价格已经包含油费和过路费，没有额外收费。", r: 5, l: "zh" },
    { n: "Yang Li", t: "司机在乌鲁瓦图帮我们拍照，拍得很好。", r: 5, l: "zh" },
    { n: "Zhao Hua", t: "看日出早上4点去接，司机比约定时间还早。", r: 5, l: "zh" },
    { n: "Wu Yan", t: "因为下雨取消了一些景点，司机很理解。", r: 5, l: "zh" },
    { n: "Sun Ming", t: "阿尔法德座椅很舒服，感觉很豪华。", r: 5, l: "zh" },
    { n: "Li Na", t: "司机知道没有手续费的ATM机，很帮忙。", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "司机是巴厘岛人，详细解释了寺庙历史。", r: 5, l: "zh" },
    { n: "Liu Yang", t: "车上有WiFi，孩子可以看视频。", r: 5, l: "zh" },
    { n: "Chen Jie", t: "开车很稳，刹车很轻，不晕车。", r: 5, l: "zh" },
    { n: "Yang Xi", t: "虽然下大雨，司机还是很有热情。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "在库塔知道避开堵车的近路。", r: 5, l: "zh" },
    { n: "Wu Gang", t: "帮我们装了很多购物的东西，很会整理。", r: 5, l: "zh" },
    { n: "Zhou Xun", t: "需要安静的时候司机很尊重我们的隐私。", r: 5, l: "zh" },
    { n: "Ma Yun", t: "每个人都有安全带，司机很注重安全。", r: 5, l: "zh" },
    { n: "Pony Ma", t: "总是能找到离景点入口很近的停车场。", r: 5, l: "zh" },
    { n: "Lei Jun", t: "预订很简单，说了时间日期就定了。", r: 5, l: "zh" },
    { n: "Cheng Long", t: "知道什么时候去景点人比较少。", r: 5, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Kim Dong-hyun", t: "웁드 가는 길 엄청 막혔는데 기사님이 침착해요.", r: 5, l: "ko" },
    { n: "Lee Ji-eun", t: "기사님이 추천한 샤민약 레스토랑 진짜 맛있어요.", r: 5, l: "ko" },
    { n: "Park Seo-joon", t: "히아체 차에 10명 편하게 타여요.", r: 5, l: "ko" },
    { n: "Choi Woo-shik", t: "기사님이 중국어 좀 해서 중국칭구랑 통신됐어요.", r: 5, l: "ko" },
    { n: "Song Joong-ki", t: "가격에 기름값하고 통행료 포함돼있어요.", r: 5, l: "ko" },
    { n: "Hyun Bin", t: "울루와두에서 사진 잘 찍어줘요. 사진 잘 나와요.", r: 5, l: "ko" },
    { n: "Son Ye-jin", t: "바투르 일출보러 4시간에 픽업, 기사님이 일찍 왔어요.", r: 5, l: "ko" },
    { n: "Lee Min-ho", t: "비 와서 관광지 좀 취소했는데 기사님이 이해해주셨어요.", r: 5, l: "ko" },
    { n: "Kim Go-eun", t: "알파드 시트 편하고 좋아요.", r: 5, l: "ko" },
    { n: "Suzy", t: "수수료 없는 ATM 아는 기사님 유용해요.", r: 5, l: "ko" },
    { n: "Gong Yoo", t: "발리 원인이라 템플 역사 잘 설명해요.", r: 5, l: "ko" },
    { n: "Jun Ji-hyun", t: "차에 WiFi 있어서 아이들이 동영상 봐요.", r: 5, l: "ko" },
    { n: "Park Bo-gum", t: "운전 부드러워서 멀미 안나요.", r: 5, l: "ko" },
    { n: "Lee Jong-suk", t: "비 많이 와도 기사님이 열정적으로 가르쳐줘요.", r: 5, l: "ko" },
    { n: "Kim Tae-hyung", t: "꾸따 가는 지름길 알아서 교통 피했어요.", r: 5, l: "ko" },
    { n: "Jennie", t: "쇼핑한거 많은데 잘 정리해서 넣어줘요.", r: 5, l: "ko" },
    { n: "V", t: "필요하면 조용히 해줘서 프라이버시 리스팩해요.", r: 5, l: "ko" },
    { n: "Rose", t: "모두 안전띠 있어서 안전해요.", r: 5, l: "ko" },
    { n: "Lisa", t: "관광지 입구 가까운 주차장 잘 찾아요.", r: 5, l: "ko" },
    { n: "BTS Jimin", t: "예약 쉽어요. 시간 날짜만 말했어요.", r: 5, l: "ko" },
    { n: "BTS V", t: "사람 적을 때 가는 타이밍 잘 알아요.", r: 5, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Ricardo Santos", t: "Trânsito para Ubud estava terrível, mas motorista calmo.", r: 5, l: "pt" },
    { n: "Fernanda Costa", t: "Motorista indicou restaurante halal ótimo em Seminyak.", r: 5, l: "pt" },
    { n: "Marcos Silva", t: "Hiace acomoda 10 pessoas confortavelmente.", r: 5, l: "pt" },
    { n: "Carla Oliveira", t: "Motorista fala pouco russo. Minha amiga conseguiu falar.", r: 5, l: "pt" },
    { n: "Paulo Ferreira", t: "Preço já inclui gasolina e pedágio. Sem custos extras.", r: 5, l: "pt" },
    { n: "Ana Lima", t: "Motorista tirou ótimas fotos em Uluwatu.", r: 5, l: "pt" },
    { n: "Roberto Alves", t: "Solicitado pickup às 4AM, veio antes do horário.", r: 5, l: "pt" },
    { n: "Juliana Rodrigues", t: "Cancelamos alguns lugares por chuva, motorista entendeu.", r: 5, l: "pt" },
    { n: "Luiz Pereira", t: "Alphard super confortável com bancos de couro.", r: 5, l: "pt" },
    { n: "Camila Gomes", t: "Motorista conhece ATM sem taxas. Muito útil!", r: 5, l: "pt" },
    { n: "Diego Martins", t: "Motorista é balinês, explicou história dos templos.", r: 5, l: "pt" },
    { n: "Bianca Rocha", t: "Carro tinha WiFi! Crianças assistiram vídeos.", r: 5, l: "pt" },
    { n: "Felipe Viana", t: "Dirige suavemente, freio leve. Sem enjoo.", r: 5, l: "pt" },
    { n: "Patrícia Castro", t: "Chuva forte mas motorista entusiasmado.", r: 5, l: "pt" },
    { n: "Gustavo Nunes", t: "Conhece atalhos em Kuta para evitar trânsito.", r: 5, l: "pt" },
    { n: "Renata Carvalho", t: "Ajudou a organizar compras. Embalagem inteligente!", r: 5, l: "pt" },
    { n: "André Ribeiro", t: "Respeitou privacidade quando queremos silêncio.", r: 5, l: "pt" },
    { n: "Lívia Mendes", t: "Cinto de segurança para todos. Preocupado com segurança!", r: 5, l: "pt" },
    { n: "Rafael Dias", t: "Encontra estacionamento perto da entrada. Economiza caminhada!", r: 5, l: "pt" },
    { n: "Fernanda Souza", t: "Reserva simples. Só disse data e hora, pronto!", r: 5, l: "pt" },
    { n: "Bruno Moreira", t: "Sabe os melhores horários para evitar multidões.", r: 5, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Youssef Ali", t: "الطريق إلى أوبود كان مزدحماً، لكن السائق هادئ.", r: 5, l: "ar" },
    { n: "Nadia Hassan", t: "السائق رشح مطعم حلال رائع في سيمينياك.", r: 5, l: "ar" },
    { n: "Omar Mahmoud", t: "حافلة هايس تتسع 10 أشخاص بسهولة.", r: 5, l: "ar" },
    { n: "Layla Ahmed", t: "السائق يتحدث بعض الألمانية. صديقتي تتواصل!", r: 5, l: "ar" },
    { n: "Karim Khaled", t: "السعر يشمل البنزين ورسوم الطريق. بدون تكاليف إضافية.", r: 5, l: "ar" },
    { n: "Dina Farooq", t: "التقط صور رائعة لنا في ألولوواتو.", r: 5, l: "ar" },
    { n: "Tariq Mohamed", t: "طلبت استقالاً في الساعة 4 صباحاً، جاء مبكراً.", r: 5, l: "ar" },
    { n: "Sara Ali", t: "ألغينا بعض الأماكن بسبب المطر، السائق فهم.", r: 5, l: "ar" },
    { n: "Amir Hassan", t: "سيارة ألفارد مريحة جداً.", r: 5, l: "ar" },
    { n: "Fatima Khaled", t: "السائق يعرف ماكينة صراف بدون رسوم.", r: 5, l: "ar" },
    { n: "Youssef Mahmoud", t: "السائق من بالي، شرح تاريخ المعابد بالتفصيل.", r: 5, l: "ar" },
    { n: "Mona Ali", t: "السيارة تحتوي على WiFi! الأطفال يشاهدون الفيديو.", r: 5, l: "ar" },
    { n: "Hassan Farooq", t: "قيادة سلسة، فرملة خفيفة. لا دوار.", r: 5, l: "ar" },
    { n: "Dina Mohamed", t: "مطر قوي لكن السائق متحمس.", r: 5, l: "ar" },
    { n: "Tariq Ahmed", t: "يعرف الطرق المختصرة في كوتا لتجنب الزحام.", r: 5, l: "ar" },
    { n: "Sara Hassan", t: "ساعد في ترتيب التسوق. ترتيب ذكي!", r: 5, l: "ar" },
    { n: "Amir Khaled", t: "حترم الخصوصية عندما نحتاج الهدوء.", r: 5, l: "ar" },
    { n: "Fatima Ali", t: "أحزمة أمان للجميع. مهتم بالسلامة!", r: 5, l: "ar" },
    { n: "Youssef Mahmoud", t: "يجد موقفاً قريباً من المدخل. يوفر المشي!", r: 5, l: "ar" },
    { n: "Dina Farooq", t: "الحجز بسيط. قلت التاريخ والوقت، تم!", r: 5, l: "ar" },
    { n: "Tariq Mohamed", t: "يعرف الأوقات الأفضل لتجنب الحشود.", r: 5, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Sergei Ivanov", t: "Трафик в Убуд был ужасный, но водитель спокоен.", r: 5, l: "ru" },
    { n: "Anna Petrova", t: "Водитель порекомендовал отличный халальный ресторан в Семиньяке.", r: 5, l: "ru" },
    { n: "Dmitri Smirnov", t: "Хиас вмещает 10 человек комфортно.", r: 5, l: "ru" },
    { n: "Elena Volkova", t: "Водитель говорит немного турецкий. Моя друг смогла общаться!", r: 5, l: "ru" },
    { n: "Andrey Kuznetsov", t: "Цена включает бензин и плату за дорогу. Скрытых платежей нет.", r: 5, l: "ru" },
    { n: "Natalia Popova", t: "Сделал отличные фотографии в Улувату.", r: 5, l: "ru" },
    { n: "Pavel Ivanov", t: "Попросил встречу в 4 утра, приехал раньше.", r: 5, l: "ru" },
    { n: "Tatiana Smirnova", t: "Отменили некоторые места из-за дождя, водитель понял.", r: 5, l: "ru" },
    { n: "Igor Volkov", t: "Альфард очень удобный с кожаными сиденьями.", r: 5, l: "ru" },
    { n: "Olga Kuznetsova", t: "Водитель знает банкоматы без комиссий. Очень полезно!", r: 5, l: "ru" },
    { n: "Alexei Popov", t: "Водитель балинец, объяснил историю храмов детально.", r: 5, l: "ru" },
    { n: "Svetlana Ivanova", t: "В машине есть WiFi! Дети смотрели видео.", r: 5, l: "ru" },
    { n: "Mikhail Smirnov", t: "Плавная езда, плавное торможение. Нет укачивания.", r: 5, l: "ru" },
    { n: "Maria Volkova", t: "Сильный дождь но водитель был энтузиаст.", r: 5, l: "ru" },
    { n: "Andrey Kuznetsov", t: "Знает объездные пути в Куте.", r: 5, l: "ru" },
    { n: "Natalia Popova", t: "Помог упаковать покупки. Умная упаковка!", r: 5, l: "ru" },
    { n: "Pavel Ivanov", t: "Уважал приватность, когда нам нужна тишина.", r: 5, l: "ru" },
    { n: "Tatiana Smirnova", t: "Ремни безопасности для всех. Заботится о безопасности!", r: 5, l: "ru" },
    { n: "Igor Volkov", t: "Всегда находит парковку близко к входу.", r: 5, l: "ru" },
    { n: "Olga Kuznetsova", t: "Бронирование простое. Сказал дату и время, готово!", r: 5, l: "ru" },
    { n: "Alexei Popov", t: "Знает лучшие времена, чтобы избежать толпы.", r: 5, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Mehmet Özkan", t: "Ubud'a gidişte çok trafikti ama sürücü sakin.", r: 5, l: "tr" },
    { n: "Ayşe Yılmaz", t: "Sürücü Seminyak'ta harika halal restoran önerdi.", r: 5, l: "tr" },
    { n: "Ali Demir", t: "Hiace 10 kişiyi rahatça alıyor.", r: 5, l: "tr" },
    { n: "Fatma Kaya", t: "Sürücü biraz Yunanca biliyor. Arkadaşım konuşabildi!", r: 5, l: "tr" },
    { n: "Mustafa Arslan", t: "Fiyat benzin ve yol ücreti dahil. Ekstra ücret yok.", r: 5, l: "tr" },
    { n: "Zeynep Çelik", t: "Uluwatu'da harika fotoğraf çekti.", r: 5, l: "tr" },
    { n: "Burak Koç", t: "Sabah 4'te istedim, daha erken geldi.", r: 5, l: "tr" },
    { n: "Selin Yıldız", t: "Yağmur yüzünden bazı yerleri iptal ettik, anladı.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Alphard deri koltuklu çok rahat.", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Komisyoncusuz ATM biliyor sürücü. Çok faydalı!", r: 5, l: "tr" },
    { n: "Ceren Özkan", t: "Sürücü Bali'li, tapınak tarihini detaylı anlattı.", r: 5, l: "tr" },
    { n: "Can Arslan", t: "Arabada WiFi var! Çocuklar video izledi.", r: 5, l: "tr" },
    { n: "Merve Yıldız", t: "Yumuşak sürüş, hafif fren. Bulantı yok.", r: 5, l: "tr" },
    { n: "Tolga Demir", t: "Şiddetli yağmur ama sürücü heyecanlı.", r: 5, l: "tr" },
    { n: "Buse Kaya", t: "Kuta'da kestirmeleri biliyor.", r: 5, l: "tr" },
    { n: "Oğuz Arslan", t: "Alışverişleri düzenlemeye yardımcı oldu. Akıllı düzen!", r: 5, l: "tr" },
    { n: "Selin Yıldız", t: "Sessizlik istediğimizde gizliliğe saygı duydu.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Herkes için emniyet kemeri var. Güvenliğe önem veriyor!", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Girişe yakın otopark buluyor. Yürümeyi tasarruf ediyor!", r: 5, l: "tr" },
    { n: "Ceren Özkan", t: "Rezervasyon basit. Tarih ve saat dedim, tamam!", r: 5, l: "tr" },
    { n: "Can Arslan", t: "Kalabalıktan kaçmak için en iyi zamanları biliyor.", r: 5, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDate4to6MonthsAgo()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (4-6 Months ago)!`)
}

seedQuarter2Reviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
