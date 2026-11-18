<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-950">

    <!-- =========================================================
         HERO
    ========================================================== -->
    <section class="page-hero relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl"></div>
        <div class="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"></div>
      </div>

      <div class="page-hero__inner relative">
        <div class="container-custom">
          <div class="mx-auto max-w-3xl text-center">


            <p class="section-tag mb-3 text-blue-300">
              Giving
            </p>

            <h1 class="page-hero__title mb-4 font-heading font-bold text-white">
              Give With Purpose
            </h1>

            <div class="divider-blue-center mb-5"></div>

            <p class="mx-auto max-w-2xl leading-relaxed text-blue-100">
              Your giving supports the ministry of our church and helps us
              serve God, His people, and our community.
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- =========================================================
         MAIN GIVING AREA
    ========================================================== -->
    <section id="give-form" class="section bg-gray-50 dark:bg-navy-950">
      <div class="container-custom">

        <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">

          <!-- ===================================================
               LEFT: FORM
          ==================================================== -->
          <div class="lg:col-span-3">

            <div class="mb-6">
              <SectionTitle
                tag="Give Now"
                title="Make Your Gift"
                subtitle="Choose your giving purpose, amount and payment method."
              />
            </div>

            <div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-900">

              <!-- Form heading -->
              <div class="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-white px-6 py-5 dark:border-navy-700 dark:from-primary-900/20 dark:to-navy-900 sm:px-8">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40">
                    <img
                      src="@/assets/icons/give.svg"
                      alt=""
                      class="h-6 w-6"
                    />
                  </div>

                  <div>
                    <h3 class="font-heading font-semibold text-navy-800 dark:text-white">
                      Giving Details
                    </h3>

                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Enter the details of your gift below.
                    </p>
                  </div>
                </div>
              </div>


              <div class="p-6 sm:p-8">

                <!-- =================================================
                     SUCCESS STATE
                ================================================== -->
                <div v-if="donationSuccess" class="py-6 text-center">

                  <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
                    <svg
                      class="h-10 w-10 text-green-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p class="mb-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                    {{ OFFLINE_DEMO ? 'Demo preview · nothing was submitted' : 'Giving information received' }}
                  </p>

                  <h3 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">
                    Thank You for Giving
                  </h3>

                  <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {{ OFFLINE_DEMO
                      ? 'This local preview uses sample data. No gift or payment was sent.'
                      : 'Please complete your payment using the selected account, then send the payment confirmation to the church for verification.' }}
                  </p>

                  <div class="mx-auto mt-6 max-w-sm rounded-xl bg-gray-50 p-4 dark:bg-navy-800">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-400">
                        Giving Amount
                      </span>

                      <span class="font-heading font-bold text-primary-600 dark:text-primary-400">
                        TZS {{ effectiveAmount.toLocaleString() }}
                      </span>
                    </div>

                    <div class="mt-3 flex items-center justify-between">
                      <span class="text-xs text-gray-400">
                        Purpose
                      </span>

                      <span class="text-xs font-semibold text-navy-700 dark:text-gray-200">
                        {{ selectedGivingTypeLabel }}
                      </span>
                    </div>
                  </div>

                  <div v-if="!OFFLINE_DEMO" class="mx-auto mt-6 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      :href="emailConfirmationLink"
                      class="btn-primary flex items-center justify-center gap-2"
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                      </svg>
                      Send by Email
                    </a>

                    <a
                      :href="messageConfirmationLink"
                      class="btn-outline flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 014 11.5 8.5 8.5 0 0112.5 3a8.5 8.5 0 018.5 8.5z"
                        />
                      </svg>
                      Send Message
                    </a>
                  </div>

                  <button
                    type="button"
                    class="mt-6 text-sm font-medium text-gray-500 transition hover:text-primary-600"
                    @click="resetDonation"
                  >
                    Make another gift
                  </button>
                </div>


                <!-- =================================================
                     DONATION FORM
                ================================================== -->
                <form
                  v-else
                  class="space-y-7"
                  @submit.prevent="submitDonation"
                >

                  <!-- Amount -->
                  <div>
                    <label class="label">
                      Giving Amount
                    </label>

                    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <button
                        v-for="amount in presetAmounts"
                        :key="amount"
                        type="button"
                        :class="[
                          'rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all',
                          form.amount === amount && !customAmount
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'border-gray-200 text-gray-600 hover:border-primary-300 dark:border-navy-600 dark:text-gray-300'
                        ]"
                        @click="selectAmount(amount)"
                      >
                        TZS {{ amount.toLocaleString() }}
                      </button>
                    </div>

                    <div class="relative mt-3">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                        TZS
                      </span>

                      <input
                        v-model="customAmountVal"
                        type="number"
                        min="1"
                        placeholder="Enter another amount"
                        class="input pl-14"
                        @focus="customAmount = true"
                        @input="customAmount = true"
                      />
                    </div>
                  </div>


                  <!-- Giving purpose -->
                  <div>
                    <label class="label">
                      Purpose of Giving
                    </label>

                    <select
                      v-model="form.givingType"
                      class="select"
                    >
                      <option
                        v-for="type in givingTypes"
                        :key="type.value"
                        :value="type.value"
                      >
                        {{ type.label }}
                      </option>
                    </select>

                    <p class="mt-2 text-xs text-gray-400">
                      Choose the purpose that best describes your gift.
                    </p>
                  </div>


                  <!-- Personal information -->
                  <div>
                    <div class="mb-4">
                      <h4 class="font-heading font-semibold text-navy-800 dark:text-white">
                        Your Information
                      </h4>

                      <p class="mt-1 text-xs text-gray-400">
                        Fields marked with * are required.
                      </p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label class="label">
                          First Name *
                        </label>

                        <input
                          v-model="form.firstName"
                          type="text"
                          class="input"
                          autocomplete="given-name"
                          required
                        />
                      </div>

                      <div>
                        <label class="label">
                          Last Name *
                        </label>

                        <input
                          v-model="form.lastName"
                          type="text"
                          class="input"
                          autocomplete="family-name"
                          required
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <label class="label">
                          Email *
                        </label>

                        <input
                          v-model="form.email"
                          type="email"
                          class="input"
                          autocomplete="email"
                          required
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <label class="label">
                          Phone Number
                        </label>

                        <input
                          v-model="form.phone"
                          type="tel"
                          class="input"
                          autocomplete="tel"
                        />
                      </div>
                    </div>
                  </div>


                  <!-- Payment method -->
                  <div>
                    <label class="label">
                      Payment Method
                    </label>

                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        v-for="method in paymentMethods"
                        :key="method.id"
                        type="button"
                        :class="[
                          'rounded-xl border-2 p-4 text-left transition-all',
                          form.method === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 hover:border-primary-300 dark:border-navy-600'
                        ]"
                        @click="form.method = method.id"
                      >
                        <div class="flex items-center gap-3">

                          <div
                            :class="[
                              'flex h-11 w-11 items-center justify-center rounded-xl',
                              form.method === method.id
                                ? 'bg-primary-100 dark:bg-primary-900/40'
                                : 'bg-gray-100 dark:bg-navy-800'
                            ]"
                          >
                            <img
                              v-if="method.id === 'mpesa'"
                              src="@/assets/icons/mpesa.png"
                              alt="M-Pesa"
                              class="h-7 w-7 object-contain"
                            />

                            <svg
                              v-else
                              class="h-6 w-6 text-primary-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.8"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M2 18h20M12 3l10 5H2l10-5z"
                              />
                            </svg>
                          </div>

                          <div>
                            <p class="text-sm font-semibold text-navy-800 dark:text-white">
                              {{ method.name }}
                            </p>

                            <p class="text-xs text-gray-400">
                              {{ method.detail }}
                            </p>
                          </div>

                          <div
                            v-if="form.method === method.id"
                            class="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary-600"
                          >
                            <svg
                              class="h-3 w-3 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="3"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>

                    <p class="mt-3 text-xs text-gray-400">
                      The account details for your selected payment method
                      are displayed on the right.
                    </p>
                  </div>


                  <!-- Error -->
                  <div
                    v-if="donationError"
                    class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-300"
                  >
                    {{ donationError }}
                  </div>


                  <!-- Submit -->
                  <div>
                    <button
                      type="submit"
                      :disabled="donating || effectiveAmount <= 0"
                      class="btn-primary flex w-full items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <svg
                        v-if="donating"
                        class="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          stroke-width="3"
                          class="opacity-25"
                        />
                        <path
                          d="M21 12a9 9 0 00-9-9"
                          stroke="currentColor"
                          stroke-width="3"
                        />
                      </svg>

                      <img
                        v-else
                        src="@/assets/icons/give.svg"
                        alt=""
                        class="h-5 w-5"
                      />

                      {{ donating ? 'Submitting...' : 'Continue with Giving' }}
                    </button>

                    <p class="mt-3 text-center text-[11px] leading-relaxed text-gray-400">
                      {{ OFFLINE_DEMO ? 'Preview only. This form will not send a payment.' : 'After payment, send confirmation to the church for verification.' }}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>


          <!-- ===================================================
               RIGHT: DYNAMIC PAYMENT ACCOUNT
          ==================================================== -->
          <div class="lg:col-span-2">
            <div class="space-y-5 lg:sticky lg:top-24">

              <Transition name="payment-account" mode="out-in">

                <!-- M-PESA ACCOUNT -->
                <div
                  v-if="form.method === 'mpesa'"
                  key="mpesa-account"
                  class="giving-account overflow-hidden rounded-2xl border"
                >
                  <div class="p-6">

                    <div class="flex items-center gap-3">
                      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                        <img
                          src="@/assets/icons/mpesa.png"
                          alt="M-Pesa"
                          class="h-7 w-7 object-contain"
                        />
                      </div>

                      <div>
                        <p class="text-xs text-gray-500">
                          Payment Account
                        </p>

                        <h3 class="font-heading font-semibold text-white">
                          M-PESA
                        </h3>
                      </div>
                    </div>

                    <div class="mt-7">
                      <p class="text-xs text-gray-500">
                        M-Pesa Paybill
                      </p>

                      <p class="mt-1 font-heading text-3xl font-bold tracking-wide text-white">
                        54299125
                      </p>

                      <div class="my-5 h-px bg-gray-200 dark:bg-white/10"></div>

                      <p class="text-xs text-gray-500">
                        Account Name
                      </p>

                      <p class="mt-1 text-sm font-medium leading-relaxed text-white">
                        SADAKA SADAKA GOLANI SDA CHURCH
                      </p>
                    </div>
                  </div>

                  <div class="giving-account__note px-6 py-4">
                    <div class="flex gap-3">
                      <svg
                        class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-blue-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          stroke-linecap="round"
                          d="M12 11v5M12 8h.01"
                        />
                      </svg>

                      <p class="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                        Please confirm the Paybill number and account name
                        before completing your payment.
                      </p>
                    </div>
                  </div>
                </div>


                <!-- BANK ACCOUNT -->
                <div
                  v-else
                  key="bank-account"
                  class="giving-account overflow-hidden rounded-2xl border"
                >
                  <div class="p-6">

                    <div class="flex items-center gap-3">
                      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                       <img
                          src="@/assets/icons/crdb.png"
                          alt="M-Pesa"
                          class="h-7 w-7 object-contain"
                        />
                      </div>

                      <div>
                        <p class="text-xs text-gray-500">
                          Payment Account
                        </p>

                        <h3 class="font-heading font-semibold text-white">
                          BANK TRANSFER
                        </h3>
                      </div>
                    </div>

                    <div class="mt-7 space-y-5">

                      <div>
                        <p class="text-xs text-gray-500">
                          Bank Name
                        </p>

                        <p class="mt-1 text-sm font-semibold text-white">
                          CRDB
                        </p>
                      </div>

                      <div>
                        <p class="text-xs text-gray-500">
                          Account Name
                        </p>

                        <p class="mt-1 text-sm font-medium leading-relaxed text-white">
                          GOLANI SDA CHURCH
                        </p>
                      </div>

                      <!-- Add the official account number here -->
                      <div>
                        <p class="text-xs text-gray-500">
                          Account Number
                        </p>

                        <p class="mt-1 text-sm font-medium text-white">
                          015C504636300
                        </p>
                      </div>

                    </div>
                  </div>

                  <div class="giving-account__note px-6 py-4">
                    <div class="flex gap-3">
                      <svg
                        class="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-blue-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          stroke-linecap="round"
                          d="M12 11v5M12 8h.01"
                        />
                      </svg>

                      <p class="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                        Please verify the bank details before completing
                        your transfer.
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>


              <p class="px-1 text-center text-xs leading-relaxed text-gray-500 dark:text-gray-300">
                Giving is voluntary. Please verify the account details before making a transfer.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>


  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import donationService from '@/services/donationService.js'
