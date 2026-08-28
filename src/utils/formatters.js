export function formatDate(dateStr, options = {}) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric', ...options
  })
}

export function formatShortDate(dateStr) {
  return formatDate(dateStr, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatCurrency(amount, currency = 'TZS') {
  return new Intl.NumberFormat('en-TZ', { style: 'currency', currency }).format(amount)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-TZ').format(num)
}

export function progressPercent(raised, goal) {
  return Math.min(100, Math.round((raised / goal) * 100))
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

export function truncate(text, length = 120) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '…' : text
}
