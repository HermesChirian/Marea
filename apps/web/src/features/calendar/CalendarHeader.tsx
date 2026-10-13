import { ChevronLeft, ChevronRight } from 'lucide-react'
import SplitText from '../../components/reactbits/SplitText'
import { ThemeToggle } from '../../components/ThemeToggle'
import type { Theme } from '../../lib/useTheme'

interface CalendarHeaderProps {
  monthLabel: string
  monthShortLabel: string
  theme: Theme
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onToggleTheme: () => void
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-slate-300/70 bg-white/70 text-slate-600 backdrop-blur transition-colors hover:text-tide-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-tide-300"
    >
      {children}
    </button>
  )
}

export function CalendarHeader({
  monthLabel,
  monthShortLabel,
  theme,
  onPrev,
  onNext,
  onToday,
  onToggleTheme,
}: CalendarHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-tide-600 dark:text-tide-300">
          Agenda
        </p>
        <SplitText
          key={monthLabel}
          text={monthLabel}
          tag="h2"
          textAlign="left"
          className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl"
        />
      </div>

      <div className="flex items-center gap-2">
        <NavButton label="Mes anterior" onClick={onPrev}>
          <ChevronLeft className="size-4.5" />
        </NavButton>
        <button
          type="button"
          onClick={onToday}
          aria-label={`Ir a hoy. Mes en vista: ${monthLabel}`}
          title="Ir a hoy"
          className="h-9 min-w-16 rounded-full border border-slate-300/70 bg-white/70 px-4 text-xs font-semibold text-slate-700 backdrop-blur transition-colors hover:text-tide-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-tide-300"
        >
          {monthShortLabel}
        </button>
        <NavButton label="Mes siguiente" onClick={onNext}>
          <ChevronRight className="size-4.5" />
        </NavButton>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
