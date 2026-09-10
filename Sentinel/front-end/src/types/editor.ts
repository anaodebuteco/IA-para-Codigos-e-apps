/**
 * Tipos relacionados ao Editor de Código do Sentinel.
 */

export type SupportedLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'markdown'
  | 'bash'
  | 'yaml'
  | 'html'
  | 'css'
  | 'sql'
  | 'plaintext'

export interface OpenFile {
  id: string
  name: string
  path: string
  language: SupportedLanguage
  content: string
  isDirty: boolean
  isActive: boolean
}

export interface EditorSelection {
  lineNumber: number
  column: number
  selectedText?: string
}

export interface DiffChange {
  type: 'add' | 'remove' | 'modify'
  startLine: number
  endLine: number
  content: string
}
