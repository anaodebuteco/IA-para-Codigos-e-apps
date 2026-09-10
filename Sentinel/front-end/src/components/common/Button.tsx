import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

/**
 * Botão reutilizável do Sentinel.
 * Utiliza tokens CSS para consistência visual com a paleta Decepticon.
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary focus:ring-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent-glow',
        secondary:
          'bg-surface hover:bg-surface-hover text-text-primary border border-border-subtle',
        tertiary:
          'text-text-secondary hover:text-text-primary hover:bg-surface',
        danger:
          'bg-error hover:bg-red-600 text-white',
      },
      size: {
        sm: 'h-8 px-3 py-1.5 text-xs',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}
