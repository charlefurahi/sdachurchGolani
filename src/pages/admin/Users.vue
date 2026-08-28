<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">User Management</h2>
      <span class="badge badge-primary">{{ totalUsers }} total</span>
    </div>

    <div class="flex gap-4 mb-4 flex-wrap">
      <input v-model="search" placeholder="Search users..." class="input max-w-xs text-sm py-2" />
      <select v-model="filterRole" class="select w-36 text-sm py-2">
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="pastor">Pastor</option>
        <option value="elder">Elder</option>
        <option value="deacon">Deacon</option>
        <option value="member">Member</option>
      </select>
      <select v-model="filterActive" class="select w-36 text-sm py-2">
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>

    <div v-if="loading" class="card p-8 text-center">
      <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Loading users...</p>
    </div>

    <div v-else-if="error" class="card p-8 text-center">
      <p class="text-red-500 mb-3">{{ error }}</p>
      <button @click="loadUsers" class="btn-primary btn-sm">Retry</button>
    </div>

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-gray-50 dark:bg-navy-900 text-xs text-gray-500 dark:text-gray-400 uppercase">
              <th class="text-left px-5 py-3">User</th>
              <th class="text-left px-5 py-3">Role</th>
              <th class="text-left px-5 py-3">Phone</th>
              <th class="text-left px-5 py-3">Joined</th>
              <th class="text-left px-5 py-3">Status</th>
              <th class="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-navy-700">
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="text-center py-8 text-gray-400 dark:text-gray-500">No users found</td>
            </tr>
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-300 text-sm flex-shrink-0">
                    {{ (user.first_name?.[0] || '') + (user.last_name?.[0] || '') || '?' }}
                  </div>
                  <div>
                    <p class="font-medium text-navy-800 dark:text-white">{{ user.first_name }} {{ user.last_name }}</p>
                    <p class="text-xs text-gray-400">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <span :class="['badge text-xs capitalize', user.role === 'admin' ? 'badge-primary' : 'badge-primary']">{{ user.role }}</span>
              </td>
              <td class="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">{{ user.phone || '—' }}</td>
              <td class="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400">{{ formatDate(user.date_joined) }}</td>
              <td class="px-5 py-3.5">
                <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', user.is_active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500']">
                  <span :class="['w-1.5 h-1.5 rounded-full flex-shrink-0', user.is_active ? 'bg-emerald-500' : 'bg-gray-300']"></span>
                  {{ user.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-5 py-3.5">
                <div class="flex gap-3 justify-center">
                  <button @click="openEditRole(user)" class="text-xs text-primary-600 dark:text-blue-500 hover:underline font-medium">Edit Role</button>
                  <button @click="toggleActive(user)" :class="['text-xs font-medium hover:underline', user.is_active ? 'text-red-500' : 'text-emerald-600']">
                    {{ user.is_active ? 'Suspend' : 'Activate' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div v-if="editingUser" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-navy-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h3 class="font-semibold text-navy-800 dark:text-white mb-1">Edit User Role</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ editingUser.first_name }} {{ editingUser.last_name }}</p>
        <div class="mb-4">
          <label class="label">Role</label>
          <select v-model="editRole" class="select">
            <option value="member">Member</option>
            <option value="deacon">Deacon</option>
            <option value="elder">Elder</option>
            <option value="pastor">Pastor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <p v-if="editError" class="text-xs text-red-500 mb-3">{{ editError }}</p>
        <div class="flex gap-3">
          <button @click="saveRole" :disabled="saving" class="btn-primary flex-1 btn-sm">{{ saving ? 'Saving...' : 'Save' }}</button>
          <button @click="editingUser = null" class="btn-ghost flex-1 btn-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const users = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const filterRole = ref('')
const filterActive = ref('')
const editingUser = ref(null)
const editRole = ref('')
const saving = ref(false)
const editError = ref('')

const totalUsers = computed(() => users.value.length)

const filteredUsers = computed(() => users.value.filter(u => {
  const matchSearch = !search.value || `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.value.toLowerCase())
  const matchRole = !filterRole.value || u.role === filterRole.value
  const matchActive = !filterActive.value || String(u.is_active) === filterActive.value
  return matchSearch && matchRole && matchActive
}))

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

async function loadUsers() {
  loading.value = true
  error.value = ''
  try {
    const data = await api.get('/auth/users/')
    users.value = data.results || data || []
  } catch (e) {
    error.value = e?.detail || e?.error || 'Failed to load users. Check API connection.'
  }
  loading.value = false
}

function openEditRole(user) {
  editingUser.value = user
  editRole.value = user.role
  editError.value = ''
}

async function saveRole() {
  saving.value = true
  editError.value = ''
  try {
    await api.patch(`/auth/users/${editingUser.value.id}/`, { role: editRole.value })
    const idx = users.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) users.value[idx].role = editRole.value
    editingUser.value = null
  } catch (e) {
    editError.value = e?.detail || 'Failed to update role'
  }
  saving.value = false
}

async function toggleActive(user) {
  try {
    await api.patch(`/auth/users/${user.id}/`, { is_active: !user.is_active })
    user.is_active = !user.is_active
  } catch {
    // silently fail
  }
}

onMounted(loadUsers)
</script>
