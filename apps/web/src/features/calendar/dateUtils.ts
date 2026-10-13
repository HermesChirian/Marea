export const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] as const

const LONG_MONTH = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })
const SHORT_MONTH = new Intl.DateTimeFormat('es-AR', { month: 'short' })
const SHORT_DAY = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })
const TIME = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' })
const FULL_DAY = new Intl.DateTimeFormat('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/**
 * 42 days (6 weeks) that cover the month, starting on Monday.
 */
export function getMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month)
  const jsWeekday = first.getDay()
  const offset = (jsWeekday + 6) % 7
  const gridStart = addDays(first, -offset)

  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
}

export function formatMonthYear(date: Date): string {
  const label = LONG_MONTH.format(date)
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function formatMonthShort(date: Date): string {
  const label = SHORT_MONTH.format(date).replace('.', '')
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function formatDayShort(date: Date): string {
  return SHORT_DAY.format(date)
}

export function formatTime(date: Date): string {
  return TIME.format(date)
}

export function formatFullDay(date: Date): string {
  const label = FULL_DAY.format(date)
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function formatEventRange(startsAt: Date, endsAt: Date): string {
  if (isSameDay(startsAt, endsAt)) {
    return `${formatTime(startsAt)} – ${formatTime(endsAt)}`
  }
  return `${formatDayShort(startsAt)} ${formatTime(startsAt)} – ${formatDayShort(endsAt)} ${formatTime(endsAt)}`
}
