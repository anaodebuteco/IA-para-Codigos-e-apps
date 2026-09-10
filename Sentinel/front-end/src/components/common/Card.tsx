import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Card reutilizável do Sentinel.
 * Usa a superfície surface e borda sutil da paleta.
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`
        rounded-lg bg-surface border border-border-subtle p-4
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={`
        mb-3 flex items-center justify-between
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={`text-sm text-text-secondary ${className}`} {...props}>
      {children}
    </div>
  )
}