import { OFFLINE_DEMO } from '@/services/offline.js'

/*
|--------------------------------------------------------------------------
| Church contact details
|--------------------------------------------------------------------------
|
| Replace these with the official church contacts.
| Do not put an invalid email address here.
|
*/

const CHURCH_EMAIL = 'your-church-email@example.com'
const CHURCH_PHONE = '255000000000'


/*
|--------------------------------------------------------------------------
| Preset amounts
|--------------------------------------------------------------------------
*/

const presetAmounts = [
  500,
  1000,
  2000,
  5000,
  10000,
  20000
]


/*
|--------------------------------------------------------------------------
| Giving types
|--------------------------------------------------------------------------
|
| These replace campaigns. They can later be loaded from the backend
| if the church wants administrators to manage them.
|
*/

const givingTypes = [
  {
    value: 'tithe',
    label: 'Tithe'
  },
  {
    value: 'offering',
    label: 'Offering'
  },
  {
    value: 'church_development',
    label: 'Church Development'
  },
  {
    value: 'other',
    label: 'Other Giving'
  }
]


/*
|--------------------------------------------------------------------------
| Payment methods
|--------------------------------------------------------------------------
*/

const paymentMethods = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    detail: 'Lipa na M-Pesa'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    detail: 'Direct bank transfer'
  }
]


