/**
 * Tipos relacionados à IA do Sentinel.
 * Estes tipos definem os contratos de comunicação com a API de IA.
 */

export type AIStatus = 'idle' | 'thinking' | 'streaming' | 'error'

export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string // ISO
  codeBlocks?: AICodeBlock[]
}

export interface AICodeBlock {
  language: string
  code: string
  filePath?: string
  isNew?: boolean
  suggestionType?: 'create' | 'modify' | 'refactor' | 'fix'
}

export interface AIState {
  status: AIStatus
  contextInfo?: AIContextInfo
}

export interface AIContextInfo {
  projectId: string
  contextSize: number
  contextLimit: number
  model: string
  vocabularySize?: number
}

export interface AISuggestion {
  id: string
  type: 'quick-fix' | 'refactor' | 'explain' | 'test' | 'autocomplete'
  title: string
  description?: string
  code?: string
}
