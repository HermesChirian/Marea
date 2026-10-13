export type EventCategory = 'pesca' | 'asado' | 'viaje' | 'logistica'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  location?: string
  category: EventCategory
  startsAt: Date
  endsAt: Date
}
