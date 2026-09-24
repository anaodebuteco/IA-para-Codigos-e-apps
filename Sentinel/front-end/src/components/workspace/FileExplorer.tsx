/**
 * FileExplorer — Orquestrador do painel de arquivos do Workspace.
 *
 * Integra os seguintes componentes:
 * - ExplorerToolbar (criar/rename/excluir)
 * - TreeNode (árvore recursiva com context menu)
 * - DeleteConfirmation (modal de confirmação)
 *
 * Estado e operações são delegados ao hook `useExplorer`, que
 * por sua vez delega ao MockFileSystem — mantendo a UI livre
 * de lógica de domínio.
 */

import { useState, useCallback, useEffect } from 'react'
import { useExplorer } from '@/hooks/useExplorer'
import { ExplorerToolbar } from './ExplorerToolbar'
import { TreeNode } from './TreeNode'
import { DeleteConfirmation } from './DeleteConfirmation'
import type { FileSystemNode } from '@/services/fileSystem/types'

/** Prompt simples para entrada de nome (consistente com TreeNode) */
function promptForName(label: string, defaultValue: string): string | null {
  const name = prompt(label, defaultValue)
  if (name === null) return null
  const trimmed = name.trim()
  if (!trimmed) return null
  return trimmed
}

export function FileExplorer() {
  const {
    root,
    selectedNode,
    toggleExpand,
    selectNode,
    createNode,
    renameNode,
    deleteNode,
    getChildren,
    isExpanded,
    isSelected,
  } = useExplorer()

  /** Nó aguardando confirmação de exclusão */
  const [pendingDeleteNode, setPendingDeleteNode] = useState<FileSystemNode | null>(null)

  /** Define a pasta pai para novos itens (pasta selecionada ou raiz) */
  const getParentForNew = useCallback((): FileSystemNode | null => {
    if (selectedNode && selectedNode.type === 'folder') return selectedNode
    return root
  }, [selectedNode, root])

  const handleNewFile = useCallback(() => {
    const parent = getParentForNew()
    if (!parent) return
    const name = promptForName('Nome do arquivo:', 'novo-arquivo.txt')
    if (name) createNode(parent, name, 'file')
  }, [getParentForNew, createNode])

  const handleNewFolder = useCallback(() => {
    const parent = getParentForNew()
    if (!parent) return
    const name = promptForName('Nome da pasta:', 'nova-pasta')
    if (name) createNode(parent, name, 'folder')
  }, [getParentForNew, createNode])

  const handleRename = useCallback(() => {
    if (!selectedNode) return
    const name = promptForName('Novo nome:', selectedNode.name)
    if (name && name !== selectedNode.name) {
      renameNode(selectedNode.id, name)
    }
  }, [selectedNode, renameNode])

  const handleDelete = useCallback(() => {
    if (!selectedNode || selectedNode.parentId === null) return
    setPendingDeleteNode(selectedNode)
  }, [selectedNode])

  const confirmDelete = useCallback(() => {
    if (pendingDeleteNode) {
      deleteNode(pendingDeleteNode.id)
      setPendingDeleteNode(null)
    }
  }, [pendingDeleteNode, deleteNode])

  const cancelDelete = useCallback(() => {
    setPendingDeleteNode(null)
  }, [])

  // Atalhos de teclado: F2 (renomear), Del (excluir)
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'F2' && selectedNode) {
        e.preventDefault()
        handleRename()
      }
      if (e.key === 'Delete' && selectedNode && selectedNode.parentId !== null) {
        e.preventDefault()
        handleDelete()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNode, handleRename, handleDelete])

  /** Renderização recursiva da árvore (função declarada para referência recursiva) */
  function renderTreeNode(node: FileSystemNode, depth: number) {
    const actualChildren = node.type === 'folder' ? getChildren(node.id) : []
    const expanded = node.type === 'folder' && isExpanded(node.id)
    const visibleChildren = expanded ? actualChildren : []

    return (
      <div key={node.id}>
        <TreeNode
          node={node}
          depth={depth}
          isExpanded={expanded}
          isSelected={isSelected(node.id)}
          hasChildren={actualChildren.length > 0}
          onSelect={selectNode}
          onToggleExpand={(n) => toggleExpand(n.id)}
          onCreateChild={(parent, type) => {
            const name = promptForName(
              type === 'file' ? 'Nome do arquivo:' : 'Nome da pasta:',
              type === 'file' ? 'novo-arquivo.txt' : 'nova-pasta',
            )
            if (name) createNode(parent, name, type)
          }}
          onRename={(n, newName) => renameNode(n.id, newName)}
          onDelete={(n) => {
            if (n.parentId === null) return
            setPendingDeleteNode(n)
          }}
          showContextMenu={true}
        />
        {visibleChildren.map((child) => renderTreeNode(child, depth + 1))}
      </div>
    )
  }

  if (!root) {
    return (
      <div className="flex flex-col h-full">
        <ExplorerToolbar
          hasSelection={false}
          canRename={false}
          onNewFile={handleNewFile}
          onNewFolder={handleNewFolder}
          onRename={handleRename}
          onDelete={handleDelete}
        />
        <div className="flex-1 flex items-center justify-center text-text-secondary">
          Nenhum arquivo encontrado.
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ExplorerToolbar
        hasSelection={!!selectedNode}
        canRename={!!selectedNode && selectedNode.parentId !== null}
        onNewFile={handleNewFile}
        onNewFolder={handleNewFolder}
        onRename={handleRename}
        onDelete={handleDelete}
      />

      <div className="flex-1 overflow-y-auto">
        {renderTreeNode(root, 0)}
      </div>

      {pendingDeleteNode && (
        <DeleteConfirmation
          itemName={pendingDeleteNode.name}
          itemType={pendingDeleteNode.type}
          hasChildren={
            pendingDeleteNode.type === 'folder' &&
            getChildren(pendingDeleteNode.id).length > 0
          }
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}
