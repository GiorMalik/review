import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: Tanggal acak dalam 60 hari terakhir
function getRecentDate() {
  const now = new Date()
  const twoMonthsAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000))
  return new Date(twoMonthsAgo.getTime() + Math.random() * (now.getTime() - twoMonthsAgo.getTime()))
}

async function seed24Reviews() {
  console.log('🚀 Seeding exactly 24 mixed reviews...')

  const reviews = [
    // --- INDONESIA (8 Reviews) ---
    { name: "Sarah Sechan", text: "Baru tau ada spot foto kece di pinggir tebing Uluwatu, drivernya yg kasih tau. Hidden gem parah!", rating: 5, lang: "id" },
    { name: "Desta", text: "Paket watersport-nya murah meriah mantap. Udah bandingin sama vendor lain, ini paling masuk akal.", rating: 5, lang: "id" },
    { name: "Vincent", text: "Makan di Jimbaran asepnya pedih di mata, tapi driver pilihin meja yg agak minggir jd aman. Thanks bli.", rating: 5, lang: "id" },
    { name: "Enzy", text: "Mobilnya Xpander baru ya mas? Empuk banget suspensinya, tidur pules sepanjang jalan ke Lovina.", rating: 5, lang: "id" },
    { name: "Hesti", text: "Anak saya muntah di mobil, maaf ya pak. Tapi bapaknya sabar banget bantuin bersihin dan ga marah.", rating: 5, lang: "id" },
    { name: "Surya", text: "Telat jemput 5 menit doang sih, tapi driver minta maafnya berkali-kali. Sopan banget.", rating: 4, lang: "id" },
    { name: "Cinta Laura", text: "Gara-gara macet Canggu kita ganti plan ke Tanah Lot, ternyata ngejar sunsetnya pas bgt. Good decision.", rating: 5, lang: "id" },
    { name: "Boy William", text: "Bli drivernya asik diajak curhat soal kerjaan wkwk. Jadi kayak temen sendiri.", rating: 5, lang: "id" },

    // --- ENGLISH (6 Reviews) ---
    { name: "Chris Martin", text: "Absolute legend! He took us to a local warung, best Nasi Campur I've ever had.", rating: 5, lang: "en" },
    { name: "Dakota Johnson", text: "Traffic was insane but the car had good wifi. Saved my life during the jam.", rating: 5, lang: "en" },
    { name: "Tom Holland", text: "Booked the ATV ride last minute via WhatsApp. Very fast response.", rating: 5, lang: "en" },
    { name: "Zendaya", text: "No hidden fees for parking or petrol. Very transparent pricing.", rating: 5, lang: "en" },
    { name: "Benedict", text: "Just a solid, safe drive. Nothing fancy, but did the job perfectly.", rating: 4, lang: "en" },
    { name: "Elizabeth Olsen", text: "The snorkeling gear provided was clean and new. That's rare in Bali.", rating: 5, lang: "en" },

    // --- CHINESE (3 Reviews) ---
    { name: "Wang Jia Er", text: "司机帮我们砍价，在乌布市场省了不少钱。", rating: 5, lang: "zh" }, // Driver helped us bargain in Ubud market, saved money.
    { name: "Zhao Lusi", text: "车里没有烟味和异味，这点对我很重要。", rating: 5, lang: "zh" }, // No smoke/weird smell in car, important to me.
    { name: "Wu Lei", text: "非常准时，早上6点就在酒店大堂等我们了。", rating: 5, lang: "zh" }, // Very punctual, waited in lobby at 6 AM.

    // --- KOREAN (3 Reviews) ---
    { name: "Park Bo-young", text: "발리 스윙 줄이 길었는데 기사님이 시원한 물 사다 주셨어요.", rating: 5, lang: "ko" }, // Bali Swing queue long, driver bought cold water.
    { name: "Ahn Hyo-seop", text: "마사지 샵 예약해주셔서 편하게 다녀왔습니다. 할인도 받았어요.", rating: 5, lang: "ko" }, // Booked massage shop, went comfortably. Got discount too.
    { name: "Kim Se-jeong", text: "차에서 한국 가요(K-Pop) 틀어주셔서 신나게 갔습니다.", rating: 5, lang: "ko" }, // Played K-pop in car, went excitedly.

    // --- JAPANESE (2 Reviews) ---
    { name: "Satomi Ishihara", text: "安全運転で、子供もぐっすり眠っていました。ありがとうございます。", rating: 5, lang: "ja" }, // Safe driving, child slept soundly. Thanks.
    { name: "Takeru Satoh", text: "日本語が少し話せるドライバーさんでした。安心しました。", rating: 5, lang: "ja" }, // Driver spoke a little Japanese. Was relieved.

    // --- RUSSIAN (1 Review) ---
    { name: "Irina Shayk", text: "Все четко. Машина зверь, кондиционер работает отлично.", rating: 5, lang: "ru" }, // Everything clear. Car is a beast, AC works great.

    // --- ARABIC (1 Review) ---
    { name: "Amr Diab", text: "رحلة مريحة وسعر ممتاز. شكراً لكم.", rating: 5, lang: "ar" } // Comfortable trip, excellent price. Thank you.
  ]

  // Insert Database
  const dataToInsert = reviews.map(r => ({
    userName: r.name,
    comment: r.text,
    rating: r.rating,
    lang: r.lang,
    // Randomize category
    category: ['driver_service', 'price_value', 'vehicle_quality', 'activity_package'][Math.floor(Math.random() * 4)],
    createdAt: getRecentDate()
  }))

  try {
    const result = await prisma.review.createMany({
      data: dataToInsert
    })
    console.log(`✅ Successfully added exactly ${result.count} reviews!`)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed24Reviews()
