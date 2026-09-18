// Strukturovaná data schema.org jako ld+json skript
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  // Escapování „<“ zabrání předčasnému ukončení script tagu hodnotou obsahující </script>
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export default JsonLd
