export function formatDate(dateStr, options = {}) {
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-KE', { ...defaults, ...options })
}

export function formatTime(timeStr) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? 'PM' : 'AM'}`
}

export function truncate(text, length = 120) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

export function formatCurrency(amount, currency = 'KES') {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency }).format(amount)
}

export function progressPercent(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100))
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function debounce(fn, delay = 300) {
  let timer
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay) }
}
