import {
  Folder,
  Search,
  GitBranch,
  Bot,
} from 'lucide-react'
import type { ElementType } from 'react'
import type { SidebarPanel } from './types'

interface ActivityBarProps {
  active: SidebarPanel
  onChange: (panel: SidebarPanel) => void
}

interface ActivityItem {
  id: SidebarPanel
  label: string
  icon: ElementType
}

const items: ActivityItem[] = [
  { id: 'explorer', label: 'Explorer', icon: Folder },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
]

/**
 * Activity Bar — barra lateral estreita vertical.
 *
 * Permite alternar entre:
 * - Explorer
 * - Search
 * - Git
 * - AI Assistant
 *
 * Apenas estado visual. Não implementa funcionalidades dos módulos.
 */
export function ActivityBar({ active, onChange }: ActivityBarProps) {
  return (
    <aside
      className="flex flex-col items-center w-12 bg-surface border-r border-border-subtle"
      role="toolbar"
      aria-label="Activity Bar"
    >
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={[
              'relative flex h-12 w-12 items-center justify-center border-b-2 text-text-muted transition-colors',
              isActive
                ? 'border-accent text-accent'
                : 'border-transparent hover:border-accent hover:text-text-secondary',
              'focus:outline-none focus:ring-2 focus:ring-accent',
            ].join(' ')}
          >
            <Icon className="h-5 w-5" />
          </button>
        )
      })}
    </aside>
  )
}
