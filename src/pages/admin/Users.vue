<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">User Management</h2>
      <button class="btn-primary">+ Add User</button>
    </div>
    <div class="flex gap-4 mb-4">
      <SearchBar v-model="search" placeholder="Search users..." class="flex-1" />
      <select v-model="filterRole" class="select w-36"><option value="">All Roles</option><option>admin</option><option>member</option><option>visitor</option></select>
    </div>
    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 uppercase"><th class="text-left px-5 py-3">User</th><th class="text-left px-5 py-3">Role</th><th class="text-left px-5 py-3">Joined</th><th class="text-left px-5 py-3">Status</th><th class="px-5 py-3">Actions</th></tr></thead>
        <tbody class="divide-y divide-gray-50 dark:divide-navy-700">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/50">
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-300 text-sm">{{ user.name.charAt(0) }}</div>
                <div><p class="font-medium text-navy-800 dark:text-white">{{ user.name }}</p><p class="text-xs text-gray-400">{{ user.email }}</p></div>
              </div>
            </td>
            <td class="px-5 py-3.5"><span :class="['badge text-xs', user.role === 'admin' ? 'badge-gold' : 'badge-primary']">{{ user.role }}</span></td>
            <td class="px-5 py-3.5 text-xs text-gray-500">{{ user.joined }}</td>
            <td class="px-5 py-3.5"><span :class="['inline-flex w-2 h-2 rounded-full mr-2', user.active ? 'bg-emerald-500' : 'bg-gray-300']"></span><span class="text-xs text-gray-600 dark:text-gray-300">{{ user.active ? 'Active' : 'Inactive' }}</span></td>
            <td class="px-5 py-3.5"><div class="flex gap-2 justify-center"><button class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Edit</button><button class="text-xs text-red-500 hover:underline">Suspend</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import SearchBar from '@/components/common/SearchBar.vue'
const search = ref(''); const filterRole = ref('')
const users = [ { id:1, name:'Admin User', email:'admin@golanisda.org', role:'admin', joined:'Jan 2022', active:true }, { id:2, name:'John Kamau', email:'jkamau@email.com', role:'member', joined:'Mar 2023', active:true }, { id:3, name:'Grace Wambui', email:'gwambui@email.com', role:'member', joined:'Jun 2022', active:true }, { id:4, name:'Peter Osei', email:'posei@email.com', role:'visitor', joined:'Nov 2024', active:false } ]
const filteredUsers = computed(() => users.filter(u => (!search.value || u.name.toLowerCase().includes(search.value.toLowerCase())) && (!filterRole.value || u.role === filterRole.value)))
</script>
