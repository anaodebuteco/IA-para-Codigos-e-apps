import { SentinelLogoIcon } from '@/components/common/SentinelLogoIcon'

/**
 * Logo do Sentinel — identidade visual original.
 * Referência estética apenas: preto, grafite e roxo.
 * Nenhum símbolo proprietário de terceiros.
 */
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <SentinelLogoIcon />
      <span className="text-xl font-semibold text-text-primary">
        Sentinel
      </span>
      <span className="text-xs font-medium text-text-muted">
        by Ghost-Team
      </span>
    </div>
  )
}
