import { Plus, FolderPlus, Code, FileText } from 'lucide-react'
import { Button } from '@/components/common/Button'

/**
 * Ações rápidas do Dashboard.
 * PENDÊNCIA: Conectar aos endpoints reais quando o backend os expor.
 * Atualmente, todos os handlers são placeholders.
 */
export function QuickActions() {
  return (
    <div className="rounded-lg bg-surface border border-border-subtle p-4 flex flex-col gap-3">
      <h3 className="text-sm font-medium text-text-primary">Ações rápidas</h3>

      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          size="sm"
          className="justify-start"
          onClick={() => {
            // PENDÊNCIA: endpoint para criar novo projeto
          }}
        >
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="justify-start"
          onClick={() => {
            // PENDÊNCIA: endpoint para abrir projeto existente
          }}
        >
          <FolderPlus className="h-4 w-4" />
          Abrir Projeto
        </Button>

        <Button
          variant="tertiary"
          size="sm"
          className="justify-start"
          onClick={() => {
            // PENDÊNCIA: navegar para workspace em branco
          }}
        >
          <Code className="h-4 w-4" />
          Workspace em Branco
        </Button>

        <Button
          variant="tertiary"
          size="sm"
          className="justify-start"
          onClick={() => {
            // PENDÊNCIA: abrir documentação interna
          }}
        >
          <FileText className="h-4 w-4" />
          Documentação
        </Button>
      </div>
    </div>
  )
}
