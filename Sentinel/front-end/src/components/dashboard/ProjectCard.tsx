import { CalendarDays, FolderGit2, MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

/**
 * Card visualizando um projeto recente.
 * Fonte: mocks/mock.project.ts (substituir pela API real quando existir).
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-lg bg-surface border border-border-subtle p-4 transition-all duration-200 hover:border-accent hover:shadow-md hover:shadow-accent-glow">
      <div className="flex items-start justify-between">
        <Link
          to={`/workspace/${project.id}`}
          className="flex flex-col gap-3 flex-1 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-accent" />
            <h3 className="font-medium text-text-primary">{project.name}</h3>
          </div>

          {project.description && (
            <p className="text-sm text-text-secondary line-clamp-2">
              {project.description}
            </p>
          )}
        </Link>

        {/* Botão de ações separado da área clicável do Link */}
        <button
          aria-label={`Ações do projeto ${project.name}`}
          className="ml-2 rounded p-1 text-text-muted hover:bg-surface-hover hover:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          // PENDÊNCIA: implementar menu contextual na Etapa futura
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-auto flex items-center gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          <span>{formatDate(project.lastOpened)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={`h-2 w-2 rounded-full ${project.isActive ? 'bg-success' : 'bg-text-muted'}`}
          />
          <span>{project.isActive ? 'Ativo' : 'Inativo'}</span>
        </div>
      </div>
    </div>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
