/**
 * Cliente de API base do Sentinel.
 *
 * ESTA É UMA ABSTRAÇÃO. Todo acesso à rede HTTP deve passar por aqui.
 * Componentes NUNCA devem usar fetch/axios diretamente.
 *
 * PENDÊNCIA: O backend Python do Sentinel atualmente não expõe endpoints HTTP.
 * Os métodos abaixo são stubs que lançam erro. Quando um servidor real for
 * implementado (ex: FastAPI), substitua a implementação desta interface sem
 * alterar os chamadores.
 *
 * NÃO inventar endpoints no backend.
 */

import type { ApiResponse } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async request<T>(_endpoint: string, _options: RequestInit = {}): Promise<ApiResponse<T>> {
    // Placeholder — substituir quando o backend real existir.
    // Não implementar chamadas HTTP sem endpoints definidos pelo backend.
    // eslint-disable-next-line no-console
    console.warn('api.client: request() não implementado — esperando backend HTTP real')
    void this.baseUrl // referenciado futuramente pelo backend real
    throw new Error(
      'API client não implementado. O backend Python não expõe endpoints HTTP ainda.'
    )
  }
}

export const apiClient = new ApiClient(BASE_URL)
