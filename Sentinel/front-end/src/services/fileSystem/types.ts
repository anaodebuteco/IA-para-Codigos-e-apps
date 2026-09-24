/**
 * Tipos do sistema de arquivos simulado (Fase 1).
 *
 * Define a estrutura de dados e operações para gerenciar uma árvore de arquivos
 * em memória, sem acesso ao filesystem real.
 */

export type NodeType = 'file' | 'folder'

export interface FileSystemNode {
  /** Identificador único do nó (gerado internamente) */
  id: string
  /** Nome do arquivo ou pasta (sem caminho) */
  name: string
  /** 'file' | 'folder' */
  type: NodeType
  /** ID do nó pai (null para a raiz) */
  parentId: string | null
  /** IDs dos filhos diretos (folders podem ter; files não) */
  childrenIds: string[]
  /** Conteúdo do arquivo (apenas para files; undefined para folders) */
  content?: string
}

/** Dados necessários para criar um novo nó */
export interface CreateNodeData {
  name: string
  type: NodeType
  content?: string
}

/** Resultado de uma operação de criação */
export interface CreateResult {
  success: boolean
  nodeId?: string
  error?: string
}

/** Resultado de uma operação de renomeação */
export interface RenameResult {
  success: boolean
  error?: string
}

/** Resultado de uma operação de exclusão */
export interface DeleteResult {
  success: boolean
  error?: string
}

/** Opções de validação de nome de arquivo/pasta */
export interface ValidationOptions {
  /** Nome a ser validado */
  name: string
  /** Nome do item atual (para ignorar em checagens de duplicata durante rename) */
  currentName?: string
}

export interface ValidationResult {
  valid: boolean
  error?: string
}

export interface FileMetadata {
  /** Tamanho em bytes do conteúdo */
  size: number
  /** ID do nó pai */
  parent: string | null
  /** Tipo MIME simulado */
  mimeType: string
}

export const INVALID_NAME_CHARS: readonly string[] = ['<', '>', ':', '"', '/', '\\', '|', '?', '*']
export const EMPTY_NAME_ERROR = 'O nome não pode estar vazio'
export const INVALID_CHARS_ERROR = `O nome contém caracteres inválidos: ${INVALID_NAME_CHARS.join(' ')}`
export const NAME_TOO_LONG_ERROR = 'O nome ultrapassa 255 caracteres'
export const DUPLICATE_NAME_ERROR = 'Já existe um item com este nome'

/**
 * Valida um nome de arquivo ou pasta.
 * @param options.nome - O nome a validar
 * @param options.currentName - Nome atual (ignorado em checagens de duplicata durante rename)
 * @param existingNames - Nomes dos irmãos que já existem
 */
export function validateNodeName(
  options: ValidationOptions,
  existingNames: readonly string[],
): ValidationResult {
  const { name, currentName } = options
  const trimmed = name.trim()

  if (!trimmed) {
    return { valid: false, error: EMPTY_NAME_ERROR }
  }

  if (trimmed.length > 255) {
    return { valid: false, error: NAME_TOO_LONG_ERROR }
  }

  if (INVALID_NAME_CHARS.some((char) => trimmed.includes(char))) {
    return { valid: false, error: INVALID_CHARS_ERROR }
  }

  // Não é um caractere reservado do Windows
  const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'LPT1', 'LPT2', 'LPT3', 'LPT4']
  if (reservedNames.includes(trimmed.toUpperCase())) {
    return { valid: false, error: `'${trimmed}' é um nome reservado do sistema` }
  }

  if (currentName && trimmed === currentName) {
    return { valid: false, error: 'O nome não foi alterado' }
  }

  if (existingNames.includes(trimmed)) {
    return { valid: false, error: DUPLICATE_NAME_ERROR }
  }

  return { valid: true }
}
