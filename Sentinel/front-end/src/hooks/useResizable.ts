import { useState, useRef, useCallback } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

export type ResizeDirection = 'horizontal' | 'vertical'

export interface UseResizableProps {
  initialSize: number
  minSize?: number
  maxSize?: number
  direction?: ResizeDirection
  reverse?: boolean
}

/**
 * Hook para redimensionamento nativo de painéis via Pointer Events.
 *
 * Gerencia o estado de tamanho e fornece handlers para detectar
 * o início do arraste (pointer down) e atualizar o tamanho
 * durante o movimento do ponteiro.
 *
 * - `direction: 'horizontal'` → redimensiona largura (usa clientX)
 * - `direction: 'vertical'`  → redimensiona altura (usa clientY)
 * - `reverse: true`          → inverte o sinal do delta (painéis ancorados à direita/baixo)
 *
 * Limites minSize/maxSize garantem que o painel nunca colapse a zero
 * nem ultrapasse os limites definidos.
 */
export function useResizable({
  initialSize,
  minSize = 200,
  maxSize = 600,
  direction = 'horizontal',
  reverse = false,
}: UseResizableProps) {
  const [size, setSize] = useState(initialSize)
  const startPosRef = useRef<number | null>(null)
  const startSizeRef = useRef(initialSize)

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      const target = e.currentTarget
      if (!target) return

      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY
      startSizeRef.current = size
      target.setPointerCapture(e.pointerId)

      const handlePointerMove = (ev: PointerEvent) => {
        if (startPosRef.current === null) return
        const current = direction === 'horizontal' ? ev.clientX : ev.clientY
        const delta = reverse
          ? startPosRef.current - current
          : current - startPosRef.current
        const newSize = Math.min(
          maxSize,
          Math.max(minSize, startSizeRef.current + delta)
        )
        setSize(newSize)
      }

      const handlePointerUp = () => {
        startPosRef.current = null
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
        target.releasePointerCapture(e.pointerId)
      }

      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    },
    [direction, minSize, maxSize, size, reverse]
  )

  return { size, handlePointerDown }
}
