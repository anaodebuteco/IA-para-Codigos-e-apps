import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardPage } from '@/components/dashboard/DashboardPage'
import { WorkspacePage } from '@/components/workspace/WorkspacePage'
import { SettingsPage } from '@/components/settings/SettingsPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workspace/:projectId" element={<WorkspacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
