import { ChevronDown, Terminal, Save } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/common/Logo'

interface WorkspaceHeaderProps {
  projectId: string
  bottomPanelOpen: boolean
  onToggleBottomPanel: () => void
}

/**
 * WorkspaceHeader — barra superior do Workspace.
 *
 * Mostra:
 * - Logo do Sentinel
 * - Breadcrumb Dashboard > Projeto
 * - Botão de salvar (visual)
 * - Botão para alternar o painel inferior
 *
 * Nenhuma integração real com backend ou sistema de arquivos.
 */
export function WorkspaceHeader({
  projectId,
  bottomPanelOpen,
  onToggleBottomPanel,
}: WorkspaceHeaderProps) {
  const projectName = `Projeto ${projectId}`

  return (
    <header
      className="flex items-center justify-between h-10 px-3 bg-surface border-b border-border-subtle"
      aria-label="Cabeçalho do Workspace"
    >
      <div className="flex items-center gap-4 min-w-0">
        <Logo />

        <nav
          className="flex items-center gap-1 text-sm min-w-0"
          aria-label="Navegação do Workspace"
        >
          <Link
            to="/dashboard"
            className="text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
          >
            Dashboard
          </Link>

          <ChevronDown
            className="h-3 w-3 text-text-muted -rotate-90"
            aria-hidden="true"
          />

          <span
            className="text-text-primary truncate max-w-[200px] sm:max-w-xs"
            title={projectName}
          >
            {projectName}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Salvar"
          title="Salvar (Ctrl+S)"
          className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label={
            bottomPanelOpen
              ? 'Ocultar painel inferior'
              : 'Mostrar painel inferior'
          }
          title={
            bottomPanelOpen
              ? 'Ocultar painel inferior'
              : 'Mostrar painel inferior'
          }
          aria-pressed={bottomPanelOpen}
          onClick={onToggleBottomPanel}
          className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
        >
          <Terminal className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}