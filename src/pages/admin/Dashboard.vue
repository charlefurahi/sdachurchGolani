<template>
  <div class="space-y-6">
    <!-- Welcome -->
    <div class="bg-gradient-to-r from-primary-700 to-navy-800 rounded-2xl p-6 text-white">
      <p class="text-blue-200 text-sm mb-1">Good morning 👋</p>
      <h2 class="font-heading text-2xl font-bold mb-1">Welcome to GolaniSDA Admin</h2>
      <p class="text-blue-200 text-sm">Here's what's happening with your church today.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in statsCards" :key="stat.label" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" :class="stat.bg">{{ stat.icon }}</div>
          <span :class="['text-xs font-semibold', stat.trend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500']">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </span>
        </div>
        <p class="text-2xl font-bold text-navy-800 dark:text-white mb-0.5">{{ stat.value }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Charts & Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Attendance Chart (Placeholder) -->
      <div class="lg:col-span-2 card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-navy-800 dark:text-white">Weekly Attendance</h3>
          <select class="select text-xs w-32">
            <option>Last 6 months</option>
            <option>This year</option>
          </select>
        </div>
        <div class="h-48 bg-gray-50 dark:bg-navy-900 rounded-xl flex items-end gap-2 p-4">
          <div v-for="(bar, i) in chartBars" :key="i" class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full bg-primary-500/20 dark:bg-primary-500/10 rounded-t-lg overflow-hidden" style="height: 120px">
              <div class="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg mt-auto transition-all duration-700"
                :style="{ height: bar.pct + '%', marginTop: (100 - bar.pct) + '%' }"></div>
            </div>
            <p class="text-xs text-gray-400">{{ bar.label }}</p>
            <p class="text-xs font-semibold text-navy-800 dark:text-white">{{ bar.val }}</p>
          </div>
        </div>
      </div>

      <!-- Ministry Breakdown -->
      <div class="card p-5">
        <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Ministry Breakdown</h3>
        <div class="space-y-3">
          <div v-for="m in ministryBreakdown" :key="m.name">
            <div class="flex justify-between text-xs mb-1">
              <span class="text-gray-600 dark:text-gray-300">{{ m.name }}</span>
              <span class="font-semibold text-navy-800 dark:text-white">{{ m.members }}</span>
            </div>
            <div class="h-1.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" :class="m.color" :style="{ width: m.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sermons & Upcoming Events -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-navy-800 dark:text-white">Recent Sermons</h3>
          <RouterLink to="/admin/sermons" class="text-xs text-primary-600 dark:text-gold-400 hover:underline">View all →</RouterLink>
        </div>
        <div class="space-y-3">
          <div v-for="sermon in recentSermons" :key="sermon.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🎙️</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white truncate">{{ sermon.title }}</p>
              <p class="text-xs text-gray-400">{{ sermon.speaker }} · {{ sermon.date }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ sermon.views }} views</span>
          </div>
        </div>
      </div>

      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-navy-800 dark:text-white">Upcoming Events</h3>
          <RouterLink to="/admin/events" class="text-xs text-primary-600 dark:text-gold-400 hover:underline">Manage →</RouterLink>
        </div>
        <div class="space-y-3">
          <div v-for="event in upcomingEvents" :key="event.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors">
            <div class="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-xl flex items-center justify-center text-lg flex-shrink-0">📅</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-navy-800 dark:text-white truncate">{{ event.title }}</p>
              <p class="text-xs text-gray-400">{{ event.date }} · {{ event.location }}</p>
            </div>
            <span class="badge-primary text-xs">{{ event.registered }}/{{ event.capacity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { sermons } from '@/data/sermons.js'
import { events } from '@/data/index.js'

const statsCards = [
  { label: 'Total Members', value: '847', icon: '👥', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: 3.2 },
  { label: 'Monthly Visitors', value: '1,240', icon: '👁', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: 8.1 },
  { label: 'Tithes This Month', value: 'KES 284K', icon: '💰', bg: 'bg-gold-100 dark:bg-gold-900/30', trend: 5.4 },
  { label: 'Active Ministries', value: '12', icon: '✨', bg: 'bg-purple-100 dark:bg-purple-900/30', trend: 0 }
]

const chartBars = [
  { label: 'Jun', val: 580, pct: 72 },
  { label: 'Jul', val: 612, pct: 76 },
  { label: 'Aug', val: 598, pct: 75 },
  { label: 'Sep', val: 630, pct: 79 },
  { label: 'Oct', val: 648, pct: 81 },
  { label: 'Nov', val: 655, pct: 82 }
]

const ministryBreakdown = [
  { name: 'Adventist Youth', members: 142, pct: 80, color: 'bg-primary-500' },
  { name: 'Pathfinders', members: 87, pct: 49, color: 'bg-emerald-500' },
  { name: 'Choir / Music', members: 65, pct: 37, color: 'bg-purple-500' },
  { name: 'Dorcas Society', members: 54, pct: 30, color: 'bg-pink-500' },
  { name: 'Men\'s Ministry', members: 78, pct: 44, color: 'bg-gold-500' }
]

const recentSermons = sermons.slice(0, 4)
const upcomingEvents = events.slice(0, 4)
</script>
