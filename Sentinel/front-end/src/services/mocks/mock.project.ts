/**
 * MOCK ISOLADO — Dados fictícios para o Dashboard.
 *
 * ESTE ARQUIVO NÃO DEVE SER MODIFICADO PARA ADIANTAR INTEGRAÇÃO.
 * Quando o backend real expor endpoints de projetos, substitua este mock
 * pela implementação real em services/api.client.ts — sem tocar nos componentes.
 *
 * Pendência: API real de projetos não existe.
 */

import type { Project, RecentActivity } from '@/types'

export const mockProjects: Project[] = [
  {
    id: 'proj-01',
    name: 'Sentinel',
    path: '/home/user/projetos/Sentinel',
    description: 'Modelo de linguagem de programação desenvolvido do zero',
    lastOpened: '2026-09-09T10:30:00Z',
    isActive: true,
  },
  {
    id: 'proj-02',
    name: 'E-commerce API',
    path: '/home/user/projetos/ecommerce-api',
    description: 'API REST para gerenciamento de lojas virtuais',
    lastOpened: '2026-09-07T15:20:00Z',
    isActive: false,
  },
  {
    id: 'proj-03',
    name: 'Web Dashboard',
    path: '/home/user/projetos/web-dashboard',
    description: 'Interface administrativa em React',
    lastOpened: '2026-09-05T08:45:00Z',
    isActive: false,
  },
]

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'act-01',
    type: 'ai',
    summary: 'Sentinel gerou correção para bug em transformer.py',
    timestamp: '2026-09-09T10:25:00Z',
    filePath: 'model/transformer.py',
  },
  {
    id: 'act-02',
    type: 'edit',
    summary: 'Modificado dataset.json — 264 novos exemplos adicionados',
    timestamp: '2026-09-08T18:40:00Z',
    filePath: 'data/v3.2/dataset.json',
  },
  {
    id: 'act-03',
    type: 'git',
    summary: 'Branch v3.2 criada a partir de main',
    timestamp: '2026-09-07T19:00:00Z',
  },
  {
    id: 'act-04',
    type: 'chat',
    summary: 'Conversa sobre otimização do tokenizer híbrido',
    timestamp: '2026-09-07T14:30:00Z',
  },
  {
    id: 'act-05',
    type: 'terminal',
    summary: 'Treinamento V3.2 concluído — loss: 0.5395',
    timestamp: '2026-09-07T19:30:00Z',
  },
]

/**
 * Status simbólico do engine Sentinel (V3.2 em desenvolvimento).
 * Este não é um endpoint real — representa o estado do backend Python.
 */
export const mockEngineStatus = {
  modelVersion: 'V3.2',
  status: 'ready' as 'ready' | 'training' | 'error',
  vocabularySize: 1446,
  contextWindow: 64,
  parameters: 1171712,
}
