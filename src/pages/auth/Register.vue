<template>
  <div class="p-8">
    <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Create Account</h2>
    <p class="text-sm text-gray-500 mb-7">Join the GolaniSDA digital community</p>
    <form @submit.prevent="submit" class="space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="label">First Name</label><input v-model="form.firstName" class="input" required /></div>
        <div><label class="label">Last Name</label><input v-model="form.lastName" class="input" required /></div>
      </div>
      <div><label class="label">Email</label><input v-model="form.email" type="email" class="input" required /></div>
      <div><label class="label">Phone</label><input v-model="form.phone" type="tel" class="input" /></div>
      <div><label class="label">Password</label><input v-model="form.password" type="password" class="input" required /></div>
      <div><label class="label">Confirm Password</label><input v-model="form.confirmPassword" type="password" class="input" required /></div>
      <p v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword" class="text-xs text-red-500">Passwords do not match</p>
      <button type="submit" :disabled="form.password !== form.confirmPassword" class="btn-primary w-full btn-lg">Create Account</button>
    </form>
    <p class="text-center text-sm text-gray-500 mt-5">Already have an account? <RouterLink to="/auth/login" class="text-primary-600 dark:text-gold-400 font-semibold hover:underline">Sign In</RouterLink></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
const router = useRouter()
const form = ref({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
async function submit() { await new Promise(r => setTimeout(r, 1000)); router.push('/auth/login') }
</script>
