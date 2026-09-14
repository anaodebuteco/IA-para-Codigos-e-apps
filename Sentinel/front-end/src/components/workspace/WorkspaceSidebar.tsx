import type { ReactNode } from 'react'
import type { SidebarPanel } from './types'

interface WorkspaceSidebarProps {
  activePanel: SidebarPanel
}

const SIDEBAR_CLASSES = [
  'hidden',
  'w-64',
  'min-w-[220px]',
  'max-w-xs',
  'flex-col',
  'border-r',
  'border-border-subtle',
  'bg-surface',
  'md:flex',
].join(' ')

/**
 * WorkspaceSidebar — painel lateral esquerdo.
 *
 * Exibe placeholders visuais estruturais para os seguintes módulos:
 * - Explorer
 * - Search
 * - Git
 * - AI Assistant
 *
 * Nenhuma funcionalidade real implementada nesta etapa.
 */
export function WorkspaceSidebar({ activePanel }: WorkspaceSidebarProps) {
  return (
    <aside className={SIDEBAR_CLASSES}>
      <div className="flex items-center justify-between p-3 border-b border-border-subtle">
        <h2 className="text-xs font-semibold text-text-muted uppercase">
          {sidebarTitle[activePanel]}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sidebarContent[activePanel]}
      </div>
    </aside>
  )
}

const sidebarTitle: Record<SidebarPanel, string> = {
  explorer: 'Explorer',
  search: 'Search',
  git: 'Source Control',
  ai: 'AI Assistant',
}

const sidebarContent: Record<SidebarPanel, ReactNode> = {
  explorer: <p className="text-sm text-text-secondary">Explorer será implementado em etapa futura.</p>,
  search: <p className="text-sm text-text-secondary">Busca será implementada em etapa futura.</p>,
  git: <p className="text-sm text-text-secondary">Integração Git será implementada em etapa futura.</p>,
  ai: <p className="text-sm text-text-secondary">Assistente de IA será implementado em etapa futura.</p>,
}
