export const getWeekNumber = (date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

export const getStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

export const getEndOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0)
