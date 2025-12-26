import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak antara 9 bulan lalu s/d 12 bulan lalu
// (Kira-kira Desember 2024 s/d Maret 2025)
function getRandomDate9to12MonthsAgo() {
  const now = new Date()
  const nineMonthsAgo = new Date(now.getTime() - (270 * 24 * 60 * 60 * 1000))
  const twelveMonthsAgo = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000))
  
  // Random range
  return new Date(twelveMonthsAgo.getTime() + Math.random() * (nineMonthsAgo.getTime() - twelveMonthsAgo.getTime()))
}

async function seedOldestReviews() {
  console.log('🌱 Starting seed for 100 reviews (9-12 months ago / Holiday & Rainy Season)...')

  // 1. INDONESIAN REVIEWS (30 items)
  // Topik: Nataru, Hujan, Nyepi, Oleh-oleh Pia, Jalan Licin
  const idReviews = [
    { name: "Hotman Paris", text: "Macet taun baru di Canggu gila banget, untung AC mobil dingin dan supir asik diajak ngobrol hukum.", rating: 5 },
    { name: "Nikita Mirzani", text: "Hujan deres badai, drivernya jago nyetir ga ngepot. Payungin kita satu-satu pas turun. Good service.", rating: 5 },
    { name: "Young Lex", text: "Gue bawa anjing (poodle), driver bolehin masuk asal dialasin. Respect bro.", rating: 5 },
    { name: "Awkarin", text: "Pas Nyepi kemaren bingung mau ke mana sebelum disuruh diem di hotel, driver nganterin beli stok makanan dulu.", rating: 5 },
    { name: "Erick Thohir", text: "Profesional. Penjemputan on time meski bandara padet banget pas high season.", rating: 5 },
    { name: "Sandiaga Uno", text: "Gercep, pesen dadakan karena taksi online error semua pas ujan. Langsung dateng.", rating: 5 },
    { name: "Ridwan Kamil", text: "Desain interior mobilnya oke, bersih. Anak saya nyaman ngerjain PR di mobil.", rating: 5 },
    { name: "Ganjar Pranowo", text: "Rambut saya sampe ga berantakan karena bawanya halus banget. Top.", rating: 5 },
    { name: "Anies Baswedan", text: "Kata-katanya sopan, driver berpendidikan. Diskusi soal tata kota Denpasar sepanjang jalan.", rating: 5 },
    { name: "Prabowo Subianto", text: "Tegas dan disiplin waktu. Saya suka. Jalan becek pun diterabas pelan-pelan.", rating: 5 },
    { name: "Megawati", text: "Waduh, mobilnya agak tinggi ya buat saya naik. Tapi driver sigap bawain dingklik (kursi kecil).", rating: 5 },
    { name: "Jokowi", text: "Ya, ndak apa-apa, macet sedikit wajar. Yang penting selamat sampai tujuan. Kerja kerja kerja.", rating: 5 },
    { name: "Kafein Band", text: "Sound system mantap, kita karaokean lagu galau pas ujan-ujan di jalan.", rating: 5 },
    { name: "Sheila On 7", text: "Supirnya fans berat kita ternyata, jadi dapet diskon dikit haha. Makasih mas!", rating: 5 },
    { name: "Dewa 19", text: "Satu kata: Mewah. Alphard-nya seri terbaru.", rating: 5 },
    { name: "Slank", text: "Mobilnya muat banyak alat musik kita. Rock n roll abis.", rating: 5 },
    { name: "Gigi Band", text: "Koplingnya alus, ga bikin mual. Gigi approved!", rating: 5 },
    { name: "Noah", text: "Hapus jejakmu... jejak sepatu lumpur kita langsung dibersihin sama drivernya. Rajin bgt.", rating: 5 },
    { name: "Project Pop", text: "Dangdut is the music of my country! Driver punya playlist dangdut koplo yg asik.", rating: 5 },
    { name: "JKT48 Member", text: "Wangi mobilnya kayak permen karet, sukaaa! AC nya juga dingin.", rating: 5 },
    { name: "Komeng", text: "Uhuuy! Drivernya bisa ngelawak, perjalanan jauh jadi ga boring.", rating: 5 },
    { name: "Adul", text: "Saya ketiduran pules, tau-tau udah sampe hotel. Kursinya empuk.", rating: 5 },
    { name: "Uus", text: "Rekomendasi nasi pedesnya boleh juga. Pedesnya nampol kayak omongan netizen.", rating: 5 },
    { name: "Coki Pardede", text: "Skeptis awalnya, tapi ternyata servicenya melampaui ekspektasi. Dark jokes gue nyambung sama driver.", rating: 5 },
    { name: "Tretan Muslim", text: "Drivernya tau tempat makan bebek Madura yg otentik di Bali. Chuaksss!", rating: 5 },
    { name: "Dustin Tiffani", text: "Hujan rintik-rintik manja, driver membawa suasana syahdu dengan lagu jazz.", rating: 4 }, // Random nonsense style
    { name: "Habib Jafar", text: "Masya Allah, orangnya jujur. Dompet saya jatuh di kolong jok dikembaliin utuh.", rating: 5 },
    { name: "Onad", text: "Gue mabok parah abis party, driver sabar nungguin gue muntah (di kresek ya). Sorry mas!", rating: 5 },
    { name: "Vicky Prasetyo", text: "Kondisisasi jalanan yang labil ekonomi, namun driver tetap konsisten dalam kemaslahatan berkendara.", rating: 4 },
    { name: "Aldi Taher", text: "I love you driver! Baca Al-Quran dulu biar adem di mobil. Rekam posting!", rating: 5 }
  ]

  // 2. ENGLISH REVIEWS (25 items)
  // Topik: Christmas Dinner, Monsoon Rain, Yoga Retreat, New Year Eve
  const enReviews = [
    { name: "Santa Claus", text: "Traffic on Christmas Eve was horrible, but the driver knew the backroads to Seminyak.", rating: 5 },
    { name: "Grinch", text: "I hate traffic, but the car was quiet enough for me to sulk in peace.", rating: 4 },
    { name: "Mariah Carey", text: "All I want for Christmas is... this driver! He saved us from the rain.", rating: 5 },
    { name: "Michael Buble", text: "It was beginning to look a lot like a monsoon. Driver had huge umbrellas ready.", rating: 5 },
    { name: "Elton John", text: "Spectacular service. The tinted windows gave us great privacy.", rating: 5 },
    { name: "Freddie Mercury", text: "Caught in a landslide of mud near Ubud, but no escape from reality needed - driver handled it.", rating: 5 },
    { name: "David Bowie", text: "Ground control to Major Tom, this car is a spaceship. Very modern.", rating: 5 },
    { name: "Elvis Presley", text: "A little less conversation, a little more action. Got me to the airport fast.", rating: 5 },
    { name: "Marilyn Monroe", text: "Diamonds are a girl's best friend, but this AC is a close second in this humidity.", rating: 5 },
    { name: "Audrey Hepburn", text: "Elegant driving style. Very Breakfast at Tiffany's vibes.", rating: 5 },
    { name: "Charlie Chaplin", text: "...", rating: 5 }, // Silent but 5 stars
    { name: "Mr. Bean", text: "Teddy loved the ride. I sat on the roof... joking. Comfortable seats.", rating: 5 },
    { name: "James Bond", text: "Shaken, not stirred. The roads were bumpy but the suspension was good.", rating: 5 },
    { name: "Harry Potter", text: "Driving through the rain felt like the Knight Bus, but safer.", rating: 5 },
    { name: "Hermione Granger", text: "It's Levi-O-sa, not Levio-SA. Driver pronounced the destination correctly.", rating: 5 },
    { name: "Ron Weasley", text: "Bloody hell, it was raining cats and dogs! Glad we booked a car.", rating: 5 },
    { name: "Frodo Baggins", text: "The journey to Mount Batur was long, but we didn't have to walk.", rating: 5 },
    { name: "Gandalf", text: "A driver is never late, nor is he early, he arrives precisely when he means to.", rating: 5 },
    { name: "Aragorn", text: "My friends, you bow to no one. Driver was very respectful.", rating: 5 },
    { name: "Legolas", text: "They're taking the hobbits to Isengard! Or just to the waterpark. Good trip.", rating: 5 },
    { name: "Gimli", text: "Still only counts as one! One great ride.", rating: 5 },
    { name: "Tony Stark", text: "I usually fly, but this ground transport was acceptable. Good tech inside.", rating: 4 },
    { name: "Steve Rogers", text: "I can do this all day. The tour lasted 12 hours and driver didn't complain.", rating: 5 },
    { name: "Thor", text: "This vehicle is worthy! It withstood the storm.", rating: 5 },
    { name: "Hulk", text: "HULK SMASH... traffic! Driver good.", rating: 5 }
  ]

  // 3. CHINESE REVIEWS (10 items)
  // Topik: CNY (Chinese New Year), Rain, Hotpot
  const cnReviews = [
    { name: "Sun Wukong", text: "春节期间人太多了，幸好包车了，不用挤。", rating: 5 }, // Too many people during CNY, luckily chartered car, no squeezing.
    { name: "Zhuge Liang", text: "司机很有计谋，避开了所有拥堵路段。", rating: 5 }, // Driver has strategy, avoided all congested roads.
    { name: "Cao Cao", text: "说到曹操，曹操就到。司机接送非常准时。", rating: 5 }, // Speak of Cao Cao, he arrives. Pickup very punctual.
    { name: "Liu Bei", text: "虽然下大雨，但是车里很干爽。仁义的司机。", rating: 5 }, // Heavy rain, but car dry. Benevolent driver.
    { name: "Guan Yu", text: "司机非常忠诚，一直守在车旁等我们。", rating: 5 }, // Driver very loyal, waited by car for us.
    { name: "Zhang Fei", text: "俺老张觉得这车坐着舒服！冷气够劲！", rating: 5 }, // I find this car comfortable! AC strong!
    { name: "Mulan", text: "带家人去吃火锅，司机推荐的店很正宗。", rating: 5 }, // Took family for hotpot, driver recommended authentic shop.
    { name: "Panda", text: "竹林路很难走，但是司机技术很好。", rating: 5 }, // Bamboo forest road hard, but driver skill good.
    { name: "Dumpling", text: "过年就是要团圆，这辆车正好坐下我们一家7口。", rating: 5 }, // CNY is for reunion, this car fit our family of 7.
    { name: "Dragon", text: "雨季的巴厘岛别有一番风味，谢谢司机的照顾。", rating: 5 } // Rainy season Bali has special flavor, thanks driver.
  ]

  // 4. KOREAN REVIEWS (10 items)
  // Topik: Rainy vibe, Golf, Cafe hopping
  const krReviews = [
    { name: "Squid Game Player", text: "무궁화 꽃이 피었습니다... 차가 멈출 때 아주 부드러워요.", rating: 5 }, // Red light green light... car stops very smoothly.
    { name: "Front Man", text: "모든 것이 통제 하에 있었습니다. 완벽한 스케줄.", rating: 5 }, // Everything was under control. Perfect schedule.
    { name: "Dalgona", text: "비 오는 날 우붓 카페 투어하기 딱 좋았어요.", rating: 5 }, // Perfect for Ubud cafe tour on a rainy day.
    { name: "Kimchi", text: "골프백 4개가 거뜬히 들어가는 트렁크 크기!", rating: 5 }, // Trunk size fits 4 golf bags easily!
    { name: "Bulgogi", text: "기사님이 우산 씌워주셔서 옷 안 젖었어요.", rating: 5 }, // Driver covered us with umbrella, clothes didn't get wet.
    { name: "Soju", text: "밤늦게 공항 도착했는데 안전하게 데려다 주심.", rating: 5 }, // Arrived airport late at night, took us safely.
    { name: "Bibimbap", text: "여러 가지 매력이 섞인 발리, 기사님 덕분에 잘 구경함.", rating: 5 }, // Bali has mixed charms, saw well thanks to driver.
    { name: "Tteokbokki", text: "매운 거 먹고 배탈 났는데 약국 찾아주심 ㅠㅠ", rating: 5 }, // Ate spicy food and got sick, he found pharmacy T_T.
    { name: "Gangnam", text: "차량이 고급스러워서 부모님이 좋아하셨습니다.", rating: 5 }, // Car luxurious, parents liked it.
    { name: "Hallyu", text: "한국 노래 틀어주심! 센스쟁이.", rating: 5 } // Played Korean songs! Good sense.
  ]

  // 5. JAPANESE REVIEWS (10 items)
  // Topik: New Year, Wet Season Safety, Golf
  const jpReviews = [
    { name: "Totoro", text: "雨の日の森は神秘的でした。安全運転ありがとうございます。", rating: 5 }, // Rainy forest was mysterious. Thanks for safe driving.
    { name: "Saitama", text: "ワンパンマン... ではなく、ワンダフルな運転でした。", rating: 5 }, // Not One Punch Man... but wonderful driving.
    { name: "Goku", text: "筋斗雲より快適かもしれない。", rating: 5 }, // Might be more comfortable than Flying Nimbus.
    { name: "Vegeta", text: "カカロット... このドライバーはやるな。", rating: 5 }, // Kakarot... this driver is good.
    { name: "Luffy Gear 5", text: "ニカっと笑うドライバーさんでした。", rating: 5 }, // Driver smiled broadly (Nika).
    { name: "Zoro", text: "俺は方向音痴だが、ドライバーは完璧に道を知っていた。", rating: 5 }, // I have no sense of direction, but driver knew roads perfectly.
    { name: "Nami", text: "雨季だから料金心配したけど、追加料金なし！", rating: 5 }, // Worried about rates cause wet season, but no extra charge!
    { name: "Sanji", text: "美味しいレストランに連れて行ってくれました。", rating: 5 }, // Took us to delicious restaurant.
    { name: "Chopper", text: "車酔いの薬を持っていてくれました。優しい！", rating: 5 }, // Had motion sickness medicine. Kind!
    { name: "Usopp", text: "8000人の部下... はいないけど、最高のドライバーが1人いた。", rating: 5 } // Don't have 8000 followers... but had 1 best driver.
  ]

  // 6. RUSSIAN REVIEWS (8 items)
  // Topik: Muddy roads, Strong AC, No fuss
  const ruReviews = [
    { name: "Bear", text: "Дождь лил стеной, но мы проехали везде. Машина - танк.", rating: 5 }, // Rain poured like wall, but we went everywhere. Car is a tank.
    { name: "Vodka", text: "Хорошо, что заказали трансфер. Байк в такой дождь - это смерть.", rating: 5 }, // Good we booked transfer. Bike in this rain is death.
    { name: "Matryoshka", text: "Много места для всей семьи.", rating: 5 }, // Lots of space for whole family.
    { name: "Balalaika", text: "Водитель молчал, когда нужно. Ценим это.", rating: 5 }, // Driver was silent when needed. Appreciate that.
    { name: "Sputnik", text: "Связь терялась в горах, но он знал дорогу наизусть.", rating: 5 }, // Lost signal in mountains, but he knew road by heart.
    { name: "Kalashnikov", text: "Надежно, как автомат.", rating: 5 }, // Reliable as an assault rifle.
    { name: "Tetris", text: "Багаж уложил идеально, как в тетрисе.", rating: 5 }, // Packed luggage perfectly, like in Tetris.
    { name: "Borscht", text: "Очень душевно.", rating: 5 } // Very soulful.
  ]

  // 7. ARABIC REVIEWS (7 items)
  // Topik: Rainy season comfort, Big family, Shopping
  const arReviews = [
    { name: "Sultan", text: "المطر كان غزيراً لكن القيادة كانت حذرة جداً.", rating: 5 }, // Rain was heavy but driving very careful.
    { name: "Prince", text: "أفضل خيار للعائلات في موسم الأمطار.", rating: 5 }, // Best choice for families in rainy season.
    { name: "Genie", text: "حقق لنا كل أمنياتنا في الرحلة.", rating: 5 }, // Granted all our wishes on the trip.
    { name: "Jasmine", text: "سيارة نظيفة ورائحة جميلة.", rating: 5 }, // Clean car and beautiful smell.
    { name: "Jafar", text: "لا بأس به.", rating: 4 }, // Not bad.
    { name: "Sinbad", text: "مغامرة جميلة في بالي.", rating: 5 }, // Beautiful adventure in Bali.
    { name: "Ali Baba", text: "السعر رخيص والجودة عالية.", rating: 5 } // Cheap price and high quality.
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
      userName: review.userName || review.name, // Handle naming variation
      comment: review.text,
      rating: review.rating,
      lang: review.lang,
      category: ['driver_service', 'vehicle_quality', 'price_value', 'family_experience', 'driver_knowledge'][Math.floor(Math.random() * 5)], 
      createdAt: getRandomDate9to12MonthsAgo()
    }
  })

  // Sort by date
  reviewsToInsert.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  try {
    const startCount = await prisma.review.count()
    console.log(`📊 Count before seeding 9-12mo: ${startCount}`)

    const result = await prisma.review.createMany({
      data: reviewsToInsert
    })

    console.log(`✅ Successfully added ${result.count} reviews from 9-12 months ago!`)
    
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

seedOldestReviews()
