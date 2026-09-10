/**
 * Tipos relacionados ao Terminal/Output do Sentinel.
 */

export type TerminalTabType = 'terminal' | 'output' | 'problems' | 'logs'

export interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'error' | 'info' | 'warning'
  content: string
  timestamp: string
}

export interface ProblemItem {
  id: string
  severity: 'error' | 'warning' | 'info'
  file: string
  line: number
  column: number
  message: string
  source: 'eslint' | 'tsc' | 'pylint' | 'backend' | 'unknown'
}
