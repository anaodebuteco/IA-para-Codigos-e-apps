import { GitBranch, Power } from 'lucide-react'

interface StatusBarProps {
  projectId: string
}

/**
 * StatusBar — barra inferior fixa da IDE.
 *
 * Exibe informações visuais/placeholder sobre:
 * - Linguagem
 * - Encoding
 * - Indentação
 * - Branch do Git (mockado)
 * - Projeto atual
 * - Status do Sentinel
 *
 * Nenhuma integração real com Git ou backend.
 */
export function StatusBar({ projectId }: StatusBarProps) {
  return (
    <footer
      className="flex items-center justify-between h-6 px-3 text-xs text-text-muted bg-surface border-t border-border-subtle"
      aria-label="Barra de status"
    >
      <div className="flex items-center gap-4">
        <span
          className="flex items-center gap-1.5"
          title="Linguagem do arquivo ativo"
        >
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          TypeScript
        </span>

        <span
          className="flex items-center gap-1 text-text-secondary"
          title="Codificação de caracteres"
        >
          UTF-8
        </span>

        <span
          className="flex items-center gap-1 text-text-secondary"
          title="Indentação"
        >
          Space: 2
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="flex items-center gap-1 text-text-secondary"
          title="Branch Git atual (mockado)"
        >
          <GitBranch className="h-3 w-3" aria-hidden="true" />
          main
        </span>

        <span
          className="text-text-secondary"
          title={`Projeto: ${projectId}`}
        >
          Projeto: {projectId}
        </span>

        <span
          className="flex items-center gap-1 text-success"
          title="Status do Sentinel"
        >
          <Power className="h-3 w-3" aria-hidden="true" />
          Online
        </span>
      </div>
    </footer>
  )
}