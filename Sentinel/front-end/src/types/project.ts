/**
 * Tipos relacionados a Projetos do Sentinel.
 * Estes tipos definem a estrutura de dados que virará do backend real.
 * Enquanto não houver backend, serão alimentados por mocks isolados.
 */

export interface Project {
  id: string
  name: string
  path: string
  description?: string
  lastOpened: string // ISO timestamp
  isActive: boolean
}

export interface RecentActivity {
  id: string
  type: 'edit' | 'chat' | 'git' | 'terminal' | 'ai'
  summary: string
  timestamp: string // ISO timestamp
  filePath?: string
}
