import AnimatedContent from './components/reactbits/AnimatedContent'
import Waves from './components/reactbits/Waves'
import { Calendar } from './features/calendar/Calendar'
import { useTheme } from './lib/useTheme'

function App() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="relative min-h-svh overflow-hidden">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Waves
          lineColor={isDark ? '#38bdf8' : '#0369a1'}
          accentColor={isDark ? '#7dd3fc' : '#38bdf8'}
          backgroundColor={isDark ? '#030814' : '#eef4f8'}
          opacity={isDark ? 0.45 : 0.3}
          spacing={12}
          lineWidth={1}
          amplitude={30}
          speed={0.6}
          fade={0.2}
          lightMode={!isDark}
        />
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-6 sm:py-12">
        <AnimatedContent distance={20} duration={0.6} threshold={0}>
          <div className="mx-auto mb-8 max-w-5xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Marea
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Shared Trips &amp; Adventures
            </p>
          </div>
        </AnimatedContent>

        <Calendar theme={theme} onToggleTheme={toggle} />
      </div>
    </div>
  )
}

export default App
