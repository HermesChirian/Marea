import AnimatedContent from '../../components/reactbits/AnimatedContent'
import { CalendarDay } from './CalendarDay'
import { WEEKDAY_LABELS, dayKey, getMonthGrid, isSameDay, isSameMonth } from './dateUtils'
import type { CalendarEvent } from './types'

interface CalendarGridProps {
  month: Date
  today: Date
  eventsByDay: Map<string, CalendarEvent[]>
  selectedDay: Date | null
  onSelectDay: (date: Date) => void
  onSelectEvent: (event: CalendarEvent) => void
}

export function CalendarGrid({
  month,
  today,
  eventsByDay,
  selectedDay,
  onSelectDay,
  onSelectEvent,
}: CalendarGridProps) {
  const days = getMonthGrid(month)
  const weeks = Array.from({ length: 6 }, (_, index) => days.slice(index * 7, index * 7 + 7))

  return (
    <div role="grid" aria-label="Calendario mensual">
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map(label => (
          <div
            key={label}
            className="text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        {weeks.map((week, index) => (
          <AnimatedContent
            key={dayKey(week[0])}
            distance={20}
            duration={0.5}
            delay={index * 0.05}
            threshold={0}
          >
            <div className="grid grid-cols-7 gap-1">
              {week.map(day => (
                <CalendarDay
                  key={dayKey(day)}
                  date={day}
                  isCurrentMonth={isSameMonth(day, month)}
                  isToday={isSameDay(day, today)}
                  isSelected={selectedDay ? isSameDay(day, selectedDay) : false}
                  events={eventsByDay.get(dayKey(day)) ?? []}
                  onSelectDay={onSelectDay}
                  onSelectEvent={onSelectEvent}
                />
              ))}
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  )
}
