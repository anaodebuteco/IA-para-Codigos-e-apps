import { Link } from 'react-router-dom'
import { Logo } from '@/components/common/Logo'

export function DashboardHeader() {
  return (
    <header className="dashboard-header flex items-center justify-between h-14 px-6 bg-surface border-b border-border-subtle">
      <Logo />
      <nav className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-text-primary transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/workspace/default"
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Workspace
        </Link>
        <Link
          to="/settings"
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Configurações
        </Link>
      </nav>
    </header>
  )
}
