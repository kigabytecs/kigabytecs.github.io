export function formatAge(fromDate: string, untilDate?: string | null) {
  const start = new Date(fromDate)
  const end = untilDate ? new Date(untilDate) : new Date()

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (end.getDate() < start.getDate()) {
    months -= 1
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  if (years <= 0) {
    return `${Math.max(months, 0)} เดือน`
  }

  if (months === 0) {
    return `${years} ปี`
  }

  return `${years} ปี ${months} เดือน`
}

export function formatThaiDate(date: string | Date) {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date)
}
