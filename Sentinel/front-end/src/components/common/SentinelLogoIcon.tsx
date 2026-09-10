/**
 * Ícone original do Sentinel — inspirado na estética tecnológica futurista.
 * Forma geométrica: triângulo com núcleo, simbolizando um olho/vigília.
 * Referência estética apenas à paleta preto/grafite/roxo.
 *
 * NÃO utiliza logos, símbolos ou elementos proprietários de terceiros.
 */
export function SentinelLogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Triângulo externo (grafite) */}
      <polygon
        points="16 2 28 26 4 26"
        fill="var(--surface)"
        stroke="var(--border-active)"
        strokeWidth="1.5"
      />
      {/* Núcleo roxo */}
      <circle
        cx="16"
        cy="17"
        r="4.5"
        fill="var(--accent)"
        fillOpacity="0.85"
      />
      {/* Glifo central (triângulo invertido) */}
      <polygon
        points="16 11 21 22 11 22"
        fill="var(--bg-primary)"
      />
    </svg>
  )
}
