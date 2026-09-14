// Placeholder estrutural do painel lateral direito.
// Nenhuma lógica de IA implementada na Etapa 2.

/**
 * AssistantPanel — painel lateral direito do Workspace.
 *
 * Placeholder estrutural para onde o Assistente de IA será integrado
 * na Etapa 5.
 *
 * NÃO implementa:
 * - chat funcional
 * - streaming
 * - geração de código
 * - aplicação de diffs
 * - chamadas ao modelo
 */
export function AssistantPanel() {
  return (
    <aside
      className="hidden w-80 min-w-[280px] max-w-sm flex-col border-l border-border-subtle bg-surface lg:flex"
      aria-label="AI Assistant Panel"
    >
      <div className="flex items-center justify-between p-3 border-b border-border-subtle">
        <h2 className="text-xs font-semibold text-text-muted uppercase">
          Sentinel AI Assistant
        </h2>
        {/* Espaço reservado para ações futuras */}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <span className="text-3xl mb-2 select-none">🤖</span>
          <p className="text-sm text-text-secondary">
            O assistente de IA será integrado
            <br />
            na Etapa 5.
          </p>
        </div>
      </div>
    </aside>
  )
}
