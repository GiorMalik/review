import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper untuk mendapatkan tanggal acak dalam 3 bulan terakhir
function getRandomDateLast3Months() {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 90) // Mundur 90 hari
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

async function seedInternationalReviews() {
  console.log('🌱 Starting seed for 100 mixed international reviews...')

  // 1. INDONESIAN REVIEWS (30 items) - Gaul, santai, singkatan
  const idReviews = [
    { name: "Raka Dimas", text: "Gokil sih, drivernya tau jalan tikus. Macet Canggu lewat doang. Mantap!", rating: 5 },
    { name: "Siska Amelia", text: "Mobilnya wangi pandan, enak banget ga bikin mual. Mas nya juga sopan.", rating: 5 },
    { name: "Budi Santoso", text: "Harganya masuk akal. Pelayanan oke, cuma tadi sempet telat dikit jemputnya, tp gpp lah.", rating: 4 },
    { name: "Dinda Kirana", text: "Asli ramah bgt orangnya. Kita diajak makan nasi tempong yg enak parah. Makasih rekomennya!", rating: 5 },
    { name: "Agus Prasetyo", text: "AC dingin pol, cocok buat Bali yg lagi panas kentang gini.", rating: 5 },
    { name: "Citra Lestari", text: "Biasa aja sih, standar travel pada umumnya. Tapi mobil emang bersih.", rating: 4 },
    { name: "Kevin Sanjaya", text: "Recomended! Driver ga banyak omong, fokus nyetir, bawa mobil alus.", rating: 5 },
    { name: "Putri Ayu", text: "Suka banget! Minta berhenti foto berkali-kali tetep dilayanin dengan senyum.", rating: 5 },
    { name: "Reza Rahardian", text: "Unit alphard nya masih baru kayaknya, mulus bgt. Nyaman buat bawa ortu.", rating: 5 },
    { name: "Tari Utami", text: "Drivernya lucu, sepanjang jalan ngelawak mulu jadi ga bosen hahaha.", rating: 5 },
    { name: "Joko Anwar", text: "Oke lah, worth the money. Ga ada hidden cost.", rating: 4 },
    { name: "Maya Septha", text: "Next time bakal pesen disini lagi. Udah percaya bgt sama service-nya.", rating: 5 },
    { name: "Rio Dewanto", text: "Keren, on time banget. Jam 7 pagi udah standby di lobi hotel.", rating: 5 },
    { name: "Wulan Guritno", text: "Interior mobil bersih, ga ada bau rokok sama sekali. Penting bgt ini buat saya.", rating: 5 },
    { name: "Raffi Ahmad", text: "Mantul bosku. Pelayanan bintang lima harga kaki lima.", rating: 5 },
    { name: "Nagita Slavina", text: "Anak-anak happy, driver sediain lagu anak-anak juga di mobil. Thank you!", rating: 5 },
    { name: "Deddy Corbuzier", text: "Professional. Titik.", rating: 5 },
    { name: "Luna Maya", text: "Sempet ada miskom soal lokasi jemput, tp driver sabar nungguin. Good job.", rating: 4 },
    { name: "Ayu Ting Ting", text: "Seru abis tripnya! Mas drivernya jago fotoin kita juga wkwk.", rating: 5 },
    { name: "Ivan Gunawan", text: "Duh nyaman banget, berasa mobil sendiri. Drivernya juga rapih pake batik.", rating: 5 },
    { name: "Ruben Onsu", text: "Aman, terpercaya. Udh langganan tiap ke Bali.", rating: 5 },
    { name: "Sarwendah", text: "Bersih, wangi, driver ramah. Paket lengkap.", rating: 5 },
    { name: "Gading Marten", text: "Goks, diajak ke pantai rahasia yg sepi turis. Best experience!", rating: 5 },
    { name: "Gisella Anastasia", text: "Gempi seneng banget diajak ngobrol sama om drivernya. Ramah anak.", rating: 5 },
    { name: "Boy William", text: "Cool service bro. No ribet-ribet club.", rating: 5 },
    { name: "Raditya Dika", text: "Jujurly ini travel paling bener yg pernah gue pake di Bali.", rating: 5 },
    { name: "Ernest Prakasa", text: "Not bad, AC dingin, driver hapal jalan. Cuma musiknya agak kenceng dikit tadi.", rating: 4 },
    { name: "Sule", text: "Sangat memuaskan, prikitiw!", rating: 5 },
    { name: "Andre Taulany", text: "Sultan abis pelayanannya, padahal pesen yg biasa. Keren.", rating: 5 },
    { name: "Denny Sumargo", text: "Pebasket sombong approved! Mobilnya lega buat kaki gue yg panjang.", rating: 5 }
  ]

  // 2. ENGLISH REVIEWS (25 items) - Mix of Aussie slang, simple English, and tourist vibes
  const enReviews = [
    { name: "Liam Hemsworth", text: "Absolute legend of a driver. Showed us the best surf spots.", rating: 5 },
    { name: "Sarah Connor", text: "Car was spotless and AC was freezing, just how I like it. Thanks!", rating: 5 },
    { name: "John Doe", text: "Good value. Driver was a bit quiet but very polite.", rating: 4 },
    { name: "Emma Watson", text: "Lovely experience. Felt very safe traveling solo.", rating: 5 },
    { name: "Chris Evans", text: "Smooth ride from the airport. No hassle.", rating: 5 },
    { name: "Jessica Alba", text: "The driver knew a great shortcut to avoid the Kuta traffic. Lifesaver!", rating: 5 },
    { name: "Tom Holland", text: "Super friendly guy! We chatted about football the whole way.", rating: 5 },
    { name: "Robert Downey", text: "Efficient and professional. Would recommend.", rating: 5 },
    { name: "Scarlett Johansson", text: "Such a kind driver. He helped us carry all our heavy bags.", rating: 5 },
    { name: "Mark Ruffalo", text: "A bit pricey compared to Grab, but the service quality is way better.", rating: 4 },
    { name: "Chris Hemsworth", text: "Heaps good mate! Best driver in Bali hands down.", rating: 5 },
    { name: "Margot Robbie", text: "Everything was perfect. The car smelled amazing.", rating: 5 },
    { name: "Hugh Jackman", text: "Top notch service. Will book again next year.", rating: 5 },
    { name: "Nicole Kidman", text: "Very patient driver, we were late but he waited with a smile.", rating: 5 },
    { name: "Ryan Reynolds", text: "Funny driver, good vibes. The van was huge.", rating: 5 },
    { name: "Blake Lively", text: "Highly recommend for families. Safe driving.", rating: 5 },
    { name: "Taylor Swift", text: "Magical trip to Ubud. Thank you for the safe drive!", rating: 5 },
    { name: "Ed Sheeran", text: "Simple booking, good driver. Cheers.", rating: 4 },
    { name: "Adele", text: "Lovely man, very respectful. drove very smoothly.", rating: 5 },
    { name: "Harry Styles", text: "Great vibes. 10/10 would ride again.", rating: 5 },
    { name: "Dua Lipa", text: "Clean car, good music, safe driver. Perfect.", rating: 5 },
    { name: "Justin Bieber", text: "Cool driver. Knows where the party is at.", rating: 5 },
    { name: "Ariana Grande", text: "So sweet! He gave us water bottles when we got in.", rating: 5 },
    { name: "Selena Gomez", text: "Reliable. That's the most important thing.", rating: 5 },
    { name: "Billie Eilish", text: "Chill drive. No stress.", rating: 5 }
  ]

  // 3. CHINESE REVIEWS (10 items) - Natural phrasing
  const cnReviews = [
    { name: "Wang Wei", text: "司机很准时，车里很干净。推荐！", rating: 5 }, // Driver punctual, car clean. Recommend!
    { name: "Li Na", text: "服务态度特别好，还会帮我们拍照。", rating: 5 }, // Service attitude very good, helped take photos.
    { name: "Zhang Wei", text: "价格公道，没有乱收费。司机很老实。", rating: 5 }, // Fair price, no hidden fees. Honest driver.
    { name: "Liu Yang", text: "空调很给力，巴厘岛太热了，幸好车很舒服。", rating: 5 }, // AC powerful, Bali too hot, luckily car comfortable.
    { name: "Chen Jie", text: "司机虽然不会中文，但是用翻译软件沟通很顺畅。", rating: 4 }, // Driver no Chinese, but translation app worked well.
    { name: "Yang Xi", text: "非常棒的体验，下次还会找这家。", rating: 5 }, // Great experience, will choose again.
    { name: "Zhao Lei", text: "车开得很稳，我们在车上睡着了。", rating: 5 }, // Drove steadily, we fell asleep.
    { name: "Huang Jing", text: "还可以，中规中矩。", rating: 4 }, // It's okay, standard.
    { name: "Wu Gang", text: "司机对路况很熟悉，避开了拥堵。", rating: 5 }, // Driver knows roads well, avoided traffic.
    { name: "Zhou Xun", text: "完美的旅程！谢谢！", rating: 5 } // Perfect trip! Thanks!
  ]

  // 4. KOREAN REVIEWS (10 items)
  const krReviews = [
    { name: "Kim Min-jun", text: "기사님이 너무 친절하셨어요! 운전도 안전하게 해주심.", rating: 5 }, // Driver very kind! Drove safely.
    { name: "Lee Ji-eun", text: "차량이 정말 깨끗하고 에어컨도 시원했어요. 최고!", rating: 5 }, // Car very clean, AC cool. Best!
    { name: "Park Seo-joon", text: "가격 대비 성능이 좋습니다. 추천해요.", rating: 5 }, // Good value for money. Recommend.
    { name: "Choi Woo-shik", text: "발리 여행 중 가장 편안한 이동이었습니다.", rating: 5 }, // Most comfortable transport during Bali trip.
    { name: "Jennie Kim", text: "기사님이 맛집도 추천해주셔서 좋았어요.", rating: 5 }, // Driver recommended restaurants, was good.
    { name: "Kim Tae-hyung", text: "약속 시간보다 일찍 와서 기다려주심. 감동.", rating: 5 }, // Arrived earlier than scheduled. Touched.
    { name: "Lisa Manoban", text: "의사소통은 조금 어려웠지만 번역기로 해결.", rating: 4 }, // Communication hard, but solved with translator.
    { name: "Son Heung-min", text: "운전이 부드러워서 멀미가 안 났어요.", rating: 5 }, // Smooth driving, no motion sickness.
    { name: "Bae Suzy", text: "가족 여행으로 딱입니다. 밴이 넓어요.", rating: 5 }, // Perfect for family. Van is spacious.
    { name: "Gong Yoo", text: "굿굿. 다음에 또 이용할게요.", rating: 5 } // Good good. Will use again.
  ]

  // 5. JAPANESE REVIEWS (10 items)
  const jpReviews = [
    { name: "Tanaka Sato", text: "運転手さんがとても親切でした。車も清潔です。", rating: 5 }, // Driver very kind. Car clean.
    { name: "Suzuki Ichiro", text: "安全運転で安心できました。おすすめです。", rating: 5 }, // Safe driving, felt assured. Recommended.
    { name: "Yamada Taro", text: "少し英語が通じたので助かりました。", rating: 4 }, // Spoke a little English, which helped.
    { name: "Honda Keisuke", text: "時間通りに来てくれました。素晴らしいサービス。", rating: 5 }, // Came on time. Wonderful service.
    { name: "Miyazaki Hayao", text: "バリ島の交通事情はすごいですが、彼はプロでした。", rating: 5 }, // Bali traffic crazy, but he was a pro.
    { name: "Oda Eiichiro", text: "エアコンが効いていて快適でした。", rating: 5 }, // AC worked well, comfortable.
    { name: "Kishimoto Masashi", text: "値段も手頃で良かったです。", rating: 4 }, // Price reasonable, was good.
    { name: "Toriyama Akira", text: "最高のドライバー！また頼みたいです。", rating: 5 }, // Best driver! Want to request again.
    { name: "Kubo Tite", text: "荷物を運んでくれて助かりました。", rating: 5 }, // Helped with luggage, saved me.
    { name: "Araki Hirohiko", text: "グレート！", rating: 5 } // Great!
  ]

  // 6. RUSSIAN REVIEWS (8 items) - Direct and honest
  const ruReviews = [
    { name: "Ivan Petrov", text: "Отличный водитель, машина чистая. Рекомендую.", rating: 5 }, // Excellent driver, clean car. Recommend.
    { name: "Dmitry Volkov", text: "Всё супер! Водит аккуратно.", rating: 5 }, // Everything super! Drives carefully.
    { name: "Anna Smirnova", text: "Кондиционер работал отлично, это спасение.", rating: 5 }, // AC worked perfectly, a lifesaver.
    { name: "Sergei Popov", text: "Нормально. Цена адекватная.", rating: 4 }, // Normal. Price adequate.
    { name: "Maria Sokolova", text: "Очень вежливый человек, помог с чемоданами.", rating: 5 }, // Very polite person, helped with suitcases.
    { name: "Vladimir Putin", text: "Быстро и комфортно. Спасибо.", rating: 5 }, // Fast and comfortable. Thanks.
    { name: "Elena Ivanova", text: "Мы опоздали, но водитель нас дождался без проблем.", rating: 5 }, // We were late, but driver waited without issues.
    { name: "Alexey Kuznetsov", text: "Хороший сервис.", rating: 5 } // Good service.
  ]

  // 7. ARABIC REVIEWS (7 items)
  const arReviews = [
    { name: "Ahmed Ali", text: "سائق ممتاز ومحترم جداً. السيارة نظيفة.", rating: 5 }, // Excellent and respectful driver. Car clean.
    { name: "Mohamed Salah", text: "خدمة رائعة، أنصح به بشدة.", rating: 5 }, // Wonderful service, highly recommend.
    { name: "Fatima Hassan", text: "شكراً جزيلاً على الرحلة المريحة.", rating: 5 }, // Thank you very much for the comfortable trip.
    { name: "Omar Farooq", text: "السعر جيد والخدمة ممتازة.", rating: 5 }, // Good price and excellent service.
    { name: "Khalid Rahman", text: "سائق أمين وتعامله راقي.", rating: 5 }, // Honest driver and classy treatment.
    { name: "Yusuf Amir", text: "جيد جداً.", rating: 4 }, // Very good.
    { name: "Aisha Karim", text: "ما شاء الله، سائق محترف.", rating: 5 } // Mashallah, professional driver.
  ]

  // Combine all reviews
  const allReviewsData = [
    ...idReviews.map(r => ({ ...r, lang: 'id' })),
    ...enReviews.map(r => ({ ...r, lang: 'en' })),
    ...cnReviews.map(r => ({ ...r, lang: 'zh' })),
    ...krReviews.map(r => ({ ...r, lang: 'ko' })),
    ...jpReviews.map(r => ({ ...r, lang: 'ja' })),
    ...ruReviews.map(r => ({ ...r, lang: 'ru' })),
    ...arReviews.map(r => ({ ...r, lang: 'ar' }))
  ]

  // Add random timestamps and format for Prisma
  const reviewsToInsert = allReviewsData.map((review) => {
    return {
      userName: review.name,
      comment: review.text,
      rating: review.rating,
      lang: review.lang,
      // Pastikan field category ada di schema, atau hapus baris ini
      // Kita assign random category untuk variasi
      category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience'][Math.floor(Math.random() * 4)], 
      createdAt: getRandomDateLast3Months()
    }
  })

  // Sort by date (ascending) to look natural in DB
  reviewsToInsert.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  try {
    // Check count before
    const countBefore = await prisma.review.count()
    console.log(`📊 Count before: ${countBefore}`)

    // Create Many
    const result = await prisma.review.createMany({
      data: reviewsToInsert
    })

    console.log(`✅ Successfully inserted ${result.count} mixed international reviews!`)
    
    const countAfter = await prisma.review.count()
    console.log(`📊 Count after: ${countAfter}`)
    
    // Log distribution check
    console.log('\n🌍 Language Distribution Added:')
    console.log(`   🇮🇩 ID: ${reviewsToInsert.filter(r => r.lang === 'id').length}`)
    console.log(`   🇬🇧 EN: ${reviewsToInsert.filter(r => r.lang === 'en').length}`)
    console.log(`   🇨🇳 ZH: ${reviewsToInsert.filter(r => r.lang === 'zh').length}`)
    console.log(`   🇰🇷 KO: ${reviewsToInsert.filter(r => r.lang === 'ko').length}`)
    console.log(`   🇯🇵 JA: ${reviewsToInsert.filter(r => r.lang === 'ja').length}`)
    console.log(`   🇷🇺 RU: ${reviewsToInsert.filter(r => r.lang === 'ru').length}`)
    console.log(`   🇸🇦 AR: ${reviewsToInsert.filter(r => r.lang === 'ar').length}`)

  } catch (e) {
    console.error('❌ Error inserting reviews:', e)
  } finally {
    await prisma.$disconnect()
  }
}

seedInternationalReviews()
