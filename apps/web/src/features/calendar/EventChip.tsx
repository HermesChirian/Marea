import { CATEGORY_STYLES } from './eventStyles'
import { formatTime } from './dateUtils'
import type { CalendarEvent } from './types'

interface EventChipProps {
  event: CalendarEvent
  onSelect?: (event: CalendarEvent) => void
}

export function EventChip({ event, onSelect }: EventChipProps) {
  const style = CATEGORY_STYLES[event.category]

  return (
    <button
      type="button"
      onClick={clickEvent => {
        clickEvent.stopPropagation()
        onSelect?.(event)
      }}
      title={`${formatTime(event.startsAt)} · ${event.title}`}
      className={`flex w-full items-center gap-1.5 truncate rounded-md px-1.5 py-0.5 text-left text-[11px] font-medium leading-tight transition-colors ${style.chip}`}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${style.dot}`} aria-hidden="true" />
      <span className="truncate">{event.title}</span>
    </button>
  )
}
