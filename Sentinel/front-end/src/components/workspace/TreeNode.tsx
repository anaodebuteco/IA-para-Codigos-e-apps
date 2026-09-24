import type { KeyboardEvent } from 'react'
import { useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, MoreVertical } from 'lucide-react'
import type { FileSystemNode } from '@/services/fileSystem/types'

export interface TreeNodeProps {
  node: FileSystemNode
  depth: number
  isExpanded: boolean
  isSelected: boolean
  hasChildren: boolean
  onSelect: (node: FileSystemNode) => void
  onToggleExpand: (node: FileSystemNode) => void
  onCreateChild: (parent: FileSystemNode, type: 'file' | 'folder') => void
  onRename: (node: FileSystemNode, newName: string) => void
  onDelete: (node: FileSystemNode) => void
  showContextMenu: boolean
}

interface ContextMenuProps {
  node: FileSystemNode
  position: { x: number; y: number }
  onClose: () => void
  onCreateChild: (parent: FileSystemNode, type: 'file' | 'folder') => void
  onRename: (node: FileSystemNode, newName: string) => void
  onDelete: (node: FileSystemNode) => void
  triggerRef: React.RefObject<HTMLElement>
}

const ContextMenu = ({
  node,
  position,
  onClose,
  onCreateChild,
  onRename,
  onDelete,
  triggerRef,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape as unknown as EventListener)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape as unknown as EventListener)
    }
  }, [onClose, triggerRef])

  const handleRename = () => {
    const newName = prompt('Novo nome:', node.name)
    if (newName && newName.trim() !== node.name) {
      onRename(node, newName.trim())
    }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 flex flex-col py-1 border border-border-subtle bg-surface shadow-xl min-w-[160px]"
      style={{ left: position.x, top: position.y }}
    >
      <button
        className="px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface-hover"
        onClick={() => { onCreateChild(node, 'file'); onClose() }}
      >
        Novo Arquivo
      </button>
      <button
        className="px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface-hover"
        onClick={() => { onCreateChild(node, 'folder'); onClose() }}
      >
        Nova Pasta
      </button>
      <button
        className="px-3 py-1.5 text-left text-sm text-text-primary hover:bg-surface-hover"
        onClick={handleRename}
      >
        Renomear
      </button>
      <button
        className="px-3 py-1.5 text-left text-sm text-text-secondary hover:bg-surface-hover"
        onClick={() => { onDelete(node); onClose() }}
      >
        Excluir
      </button>
    </div>
  )
}

/**
 * TreeNode — renderiza um único item da árvore de arquivos.
 *
 * Suporta:
 * - expand/collapse (pastas)
 * - seleção
 * - menu de contexto (novo arquivo/pasta, rename, delete)
 * - estado visual: selected, hover
 */
export function TreeNode({
  node,
  depth,
  isExpanded,
  isSelected,
  hasChildren: _hasChildren,
  onSelect,
  onToggleExpand,
  onCreateChild,
  onRename,
  onDelete,
  showContextMenu,
}: TreeNodeProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const paddingLeft = depth * 16 + 8

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleExpand(node)
  }

  const handleSelect = () => {
    onSelect(node)
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMenuPosition({
      x: rect.left + 16,
      y: Math.min(rect.bottom + 8, window.innerHeight - 200),
    })
    setMenuOpen(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect()
    }
    if (e.key === 'F2') {
      e.preventDefault()
      // Impede a propagação para o listener global do FileExplorer,
      // evitando dois prompts de renomeação consecutivos.
      e.stopPropagation()
      const newName = prompt('Novo nome:', node.name)
      if (newName && newName.trim() && newName.trim() !== node.name) {
        onRename(node, newName.trim())
      }
    }
  }

  let IconComponent: typeof FileText
  let iconColor: string

  if (node.type === 'folder') {
    if (isExpanded) {
      IconComponent = FolderOpen
      iconColor = 'text-accent'
    } else {
      IconComponent = Folder
      iconColor = 'text-accent-muted'
    }
  } else {
    IconComponent = FileText
    iconColor = 'text-text-secondary'
  }

  return (
    <>
      <div
        role="treeitem"
        tabIndex={0}
        aria-expanded={node.type === 'folder' ? isExpanded : undefined}
        aria-selected={isSelected}
        className={`
          flex items-center py-1 text-sm outline-none
          ${isSelected
            ? 'bg-surface-active text-text-primary'
            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }
          ${showContextMenu ? '' : 'group'}
        `}
        style={{ paddingLeft }}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
      >
        {node.type === 'folder' && (
          <button
            onClick={handleToggleExpand}
            className={`
              flex items-center justify-center w-4 h-4 mr-1 rounded
              ${isSelected
                ? 'text-text-primary hover:text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
              }
              focus:outline-none
            `}
            aria-label={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        )}

        {node.type === 'file' && <div className="w-4 h-4 mr-1" />}

        <span className="mr-2 truncate" title={node.name}>
          <IconComponent className={`w-4 h-4 inline mr-1 ${iconColor}`} />
          {node.name}
        </span>

        {showContextMenu && node.type === 'folder' && (
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation()
              handleContextMenu(e as unknown as React.MouseEvent)
            }}
            className={`
              ml-auto p-0.5 transition-opacity
              ${showContextMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              ${isSelected ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
              focus:outline-none
            `}
            aria-label="Mais opções"
          >
            <MoreVertical className="w-3 h-3" />
          </button>
        )}
      </div>

      {menuOpen && (
        <ContextMenu
          node={node}
          position={menuPosition}
          onClose={() => setMenuOpen(false)}
          onCreateChild={onCreateChild}
          onRename={onRename}
          onDelete={onDelete}
          triggerRef={buttonRef as unknown as React.RefObject<HTMLElement>}
        />
      )}
    </>
  )
}
