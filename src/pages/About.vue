<template>
  <div>
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="page-hero__inner">
        <div class="container-custom text-center">
          <p class="section-tag text-blue-400 mb-3">Who We Are</p>
          <h1 class="font-heading text-4xl md:text-6xl font-bold text-white mb-4">About Golani SDA Church</h1>
          <div class="divider-blue-center mb-4"></div>
          <p class="text-blue-200 max-w-2xl mx-auto text-lg">Grounded in the Bible, Integrated for mission31ws</p>
        </div>
      </div>
    </div>

    <!-- History -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionTitle tag="Our History" title="Our Journey of Faith" center />
            <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>The Golani SDA Church was established in 1990 by a small group of faithful Seventh-day Adventists who felt called to plant a congregation in the Golani district. Beginning with just 23 members in a rented school hall, the church grew steadily through evangelistic meetings, Bible studies, and community service.</p>
              <p>In 1998, the congregation purchased its first property and constructed a permanent sanctuary. By 2005, membership had grown to over 300 souls. The church planted two daughter churches in neighboring areas and established a community outreach center.</p>
              <p>Today, Golani SDA Church is home to over 847 registered members with 12 active ministry departments, serving as a beacon of hope and light in our region. We remain committed to the Adventist mission of proclaiming the three angels' messages and preparing a people for Christ's imminent return.</p>
            </div>
          </div>
          <div class="space-y-4">
            <div v-for="milestone in milestones" :key="milestone.year" class="flex gap-4">
              <div class="text-right w-14 flex-shrink-0">
                <span class="font-bold text-blue-700 dark:text-blue-500 text-sm">{{ milestone.year }}</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0 mt-1"></div>
                <div class="flex-1 w-px bg-gray-200 dark:bg-navy-700 my-1"></div>
              </div>
              <div class="pb-4">
                <p class="font-semibold text-navy-800 dark:text-white text-sm">{{ milestone.event }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <SectionTitle tag="Our Foundation" title="Mission, Vision & Values" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="mvv in missionVisionValues" :key="mvv.title" class="card p-6 border-t-4 border-primary-500">
            <div class="text-4xl mb-4">{{ mvv.icon }}</div>
            <h3 class="font-heading text-xl font-bold text-navy-800 dark:text-white mb-3">{{ mvv.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{{ mvv.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 28 Fundamental Beliefs -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <SectionTitle tag="What We Believe" title="Fundamental Beliefs" subtitle="Seventh-day Adventists accept these fundamental beliefs as the teaching of Holy Scripture." />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="belief in fundamentalBeliefs" :key="belief.number" class="card p-4 flex gap-3 group hover:border-primary-200 dark:hover:border-navy-500 transition-colors border border-transparent">
            <div class="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 flex items-center justify-center font-bold text-sm flex-shrink-0">{{ belief.number }}</div>
            <div>
              <h4 class="font-semibold text-sm text-navy-800 dark:text-white mb-1">{{ belief.title }}</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{{ belief.summary }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <SectionTitle tag="Leadership" title="Meet Our Team" subtitle="Godly servants dedicated to shepherding the GolaniSDA family." />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="leader in leadership" :key="leader.id" class="card overflow-hidden group text-center">
            <div class="h-48 bg-gradient-to-br from-primary-600 to-navy-800 flex items-center justify-center relative">
              <div class="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl text-white border-4 border-white/30">
                {{ leader.name.charAt(0) }}
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-navy-800 dark:text-white">{{ leader.name }}</h3>
              <p class="text-blue-700 dark:text-blue-500 text-xs mb-3">{{ leader.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{{ leader.bio }}</p>
              <a :href="'mailto:' + leader.email" class="text-primary-600 dark:text-blue-500 text-xs hover:underline mt-3 block">{{ leader.email }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Times & Location -->
    <section class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionTitle tag="Worship" title="Service Times" center />
            <div class="space-y-3">
              <div v-for="svc in serviceTimes" :key="svc.name" class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-navy-800 border border-gray-100 dark:border-navy-700">
                <div>
                  <p class="font-semibold text-navy-800 dark:text-white text-sm">{{ svc.name }}</p>
                  <p class="text-xs text-gray-400">{{ svc.day }}</p>
                </div>
                <span class="badge-primary">{{ svc.time }}</span>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle tag="Find Us" title="Our Location" center />
            <div class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-800 dark:to-navy-700 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 dark:border-navy-600">
              <div class="text-center text-gray-400">
                <div class="text-4xl mb-2"></div>
                <p class="text-sm">Google Map Embed</p>
                <p class="text-xs">Add VITE_GOOGLE_MAPS_KEY to .env</p>
              </div>
            </div>
            <div class="card p-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p> Golani, Near Mama Eliza Shopping Centre, Ubungo - Dar es Salaam</p>
              <p> +254 700 000 100</p>
              <p> info@golanisda.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersection } from '@/composables/useIntersection'
import SectionTitle from '@/components/common/SectionTitle.vue'
import leadershipService from '@/services/leadershipService.js'

const leadership = ref([])

onMounted(async () => {
  useIntersection()
  try {
    const res = await leadershipService.getAll()
    leadership.value = Array.isArray(res) ? res : (res?.results ?? [])
  } catch { /* leadership stays empty, page still renders */ }
})

const milestones = [
  { year: '1990', event: 'Church founded by _ members in Golani' },
  { year: '1995', event: 'First dedicated church building constructed' },
  { year: '2008', event: 'Community outreach center established' },
  { year: '2015', event: 'Membership reaches _ baptized members' },
  { year: '2024', event: '_ members — growing in faith and mission' }
]

const missionVisionValues = [
  { icon: '', title: 'Our Mission', text: 'To make disciples of all nations through proclamation, fellowship, service, and worship — sharing the everlasting gospel and preparing a people for the return of Jesus Christ.' },
  { icon: '', title: 'Our Vision', text: 'To be a Spirit-filled, mission-driven church that transforms our community, reflects the character of Jesus Christ, and reaches the unreached with the three angels\' messages.' },
  { icon: '', title: 'Our Values', text: 'Scripture above all. Whole-person wellness. Sabbath rest and worship. Community service. Family integrity. Global mission. Christ-centred living in every area of life.' }
]

const fundamentalBeliefs = [
  { number: 1, title: 'The Holy Scriptures', summary: 'The Bible is the supreme authority in all matters of faith and practice.' },
  { number: 2, title: 'The Trinity', summary: 'One God — Father, Son, and Holy Spirit — a unity of three coeternal Persons.' },
  { number: 3, title: 'The Father', summary: 'God the Father is the Creator, Sustainer, and Sovereign of all creation.' },
  { number: 4, title: 'The Son', summary: 'Jesus Christ — fully divine, became fully human — lived, died, and rose for our salvation.' },
  { number: 5, title: 'The Holy Spirit', summary: 'The Holy Spirit inspired Scripture, convicts of sin, and empowers believers.' },
  { number: 6, title: 'Creation', summary: 'God created the world in six literal days and rested on the seventh.' },
  { number: 7, title: 'The Nature of Humanity', summary: 'Humans are created in God\'s image — a unity of body, mind, and spirit.' },
  { number: 8, title: 'The Great Controversy', summary: 'All of history is set in the context of the cosmic conflict between Christ and Satan.' },
  { number: 9, title: 'The Life, Death & Resurrection', summary: 'Christ\'s life and atoning death provide the only means of salvation.' },
  { number: 10, title: 'Salvation', summary: 'We are saved by grace through faith in Jesus Christ alone.' },
  { number: 11, title: 'Growing in Christ', summary: 'The Christian life is one of ongoing sanctification and surrender to the Holy Spirit.' },
  { number: 12, title: 'The Church', summary: 'The church is the body of Christ — a community of believers called to mission.' },
  { number: 13, title: 'The Remnant & Its Mission', summary: 'The end-time remnant is called to proclaim the three angels\' messages of Revelation 14.' },
  { number: 14, title: 'Unity in the Body', summary: 'All members are equal in Christ — regardless of race, nationality, or gender.' },
  { number: 15, title: 'Baptism', summary: 'Baptism by immersion is the public declaration of faith and surrender to Christ.' },
  { number: 16, title: 'The Lord\'s Supper', summary: 'Holy Communion commemorates Christ\'s death and anticipates His return.' },
  { number: 17, title: 'Spiritual Gifts', summary: 'God gives spiritual gifts to every believer for ministry and service.' },
  { number: 18, title: 'The Gift of Prophecy', summary: 'The Spirit of Prophecy is a gift manifested in the ministry of Ellen G. White.' },
  { number: 19, title: 'The Law of God', summary: 'The Ten Commandments reflect God\'s character and are binding for all people.' },
  { number: 20, title: 'The Sabbath', summary: 'The seventh-day Sabbath (Saturday) is God\'s holy day of rest and worship.' },
  { number: 21, title: 'Stewardship', summary: 'We are stewards of all God has entrusted to us — time, talents, and resources.' },
  { number: 22, title: 'Christian Behavior', summary: 'Our lifestyle reflects our relationship with Christ in dress, diet, and conduct.' },
  { number: 23, title: 'Marriage and the Family', summary: 'Marriage is a sacred covenant between one man and one woman, reflecting Christ and the church.' },
  { number: 24, title: 'Christ\'s Ministry in the Sanctuary', summary: 'Jesus is our High Priest, ministering in the heavenly sanctuary on our behalf.' },
  { number: 25, title: 'The Second Coming', summary: 'Christ\'s return is literal, visible, worldwide — the blessed hope of the church.' },
  { number: 26, title: 'Death and Resurrection', summary: 'The dead are unconscious in sleep until the resurrection at Christ\'s return.' },
  { number: 27, title: 'The Millennium', summary: 'The millennium begins at Christ\'s return and ends with the second resurrection.' },
  { number: 28, title: 'The New Earth', summary: 'God will create a new heaven and a new earth where the redeemed will live forever.' }
]

const serviceTimes = [
  { name: 'Sabbath Worship', day: 'Every Saturday', time: '08:00 AM - 06:00 PM' },
  { name: 'Friday Vesper', day: 'Every Friday', time: '05:00 - 06:00 PM' },
  { name: 'Prayer Session (Via Google Meet)', day: 'Every Wednesday', time: '05:00 - 05:30 AM'},
  { name: 'Prayer Session (Physical)', day: 'Every Wednesday', time: '05:00 - 06:00 PM' },
]
</script>
