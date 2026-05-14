<template>
  <div class="p-8">
    <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-1">Set New Password</h2>
    <p class="text-sm text-gray-500 mb-7">Choose a strong password for your account.</p>
    <form @submit.prevent="submit" class="space-y-4">
      <div><label class="label">New Password</label><input v-model="form.password" type="password" class="input" required /></div>
      <div><label class="label">Confirm Password</label><input v-model="form.confirm" type="password" class="input" required /></div>
      <button type="submit" class="btn-primary w-full btn-lg">Update Password</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({ password: '', confirm: '' })
async function submit() { await new Promise(r => setTimeout(r, 800)); router.push('/auth/login') }
</script>
