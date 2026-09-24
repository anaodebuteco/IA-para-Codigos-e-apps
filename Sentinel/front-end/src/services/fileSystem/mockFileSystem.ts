/**
 * Mock File System — Implementação simulada (Fase 1).
 *
 * Gerencia uma árvore de arquivos em memória, com operações CRUD completas.
 * NÃO acessa o filesystem real em nenhum momento.
 *
 * Estado é mantido interno como Map, permitindo substituição futura por
 * uma implementação real sem alterar a interface externa.
 */

import type {
  CreateNodeData,
  CreateResult,
  DeleteResult,
  FileSystemNode,
  RenameResult,
} from './types'
import { validateNodeName } from './types'

/** Gera um ID único simples (não criptográfico) */
let idCounter = 0
function generateId(): string {
  return `node-${idCounter++}`
}

export class MockFileSystem {
  private nodes: Map<string, FileSystemNode> = new Map()
  private rootId: string | null = null

  constructor(allNodes?: Record<string, FileSystemNode> | FileSystemNode[]) {
    if (Array.isArray(allNodes)) {
      for (const node of allNodes) {
        this.nodes.set(node.id, { ...node, childrenIds: [...node.childrenIds] })
        if (node.parentId === null) {
          this.rootId = node.id
        }
      }
    } else if (allNodes) {
      for (const [id, node] of Object.entries(allNodes)) {
        this.nodes.set(id, { ...node, childrenIds: [...node.childrenIds] })
        if (node.parentId === null) {
          this.rootId = node.id
        }
      }
    }
  }

  private getNode(id: string): FileSystemNode | undefined {
    return this.nodes.get(id)
  }

  private removeNodeFromParent(node: FileSystemNode): void {
    if (node.parentId === null) return
    const parent = this.nodes.get(node.parentId)
    if (parent) {
      parent.childrenIds = parent.childrenIds.filter((cid) => cid !== node.id)
    }
  }

  /** Obtém a raiz do filesystem */
  getRoot(): FileSystemNode | null {
    if (!this.rootId) return null
    return this.nodes.get(this.rootId) ?? null
  }

  /** Busca um nó pelo ID */
  findById(id: string): FileSystemNode | null {
    return this.nodes.get(id) ?? null
  }

  /** Retorna todos os nós */
  getAllNodes(): FileSystemNode[] {
    return Array.from(this.nodes.values())
  }

  /**
   * Retorna os filhos de um nó, já ordenados (pastas primeiro, por nome).
   */
  getChildren(nodeId: string): FileSystemNode[] {
    const node = this.nodes.get(nodeId)
    if (!node || node.type !== 'folder') return []

    const children: FileSystemNode[] = []
    for (let i = 0; i < node.childrenIds.length; i++) {
      const childId = node.childrenIds[i]
      if (!childId) continue
      const child = this.nodes.get(childId)
      if (child) children.push(child)
    }

    return children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
      return a.name.localeCompare(b.name)
    })
  }

  /**
   * Cria um novo arquivo ou pasta dentro de `parentId`.
   * Retorna o ID do novo nó ou um erro.
   */
  create(parentId: string | null, data: CreateNodeData): CreateResult {
    const parent = parentId === null ? this.getRoot() ?? undefined : this.getNode(parentId) ?? undefined

    if (!parent) {
      return { success: false, error: 'Pasta pai não encontrada' }
    }

    if (parent.type !== 'folder') {
      return { success: false, error: 'O destino não é uma pasta' }
    }

    const siblings = this.getChildren(parent.id)
    const existingNames = siblings.map((s) => s.name)
    const validation = validateNodeName({ name: data.name }, existingNames)

    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    const newNode: FileSystemNode = {
      id: generateId(),
      name: data.name.trim(),
      type: data.type,
      parentId: parent.id,
      childrenIds: data.type === 'folder' ? [] : [],
      content: data.type === 'file' ? data.content ?? '' : undefined,
    }

    this.nodes.set(newNode.id, newNode)
    parent.childrenIds.push(newNode.id)

    return { success: true, nodeId: newNode.id }
  }

  /**
   * Renomeia um nó. Valida contra irmãos.
   */
  rename(nodeId: string, newName: string): RenameResult {
    const node = this.nodes.get(nodeId)
    if (!node) {
      return { success: false, error: 'Item não encontrado' }
    }

    const siblings = node.parentId === null
      ? (this.getRoot() ? [this.getRoot()!] : [])
      : this.getChildren(this.nodes.get(node.parentId)!.id)
    const existingNames = siblings
      .filter((s) => s.id !== node.id)
      .map((s) => s.name)

    const validation = validateNodeName(
      { name: newName, currentName: node.name },
      existingNames,
    )

    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    node.name = newName.trim()
    return { success: true }
  }

  /**
   * Exclui um nó e, se for pasta, todos os seus descendentes.
   */
  delete(nodeId: string): DeleteResult {
    const node = this.nodes.get(nodeId)
    if (!node) {
      return { success: false, error: 'Item não encontrado' }
    }

    if (node.parentId === null) {
      return { success: false, error: 'Não é possível excluir a raiz' }
    }

    // Coletar todos os descendentes recursivamente
    const toDelete: string[] = []
    const collectDescendants = (id: string) => {
      const n = this.nodes.get(id)
      if (!n) return
      if (n.type === 'folder') {
        for (const cid of n.childrenIds) {
          collectDescendants(cid)
        }
      }
      toDelete.push(id)
    }
    collectDescendants(nodeId)

    // Remover todos os descendentes
    for (const id of toDelete) {
      const n = this.nodes.get(id)
      if (!n) continue
      this.removeNodeFromParent(n)
      this.nodes.delete(id)
    }

    return { success: true }
  }

  /**
   * Busca profunda por nome (case-insensitive).
   * Útil para o search panel futuro.
   */
  findByName(name: string): FileSystemNode[] {
    const lower = name.toLowerCase()
    const results: FileSystemNode[] = []
    for (const node of this.nodes.values()) {
      if (node.name.toLowerCase().includes(lower)) {
        results.push(node)
      }
    }
    return results
  }

  /**
   * Move um nó para uma nova pasta (para futuras operações de drag & drop).
   */
  move(nodeId: string, newParentId: string | null): { success: boolean; error?: string } {
    const node = this.nodes.get(nodeId)
    if (!node) {
      return { success: false, error: 'Item não encontrado' }
    }

    const newParent = newParentId === null ? this.getRoot() : this.nodes.get(newParentId)
    if (!newParent || newParent.type !== 'folder') {
      return { success: false, error: 'Destino inválido' }
    }

    if (newParent.id === node.id) {
      return { success: false, error: 'Não é possível mover uma pasta para dentro de si' }
    }

    // Verificar se newParent é descendente de node (evita ciclo)
    let current: string | null = newParent.id
    while (current !== null && current !== node.parentId) {
      const n = this.nodes.get(current)
      if (!n) break
      if (n.id === nodeId) return { success: false, error: 'Não é possível mover para dentro de um descendente' }
      current = n.parentId
    }

    this.removeNodeFromParent(node)

    node.parentId = newParent.id
    newParent.childrenIds.push(node.id)

    // Reordenar
    newParent.childrenIds = newParent.childrenIds.sort((a, b) => {
      const na = this.nodes.get(a)
      const nb = this.nodes.get(b)
      if (!na || !nb) return 0
      if (na.type !== nb.type) return na.type === 'folder' ? -1 : 1
      return na.name.localeCompare(nb.name)
    })

    return { success: true }
  }
}

export { validateNodeName } from './types'
