import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../lib/useTheme'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className="grid size-9 place-items-center rounded-full border border-slate-300/70 bg-white/70 text-slate-600 backdrop-blur transition-colors hover:text-tide-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-tide-300"
    >
      {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
    </button>
  )
}