/*
|--------------------------------------------------------------------------
| Form state
|--------------------------------------------------------------------------
*/

const form = ref({
  amount: 1000,
  givingType: 'tithe',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  method: 'mpesa'
})

const customAmount = ref(false)
const customAmountVal = ref('')

const donating = ref(false)
const donationSuccess = ref(false)
const donationError = ref(null)


/*
|--------------------------------------------------------------------------
| Amount
|--------------------------------------------------------------------------
*/

const effectiveAmount = computed(() => {
  if (customAmount.value && customAmountVal.value) {
    return Number(customAmountVal.value)
  }

  return Number(form.value.amount || 0)
})


const selectedGivingTypeLabel = computed(() => {
  const selected = givingTypes.find(
    type => type.value === form.value.givingType
  )

  return selected?.label || 'Giving'
})


function selectAmount(amount) {
  form.value.amount = amount
  customAmount.value = false
  customAmountVal.value = ''
}


/*
|--------------------------------------------------------------------------
| Payment confirmation
|--------------------------------------------------------------------------
|
| The user first submits the giving information to the backend.
| After that, these links allow them to notify the church.
|
*/

const emailConfirmationLink = computed(() => {
  const subject = encodeURIComponent('Church Giving Payment Confirmation')

  const body = encodeURIComponent(
    `Hello,\n\n` +
    `I have completed a church giving payment.\n\n` +
    `Name: ${form.value.firstName} ${form.value.lastName}\n` +
    `Amount: TZS ${effectiveAmount.value.toLocaleString()}\n` +
    `Purpose: ${selectedGivingTypeLabel.value}\n` +
    `Payment Method: ${form.value.method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}\n\n` +
    `Please verify my payment.\n\n` +
    `Thank you.`
  )

  return `mailto:${CHURCH_EMAIL}?subject=${subject}&body=${body}`
})


