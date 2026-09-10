/**
 * Tipos base para a camada de API do Sentinel.
 *
 * ApiResponse é um envelope genérico que deve ser retornado por todos os
 * endpoints da API real (quando implementada).
 */

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
  timestamp: string
}
