<template>
  <div>
    <div class="relative pt-24 pb-16 bg-gradient-to-br from-navy-900 via-primary-800 to-navy-900 overflow-hidden">
      <div class="absolute inset-0 bg-hero-pattern opacity-20"></div>
      <div class="container-custom relative z-10 text-center">
        <p class="section-tag text-gold-300 mb-3">Give</p>
        <h1 class="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Support God's Work</h1>
        <div class="divider-gold-center mb-4"></div>
        <p class="text-blue-200 max-w-xl mx-auto">"Bring the whole tithe into the storehouse... Test me in this, says the LORD Almighty." — Malachi 3:10</p>
      </div>
    </div>

    <!-- Campaigns -->
    <section class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <SectionTitle tag="Campaigns" title="Active Giving Campaigns" subtitle="Your generous giving is transforming lives and advancing God's kingdom." />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div v-for="campaign in campaigns" :key="campaign.id" class="card-hover overflow-hidden">
            <div class="h-48 bg-gradient-to-br flex items-center justify-center relative"
              :class="campaign.category === 'Infrastructure' ? 'from-primary-600 to-navy-800' : campaign.category === 'Education' ? 'from-teal-600 to-primary-800' : 'from-emerald-600 to-navy-800'">
              <div class="text-7xl opacity-20">{{ campaign.category === 'Infrastructure' ? '🏛️' : campaign.category === 'Education' ? '🎓' : '🤝' }}</div>
              <span class="absolute top-3 left-3 badge-gold">{{ campaign.category }}</span>
            </div>
            <div class="p-5">
              <h3 class="font-heading text-lg font-semibold text-navy-800 dark:text-white mb-2">{{ campaign.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{{ campaign.description }}</p>
              <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>{{ formatCurrency(campaign.raised, campaign.currency) }}</span>
                  <span class="font-semibold text-primary-600 dark:text-gold-400">{{ progress(campaign) }}%</span>
                </div>
                <div class="h-2 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-primary-500 to-gold-500 rounded-full transition-all duration-1000" :style="{ width: progress(campaign) + '%' }"></div>
                </div>
                <p class="text-xs text-gray-400 mt-1">Goal: {{ formatCurrency(campaign.goal, campaign.currency) }}</p>
              </div>
              <button @click="startDonation(campaign)" class="btn-gold w-full">Donate to This Campaign</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Form -->
    <section id="donate-form" class="section bg-white dark:bg-navy-900">
      <div class="container-custom">
        <div class="max-w-2xl mx-auto">
          <SectionTitle tag="Give Now" title="Make Your Donation" subtitle="Every gift, large or small, makes a difference." />
          <div class="card p-8">
            <div v-if="!donationSuccess">
              <!-- Amount Selection -->
              <div class="mb-6">
                <label class="label">Select Amount (KES)</label>
                <div class="grid grid-cols-3 gap-3 mb-3">
                  <button v-for="amt in presetAmounts" :key="amt" @click="form.amount = amt; customAmount = false"
                    :class="['py-3 rounded-xl text-sm font-semibold border-2 transition-all', form.amount === amt && !customAmount ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300' : 'border-gray-200 dark:border-navy-600 text-gray-600 dark:text-gray-300 hover:border-primary-300']">
                    KES {{ amt.toLocaleString() }}
                  </button>
                </div>
                <input v-model="customAmountVal" @focus="customAmount = true" type="number" placeholder="Or enter custom amount..."
                  class="input" />
              </div>

              <!-- Campaign -->
              <div class="mb-6">
                <label class="label">Designate Your Gift</label>
                <select v-model="form.campaign" class="select">
                  <option value="tithe">Tithe (General Fund)</option>
                  <option v-for="c in campaigns" :key="c.id" :value="c.id">{{ c.title }}</option>
                </select>
              </div>

              <!-- Donor Info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div><label class="label">First Name *</label><input v-model="form.firstName" class="input" required /></div>
                <div><label class="label">Last Name *</label><input v-model="form.lastName" class="input" required /></div>
                <div class="sm:col-span-2"><label class="label">Email *</label><input v-model="form.email" type="email" class="input" required /></div>
                <div class="sm:col-span-2"><label class="label">Phone</label><input v-model="form.phone" type="tel" class="input" /></div>
              </div>

              <!-- Payment Method -->
              <div class="mb-6">
                <label class="label">Payment Method</label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button v-for="method in paymentMethods" :key="method.id" @click="form.method = method.id"
                    :class="['p-4 rounded-xl border-2 text-center transition-all', form.method === method.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-navy-600 hover:border-primary-200']">
                    <div class="text-2xl mb-1">{{ method.icon }}</div>
                    <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">{{ method.name }}</p>
                    <p class="text-xs text-gray-400">{{ method.detail }}</p>
                  </button>
                </div>
              </div>

              <!-- M-Pesa Detail -->
              <div v-if="form.method === 'mpesa'" class="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-2">M-Pesa Instructions</p>
                <ol class="text-xs text-emerald-700 dark:text-emerald-400 space-y-1 list-decimal list-inside">
                  <li>Go to M-Pesa → Lipa na M-Pesa → Pay Bill</li>
                  <li>Business Number: <strong>400200</strong></li>
                  <li>Account: Your Full Name</li>
                  <li>Amount: KES {{ effectiveAmount.toLocaleString() }}</li>
                </ol>
              </div>

              <!-- Card Detail -->
              <div v-if="form.method === 'card'" class="mb-6 space-y-3">
                <div><label class="label">Card Number</label><input class="input" placeholder="1234 5678 9012 3456" /></div>
                <div class="grid grid-cols-2 gap-3">
                  <div><label class="label">Expiry</label><input class="input" placeholder="MM/YY" /></div>
                  <div><label class="label">CVV</label><input class="input" placeholder="123" /></div>
                </div>
              </div>

              <button @click="submitDonation" :disabled="donating" class="btn-gold w-full btn-lg mt-2">
                {{ donating ? 'Processing...' : `Give KES ${effectiveAmount.toLocaleString()}` }}
              </button>
              <p class="text-xs text-gray-400 text-center mt-3">Secure · All gifts are tax-deductible · Receipt emailed to you</p>
            </div>

            <!-- Success State -->
            <div v-else class="text-center py-8">
              <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">🙏</div>
              <h3 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-2">Thank You!</h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6">Your gift of <strong class="text-primary-600 dark:text-gold-400">KES {{ effectiveAmount.toLocaleString() }}</strong> has been received. A receipt has been sent to {{ form.email }}.</p>
              <p class="text-sm text-gray-400 italic mb-6">"God loves a cheerful giver." — 2 Corinthians 9:7</p>
              <button @click="donationSuccess = false" class="btn-outline">Give Again</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Give -->
    <section class="section-sm bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">
        <SectionTitle tag="Stewardship" title="Why We Give" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="reason in whyGive" :key="reason.title" class="card p-6 text-center">
            <div class="text-4xl mb-4">{{ reason.icon }}</div>
            <h3 class="font-semibold text-navy-800 dark:text-white mb-2">{{ reason.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ reason.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { donationCampaigns } from '@/data/index.js'
import { formatCurrency, progressPercent } from '@/utils/index.js'
import SectionTitle from '@/components/common/SectionTitle.vue'

const campaigns = donationCampaigns
const presetAmounts = [500, 1000, 2000, 5000, 10000, 20000]
const customAmount = ref(false)
const customAmountVal = ref('')
const donating = ref(false)
const donationSuccess = ref(false)

const form = ref({ amount: 1000, campaign: 'tithe', firstName: '', lastName: '', email: '', phone: '', method: 'mpesa' })
const effectiveAmount = computed(() => customAmount.value && customAmountVal.value ? Number(customAmountVal.value) : form.value.amount)
const progress = (c) => progressPercent(c.raised, c.goal)

function startDonation(campaign) {
  form.value.campaign = campaign.id
  document.getElementById('donate-form')?.scrollIntoView({ behavior: 'smooth' })
}

async function submitDonation() {
  if (!form.value.email || !form.value.firstName) return
  donating.value = true
  await new Promise(r => setTimeout(r, 1800))
  donating.value = false
  donationSuccess.value = true
}

const paymentMethods = [
  { id: 'mpesa', icon: '📱', name: 'M-Pesa', detail: 'Lipa na M-Pesa' },
  { id: 'card', icon: '💳', name: 'Debit/Credit Card', detail: 'Visa, Mastercard' },
  { id: 'bank', icon: '🏦', name: 'Bank Transfer', detail: 'Direct deposit' }
]

const whyGive = [
  { icon: '🌍', title: 'Fund Mission', text: 'Your tithe supports the global Adventist mission — reaching the unreached with the gospel.' },
  { icon: '🏛️', title: 'Build the Church', text: 'Local offerings build and maintain our facilities, enabling ministry and community service.' },
  { icon: '🤝', title: 'Serve the Community', text: 'Special gifts fund food pantries, scholarships, health programs, and compassion ministry.' }
]
</script>
