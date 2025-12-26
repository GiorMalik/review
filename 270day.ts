import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak antara 6 bulan lalu s/d 9 bulan lalu
function getRandomDate6to9MonthsAgo() {
  const now = new Date()
  const sixMonthsAgo = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000))
  const nineMonthsAgo = new Date(now.getTime() - (270 * 24 * 60 * 60 * 1000))
  
  // Random range antara 9 bulan lalu dan 6 bulan lalu
  return new Date(nineMonthsAgo.getTime() + Math.random() * (sixMonthsAgo.getTime() - nineMonthsAgo.getTime()))
}

async function seedOlderReviews() {
  console.log('🌱 Starting seed for 100 reviews (6-9 months ago timeline)...')

  // 1. INDONESIAN REVIEWS (30 items)
  // Topik: Barang ketinggalan, Rafting, Ganti Rute, Warung Lokal
  const idReviews = [
    { name: "Vincent Rompies", text: "Kacamata gue ketinggalan di jok belakang, eh dianterin balik sampe lobi hotel. Jujur parah drivernya!", rating: 5 },
    { name: "Desta Mahendra", text: "Request ganti rute dadakan karena bini bosen ke pantai, langsung diajak ke Kintamani. Fleksibel bgt.", rating: 5 },
    { name: "Enzy Storia", text: "Drivernya tau spot foto di Monkey Forest biar ga digigit monyet haha. Hasil fotonya bagus-bagus.", rating: 5 },
    { name: "Hesti Purwadinata", text: "Mobilnya ada charger USB banyak, aman buat kita yg fakir colokan.", rating: 5 },
    { name: "Andre Taulany", text: "Jalan ke Sidemen rusaknya minta ampun, tapi driver bawanya ati-ati banget jadi tetep nyaman.", rating: 5 },
    { name: "Parto Patrio", text: "Minta cariin warung makan yg murah tapi enak, bukan tempat turis. Dibawa ke Warung Mak Beng, mantap!", rating: 5 },
    { name: "Sule Sutisna", text: "AC kurang dingin pas siang bolong, untung ada double blower. Tp oke lah pelayanan ramah.", rating: 4 },
    { name: "Nunung", text: "Aku kan gemuk ya, untung mobilnya lega, naik turun gampang. Driver juga bantuin pegang tangan.", rating: 5 },
    { name: "Azis Gagap", text: "Top markotop. Jemput di pelabuhan Sanur pas banget kapal nyandar.", rating: 5 },
    { name: "Denny Cagur", text: "Sempet ban bocor di jalan, tapi driver gercep ganti ban serep. Ga sampe 10 menit kelar.", rating: 5 },
    { name: "Wendy Cagur", text: "Orangnya asik, ga baperan. Kita becanda sepanjang jalan dia ikutan ketawa.", rating: 5 },
    { name: "Surya Insomnia", text: "Harganya udah net, ga ada minta tips maksa kayak taksi sebelah. Profesional.", rating: 5 },
    { name: "Indra Jegel", text: "Drivernya orang asli Bali, cerita soal budaya Ngaben detail banget. Jadi nambah ilmu.", rating: 5 },
    { name: "Boris Bokir", text: "Bagus, mobil bersih. Cuma tadi driver sempet salah jalan dikit pas mau ke hotel, muter 5 menit.", rating: 4 },
    { name: "Oki Rengga", text: "Gaspol! Kejar flight mepet, driver tau jalan pintas lewat sawah-sawah. Nyampe tepat waktu.", rating: 5 },
    { name: "Bene Dion", text: "Nyaman, suspensi empuk. Cocok buat yg abis capek trekking Gunung Batur.", rating: 5 },
    { name: "Arie Kriting", text: "Bapaknya ramah, ga ngerokok. Mobil wangi kopi, seger.", rating: 5 },
    { name: "Ge Pamungkas", text: "Pesen buat honeymoon, driver inisiatif puterin lagu romantis. Pengertian bgt.", rating: 5 },
    { name: "Bintang Emon", text: "Ga banyak cingcong, sat set wat wet. Suka pelayanan model gini.", rating: 5 },
    { name: "Kaesang Pangarep", text: "Aman. Driver pake masker terus, prokes jalan.", rating: 5 },
    { name: "Gibran Rakabuming", text: "Biasa aja, standar. Tapi on time.", rating: 4 },
    { name: "Erina Gudono", text: "Interiornya mewah, jok kulitnya bersih ga ada noda. Berasa naik mobil pejabat.", rating: 5 },
    { name: "Tissa Biani", text: "Drivernya sabar nungguin kita main ATV sampe 3 jam. Padahal janjinya cuma 2 jam.", rating: 5 },
    { name: "Dul Jaelani", text: "Vibes perjalanan santai. Driver ga ngebut-ngebut ga jelas.", rating: 5 },
    { name: "El Rumi", text: "Diajak ke tempat oleh-oleh Joger yg asli, bukan yg abal-abal.", rating: 5 },
    { name: "Al Ghazali", text: "Cool. Drivernya ga banyak tanya privasi.", rating: 5 },
    { name: "Mahalini", text: "Bli driver-nya baik banget, bantuin bawain belanjaan pasar Sukawati yg bejibun.", rating: 5 },
    { name: "Rizky Febian", text: "Sistem booking gampang, tinggal WA langsung confirm. Ga ribet transfer DP.", rating: 5 },
    { name: "Lyodra Ginting", text: "Suara sound system di mobil ngebass, enak buat denger lagu sepanjang jalan.", rating: 5 },
    { name: "Tiara Andini", text: "Sempet mabok laut abis dari Nusa Penida, driver nyediain minyak kayu putih. Perhatian bgt huhu.", rating: 5 }
  ]

  // 2. ENGLISH REVIEWS (25 items)
  // Topik: Snorkeling, Lempuyang Gate, Late Airport, SIM Card
  const enReviews = [
    { name: "Gordon Ramsay", text: "The driver knew exactly where to get the best Suckling Pig. Finally, some good food!", rating: 5 },
    { name: "Jamie Oliver", text: "Lovely trip to the organic farm. The van was very tidy.", rating: 5 },
    { name: "David Beckham", text: "Took us to Pura Lempuyang early morning to beat the queue. Smart move.", rating: 5 },
    { name: "Victoria Beckham", text: "Very posh interior for a standard price. My dress didn't get wrinkled.", rating: 5 },
    { name: "Daniel Craig", text: "Arrived at Denpasar airport at 2 AM, driver was there with a sign. Smooth.", rating: 5 },
    { name: "Pierce Brosnan", text: "Old school polite service. Opened the door for my wife every time.", rating: 5 },
    { name: "Keanu Reeves", text: "Breathtaking views on the way to Munduk. He stopped whenever I asked to take photos.", rating: 5 },
    { name: "Sandra Bullock", text: "I forgot to buy a SIM card, driver took me to a local stall, not the expensive tourist ones.", rating: 5 },
    { name: "Jennifer Aniston", text: "So friendly! He taught us some basic Bahasa Indonesia words.", rating: 5 },
    { name: "Matt LeBlanc", text: "How you doin? The ride was great. AC was cold enough.", rating: 5 },
    { name: "Courteney Cox", text: "Everything was organized meticulously. Cleanliness was 10/10.", rating: 5 },
    { name: "Matthew Perry", text: "Could the traffic BE any worse? But the driver kept us entertained.", rating: 5 },
    { name: "Lisa Kudrow", text: "We went snorkeling and the driver watched our bags in the car. Very trustworthy.", rating: 5 },
    { name: "David Schwimmer", text: "We were on a break... from work! Perfect holiday transport.", rating: 5 },
    { name: "Bruno Mars", text: "24K Magic experience. Smooth driving through the hills.", rating: 5 },
    { name: "Lady Gaga", text: "Driver played my songs when he found out I was a singer. So sweet.", rating: 5 },
    { name: "Katy Perry", text: "Went to the Bali Safari Park. Driver knew the shortcut to the entrance.", rating: 5 },
    { name: "Orlando Bloom", text: "Surf trip to Uluwatu. Roof racks were solid for the boards.", rating: 5 },
    { name: "Miley Cyrus", text: "Party bus vibes! Just kidding, it was a chill ride. Safe driver.", rating: 5 },
    { name: "Justin Timberlake", text: "Brought the sexy back... to the hotel safely. Good job.", rating: 5 },
    { name: "Britney Spears", text: "Oops I did it again, booked another trip because the first one was so good.", rating: 5 },
    { name: "Shakira", text: "Hips don't lie, these seats were comfortable for a 3-hour drive.", rating: 5 },
    { name: "Eminem", text: "Fast route, no nonsense. Got me there in one piece.", rating: 5 },
    { name: "Snoop Dogg", text: "Laid back ride man. Driver was chill.", rating: 5 },
    { name: "Dr. Dre", text: "High quality service. The audio system was decent.", rating: 4 }
  ]

  // 3. CHINESE REVIEWS (10 items)
  // Topik: Durian/Mangosteen, Bird Park, Honest exchange
  const cnReviews = [
    { name: "Jackie Chan", text: "带我们去买了猫山王榴莲，价格很公道！", rating: 5 }, // Took us to buy Musang King durian, fair price!
    { name: "Donnie Yen", text: "司机开车技术一流，虽然山路十八弯但是很稳。", rating: 5 }, // Driver skills top-notch, mountain roads winding but steady.
    { name: "Stephen Chow", text: "去鸟园玩的路上，司机给我们介绍了巴厘岛的文化。", rating: 5 }, // On way to Bird Park, driver introduced Bali culture.
    { name: "Andy Lau", text: "非常有耐心，我们在换钱所耽误了很久，他一直在等。", rating: 5 }, // Very patient, we delayed at money changer, he waited.
    { name: "Tony Leung", text: "车况很好，就像新车一样。很满意。", rating: 5 }, // Car condition good, like new. Very satisfied.
    { name: "Gong Li", text: "帮我们预定了海鲜餐厅的位置，位置很好。", rating: 5 }, // Helped reserve seafood restaurant seats, good spot.
    { name: "Zhang Ziyi", text: "虽然语言不太通，但是司机总是笑脸相迎。", rating: 4 }, // Language barrier, but driver always smiling.
    { name: "Zhou Dongyu", text: "如果你想去罗威纳看海豚，一定要找他。", rating: 5 }, // If going to Lovina for dolphins, must choose him.
    { name: "Hu Ge", text: "很诚实，我不小心多给了钱，他退还给我了。", rating: 5 }, // Very honest, I accidentally overpaid, he returned it.
    { name: "Liu Yifei", text: "神仙服务！体验太好了。", rating: 5 } // God-tier service! Experience too good.
  ]

  // 4. KOREAN REVIEWS (10 items)
  // Topik: Instagram Photos, Lempuyang, East Bali
  const krReviews = [
    { name: "PSY", text: "강남 스타일보다 발리 스타일이 더 좋네요. 기사님 최고!", rating: 5 }, // Bali style better than Gangnam style. Driver best!
    { name: "Rain", text: "램푸양 사원에서 사진 찍어주시는데 거의 전문 사진작가 수준임.", rating: 5 }, // Took photos at Lempuyang, almost pro photographer level.
    { name: "IU", text: "동부 투어 다녀왔는데 설명도 잘 해주시고 너무 친절해요.", rating: 5 }, // Went on East tour, explained well, very kind.
    { name: "Suzy", text: "차가 넓어서 옷 갈아입기도 편했어요.", rating: 5 }, // Car spacious, comfortable to change clothes.
    { name: "Park Shin-hye", text: "기사님이 추천해준 현지 식당 나시고랭 진짜 맛있음.", rating: 5 }, // Local Nasi Goreng driver recommended was tasty.
    { name: "Lee Jong-suk", text: "운전이 험하지 않아서 좋았습니다. 안전 제일.", rating: 5 }, // Driving not rough, was good. Safety first.
    { name: "Kim Woo-bin", text: "발리 스윙 타러 가는 길에 예쁜 풍경있으면 세워주심.", rating: 5 }, // On way to Bali Swing, stopped at pretty sceneries.
    { name: "Han Hyo-joo", text: "마지막 날 공항 드랍까지 완벽했습니다.", rating: 5 }, // Perfect until airport drop on last day.
    { name: "Ji Chang-wook", text: "가격이 정찰제라 믿을 수 있습니다.", rating: 5 }, // Fixed price so trustworthy.
    { name: "Park Bo-gum", text: "너무 착하심... 팁을 안 드릴 수가 없었어요.", rating: 5 } // So kind... couldn't help but tip.
  ]

  // 5. JAPANESE REVIEWS (10 items)
  // Topik: Tegalalang Rice Terrace, Careful, Clean
  const jpReviews = [
    { name: "Shinzo Abe", text: "テガラランのライステラスへの道中、色々な話をしてくれました。", rating: 5 }, // Told stories on way to Tegalalang rice terrace.
    { name: "Fumio Kishida", text: "非常に礼儀正しいドライバーです。日本人も安心。", rating: 5 }, // Very polite driver. Japanese people can feel safe.
    { name: "Naoki Hanzawa", text: "倍返し... ではなく、期待以上のサービスでした。", rating: 5 }, // Not double payback... but service beyond expectations.
    { name: "Monkey D. Luffy", text: "冒険にぴったりの車だ！海に行こう！", rating: 5 }, // Perfect car for adventure! Let's go to the sea!
    { name: "Naruto Uzumaki", text: "道に迷わずに目的地に着いたってばよ！", rating: 5 }, // Got to destination without getting lost!
    { name: "Sailor Moon", text: "月に代わってお礼を言います。素敵なドライブでした。", rating: 5 }, // Thank you in the name of the moon. Lovely drive.
    { name: "Godzilla", text: "車が頑丈で良かった。", rating: 5 }, // Car was sturdy, good.
    { name: "Pikachu", text: "ピカピカの車でした（とても綺麗でした）。", rating: 5 }, // Pika-pika car (very clean).
    { name: "Doraemon", text: "どこでもドアはないけど、この車があればどこでも行ける。", rating: 5 }, // No Anywehre Door, but with this car can go anywhere.
    { name: "Mario", text: "マンマミーア！素晴らしい運転だ。", rating: 5 } // Mamma mia! Great driving.
  ]

  // 6. RUSSIAN REVIEWS (8 items)
  // Topik: Bike rental help, Rain, Big waves
  const ruReviews = [
    { name: "Yuri Gagarin", text: "Поехали! Водитель знает короткие пути.", rating: 5 }, // Let's go! Driver knows short cuts.
    { name: "Leo Tolstoy", text: "Это была долгая поездка, но очень философская и спокойная.", rating: 5 }, // Long trip, but philosophical and calm.
    { name: "Fyodor Dostoevsky", text: "Никакого преступления, только наказание... шучу, все отлично.", rating: 5 }, // No crime, only punishment... joking, everything great.
    { name: "Anton Chekhov", text: "Краткость - сестра таланта. Быстро договорились, быстро приехали.", rating: 5 }, // Brevity is talent's sister. Agreed fast, arrived fast.
    { name: "Mikhail Gorbachev", text: "Перестройка маршрута прошла успешно.", rating: 5 }, // Rerouting (Perestroika) went successfuly.
    { name: "Pyotr Tchaikovsky", text: "Музыка в машине была приятной.", rating: 4 }, // Music in car was pleasant.
    { name: "Ivan Drago", text: "Я должен вас сломать... но сиденья слишком мягкие.", rating: 5 }, // I must break you... but seats too soft.
    { name: "Masha", text: "Водитель помог найти аренду байка по хорошей цене.", rating: 5 } // Driver helped find bike rental at good price.
  ]

  // 7. ARABIC REVIEWS (7 items)
  // Topik: Privacy, Honeymoon, Respect
  const arReviews = [
    { name: "Aladdin", text: "بساط ريح حقيقي! سريع ومريح.", rating: 5 }, // Like a magic carpet! Fast and comfortable.
    { name: "Scheherazade", text: "ألف ليلة وليلة من الجمال في بالي مع هذا السائق.", rating: 5 }, // 1001 nights of beauty in Bali with this driver.
    { name: "Ibn Battuta", text: "سافرت كثيراً، وهذا من أفضل السائقين الذين قابلتهم.", rating: 5 }, // Traveled a lot, this is one of best drivers I met.
    { name: "Saladin", text: "احترام كبير للخصوصية.", rating: 5 }, // Great respect for privacy.
    { name: "Nancy Ajram", text: "يا طبطب... السائق لطيف جداً.", rating: 5 }, // Ya tabtab... Driver very nice.
    { name: "Amr Diab", text: "حبيبي يا نور العين، الرحلة كانت جميلة.", rating: 5 }, // Habibi, trip was beautiful.
    { name: "Fairuz", text: "السيارة نظيفة وباردة في الصباح.", rating: 5 } // Car clean and cool in the morning.
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
      // Random category
      category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience', 'driver_knowledge'][Math.floor(Math.random() * 5)], 
      createdAt: getRandomDate6to9MonthsAgo()
    }
  })

  // Sort by date
  reviewsToInsert.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  try {
    const startCount = await prisma.review.count()
    console.log(`📊 Count before seeding 6-9mo: ${startCount}`)

    const result = await prisma.review.createMany({
      data: reviewsToInsert
    })

    console.log(`✅ Successfully added ${result.count} reviews from the past (6-9 months ago)!`)
    
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

seedOlderReviews()

