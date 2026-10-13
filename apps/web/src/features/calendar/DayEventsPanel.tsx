import { CalendarX2, MapPin } from 'lucide-react'
import SpotlightCard from '../../components/reactbits/SpotlightCard'
import { CATEGORY_STYLES } from './eventStyles'
import { formatEventRange, formatFullDay } from './dateUtils'
import type { Theme } from '../../lib/useTheme'
import type { CalendarEvent } from './types'

interface DayEventsPanelProps {
  selectedDay: Date | null
  events: CalendarEvent[]
  selectedEvent: CalendarEvent | null
  theme: Theme
}

export function DayEventsPanel({
  selectedDay,
  events,
  selectedEvent,
  theme,
}: DayEventsPanelProps) {
  return (
    <aside className="flex h-full min-h-[280px] flex-col rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Detalle del día
        </p>
        <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
          {selectedDay ? formatFullDay(selectedDay) : 'Elegí un día'}
        </h3>
      </div>

      {selectedDay && events.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300/70 p-6 text-center dark:border-white/10">
          <CalendarX2 className="size-6 text-slate-400 dark:text-slate-500" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Sin eventos</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            No hay planes cargados para este día.
          </p>
        </div>
      )}

      {!selectedDay && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Tocá una fecha del calendario para ver sus eventos.
        </p>
      )}

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
        {events.map(event => {
          const style = CATEGORY_STYLES[event.category]
          const isActive = selectedEvent?.id === event.id

          return (
            <SpotlightCard
              key={event.id}
              theme={theme}
              spotlightColor={style.accent}
              intensity={0.28}
              borderGlow={0.85}
              shape="circle"
              style={{ padding: '0.875rem', borderRadius: '1rem' }}
              className={isActive ? 'ring-1 ring-tide-400/70' : ''}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  <span className={`size-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
                  {style.label}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {formatEventRange(event.startsAt, event.endsAt)}
                </span>
              </div>

              <h4 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {event.title}
              </h4>

              {event.description && (
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {event.description}
                </p>
              )}

              {event.location && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="size-3.5" />
                  {event.location}
                </p>
              )}
            </SpotlightCard>
          )
        })}
      </div>
    </aside>
  )
}
