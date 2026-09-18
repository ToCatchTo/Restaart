// Strukturovaná data schema.org jako ld+json skript
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data })
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export default JsonLd
