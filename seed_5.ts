import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak 13-18 bulan terakhir
function getDate13to18MonthsAgo() {
  const now = new Date()
  const eighteenMonthsAgo = new Date(now.getTime() - (540 * 24 * 60 * 60 * 1000))
  const thirteenMonthsAgo = new Date(now.getTime() - (390 * 24 * 60 * 60 * 1000))
  return new Date(eighteenMonthsAgo.getTime() + Math.random() * (thirteenMonthsAgo.getTime() - eighteenMonthsAgo.getTime()))
}

async function seedYear2Reviews() {
  console.log('🌱 Seeding 150 Reviews (13-18 Months Ago)...')

  const reviews = [
    // --- INDONESIAN (22 items) ---
    { n: "Rizky Pratama", t: "Pelayanan standar aja, ga ada yg spesial. Oke lah.", r: 3, l: "id" },
    { n: "Siti Aminah", t: "Drivernya agak dingin gitu, kurang ramah.", r: 3, l: "id" },
    { n: "Agus Hermawan", t: "AC mobilnya bocor dikit airnya netes ke jok. Ga enak.", r: 3, l: "id" },
    { n: "Dewi Kartika", t: "Mobilnya agak bunyi pas jalan bolak-balik. Ganggu tidur.", r: 3, l: "id" },
    { n: "Budi Santoso", t: "Drivernya oke sih tp sering bales WA pelan-pelan.", r: 3, l: "id" },
    { n: "Rina Anggraini", t: "Harganya sedikit di atas rata-rata rental yg laen.", r: 3, l: "id" },
    { n: "Hendra Wijaya", t: "Mobilnya agak sempit, kita ber4 orang agak sesak dikit.", r: 3, l: "id" },
    { n: "Siti Nurhaliza", t: "Drivernya kurang hapal jalan di Ubud, sesat 2 kali.", r: 3, l: "id" },
    { n: "Dimas Pratama", t: "Drivernya lumayan ramah tp kurang informatif soal tmpt wisata.", r: 4, l: "id" },
    { n: "Mega Pertiwi", t: "Mobilnya wangi pandan, enak bgt ga bikin mual.", r: 5, l: "id" },
    { n: "Yudi Setiawan", t: "Drivernya sabar banget nungguin kita antri di pasar.", r: 5, l: "id" },
    { n: "Fitria Handayani", t: "Drivernya bawa uang kecil buat kita pas ga ada uang recehan.", r: 5, l: "id" },
    { n: "Reza Permana", t: "Drivernya bisa cari jalan alternatif pas jalan utama macet.", r: 4, l: "id" },
    { n: "Anita Kusuma", t: "Drivernya tau tempat makan halal yg enak di area Kuta.", r: 5, l: "id" },
    { n: "Ratna Sari", t: "Jemput di bandara pas waktu, driver udah nunggu di lobi.", r: 4, l: "id" },
    { n: "Fajar Santoso", t: "Drivernya pinter fotoin, hasilnya bagus-bagus.", r: 5, l: "id" },
    { n: "Wulan Maharani", t: "Musik di mobil bisa request sendiri, driver bisa playlistin.", r: 4, l: "id" },
    { n: "Eko Nugroho", t: "Drivernya jaga privacy banget, ga kepo urusan pribadi.", r: 5, l: "id" },
    { n: "Susi Wulandari", t: "Mobilnya bersih banget, interiornya rapi.", r: 5, l: "id" },
    { n: "Toni Hermawan", t: "Drivernya pinter nawar harga tiket, bisa dapet diskon.", r: 4, l: "id" },
    { n: "Rina Pertiwi", t: "Driver bisa bhs inggris lumayan, bule bisa ngobrol.", r: 4, l: "id" },
    { n: "Doni Setiawan", t: "Harga sewanya termasuk bensin sama driver, jadi ga ribet.", r: 4, l: "id" },
    { n: "Maya Anggraini", t: "Drivernya bisa bhs Mandarin dikit, tamu dr China bisa ngobrol.", r: 4, l: "id" },

    // --- ENGLISH (22 items) ---
    { n: "Thomas Wright", t: "Standard service, nothing special. It's okay.", r: 3, l: "en" },
    { n: "Sarah Mitchell", t: "Driver was a bit cold, not very friendly.", r: 3, l: "en" },
    { n: "James Wilson", t: "AC was leaking a bit, water dripping on seats. Uncomfortable.", r: 3, l: "en" },
    { n: "Emily Chen", t: "Car made some noise going over bumps. Disturbed sleep.", r: 3, l: "en" },
    { n: "Michael Brown", t: "Driver was okay but replies to WhatsApp were slow.", r: 3, l: "en" },
    { n: "Jessica Taylor", t: "Price slightly above average compared to other rentals.", r: 3, l: "en" },
    { n: "David Anderson", t: "Car was a bit cramped, 4 of us felt squeezed.", r: 3, l: "en" },
    { n: "Olivia Moore", t: "Driver didn't know Ubud roads well, got lost twice.", r: 3, l: "en" },
    { n: "Daniel Lee", t: "Driver was somewhat friendly but not informative about spots.", r: 4, l: "en" },
    { n: "Sophie Harris", t: "Car smelled like pandan! So nice, didn't feel sick.", r: 5, l: "en" },
    { n: "Chris Martinez", t: "Driver was super patient while we queued at the market.", r: 5, l: "en" },
    { n: "Emma Clark", t: "Driver brought small change for us when no change.", r: 5, l: "en" },
    { n: "Matthew Lewis", t: "Driver could find alternative routes when main roads jammed.", r: 4, l: "en" },
    { n: "Jennifer Walker", t: "Driver knows good halal restaurants in Kuta area.", r: 5, l: "en" },
    { n: "Robert Young", t: "Airport pickup was on time, driver waiting at lobby.", r: 4, l: "en" },
    { n: "Amanda Garcia", t: "Driver took great photos! Results were beautiful.", r: 5, l: "en" },
    { n: "Joshua King", t: "Music in car was customizable, driver played our playlist.", r: 4, l: "en" },
    { n: "Ashley Robinson", t: "Driver respected privacy, didn't pry into personal stuff.", r: 5, l: "en" },
    { n: "Ryan Hall", t: "Car was very clean, interior was tidy.", r: 5, l: "en" },
    { n: "Stephanie White", t: "Driver skilled at bargaining, got ticket discounts.", r: 4, l: "en" },
    { n: "Kevin Davis", t: "Driver speaks decent English, foreigners can chat.", r: 4, l: "en" },
    { n: "Michelle Brown", t: "Price included petrol and driver. No hassle.", r: 4, l: "en" },
    { n: "Andrew Wilson", t: "Driver speaks a bit of Mandarin, Chinese guests can chat.", r: 4, l: "en" },

    // --- CHINESE (21 items) ---
    { n: "Wang Wei", t: "服务一般般，没有什么特别的。还行。", r: 3, l: "zh" },
    { n: "Li Na", t: "司机有点冷淡，不太友好。", r: 3, l: "zh" },
    { n: "Zhang Qiang", t: "空调漏了一点水，滴在座位上。不舒服。", r: 3, l: "zh" },
    { n: "Liu Mei", t: "车子过减速带有点响，影响睡觉。", r: 3, l: "zh" },
    { n: "Chen Wei", t: "司机还可以，但是回WhatsApp很慢。", r: 3, l: "zh" },
    { n: "Yang Li", t: "价格比其他租车稍微高一点。", r: 3, l: "zh" },
    { n: "Zhao Hua", t: "车有点挤，我们4个人感觉有点挤。", r: 3, l: "zh" },
    { n: "Wu Yan", t: "司机不太熟悉乌布的路，迷路了两次。", r: 3, l: "zh" },
    { n: "Sun Ming", t: "司机还算友好，但对景点不太了解。", r: 4, l: "zh" },
    { n: "Li Na", t: "车里有桉树香味，很舒服不晕车。", r: 5, l: "zh" },
    { n: "Zhang Wei", t: "在市场排队时司机很耐心。", r: 5, l: "zh" },
    { n: "Liu Yang", t: "给我们准备了零钱，很贴心。", r: 5, l: "zh" },
    { n: "Chen Jie", t: "主路堵车时能找到替代路线。", r: 4, l: "zh" },
    { n: "Yang Xi", t: "司机知道古塔好吃的清真餐厅。", r: 5, l: "zh" },
    { n: "Zhao Lei", t: "机场接机准时，司机在大厅等。", r: 4, l: "zh" },
    { n: "Wu Gang", t: "司机拍照技术很好，拍得很漂亮。", r: 5, l: "zh" },
    { n: "Zhou Xun", t: "车里的歌可以点，司机播放了我们的歌单。", r: 4, l: "zh" },
    { n: "Ma Yun", t: "司机很尊重隐私，不问私人事情。", r: 5, l: "zh" },
    { n: "Pony Ma", t: "车很干净，内饰整洁。", r: 5, l: "zh" },
    { n: "Lei Jun", t: "司机会砍价，能拿到门票折扣。", r: 4, l: "zh" },

    // --- KOREAN (21 items) ---
    { n: "Kim Min-jun", t: "서비스 평범해요. 별로 특별한거 없어요.", r: 3, l: "ko" },
    { n: "Lee Ji-eun", t: "기사님이 좀 차갔어요. 친절하진 않아요.", r: 3, l: "ko" },
    { n: "Park Seo-joon", t: "에어컨에서 물 좀 뚝어서 자리에 뚝어요.", r: 3, l: "ko" },
    { n: "Choi Woo-shik", t: "차가 울덩거리에서 시끄러워서 못 잤어요.", r: 3, l: "ko" },
    { n: "Song Joong-ki", t: "기사님 괜찮은데 답장이 느려요.", r: 3, l: "ko" },
    { n: "Hyun Bin", t: "다른 대여차보다 조금 비싸요.", r: 3, l: "ko" },
    { n: "Son Ye-jin", t: "차 좀 좁아서 우리 4명이 좀 갑갑했어요.", r: 3, l: "ko" },
    { n: "Lee Min-ho", t: "웁드 길을 잘 몰라서 두 번 헤맸어요.", r: 3, l: "ko" },
    { n: "Kim Go-eun", t: "기사님 괜찮은데 관광지 정보 잘 몰라요.", r: 4, l: "ko" },
    { n: "Suzy", t: "차에서 유칼리 향이 나와서 편해요. 멀미 안나요.", r: 5, l: "ko" },
    { n: "Gong Yoo", t: "시장에서 줄 설 때 기사님이 침착해요.", r: 5, l: "ko" },
    { n: "Jun Ji-hyun", t: "거스름돈 준비해줘요. 다정해요!", r: 5, l: "ko" },
    { n: "Park Bo-gum", t: "메인 길 막힐 때 대안 길 찾을 수 있어요.", r: 4, l: "ko" },
    { n: "Lee Jong-suk", t: "꾸따 맛있는 할람 레스토랑 잘 알아요.", r: 5, l: "ko" },
    { n: "Kim Tae-hyung", t: "공항 픽업 제시간에 도착, 기사님이 기다리고 있어요.", r: 4, l: "ko" },
    { n: "Jennie", t: "사진 잘 찍어줘요. 결과 예뻤요!", r: 5, l: "ko" },
    { n: "V", t: "차에 음악 요청 가능해요. 저희 플레이리스트 틀어줘요.", r: 4, l: "ko" },
    { n: "Rose", t: "프라이버시 리스팩해서 개인 사항 안 물어봐요.", r: 5, l: "ko" },
    { n: "Lisa", t: "차 깨끗하고 인테리어 정돈해요.", r: 5, l: "ko" },
    { n: "BTS Jimin", t: "가격 협상해서 잘 싹둘 수 있어요.", r: 4, l: "ko" },

    // --- PORTUGUESE (21 items) ---
    { n: "Ricardo Santos", t: "Serviço padrão, nada especial. Aceitável.", r: 3, l: "pt" },
    { n: "Ana Costa", t: "Motorista meio frio, não muito simpático.", r: 3, l: "pt" },
    { n: "João Lima", t: "AC vazando um pouco, pingando nos bancos.", r: 3, l: "pt" },
    { n: "Maria Ferreira", t: "Carro fazia barulho nas lombadas. Perturbou sono.", r: 3, l: "pt" },
    { n: "Pedro Alves", t: "Motorista ok mas respostas lentas no WhatsApp.", r: 3, l: "pt" },
    { n: "Lucas Pereira", t: "Preço um pouco acima da média.", r: 3, l: "pt" },
    { n: "Juliana Gomes", t: "Carro um pouco apertado, 4 pessoas sentiram apertado.", r: 3, l: "pt" },
    { n: "Rafael Rocha", t: "Motorista não conhece bem Ubud, perdeu-se 2 vezes.", r: 3, l: "pt" },
    { n: "Bruna Martins", t: "Motorista razoavelmente simpático mas pouco informativo.", r: 4, l: "pt" },
    { n: "Diego Viana", t: "Carro cheirava a eucalipto! Bom, não enjoou.", r: 5, l: "pt" },
    { n: "Camila Castro", t: "Muito paciente enquanto fizemos fila no mercado.", r: 5, l: "pt" },
    { n: "Felipe Nunes", t: "Tinha trocado pequeno pra gente. Muito atencioso!", r: 5, l: "pt" },
    { n: "Patricia Carvalho", t: "Conseguia rotas alternativas quando estrada engarrafava.", r: 4, l: "pt" },
    { n: "Gustavo Ribeiro", t: "Sabe restaurantes halal bons em Kuta.", r: 5, l: "pt" },
    { n: "Renata Dias", t: "Pickup no aeroporto no horário, motorista esperando.", r: 4, l: "pt" },
    { n: "André Souza", t: "Tirava ótimas fotos! Resultados lindos.", r: 5, l: "pt" },
    { n: "Lívia Moreira", t: "Música personalizável, tocou nossa playlist.", r: 4, l: "pt" },
    { n: "Rafael Santos", t: "Respeitava privacidade, não perguntava pessoais.", r: 5, l: "pt" },
    { n: "Fernanda Costa", t: "Carro muito limpo, interior organizado.", r: 5, l: "pt" },
    { n: "Marcos Lima", t: "Habil em negociar, conseguiu descontos.", r: 4, l: "pt" },

    // --- ARABIC (21 items) ---
    { n: "Ahmed Ali", t: "خدمة عادية، لا شيء خاص. مقبول.", r: 3, l: "ar" },
    { n: "Fatima Hassan", t: "السائق بارد قليلاً، ليس ودياً جداً.", r: 3, l: "ar" },
    { n: "Omar Farooq", t: "المكيف يسرب قليلاً، الماء يقطر على المقاعد.", r: 3, l: "ar" },
    { n: "Khalid Rahman", t: "السيارة تصدر صوتاً على المطبات. يزعج النوم.", r: 3, l: "ar" },
    { n: "Yusuf Amir", t: "السائق جيد لكن الردود على واتساب بطيئة.", r: 3, l: "ar" },
    { n: "Aisha Karim", t: "السعر أعلى قليلاً من المتوسط.", r: 3, l: "ar" },
    { n: "Nasser Al-Attiyah", t: "السيارة ضيقة قليلاً، شعرنا 4 أشخاص بضيق.", r: 3, l: "ar" },
    { n: "Dina Ahmed", t: "السائق لا يعرف جيداً أوبود، ضاع الطريق مرتين.", r: 3, l: "ar" },
    { n: "Hassan Mohamed", t: "السائق معقول الودي ولكن ليس مفيداً كثيراً.", r: 4, l: "ar" },
    { n: "Mona Ali", t: "السيارة برائحة الأوكالبتوس! مريح لا دوخ.", r: 5, l: "ar" },
    { n: "Karim Mahmoud", t: "صبور جداً في السوق بينما كنا ننتظر.", r: 5, l: "ar" },
    { n: "Layla Hussein", t: "جهز لنا صرف صغير. لطيف جداً!", r: 5, l: "ar" },
    { n: "Tariq Ahmed", t: "يستطيع العثور على طرق بديلة عند الازدحام.", r: 4, l: "ar" },
    { n: "Sara Hassan", t: "يعرف مطاعم حلال جيدة في منطقة كوتا.", r: 5, l: "ar" },
    { n: "Youssef Ali", t: "الاستقبال في المطار في الوقت المحدد، السائق ينتظر.", r: 4, l: "ar" },
    { n: "Amir Mahmoud", t: "التقط صور رائعة، النتائج جميلة.", r: 5, l: "ar" },
    { n: "Fatima Khaled", t: "الموسيقى قابلة للتخصيص، شغل قائمتنا.", r: 4, l: "ar" },
    { n: "Nadia Ahmed", t: "يحترم الخصوصية، لا يسأل عن أشخاصية.", r: 5, l: "ar" },
    { n: "Hassan Ali", t: "السيارة نظيفة جداً، الداخل مرتب.", r: 5, l: "ar" },
    { n: "Mona Khaled", t: "ماهر في التفاوض، حصل على خصومات.", r: 4, l: "ar" },

    // --- RUSSIAN (21 items) ---
    { n: "Ivan Petrov", t: "Сервис обычный, ничего особенного. Приемлемо.", r: 3, l: "ru" },
    { n: "Anna Smirnova", t: "Водитель немного холодный, не очень дружелюбный.", r: 3, l: "ru" },
    { n: "Dmitry Volkov", t: "Кондер немного подтекал, капала на сиденья.", r: 3, l: "ru" },
    { n: "Maria Sokolova", t: "Машина шумная на кочках. Мешала спать.", r: 3, l: "ru" },
    { n: "Sergei Popov", t: "Водитель ок но ответы на WhatsApp медленные.", r: 3, l: "ru" },
    { n: "Vladimir Ivanov", t: "Цена немного выше среднего.", r: 3, l: "ru" },
    { n: "Elena Kuznetsova", t: "Машина немного тесно, 4 человека чувствовали себя стесненно.", r: 3, l: "ru" },
    { n: "Alexey Smirnov", t: "Водитель плохо знает Убуд, потерялся дважды.", r: 3, l: "ru" },
    { n: "Natalia Volkova", t: "Водитель разумно дружелюбен но мало информативен.", r: 4, l: "ru" },
    { n: "Pavel Ivanov", t: "Машина пахла эвкалиптом! Хорошо, не закачивало.", r: 5, l: "ru" },
    { n: "Tatiana Popova", t: "Очень терпелив пока мы стояли в очереди.", r: 5, l: "ru" },
    { n: "Igor Kuznetsov", t: "Приготовил мелочь для нас. Очень внимательный!", r: 5, l: "ru" },
    { n: "Olga Smirnova", t: "Мог найти альтернативные маршруты при пробках.", r: 4, l: "ru" },
    { n: "Andrey Volkov", t: "Знает хорошие халальные рестораны в Куте.", r: 5, l: "ru" },
    { n: "Maria Kuznetsova", t: "Встреча в аэропорту вовремя, водитель ждал.", r: 4, l: "ru" },
    { n: "Dmitri Ivanov", t: "Сделал отличные фото! Результаты красивые.", r: 5, l: "ru" },
    { n: "Anna Volkova", t: "Музыка настраиваемая, включил наш плейлист.", r: 4, l: "ru" },
    { n: "Sergei Smirnov", t: "Уважал приватность, не спрашивал о личном.", r: 5, l: "ru" },
    { n: "Natalia Ivanova", t: "Машина очень чистая, интерьер аккуратный.", r: 5, l: "ru" },
    { n: "Pavel Popov", t: "Умеет торговаться, получил скидки.", r: 4, l: "ru" },

    // --- TURKISH (21 items) ---
    { n: "Ahmet Yilmaz", t: "Standart hizmet, özel bir şey yok. Kabul edilebilir.", r: 3, l: "tr" },
    { n: "Ayşe Demir", t: "Sürücü biraz soğuk, çok kibar değil.", r: 3, l: "tr" },
    { n: "Mehmet Kaya", t: "Klima biraz sızıyor, koltuklara damlıyor.", r: 3, l: "tr" },
    { n: "Fatma Özkan", t: "Araba allıklarda gürültülü yapıyor. Uyku bozuyor.", r: 3, l: "tr" },
    { n: "Ali Çelik", t: "Sürücü iyi ama WhatsApp cevapları yavaş.", r: 3, l: "tr" },
    { n: "Zeynep Yildiz", t: "Fiyat ortalamanın biraz üzerinde.", r: 3, l: "tr" },
    { n: "Mustafa Arslan", t: "Araba biraz dar, 4 kişi sıkışmış hissettik.", r: 3, l: "tr" },
    { n: "Elif Şahin", t: "Sürücü Ubud yollarını iyi bilmiyor, 2 kez kaydı.", r: 3, l: "tr" },
    { n: "Burak Koç", t: "Sürücü makul derecede kibar ama çok bilgili değil.", r: 4, l: "tr" },
    { n: "Selin Yilmaz", t: "Arabada okaliptüs kokusu var! İyi, mide bulandırmadı.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Pazarda sırayken çok sabırlı.", r: 5, l: "tr" },
    { n: "Deniz Kaya", t: "Bizim için küçük para hazırladı. Çok ilgili!", r: 5, l: "tr" },
    { n: "Ceren Özkan", t: "Yol tıkanıklığında alternatif rotalar bulabilir.", r: 4, l: "tr" },
    { n: "Can Arslan", t: "Kuta'da iyi halal restoranlar biliyor.", r: 5, l: "tr" },
    { n: "Merve Yildiz", t: "Havalimanı transferi zamanında, sürücü bekliyor.", r: 4, l: "tr" },
    { n: "Tolga Demir", t: "Harika fotoğraf çekti! Sonuçlar güzel.", r: 5, l: "tr" },
    { n: "Buse Kaya", t: "Müzik kişiselleştirilebilir, çalma listemizi çaldı.", r: 4, l: "tr" },
    { n: "Oğuz Arslan", t: "Mahremiyete saygı duyuyor, kişisel şeyler sormuyor.", r: 5, l: "tr" },
    { n: "Selin Yilmaz", t: "Araba çok temiz, iç düzenli.", r: 5, l: "tr" },
    { n: "Emre Demir", t: "Pazarlıkta iyi, indirim alabiliyor.", r: 4, l: "tr" }
  ]

  const dataToInsert = reviews.map(r => ({
    userName: r.n,
    comment: r.t,
    rating: r.r,
    lang: r.l,
    category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)],
    createdAt: getDate13to18MonthsAgo()
  }))

  await prisma.review.createMany({ data: dataToInsert })
  console.log(`✅ Successfully added ${dataToInsert.length} reviews (13-18 Months ago)!`)
}

seedYear2Reviews()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
