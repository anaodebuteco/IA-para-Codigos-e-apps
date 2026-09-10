import { Clock, Code, MessageSquare, Terminal, GitBranch, Bot } from 'lucide-react'
import type { RecentActivity } from '@/types'

interface ActivityFeedProps {
  activities: RecentActivity[]
}

/**
 * Feed de atividade recente do Dashboard.
 * Fonte: mocks/mock.project.ts
 */
export function ActivityFeed({ activities }: ActivityFeedProps) {
  const iconMap = {
    edit: Code,
    chat: MessageSquare,
    git: GitBranch,
    terminal: Terminal,
    ai: Bot,
  }

  return (
    <div className="space-y-2">
      {activities.map((activity) => {
        const Icon = iconMap[activity.type]
        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 rounded-lg bg-surface border border-border-subtle px-3 py-2.5 transition-colors duration-200 hover:bg-surface-hover"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface-active">
              <Icon className="h-3.5 w-3.5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">{activity.summary}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-text-muted">
                <Clock className="h-3 w-3" />
                <span>{formatTime(activity.timestamp)}</span>
                {activity.filePath && (
                  <>
                    <span className="text-border-subtle">•</span>
                    <span className="truncate">{activity.filePath}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  )

  if (diffHours < 24) {
    if (diffHours < 2) return 'há pouco'
    return `${diffHours}h atrás`
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}
