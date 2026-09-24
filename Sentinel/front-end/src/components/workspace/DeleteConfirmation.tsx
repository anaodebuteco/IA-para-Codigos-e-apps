import { Button } from '../common/Button'

interface DeleteConfirmationProps {
  /** Nome do item a ser excluído */
  itemName: string
  /** Tipo do item (file ou folder) */
  itemType: 'file' | 'folder'
  /** True se a pasta contém filhos (mostra aviso adicional) */
  hasChildren?: boolean
  /** Ação a ser executada na confirmação */
  onConfirm: () => void
  /** Ação ao cancelar */
  onCancel: () => void
}

/**
 * Modal de confirmação para operações destrutivas (exclusão).
 *
 * Sobreposição fixa sobre todo o workspace.
 * Não usa portal — mantém consistência com o tema escuro existente.
 */
export function DeleteConfirmation({
  itemName,
  itemType,
  hasChildren = false,
  onConfirm,
  onCancel,
}: DeleteConfirmationProps) {
  const itemLabel = itemType === 'folder' ? 'pasta' : 'arquivo'
  const childrenWarning = hasChildren
    ? ' Esta pasta contém itens que também serão excluídos.'
    : ''

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div className="w-full max-w-md border border-border-subtle bg-surface-active shadow-xl">
        <div className="border-b border-border-subtle p-4">
          <h2 id="delete-modal-title" className="text-lg font-semibold text-text-primary">
            Confirmar Exclusão
          </h2>
        </div>

        <div id="delete-modal-desc" className="p-4 text-sm text-text-secondary">
          <p>
            Você tem certeza que deseja excluir{' '}
            <span className="font-medium text-text-primary">"{itemName}"</span> ?
            Esta é uma operação irreversível.{childrenWarning}
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-border-subtle p-4">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            Excluir {itemLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

