// Nenhuma importação de Monaco ou editor de código na Etapa 2.
// Placeholder estrutural apenas.

interface EditorAreaProps {
  projectId: string
}

/**
 * EditorArea — área central do Workspace.
 *
 * Placeholder estrutural para onde o Monaco Editor será integrado
 * na Etapa 4.
 *
 * NÃO implementa:
 * - syntax highlighting
 * - tabs de arquivos
 * - edição real
 * - salvamento
 * - formatação
 * - autocomplete
 */
export function EditorArea({ projectId }: EditorAreaProps) {
  return (
    <main
      className="relative flex-1 flex min-w-0 flex-col overflow-hidden border-r border-border-subtle bg-bg-primary"
      aria-label="Editor Area"
      data-project-id={projectId}
    >
      {/* Placeholder visual */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 max-w-md text-center">
          <span className="text-3xl select-none">📄</span>
          <h3 className="text-base font-medium text-text-primary">
            Editor de Código
          </h3>
          <p className="text-sm text-text-secondary">
            O editor com syntax highlighting e múltiplas abas
            <br />
            será integrado na Etapa 4.
          </p>
        </div>
      </div>
    </main>
  )
}
