import { useMemo, useState } from 'react'
import { CalendarHeader } from './CalendarHeader'
import { CalendarGrid } from './CalendarGrid'
import { DayEventsPanel } from './DayEventsPanel'
import {
  addMonths,
  dayKey,
  formatMonthShort,
  formatMonthYear,
  startOfDay,
  startOfMonth,
} from './dateUtils'
import { getSampleEvents } from './mockEvents'
import type { Theme } from '../../lib/useTheme'
import type { CalendarEvent } from './types'

interface CalendarProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Calendar({ theme, onToggleTheme }: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [selectedDay, setSelectedDay] = useState<Date | null>(today)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const events = useMemo(() => getSampleEvents(new Date()), [])

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of events) {
      const key = dayKey(event.startsAt)
      const list = map.get(key)
      if (list) list.push(event)
      else map.set(key, [event])
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
    }
    return map
  }, [events])

  const selectedEvents = selectedDay ? (eventsByDay.get(dayKey(selectedDay)) ?? []) : []

  const handleSelectEvent = (event: CalendarEvent) => {
    setMonth(startOfMonth(event.startsAt))
    setSelectedDay(startOfDay(event.startsAt))
    setSelectedEvent(event)
  }

  const handleToday = () => {
    const now = startOfDay(new Date())
    setMonth(startOfMonth(now))
    setSelectedDay(now)
    setSelectedEvent(null)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <CalendarHeader
        monthLabel={formatMonthYear(month)}
        monthShortLabel={formatMonthShort(month)}
        theme={theme}
        onPrev={() => setMonth(current => addMonths(current, -1))}
        onNext={() => setMonth(current => addMonths(current, 1))}
        onToday={handleToday}
        onToggleTheme={onToggleTheme}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="rounded-2xl border border-slate-200/80 bg-white/60 p-3 backdrop-blur-md sm:p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <CalendarGrid
            month={month}
            today={today}
            eventsByDay={eventsByDay}
            selectedDay={selectedDay}
            onSelectDay={day => {
              setSelectedDay(day)
              setSelectedEvent(null)
            }}
            onSelectEvent={handleSelectEvent}
          />
        </section>

        <DayEventsPanel
          selectedDay={selectedDay}
          events={selectedEvents}
          selectedEvent={selectedEvent}
          theme={theme}
        />
      </div>
    </div>
  )
}
