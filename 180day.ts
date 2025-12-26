import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak antara 3 bulan lalu s/d 6 bulan lalu
function getRandomDate3to6MonthsAgo() {
  const now = new Date()
  const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000))
  const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
  
  // Random range antara 6 bulan lalu dan 3 bulan lalu
  return new Date(sixMonthsAgo.getTime() + Math.random() * (threeMonthsAgo.getTime() - sixMonthsAgo.getTime()))
}

async function seedPastQuarterReviews() {
  console.log('🌱 Starting seed for 100 reviews (3-6 months ago timeline)...')

  // 1. INDONESIAN REVIEWS (30 items) - Topik beda: Musik, Belanja, Sunset, Tol, dll.
  const idReviews = [
    { name: "Bayu Skak", text: "Drivernya chill abis, kita request lagu Spotify diputerin satu album. Perjalanan jauh ke Gilimanuk jadi ga kerasa.", rating: 5 },
    { name: "Tasya Farasya", text: "Sabar banget nungguin kita belanja oleh-oleh di Krisna sampe 2 jam lebih wkwk. Maaf ya Pak!", rating: 5 },
    { name: "Arief Muhammad", text: "Mobil Innova Reborn nya enak, suspensi empuk. Tidur pules pas balik dari Bedugul.", rating: 5 },
    { name: "Rachel Vennya", text: "Sempet macet parah di jalan bypass, tapi bapaknya pinter cari jalan alternatif lewat gang-gang perumahan.", rating: 5 },
    { name: "Keanu Agl", text: "Duh seneng bgt, drivernya ga kepo. Kita butuh privasi di mobil dan dia ngehargain itu. Diem aja fokus nyetir.", rating: 5 },
    { name: "Fadil Jaidi", text: "Paket tour Nusa Penida nya oke, tapi pas nyebrang boat agak telat dikit koordinasinya. Sisanya aman.", rating: 4 },
    { name: "Jerome Polin", text: "Itungan harganya fair, udah include bensin sama tol Mandara. Ga ada nembak harga di akhir.", rating: 5 },
    { name: "Maudy Ayunda", text: "Drivernya wawasan luas, cerita sejarah Pura Besakih jadi kayak lagi kuliah lapangan tapi seru.", rating: 5 },
    { name: "Vidi Aldiano", text: "AC-nya bocor dikit airnya netes, tp driver sigap langsung lapor kantor dan nawarin ganti unit. Responsif.", rating: 4 },
    { name: "Isyana Sarasvati", text: "Diajak ke tempat hidden gem air terjun yg blm rame turis. Jalannya ngeri2 sedap tp worth it!", rating: 5 },
    { name: "Chef Juna", text: "Cara bawanya halus, ngerem ga ndut-ndutan. Penting buat saya yg gampang mabok darat.", rating: 5 },
    { name: "Chef Arnold", text: "Rekomendasi seafood di Jimbaran-nya valid no debat. Enak dan ga digetok harga.", rating: 5 },
    { name: "Renatta Moeloek", text: "Interior mobil rapi, ga ada sampah tisu bekas tamu sebelumnya. Detail yg bagus.", rating: 5 },
    { name: "Tulus", text: "Hujan deres bgt pas di Kintamani, driver nyetir super hati-hati. Ngerasa aman.", rating: 5 },
    { name: "Raisa Andriana", text: "Bapaknya bantuin angkatin stroller bayi, ramah bgt sama anak-anak.", rating: 5 },
    { name: "Hamish Daud", text: "Jemput di bandara subuh-subuh, driver udah standby bawa papan nama. Ga pake nunggu.", rating: 5 },
    { name: "Najwa Shihab", text: "Komunikasi via WA lancar, balesnya cepet. Informatif bgt soal rundown.", rating: 5 },
    { name: "Atta Halilintar", text: "Ashiyap! Service mantep, mobil kinclong. Gaspol!", rating: 5 },
    { name: "Aurel Hermansyah", text: "Agak sedikit bau rokok pas awal masuk, mungkin sisa driver istirahat. Tp langsung disemprot pewangi kok.", rating: 4 },
    { name: "Ria Ricis", text: "Supirnya kocak, kita ngonten di mobil dibantuin pegang lighting haha.", rating: 5 },
    { name: "Teuku Ryan", text: "Harga bersahabat buat kantong mahasiswa yg mau liburan rame-rame.", rating: 5 },
    { name: "Marshel Widianto", text: "Meskipun gue cerewet minta berenti di Indomaret berkali-kali, bapaknya senyum terus.", rating: 5 },
    { name: "Kiky Saputri", text: "Transfer hotel lancar jaya. Ga pake drama nyasar.", rating: 5 },
    { name: "Cinta Laura", text: "Driver bisa bahasa Inggris dikit-dikit, jadi temen bule saya bisa ngobrol juga.", rating: 5 },
    { name: "Pevita Pearce", text: "Ke Uluwatu ngejar sunset, driver tau spot parkir yg deket pintu masuk biar ga jalan jauh.", rating: 5 },
    { name: "Chelsea Islan", text: "Mobil Hiace-nya lega, kita rombongan 10 orang muat semua koper masuk.", rating: 5 },
    { name: "Nicholas Saputra", text: "Hening, tenang. Driver tau kapan harus ngajak ngobrol kapan harus diem.", rating: 5 },
    { name: "Dian Sastro", text: "Service oke, cuma musik dangdutnya agak kekencengan tadi hehe. Tapi pas diminta kecilin mau kok.", rating: 4 },
    { name: "Chicco Jerikho", text: "Kopi plantation tour-nya seru. Driver kenal sama orang dalem jadi dapet diskon.", rating: 5 },
    { name: "Baim Wong", text: "Bosque, ini travel paling bener dah. Ga nipu-nipu.", rating: 5 }
  ]

  // 2. ENGLISH REVIEWS (25 items) - Different focuses: WhatsApp ease, Waterfall trek, ATM stops
  const enReviews = [
    { name: "Elon Musk", text: "Straightforward booking via WhatsApp. Very practical.", rating: 5 },
    { name: "Jeff Bezos", text: "Logistics were handled perfectly. From Ubud to Seminyak in record time despite traffic.", rating: 5 },
    { name: "Bill Gates", text: "Driver was knowledgeable about the local irrigation system (Subak). Fascinating conversation.", rating: 5 },
    { name: "Mark Zuckerberg", text: "Connected my phone to bluetooth easily. Good sound system.", rating: 5 },
    { name: "Oprah Winfrey", text: "Such a soulful trip to the water temple. The driver explained the rituals beautifully.", rating: 5 },
    { name: "Barack Obama", text: "Nostalgic trip. Driver knew exactly where the best Nasi Goreng was.", rating: 5 },
    { name: "Donald Trump", text: "Great driver, huge car. The best service, frankly. Everyone says so.", rating: 5 },
    { name: "Joe Biden", text: "Smooth ride, I actually fell asleep for a couple of hours. Very relaxing.", rating: 5 },
    { name: "Kamala Harris", text: "We needed to stop at an ATM and money changer, driver knew reliable spots.", rating: 5 },
    { name: "Rihanna", text: "Driver didn't mind me singing loudly in the back. 10/10 vibe.", rating: 5 },
    { name: "Beyonce", text: "The car had great tint on windows, felt very private and secure.", rating: 5 },
    { name: "Jay-Z", text: "Professional. Handled our large luggage with care.", rating: 5 },
    { name: "Kanye West", text: "A bit of traffic, but the driver stayed calm. Good energy.", rating: 4 },
    { name: "Kim Kardashian", text: "He took the best angles for my photos at the Swing. Basically a photographer too!", rating: 5 },
    { name: "Kylie Jenner", text: "Love the car! So spacious for all my shopping bags.", rating: 5 },
    { name: "Kendall Jenner", text: " drove us to the volcano for sunrise. He woke up so early for us.", rating: 5 },
    { name: "Gigi Hadid", text: "Super safe driver on those winding cliff roads near Nusa Dua.", rating: 5 },
    { name: "Zendaya", text: "Really sweet guy. Offered us wet tissues when we got back from the hot beach.", rating: 5 },
    { name: "Tom Cruise", text: "Mission accomplished: Got to the airport with minutes to spare. Fast driving but safe.", rating: 5 },
    { name: "Leonardo DiCaprio", text: "Appreciated that he turned off the engine when parked to save emissions.", rating: 5 },
    { name: "Brad Pitt", text: "Good bloke. Shared a cigarette break and a chat. Very chill.", rating: 5 },
    { name: "Angelina Jolie", text: "Very accommodating for my large family. The kids loved him.", rating: 5 },
    { name: "Johnny Depp", text: "A bit hard to find the meeting point at first, but we sorted it out.", rating: 4 },
    { name: "Will Smith", text: "Keep my wife's name... actually, just a great trip. No drama.", rating: 5 },
    { name: "Dwayne Johnson", text: "The van was big enough for me. That's rare. Good suspension.", rating: 5 }
  ]

  // 3. CHINESE REVIEWS (10 items) - Focus: Payment methods (Alipay/WeChat), Elderly care
  const cnReviews = [
    { name: "Ma Yun", text: "支持微信支付，非常方便！不用换印尼盾。", rating: 5 }, // Supports WeChat pay, very convenient! No need to swap IDR.
    { name: "Pony Ma", text: "司机有微信，沟通行程很顺畅，回复秒回。", rating: 5 }, // Driver has WeChat, smooth comms, fast reply.
    { name: "Lei Jun", text: "性价比很高，比在酒店订便宜一半。", rating: 5 }, // High cost-performance, half price of hotel booking.
    { name: "Cheng Long", text: "带父母出来玩，司机开车很稳，老人没有晕车。", rating: 5 }, // Took parents, drove steady, elders didn't get carsick.
    { name: "Jet Li", text: "去海神庙的路有点堵，但司机很有耐心。", rating: 4 }, // Traffic to Tanah Lot, but driver patient.
    { name: "Fan Bingbing", text: "车里香香的，司机还准备了矿泉水，贴心。", rating: 5 }, // Car smells good, driver prepped water, thoughtful.
    { name: "Dilraba", text: "帮我们在网红景点排队拍照，太感谢了！", rating: 5 }, // Helped queue for photos at famous spots, thanks!
    { name: "Jackson Wang", text: "很酷的司机，带我们去吃了当地人的烤猪饭。", rating: 5 }, // Cool driver, took us to local Babi Guling.
    { name: "Lay Zhang", text: "准时！准时！准时！重要的事情说三遍。", rating: 5 }, // On time! On time! On time!
    { name: "Kris Wu", text: "虽然是拼车但是体验不错，车很大。", rating: 4 } // Even though shared car, experience good, car big.
  ]

  // 4. KOREAN REVIEWS (10 items) - Focus: Massage, "Healing", Quick response
  const krReviews = [
    { name: "Song Joong-ki", text: "카카오톡으로 예약할 수 있어서 편했습니다.", rating: 5 }, // Convenient to book via KakaoTalk.
    { name: "Song Hye-kyo", text: "마사지 샵 예약을 도와주셨어요. 정말 힐링했습니다.", rating: 5 }, // Helped book massage shop. Truly healing.
    { name: "Hyun Bin", text: "운전 매너가 아주 좋습니다. 클락션을 거의 안 울리심.", rating: 5 }, // Driving manners very good. Rarely honked.
    { name: "Son Ye-jin", text: "우붓 시장에서 물건 살 때 흥정도 도와주셨어요 ㅋㅋ", rating: 5 }, // Helped bargain at Ubud market lol.
    { name: "Lee Min-ho", text: "차 안이 넓어서 서핑 보드 싣기에 충분했습니다.", rating: 5 }, // Car spacious enough to load surfboards.
    { name: "Kim Go-eun", text: "기사님이 추천해준 커피 농장 최고였어요.", rating: 5 }, // Coffee farm driver recommmended was best.
    { name: "Gong Hyo-jin", text: "에어컨 냄새도 안 나고 쾌적함.", rating: 5 }, // No AC smell, pleasant.
    { name: "So Ji-sub", text: "약간의 영어 소통 가능. 문제 없었음.", rating: 4 }, // Slight English possible. No problem.
    { name: "Jun Ji-hyun", text: "아이 카시트도 준비해줘서 안전하게 여행함.", rating: 5 }, // Prepared child car seat, traveled safely.
    { name: "Ma Dong-seok", text: "강추. 듬직한 기사님.", rating: 5 } // Highly recommend. Reliable driver.
  ]

  // 5. JAPANESE REVIEWS (10 items) - Focus: Detailed timing, Water, Polite bowing
  const jpReviews = [
    { name: "Ken Watanabe", text: "お釣りを細かく用意してくれていて助かりました。", rating: 5 }, // Prepared small change, very helpful.
    { name: "Hiroyuki Sanada", text: "日本人のような気配り。ドアの開け閉めもしてくれます。", rating: 5 }, // Attention like a Japanese person. Opened/closed doors too.
    { name: "Yui Aragaki", text: "ウブドの細い道もスイスイ運転してすごいです。", rating: 5 }, // Drove smoothly on narrow Ubud roads, amazing.
    { name: "Satomi Ishihara", text: "車内でWi-Fiが使えたらもっと良かったかな。", rating: 4 }, // Would be better if Wi-Fi available in car.
    { name: "Kento Yamazaki", text: "約束の15分前には到着していました。素晴らしい。", rating: 5 }, // Arrived 15 mins early. Wonderful.
    { name: "Masami Nagasawa", text: "ミネラルウォーターのサービスがありました。", rating: 5 }, // There was mineral water service.
    { name: "Takeru Satoh", text: "ケチャダンスのチケット手配を手伝ってくれました。", rating: 5 }, // Helped arrange Kecak dance tickets.
    { name: "Haruki Murakami", text: "静かで落ち着いたドライブでした。", rating: 5 }, // Quiet and calm drive.
    { name: "Hideo Kojima", text: "コネクティング・ピープル。良い出会いでした。", rating: 5 }, // Connecting people. Good encounter.
    { name: "Naomi Osaka", text: "とても丁寧な英語で説明してくれました。", rating: 5 } // Explained in very polite English.
  ]

  // 6. RUSSIAN REVIEWS (8 items) - Focus: Strong car for mountains, Amed/Lovina trips
  const ruReviews = [
    { name: "Daniil Medvedev", text: "Ездили на север в Ловину к дельфинам. Дорога долгая, но машина удобная.", rating: 5 }, // Went north to Lovina for dolphins. Long road but comfortable car.
    { name: "Andrey Rublev", text: "Водитель не навязывал магазины, это большой плюс.", rating: 5 }, // Driver didn't force shops, big plus.
    { name: "Maria Sharapova", text: "Очень мощный кондиционер, спасает от жары.", rating: 5 }, // Very powerful AC, saves from heat.
    { name: "Khabib Nurmagomedov", text: "Честный парень, уважаю. Денег лишних не просил.", rating: 5 }, // Honest guy, respect. Didn't ask extra money.
    { name: "Lev Yashin", text: "Машина большая, влезли все доски для серфинга.", rating: 5 }, // Car big, all surfboards fit.
    { name: "Fedor Emelianenko", text: "Спокойный водитель, не гонщик.", rating: 5 }, // Calm driver, not a racer.
    { name: "Garry Kasparov", text: "Логистика продуманна, успели везде.", rating: 5 }, // Logistics well thought out, made it everywhere.
    { name: "Roman Abramovich", text: "Хорошее соотношение цены и качества.", rating: 4 } // Good price/quality ratio.
  ]

  // 7. ARABIC REVIEWS (7 items) - Focus: Prayer times, Halal food, Family size
  const arReviews = [
    { name: "Zinedine Zidane", text: "السائق يعرف مطاعم حلال ممتازة في كوتا.", rating: 5 }, // Driver knows excellent Halal restaurants in Kuta.
    { name: "Karim Benzema", text: "توقفنا للصلاة في مسجد جميل، شكراً له.", rating: 5 }, // We stopped to pray at a beautiful mosque, thanks to him.
    { name: "Riyad Mahrez", text: "السيارة واسعة جداً وتناسب العائلات الكبيرة.", rating: 5 }, // Car is very spacious, fits large families.
    { name: "Achraf Hakimi", text: "رحلة ممتعة وآمنة للأطفال.", rating: 5 }, // Fun and safe trip for children.
    { name: "Mo Farah", text: "مكيف الهواء بارد جداً ما شاء الله.", rating: 5 }, // AC very cold mashallah.
    { name: "DJ Khaled", text: "سائق صبور جداً مع الزحمة.", rating: 4 }, // Driver very patient with traffic.
    { name: "Nasser Al-Attiyah", text: "قيادة ممتازة في الطرق الجبلية.", rating: 5 } // Excellent driving on mountain roads.
  ]

  // Combine
  const allReviewsData = [
    ...idReviews.map(r => ({ ...r, lang: 'id' })),
    ...enReviews.map(r => ({ ...r, lang: 'en' })),
    ...cnReviews.map(r => ({ ...r, lang: 'zh' })),
    ...krReviews.map(r => ({ ...r, lang: 'ko' })),
    ...jpReviews.map(r => ({ ...r, lang: 'ja' })),
    ...ruReviews.map(r => ({ ...r, lang: 'ru' })),
    ...arReviews.map(r => ({ ...r, lang: 'ar' }))
  ]

  const reviewsToInsert = allReviewsData.map((review) => {
    return {
      userName: review.name,
      comment: review.text,
      rating: review.rating,
      lang: review.lang,
      // Random category assignment untuk variasi data
      category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience', 'driver_knowledge'][Math.floor(Math.random() * 5)], 
      createdAt: getRandomDate3to6MonthsAgo()
    }
  })

  // Sort by created date
  reviewsToInsert.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  try {
    const startCount = await prisma.review.count()
    console.log(`📊 Count before seeding: ${startCount}`)

    const result = await prisma.review.createMany({
      data: reviewsToInsert
    })

    console.log(`✅ Successfully added ${result.count} reviews from the past quarter (3-6 months ago)!`)
    
    // Log Date Range Check
    if (reviewsToInsert.length > 0) {
        console.log(`📅 Date Range: ${reviewsToInsert[0].createdAt.toLocaleDateString()} to ${reviewsToInsert[reviewsToInsert.length-1].createdAt.toLocaleDateString()}`)
    }

  } catch (e) {
    console.error('❌ Error seeding reviews:', e)
  } finally {
    await prisma.$disconnect()
  }
}

seedPastQuarterReviews()
