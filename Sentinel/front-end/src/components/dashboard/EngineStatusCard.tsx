import { Cpu } from 'lucide-react'

/**
 * Tipo que representa o status do motor Sentinel.
 * Definido localmente para evitar dependência em typeof de mock.
 */
export interface EngineStatus {
  modelVersion: string
  status: 'ready' | 'training' | 'error'
  vocabularySize: number
  contextWindow: number
  parameters: number
}

interface EngineStatusCardProps {
  status: EngineStatus
}

/**
 * Card de status do motor Sentinel.
 * Representa o estado do backend Python (modelo carregado, vocabulário, contexto).
 * Fonte: mocks/mock.project.ts
 */
export function EngineStatusCard({ status }: EngineStatusCardProps) {
  const statusLabel = {
    ready: { text: 'Pronto', color: 'text-success' },
    training: { text: 'Treinando', color: 'text-warning' },
    error: { text: 'Erro', color: 'text-error' },
  }

  const currentStatus = statusLabel[status.status]

  return (
    <div className="rounded-lg bg-surface border border-border-subtle p-4 flex-1">
      <div className="mb-3 flex items-center gap-2">
        <Cpu className="h-5 w-5 text-accent" />
        <h3 className="font-medium text-text-primary">Status do Sentinel</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Versão do Modelo</span>
          <span className="text-text-primary font-medium">{status.modelVersion}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Status</span>
          <span className={`font-medium ${currentStatus.color}`}>
            {currentStatus.text}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Contexto</span>
          <span className="text-text-primary">{status.contextWindow} tokens</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Vocabulário</span>
          <span className="text-text-primary">{status.vocabularySize} tokens</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Parâmetros</span>
          <span className="text-text-primary">{formatNumber(status.parameters)}</span>
        </div>
      </div>
    </div>
  )
}

function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR')
}
