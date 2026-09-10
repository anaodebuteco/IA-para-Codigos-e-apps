import { Suspense } from 'react'
import { DashboardHeader } from './DashboardHeader'
import { DashboardContent } from './DashboardContent'
import './DashboardPage.css'

/**
 * Página principal do Dashboard do Sentinel.
 *
 * Exibe:
 * - Projetos recentes e ativos
 * - Atalhos rápidos
 * - Status do Sentinel (modelo, vocabulário, contexto)
 * - Atividade recente
 *
 * Esta página consome dados via camada de serviço/mock.
 * A integração com o backend real ainda não existe.
 */
export function DashboardPage() {
  return (
    <div className="dashboard-page flex flex-col h-screen bg-bg-primary text-text-primary">
      <DashboardHeader />
      <Suspense fallback={<div className="p-6 text-text-secondary">Carregando…</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
