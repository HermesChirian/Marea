import type { CalendarEvent, EventCategory } from './types'
import { addMonths, startOfMonth } from './dateUtils'

interface EventSeed {
  id: string
  title: string
  description?: string
  location?: string
  category: EventCategory
  monthOffset: number
  day: number
  startHour: number
  durationHours: number
}

const SEEDS: EventSeed[] = [
  {
    id: 'prev-reunion',
    title: 'Reunión de organización',
    description: 'Definimos fecha, destino y quién lleva qué.',
    location: 'Casa de Julián',
    category: 'logistica',
    monthOffset: -1,
    day: 20,
    startHour: 20,
    durationHours: 2,
  },
  {
    id: 'provisiones',
    title: 'Compra de provisiones',
    description: 'Compramos carnada, hielo y bebidas.',
    location: 'Supermercado del centro',
    category: 'logistica',
    monthOffset: 0,
    day: 3,
    startHour: 18,
    durationHours: 1,
  },
  {
    id: 'salida-lancha',
    title: 'Salida de pesca en lancha',
    description: 'Encuentro en el muelle 6:30. Llevar cañas y chaleco.',
    location: 'Muelle del puerto',
    category: 'pesca',
    monthOffset: 0,
    day: 8,
    startHour: 6,
    durationHours: 9,
  },
  {
    id: 'asado-quincho',
    title: 'Asado en el quincho',
    description: 'Después de la pesca, tarde de parrilla y fernet.',
    location: 'Quincho de la costanera',
    category: 'asado',
    monthOffset: 0,
    day: 12,
    startHour: 13,
    durationHours: 5,
  },
  {
    id: 'equipamiento',
    title: 'Revisión de equipamiento',
    description: 'Chequeamos líneas, reel y botiquín.',
    location: 'Garage de Sofi',
    category: 'logistica',
    monthOffset: 0,
    day: 18,
    startHour: 19,
    durationHours: 2,
  },
  {
    id: 'pesca-nocturna',
    title: 'Pesca nocturna',
    description: 'Con faros y reposeras. La marea pinta buena.',
    location: 'Punta del este',
    category: 'pesca',
    monthOffset: 0,
    day: 24,
    startHour: 21,
    durationHours: 4,
  },
  {
    id: 'regreso',
    title: 'Regreso y limpieza',
    description: 'Limpiamos el equipamiento y repartimos gastos.',
    location: 'Domicilio de cada uno',
    category: 'logistica',
    monthOffset: 0,
    day: 28,
    startHour: 17,
    durationHours: 2,
  },
  {
    id: 'viaje-largo',
    title: 'Viaje de fin de mes',
    location: 'Cabañas del lago',
    category: 'viaje',
    monthOffset: 1,
    day: 6,
    startHour: 8,
    durationHours: 30,
  },
  {
    id: 'pesca-rio',
    title: 'Pesca de río',
    location: 'Río Paraná',
    category: 'pesca',
    monthOffset: 1,
    day: 15,
    startHour: 7,
    durationHours: 6,
  },
]

function clampDay(month: Date, day: number): number {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  return Math.min(day, daysInMonth)
}

export function getSampleEvents(today: Date = new Date()): CalendarEvent[] {
  const currentMonth = startOfMonth(today)

  return SEEDS.map(seed => {
    const month = addMonths(currentMonth, seed.monthOffset)
    const startsAt = new Date(
      month.getFullYear(),
      month.getMonth(),
      clampDay(month, seed.day),
      seed.startHour,
      0,
      0,
      0,
    )
    const endsAt = new Date(startsAt.getTime() + seed.durationHours * 3_600_000)

    return {
      id: seed.id,
      title: seed.title,
      description: seed.description,
      location: seed.location,
      category: seed.category,
      startsAt,
      endsAt,
    }
  })
}
