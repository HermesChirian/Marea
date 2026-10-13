import { EventChip } from './EventChip'
import type { CalendarEvent } from './types'

interface CalendarDayProps {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
  onSelectDay: (date: Date) => void
  onSelectEvent: (event: CalendarEvent) => void
}

const MAX_VISIBLE = 3

export function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  events,
  onSelectDay,
  onSelectEvent,
}: CalendarDayProps) {
  const visibleEvents = events.slice(0, MAX_VISIBLE)
  const hiddenCount = events.length - visibleEvents.length

  const surface = isSelected
    ? 'border-tide-500 bg-tide-500/10 dark:border-tide-400 dark:bg-tide-400/10'
    : isCurrentMonth
      ? 'border-slate-200/80 bg-white/70 hover:border-tide-400/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-tide-400/40'
      : 'border-transparent bg-transparent hover:bg-slate-900/5 dark:hover:bg-white/[0.03]'

  return (
    <div
      role="gridcell"
      aria-label={date.toDateString()}
      onClick={() => onSelectDay(date)}
      className={`flex min-h-[88px] cursor-pointer flex-col rounded-lg border p-1.5 transition-colors sm:min-h-[104px] ${surface} ${
        isCurrentMonth ? '' : 'opacity-55'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`grid size-6 place-items-center rounded-full text-xs font-semibold ${
            isToday
              ? 'bg-tide-500 text-white shadow-sm shadow-tide-500/40'
              : isCurrentMonth
                ? 'text-slate-700 dark:text-slate-200'
                : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {date.getDate()}
        </span>
        {events.length > 0 && (
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
            {events.length}
          </span>
        )}
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        {visibleEvents.map(event => (
          <EventChip key={event.id} event={event} onSelect={onSelectEvent} />
        ))}
        {hiddenCount > 0 && (
          <span className="px-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            +{hiddenCount} más
          </span>
        )}
      </div>
    </div>
  )
}
