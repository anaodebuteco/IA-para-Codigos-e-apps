import { Logo } from '@/components/common/Logo'

export function DashboardHeader() {
  return (
    <header className="dashboard-header flex items-center justify-between h-14 px-6 bg-surface border-b border-border-subtle">
      <Logo />
      <nav className="flex items-center gap-4">
        <a
          href="/dashboard"
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Workspace
        </a>
      </nav>
    </header>
  )
}
