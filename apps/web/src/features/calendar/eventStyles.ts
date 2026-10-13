import type { EventCategory } from './types'

interface CategoryStyle {
  label: string
  dot: string
  chip: string
  accent: string
}

export const CATEGORY_STYLES: Record<EventCategory, CategoryStyle> = {
  pesca: {
    label: 'Pesca',
    dot: 'bg-tide-400',
    chip: 'bg-tide-500/15 text-tide-700 hover:bg-tide-500/25 dark:text-tide-200',
    accent: '#38bdf8',
  },
  asado: {
    label: 'Asado',
    dot: 'bg-coral-400',
    chip: 'bg-coral-500/15 text-coral-500 hover:bg-coral-500/25 dark:text-coral-400',
    accent: '#fb7185',
  },
  viaje: {
    label: 'Viaje',
    dot: 'bg-violet-400',
    chip: 'bg-violet-500/15 text-violet-600 hover:bg-violet-500/25 dark:text-violet-300',
    accent: '#a78bfa',
  },
  logistica: {
    label: 'Logística',
    dot: 'bg-slate-400',
    chip: 'bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 dark:text-slate-300',
    accent: '#94a3b8',
  },
}
