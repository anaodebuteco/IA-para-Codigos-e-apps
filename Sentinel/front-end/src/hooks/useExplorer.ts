/**
 * Hook de gerenciamento de estado do File Explorer.
 *
 * Mantém separação entre:
 * - UI (componentes)
 * - Estado da árvore (expanded, selected)
 * - Operações de arquivo (delegadas ao MockFileSystem)
 *
 * Prepara a integração com editor: `selectedNode` contém o conteúdo
 * do arquivo selecionado, pronto para consumo por um editor futuro.
 *
 * Arquitetura:
 * - `MockFileSystem` vive em `useRef` — não causa re-render.
 * - `version` (useState) é incrementado após mutações para forçar re-avaliação.
 * - Leituras do filesystem (root, children) são derivadas via `version`,
 *   garantindo dados sempre atualizados após mutações.
 */

import { MockFileSystem } from '@/services/fileSystem/mockFileSystem'
import { MOCK_NODES } from '@/services/fileSystem/mockTree'
import type { FileSystemNode } from '@/services/fileSystem/types'
import { useState, useCallback, useRef } from 'react'

/** Extrai a raiz do mock sem acessar refs durante render */
function getRootNode(): FileSystemNode | null {
  return Object.values(MOCK_NODES).find((n) => n.parentId === null) ?? null
}

export interface UseExplorerReturn {
  /** Nó raiz do filesystem */
  root: FileSystemNode | null
  /** IDs de pastas expandidas */
  expanded: Set<string>
  /** Nó atualmente selecionado */
  selectedNode: FileSystemNode | null
  /** Alterna expansão de uma pasta */
  toggleExpand: (nodeId: string) => void
  /** Seleciona um nó */
  selectNode: (node: FileSystemNode) => void
  /** Cria um novo arquivo ou pasta */
  createNode: (parent: FileSystemNode, name: string, type: 'file' | 'folder') => void
  /** Renomeia um nó */
  renameNode: (nodeId: string, newName: string) => void
  /** Exclui um nó */
  deleteNode: (nodeId: string) => void
  /** Obtém os filhos ordenados de um nó */
  getChildren: (nodeId: string) => FileSystemNode[]
  /** Verifica se uma pasta está expandida */
  isExpanded: (nodeId: string) => boolean
  /** Verifica se um nó está selecionado */
  isSelected: (nodeId: string) => boolean
}

/**
 * Hook que gerencia o estado e as operações do File Explorer.
 *
 * A árvore mock inicial vem de `MOCK_NODES` em `mockTree.ts`.
 * Na Fase 2, o construtor do MockFileSystem pode receber um filesystem real
 * que implemente a mesma interface.
 */
export function useExplorer(): UseExplorerReturn {
  const fsRef = useRef(new MockFileSystem(MOCK_NODES))
  const [root, setRoot] = useState<FileSystemNode | null>(getRootNode)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selectedNode, setSelectedNode] = useState<FileSystemNode | null>(null)

  const triggerUpdate = useCallback(() => {
    setRoot(fsRef.current.getRoot())
  }, [])

  const getChildren = useCallback((nodeId: string) => {
    return fsRef.current.getChildren(nodeId)
  }, [])

  const toggleExpand = useCallback((nodeId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }, [])

  const selectNode = useCallback((node: FileSystemNode) => {
    setSelectedNode(node)
  }, [])

  const createNode = useCallback((parent: FileSystemNode, name: string, type: 'file' | 'folder') => {
    const result = fsRef.current.create(parent.id, { name, type, content: type === 'file' ? '' : undefined })
    if (result.success && result.nodeId) {
      const newNode = fsRef.current.findById(result.nodeId)
      if (newNode) {
        setSelectedNode(newNode)
        if (newNode.type === 'folder') {
          setExpanded((prev) => new Set(prev).add(newNode.id))
        }
        triggerUpdate()
      }
    }
  }, [triggerUpdate])

  const renameNode = useCallback((nodeId: string, newName: string) => {
    const result = fsRef.current.rename(nodeId, newName)
    if (result.success) {
      triggerUpdate()
      const updated = fsRef.current.findById(nodeId)
      if (updated) setSelectedNode(updated)
    }
  }, [triggerUpdate])

  const deleteNode = useCallback((nodeId: string) => {
    const result = fsRef.current.delete(nodeId)
    if (result.success) {
      setSelectedNode(null)
      triggerUpdate()
    }
  }, [triggerUpdate])

  const isExpanded = useCallback((nodeId: string) => {
    return expanded.has(nodeId)
  }, [expanded])

  const isSelected = useCallback((nodeId: string) => {
    return selectedNode?.id === nodeId
  }, [selectedNode])

  return {
    root,
    expanded,
    selectedNode,
    toggleExpand,
    selectNode,
    createNode,
    renameNode,
    deleteNode,
    getChildren,
    isExpanded,
    isSelected,
  }
}
