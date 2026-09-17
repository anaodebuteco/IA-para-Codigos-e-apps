import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResizable } from '@/hooks/useResizable'
import { WorkspaceHeader } from './WorkspaceHeader'
import { ActivityBar } from './ActivityBar'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { EditorArea } from './EditorArea'
import { AssistantPanel } from './AssistantPanel'
import { BottomPanel } from './BottomPanel'
import { StatusBar } from '../common/StatusBar'
import type { SidebarPanel } from './types'

/**
 * Estado visual do Workspace (gerenciado localmente com React Hooks).
 *
 * Única fonte de verdade para:
 * - activeSidebar
 * - bottomPanelOpen
 * - sidebarWidth (via useResizable)
 * - assistantWidth (via useResizable)
 * - bottomHeight (via useResizable)
 *
 * Nenhuma persistência, backend ou lógica de funcionalidades futuras.
 */
interface WorkspaceViewState {
  activeSidebar: SidebarPanel
  bottomPanelOpen: boolean
}

// Limites de tamanho para cada painel redimensionável
const SIDEBAR_MIN = 220
const SIDEBAR_MAX = 320
const SIDEBAR_INITIAL = 256

const ASSISTANT_MIN = 280
const ASSISTANT_MAX = 384
const ASSISTANT_INITIAL = 320

const BOTTOM_MIN = 120
const BOTTOM_MAX = 384
const BOTTOM_INITIAL = 192

/**
 * Página principal do Workspace — esqueleto funcional da IDE.
 *
 * Layout conceitual:
 * --- Top Bar (WorkspaceHeader) ---
 * | Activity Bar | Sidebar | Editor | AI Panel |
 * |--------------|---------|--------|----------|
 * --- Bottom Panel (Terminal/Output) ---
 * --- Status Bar ---
 *
 * Todas as áreas são placeholders estruturais nesta etapa.
 * Funcionalidades completas virão nas etapas subsequentes.
 */
export function WorkspacePage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const [state, setState] = useState<WorkspaceViewState>({
    activeSidebar: 'explorer',
    bottomPanelOpen: true,
  })

  // Redimensionamento nativo dos painéis via Pointer Events
  const sidebar = useResizable({
    initialSize: SIDEBAR_INITIAL,
    minSize: SIDEBAR_MIN,
    maxSize: SIDEBAR_MAX,
    direction: 'horizontal',
  })
  const assistant = useResizable({
    initialSize: ASSISTANT_INITIAL,
    minSize: ASSISTANT_MIN,
    maxSize: ASSISTANT_MAX,
    direction: 'horizontal',
    reverse: true,
  })
  const bottom = useResizable({
    initialSize: BOTTOM_INITIAL,
    minSize: BOTTOM_MIN,
    maxSize: BOTTOM_MAX,
    direction: 'vertical',
    reverse: true,
  })

  // PENDÊNCIA: validar projectId com backend real
  useEffect(() => {
    if (!projectId) {
      navigate('/dashboard')
    }
  }, [projectId, navigate])

  if (!projectId) {
    return null
  }

  const toggleBottomPanel = () => {
    setState((s) => ({ ...s, bottomPanelOpen: !s.bottomPanelOpen }))
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary text-text-primary">
      {/* Top Bar */}
      <WorkspaceHeader
        projectId={projectId}
        onToggleBottomPanel={toggleBottomPanel}
        bottomPanelOpen={state.bottomPanelOpen}
      />

      {/* Main layout: Activity Bar + Sidebar + Editor + AI Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (esquerda estreita, largura fixa) */}
        <ActivityBar
          active={state.activeSidebar}
          onChange={(panel) => setState((s) => ({ ...s, activeSidebar: panel }))}
        />

        {/* Sidebar (explorador, search, git) — redimensionável horizontalmente */}
        <WorkspaceSidebar
          activePanel={state.activeSidebar}
          style={{ width: sidebar.size, flexShrink: 0 }}
          onResizePointerDown={sidebar.handlePointerDown}
        />

        {/* Editor Area (central, ocupa o espaço restante) */}
        <EditorArea projectId={projectId} />

        {/* AI Assistant Panel (direita) — redimensionável horizontalmente */}
        <AssistantPanel
          style={{ width: assistant.size, flexShrink: 0 }}
          onResizePointerDown={assistant.handlePointerDown}
        />
      </div>

      {/* Bottom Panel (Terminal / Output) — redimensionável verticalmente */}
      {state.bottomPanelOpen && (
        <BottomPanel
          style={{ height: bottom.size }}
          onResizePointerDown={bottom.handlePointerDown}
        />
      )}

      {/* Status Bar */}
      <StatusBar projectId={projectId} />
    </div>
  )
}
