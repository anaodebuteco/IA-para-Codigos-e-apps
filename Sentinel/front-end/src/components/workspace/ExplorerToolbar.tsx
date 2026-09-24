import { Plus, FolderPlus, Trash2, Pencil } from 'lucide-react'
import { Button } from '../common/Button'

export interface ExplorerToolbarProps {
  /** Whether a node is selected */
  hasSelection: boolean
  /** Whether the selected node can be renamed */
  canRename: boolean
  /** Create a new file in the selected folder */
  onNewFile: () => void
  /** Create a new folder in the selected folder */
  onNewFolder: () => void
  /** Rename the selected node */
  onRename: () => void
  /** Delete the selected node */
  onDelete: () => void
}

/**
 * ExplorerToolbar — barra de ferramentas do File Explorer.
 *
 * Botões: Novo Arquivo, Nova Pasta, Renomear, Excluir.
 * Desabilita ações quando não há seleção apropriada.
 */
export function ExplorerToolbar({
  hasSelection,
  canRename,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
}: ExplorerToolbarProps) {
  return (
    <div className="flex items-center justify-between h-10 px-3 border-b border-border-subtle bg-surface">
      <div className="flex items-center gap-1">
        <Button
          variant="tertiary"
          size="sm"
          onClick={onNewFile}
          aria-label="Novo Arquivo"
          title="Novo Arquivo (Ctrl+N)"
        >
          <Plus className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Arquivo</span>
        </Button>

        <Button
          variant="tertiary"
          size="sm"
          onClick={onNewFolder}
          aria-label="Nova Pasta"
          title="Nova Pasta (Ctrl+Shift+N)"
        >
          <FolderPlus className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Pasta</span>
        </Button>

        <Button
          variant="tertiary"
          size="sm"
          onClick={onRename}
          disabled={!canRename}
          aria-label="Renomear"
          title="Renomear (F2)"
        >
          <Pencil className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Renomear</span>
        </Button>

        <Button
          variant="tertiary"
          size="sm"
          onClick={onDelete}
          disabled={!hasSelection}
          aria-label="Excluir"
          title="Excluir (Del)"
        >
          <Trash2 className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Excluir</span>
        </Button>
      </div>
    </div>
  )
}
