<template>
  <div class="space-y-6 max-w-2xl">
    <h2 class="font-heading text-2xl font-bold text-navy-800 dark:text-white">Settings</h2>
    <div class="card p-6 space-y-5">
      <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Church Information</h3>
      <div><label class="label">Church Name</label><input class="input" value="Golani Seventh-day Adventist Church" /></div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="label">Phone</label><input class="input" value="+254 700 000 100" /></div>
        <div><label class="label">Email</label><input class="input" value="info@golanisda.org" /></div>
      </div>
      <div><label class="label">Address</label><textarea class="textarea" rows="2">Golani Road, off Uhuru Highway, Nairobi, Kenya</textarea></div>
      <button class="btn-primary">Save Changes</button>
    </div>
    <div class="card p-6 space-y-4">
      <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Notifications</h3>
      <label class="flex items-center justify-between">
        <div><p class="text-sm font-medium text-navy-800 dark:text-white">Email Notifications</p><p class="text-xs text-gray-400">Receive admin alerts by email</p></div>
        <div class="relative"><input type="checkbox" class="sr-only" checked /><div class="w-10 h-5 bg-primary-500 rounded-full"></div><div class="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div></div>
      </label>
      <label class="flex items-center justify-between">
        <div><p class="text-sm font-medium text-navy-800 dark:text-white">New RSVP Alerts</p><p class="text-xs text-gray-400">Alert when someone RSVPs to an event</p></div>
        <div class="relative"><input type="checkbox" class="sr-only" checked /><div class="w-10 h-5 bg-primary-500 rounded-full"></div><div class="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow"></div></div>
      </label>
    </div>
    <div class="card p-6">
      <h3 class="font-semibold text-navy-800 dark:text-white mb-4">Integrations</h3>
      <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
          <span>Google Maps API</span><span class="badge-primary text-xs">Configure in .env</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
          <span>YouTube API</span><span class="badge-primary text-xs">Configure in .env</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-xl">
          <span>M-Pesa / Payment</span><span class="badge bg-gold-100 text-gold-700 text-xs">Pending integration</span>
        </div>
      </div>
    </div>
  </div>
</template>
