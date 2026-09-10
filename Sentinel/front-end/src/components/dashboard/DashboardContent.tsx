import { ProjectCard } from './ProjectCard'
import { EngineStatusCard } from './EngineStatusCard'
import { ActivityFeed } from './ActivityFeed'
import { QuickActions } from './QuickActions'
import { mockProjects, mockRecentActivity, mockEngineStatus } from '@/services/mocks/mock.project'

/**
 * Conteúdo principal do Dashboard.
 *
 * Fonte de dados: mocks/em/mock.project.ts
 * PENDÊNCIA: Subsituir por chamadas ao serviço de projetos quando o backend
 * expor endpoints HTTP.
 */
export function DashboardContent() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header da página */}
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Dashboard do Sentinel
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Bem-vindo de volta. Seu workspace de desenvolvimento com IA está pronto.
          </p>
        </div>

        {/* Status do motor e ações rápidas */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <EngineStatusCard status={mockEngineStatus} />
          <QuickActions />
        </div>

        {/* Projetos recentes */}
        <div>
          <h2 className="mb-3 text-lg font-medium text-text-primary">
            Projetos recentes
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Atividade recente */}
        <div>
          <h2 className="mb-3 text-lg font-medium text-text-primary">
            Atividade recente
          </h2>
          <ActivityFeed activities={mockRecentActivity} />
        </div>
      </div>
    </main>
  )
}
