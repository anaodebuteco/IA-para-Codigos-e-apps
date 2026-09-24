/**
 * Árvore mock inicial do projeto Sentinel (Fase 1).
 *
 * Estrutura simulada realista para testar o File Explorer.
 */

import type { FileSystemNode } from './types'

export const INITIAL_MOCK_TREE: FileSystemNode = {
  id: 'root',
  name: 'Sentinel Project',
  type: 'folder',
  parentId: null,
  childrenIds: ['src', 'public', 'tests', 'package.json', 'README.md', 'tsconfig.json'],
}

export const MOCK_NODES: Record<string, FileSystemNode> = {
  root: INITIAL_MOCK_TREE,

  // --- Folders ---
  src: {
    id: 'src',
    name: 'src',
    type: 'folder',
    parentId: 'root',
    childrenIds: ['components', 'hooks', 'main.tsx', 'App.tsx'],
  },
  components: {
    id: 'components',
    name: 'components',
    type: 'folder',
    parentId: 'src',
    childrenIds: ['App.tsx-comp', 'Button.tsx'],
  },
  hooks: {
    id: 'hooks',
    name: 'hooks',
    type: 'folder',
    parentId: 'src',
    childrenIds: ['useExample.ts'],
  },
  public: {
    id: 'public',
    name: 'public',
    type: 'folder',
    parentId: 'root',
    childrenIds: ['favicon.svg'],
  },
  tests: {
    id: 'tests',
    name: 'tests',
    type: 'folder',
    parentId: 'root',
    childrenIds: ['example.test.ts'],
  },

  // --- Files ---
  'App.tsx': {
    id: 'App.tsx',
    name: 'App.tsx',
    type: 'file',
    parentId: 'src',
    childrenIds: [],
    content: `export function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-accent">Sentinel Dashboard</h1>
      <p className="text-text-secondary mt-2">Bem-vindo ao Sentinel IDE</p>
    </div>
  )
}
`,
  },
  'App.tsx-comp': {
    id: 'App.tsx-comp',
    name: 'AppContainer.tsx',
    type: 'file',
    parentId: 'components',
    childrenIds: [],
    content: `import React from 'react'

export function AppContainer() {
  return <div className="flex flex-col h-screen">App Container</div>
}
`,
  },
  'Button.tsx': {
    id: 'Button.tsx',
    name: 'Button.tsx',
    type: 'file',
    parentId: 'components',
    childrenIds: [],
    content: `import React from 'react'

export interface ButtonProps {
  label: string
  onClick?: () => void
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded"
    >
      {label}
    </button>
  )
}
`,
  },
  'useExample.ts': {
    id: 'useExample.ts',
    name: 'useExample.ts',
    type: 'file',
    parentId: 'hooks',
    childrenIds: [],
    content: `import { useState } from 'react'

export function useExample() {
  const [value, setValue] = useState('Sentinel')
  return { value, setValue }
}
`,
  },
  'main.tsx': {
    id: 'main.tsx',
    name: 'main.tsx',
    type: 'file',
    parentId: 'src',
    childrenIds: [],
    content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`,
  },
  'favicon.svg': {
    id: 'favicon.svg',
    name: 'favicon.svg',
    type: 'file',
    parentId: 'public',
    childrenIds: [],
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7c3aed">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
`,
  },
  'example.test.ts': {
    id: 'example.test.ts',
    name: 'example.test.ts',
    type: 'file',
    parentId: 'tests',
    childrenIds: [],
    content: `import { describe, it, expect } from 'vitest'

describe('Sentinel Test Suite', () => {
  it('should pass initial test', () => {
    expect(true).toBe(true)
  })
})
`,
  },
  'package.json': {
    id: 'package.json',
    name: 'package.json',
    type: 'file',
    parentId: 'root',
    childrenIds: [],
    content: `{
  "name": "sentinel-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}
`,
  },
  'README.md': {
    id: 'README.md',
    name: 'README.md',
    type: 'file',
    parentId: 'root',
    childrenIds: [],
    content: `# Sentinel by Ghost-Team

Plataforma de Desenvolvimento e Inteligência Artificial.

## Como Executar

\`\`\`bash
npm run dev
\`\`\`
`,
  },
  'tsconfig.json': {
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    type: 'file',
    parentId: 'root',
    childrenIds: [],
    content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true
  }
}
`,
  },
}

/**
 * Constrói a árvore mock hierárquica conectada.
 */
export function buildInitialMockFileSystem(): FileSystemNode {
  // Clonar profundamente para evitar mutação da constante
  const copyMap = new Map<string, FileSystemNode>()
  for (const [id, node] of Object.entries(MOCK_NODES)) {
    copyMap.set(id, { ...node, childrenIds: [...node.childrenIds] })
  }
  return copyMap.get('root')!
}
