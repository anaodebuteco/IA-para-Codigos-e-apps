/**
 * Sentinel Design Tokens
 * Sistema de design tokenizado para consistência visual em todas as telas.
 * Referência: paleta "Decepticon" - preto, grafite, roxo profundo/roxo elétrico.
 *
 * Todos os componentes devem utilizar estes tokens ao invés de valores literais.
 */

export const colors = {
  // --- Backgrounds ---
  bgPrimary: 'var(--bg-primary)',
  bgSecondary: 'var(--bg-secondary)',

  // --- Surfaces ---
  surface: 'var(--surface)',
  surfaceHover: 'var(--surface-hover)',
  surfaceActive: 'var(--surface-active)',

  // --- Accent (Sentinel Purple) ---
  accent: 'var(--accent)',
  accentMuted: 'var(--accent-muted)',
  accentHover: 'var(--accent-hover)',
  accentGlow: 'var(--accent-glow)',

  // --- Textos ---
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textMuted: 'var(--text-muted)',

  // --- Bordas ---
  borderSubtle: 'var(--border-subtle)',
  borderActive: 'var(--border-active)',

  // --- Semânticas ---
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
  info: 'var(--info)',
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
} as const

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
} as const

export const borderRadius = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px',
} as const

export const layout = {
  sidebarWidth: 'var(--sidebar-width)',
  sidebarWidthCollapsed: 'var(--sidebar-width-collapsed)',
  explorerWidth: 'var(--explorer-width)',
  aiPanelWidth: 'var(--ai-panel-width)',
  headerHeight: 'var(--header-height)',
  statusbarHeight: 'var(--statusbar-height)',
} as const

export const fontFamily = {
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
} as const

export type ColorName = keyof typeof colors
export type SpacingName = keyof typeof spacing
export type FontSizeName = keyof typeof fontSize
