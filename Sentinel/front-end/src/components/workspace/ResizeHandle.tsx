import type { PointerEvent } from 'react'

export interface ResizeHandleProps {
  direction: 'horizontal' | 'vertical'
  onPointerDown: (e: PointerEvent) => void
}

/**
 * ResizeHandle — divisor entre painéis redimensionáveis.
 *
 * Renderiza uma linha divisória invisível para o usuário que
 * captura eventos de ponteiro para redimensionar o painel pai.
 *
 * Requer que o elemento pai possua `position: relative`.
 *
 * - `direction="horizontal"`: redimensiona largura (drag horizontal).
 *   O divisor fica posicionado na borda direita do painel.
 * - `direction="vertical"`: redimensiona altura (drag vertical).
 *   O divisor fica posicionado na borda superior do painel.
 */
export function ResizeHandle({ direction, onPointerDown }: ResizeHandleProps) {
  const isHorizontal = direction === 'horizontal'

  return (
    <div
      onPointerDown={onPointerDown}
      role="separator"
      aria-label={
        isHorizontal
          ? 'Redimensionar largura do painel'
          : 'Redimensionar altura do painel'
      }
      aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
      tabIndex={0}
      className={[
        'absolute z-10 select-none touch-none',
        isHorizontal
          ? 'top-0 right-[-3px] h-full w-[6px] cursor-col-resize hover:bg-accent/20 active:bg-accent/40'
          : 'top-[-3px] left-0 w-full h-[6px] cursor-row-resize hover:bg-accent/20 active:bg-accent/40',
        'transition-colors duration-150',
      ].join(' ')}
    />
  )
}
