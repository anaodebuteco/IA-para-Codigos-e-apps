import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
 *
 * Nenhuma persistência, backend ou lógica de funcionalidades futuras.
 */
interface WorkspaceViewState {
  activeSidebar: SidebarPanel
  bottomPanelOpen: boolean
}

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
        {/* Activity Bar (esquerda estreita) */}
        <ActivityBar
          active={state.activeSidebar}
          onChange={(panel) => setState((s) => ({ ...s, activeSidebar: panel }))}
        />

        {/* Sidebar (explorador, search, git) */}
        <WorkspaceSidebar activePanel={state.activeSidebar} />

        {/* Editor Area (central) */}
        <EditorArea projectId={projectId} />

        {/* AI Assistant Panel (direita) */}
        <AssistantPanel />
      </div>

      {/* Bottom Panel (Terminal / Output) */}
      {state.bottomPanelOpen && <BottomPanel />}

      {/* Status Bar */}
      <StatusBar projectId={projectId} />
    </div>
  )
}
