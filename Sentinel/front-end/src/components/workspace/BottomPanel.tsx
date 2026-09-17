import { useState } from 'react'
import type { CSSProperties, ElementType, PointerEvent } from 'react'
import { Terminal, AlertCircle, FileText, List } from 'lucide-react'
import { ResizeHandle } from './ResizeHandle'

type BottomTab = 'terminal' | 'output' | 'problems' | 'logs'

interface TabItem {
  id: BottomTab
  label: string
  icon: ElementType
}

interface BottomPanelProps {
  style?: CSSProperties
  onResizePointerDown?: (e: PointerEvent) => void
}

const tabs: TabItem[] = [
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'output', label: 'Output', icon: FileText },
  { id: 'problems', label: 'Problems', icon: AlertCircle },
  { id: 'logs', label: 'Logs', icon: List },
]

/**
 * BottomPanel — painel inferior retrátil do Workspace.
 *
 * Placeholder estrutural para as seguintes abas:
 * - Terminal
 * - Output
 * - Problems
 * - Logs
 *
 * A funcionalidade completa do Terminal será implementada na Etapa 6.
 */
export function BottomPanel({ style, onResizePointerDown }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<BottomTab>('terminal')

  return (
    <section
      className="relative h-48 min-h-[120px] max-h-96 flex flex-col border-t border-border-subtle bg-surface"
      style={style}
      aria-label="Painel Inferior"
    >
      {/* Barra de Abas */}
      <div className="flex items-center gap-1 px-2 border-b border-border-subtle bg-surface h-8">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              type="button"
              aria-label={label}
              title={label}
              aria-pressed={isActive}
              onClick={() => setActiveTab(id)}
              className={[
                'flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-t transition-colors',
                isActive
                  ? 'text-text-primary border-b-2 border-accent bg-surface'
                  : 'text-text-muted hover:text-text-secondary hover:bg-surface-hover',
                'focus:outline-none focus:ring-1 focus:ring-accent',
              ].join(' ')}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Área de Conteúdo Placeholder */}
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-text-muted text-xs">
        <span>
          Área do {tabs.find((t) => t.id === activeTab)?.label ?? 'Terminal'}
          será implementada em etapa futura.
        </span>
      </div>

      {onResizePointerDown && (
        <ResizeHandle
          direction="vertical"
          onPointerDown={onResizePointerDown}
        />
      )}
    </section>
  )
}