const messageConfirmationLink = computed(() => {
  const message = encodeURIComponent(
    `Hello, I have completed a church giving payment. ` +
    `Name: ${form.value.firstName} ${form.value.lastName}. ` +
    `Amount: TZS ${effectiveAmount.value.toLocaleString()}. ` +
    `Purpose: ${selectedGivingTypeLabel.value}. ` +
    `Payment Method: ${form.value.method === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}. ` +
    `Please verify my payment.`
  )

  return `https://wa.me/${CHURCH_PHONE}?text=${message}`
})


/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

async function submitDonation() {
  donationError.value = null

  if (!form.value.firstName || !form.value.lastName || !form.value.email) {
    donationError.value = 'Please complete all required fields.'
    return
  }

  if (effectiveAmount.value <= 0) {
    donationError.value = 'Please enter a valid giving amount.'
    return
  }

  donating.value = true

  try {
    if (OFFLINE_DEMO) {
      donationSuccess.value = true
      return
    }

    await donationService.create({
      first_name: form.value.firstName,
      last_name: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      amount: effectiveAmount.value,
      giving_type: form.value.givingType,
      method: form.value.method
    })

    donationSuccess.value = true
  } catch (error) {
    console.error('Donation submission failed:', error)

    donationError.value =
      'We could not submit your giving information. Please check your details and try again.'
  } finally {
    donating.value = false
  }
}


/*
|--------------------------------------------------------------------------
| Reset
|--------------------------------------------------------------------------
*/

function resetDonation() {
  donationSuccess.value = false
  donationError.value = null

  form.value = {
    amount: 1000,
    givingType: 'tithe',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    method: 'mpesa'
  }

  customAmount.value = false
  customAmountVal.value = ''
}


</script>


<style scoped>
.payment-account-enter-active,
.payment-account-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.payment-account-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.payment-account-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.giving-account { background: var(--color-surface); border-color: var(--color-border); box-shadow: var(--shadow-soft); }
.giving-account h3, .giving-account .text-white { color: var(--color-footer) !important; }
.giving-account__note { background: var(--color-bg-alt); border-top: 1px solid var(--color-border); }
:global(.dark) .giving-account { background: var(--color-surface); }
:global(.dark) .giving-account h3, :global(.dark) .giving-account .text-white { color: #f2f6f8 !important; }
:global(.dark) .giving-account__note { background: rgba(255,255,255,.04); border-color: var(--color-border); }
</style>
