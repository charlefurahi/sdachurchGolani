export const formatDate = (dateStr, options = {}) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric', ...options
  })
}

export const formatCurrency = (amount, currency = 'KES') => {
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency }).format(amount)
}

export const truncate = (text, length = 120) => {
  if (!text || text.length <= length) return text
  return text.slice(0, length).trim() + '…'
}

export const progressPercent = (raised, goal) => {
  return Math.min(Math.round((raised / goal) * 100), 100)
}

export const slugify = (text) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return formatDate(dateStr)
}
