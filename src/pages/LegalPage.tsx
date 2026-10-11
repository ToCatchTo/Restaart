// Právní stránka (obchodní podmínky / ochrana osobních údajů) – text na šedém pozadí bez fotky a patičky
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { SEO } from '../seo'
import { COLORS, columnSx } from '../theme'
import type { LegalBlock, LegalDocument } from '../types'
import Header from '../components/Header'
import PageTitle from '../components/PageTitle'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

interface LegalPageProps {
  page: keyof typeof content.legal
}

// Desktop: text ve vycentrovaném sloupci 1100 px, písmo 16/25
const COLUMN_DESKTOP = 1100

const headingSx = {
  display: 'block',
  margin: 0,
  fontSize: { xs: fluid(18, 19), md: fluidDesktop(18.4, 20) },
  lineHeight: { xs: fluid(24, 25), md: desktopType(30) },
  fontWeight: { xs: 500, md: 600 },
  letterSpacing: { xs: '0.02em', md: 0 },
  color: COLORS.white,
} as const

const textSx = {
  fontSize: { xs: fluid(15, 16), md: fluidDesktop(15.4, 16) },
  lineHeight: { xs: fluid(24, 26), md: desktopType(25) },
  fontWeight: 400,
  letterSpacing: { xs: '0.02em', md: 0 },
  color: COLORS.white,
} as const

const paragraphSx = {
  ...textSx,
  display: 'block',
  margin: 0,
  paddingTop: { xs: fluid(12, 14), md: desktopScaled(14) },
} as const

// Podnadpis uvnitř sekce (např. „3.1 Správa účtu“)
const subheadingSx = {
  ...textSx,
  display: 'block',
  margin: 0,
  paddingTop: { xs: fluid(20, 22), md: desktopScaled(24) },
  fontWeight: 600,
  color: COLORS.grayLight,
} as const

const linkSx = {
  color: COLORS.cyanLabel,
  textDecoration: 'none',
  textUnderlineOffset: '0.15em',
  '&:hover': { textDecoration: 'underline' },
} as const

// Mobilní okraje; desktop: vycentrovaný sloupec
const gutterSx = {
  paddingLeft: { xs: fluid(30, 34), md: 0 },
  paddingRight: { xs: fluid(30, 34), md: 0 },
  marginX: { md: 'auto' },
  maxWidth: { md: desktopScaled(COLUMN_DESKTOP) },
} as const

// Odkaz: kotva na stránce, interní cesta, nebo externí adresa
function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('#')) {
    return (
      <Box component="a" href={href} sx={linkSx}>
        {children}
      </Box>
    )
  }
  if (href.startsWith('/')) {
    return (
      <Box component={Link} to={href} sx={linkSx}>
        {children}
      </Box>
    )
  }
  const external = /^https?:/.test(href)
  return (
    <Box component="a" href={href} sx={linkSx} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </Box>
  )
}

// Značky v textu: **tučně** a [text](url)
const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0
    if (index > last) nodes.push(text.slice(last, index))
    if (match[1] !== undefined) {
      nodes.push(
        <Box key={index} component="strong" sx={{ fontWeight: 600 }}>
          {renderInline(match[1])}
        </Box>,
      )
    } else {
      nodes.push(
        <InlineLink key={index} href={match[3]}>
          {renderInline(match[2])}
        </InlineLink>,
      )
    }
    last = index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// Tučný štítek před textem („Účel: …“, položky seznamu)
function Lead({ lead }: { lead?: string }) {
  if (!lead) return null
  return (
    <>
      <Box component="strong" sx={{ fontWeight: 600 }}>
        {renderInline(lead)}
      </Box>{' '}
    </>
  )
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <Typography component="p" sx={paragraphSx}>
          <Lead lead={block.lead} />
          {renderInline(block.text)}
        </Typography>
      )
    case 'subheading':
      return (
        <Typography component="h3" sx={subheadingSx}>
          {renderInline(block.text)}
        </Typography>
      )
    case 'list':
      return (
        <Box
          component="ul"
          sx={{
            ...textSx,
            margin: 0,
            paddingTop: { xs: fluid(10, 12), md: desktopScaled(12) },
            paddingLeft: { xs: fluid(22, 24), md: desktopScaled(28) },
            '& li + li': { paddingTop: { xs: fluid(6, 8), md: desktopScaled(8) } },
          }}
        >
          {block.items.map((item) => (
            <li key={item.text}>
              <Lead lead={item.lead} />
              {renderInline(item.text)}
            </li>
          ))}
        </Box>
      )
    case 'table':
      return (
        <Box
          component="table"
          sx={{
            ...textSx,
            width: '100%',
            marginTop: { xs: fluid(14, 16), md: desktopScaled(18) },
            borderCollapse: 'collapse',
            '& th, & td': {
              padding: { xs: `${fluid(8, 9)} ${fluid(10, 12)}`, md: `${desktopScaled(10)} ${desktopScaled(14)}` },
              border: `1px solid ${COLORS.gray}`,
              textAlign: 'left',
              verticalAlign: 'top',
            },
            '& th': { backgroundColor: COLORS.navy, fontWeight: 600 },
            '& td:first-of-type': { width: '42%' },
          }}
        >
          <thead>
            <tr>
              <th scope="col">{block.head[0]}</th>
              <th scope="col">{block.head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map(([label, value]) => (
              <tr key={label}>
                <td>{renderInline(label)}</td>
                <td>{renderInline(value)}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      )
    case 'lines':
      return (
        <Typography component="p" sx={paragraphSx}>
          {block.lines.map((line, index) => (
            <Box key={line} component="span" sx={{ display: 'block', paddingTop: index ? { xs: fluid(4, 5), md: desktopScaled(6) } : 0 }}>
              {renderInline(line)}
            </Box>
          ))}
        </Typography>
      )
  }
}

export function LegalPage({ page }: LegalPageProps) {
  const { title, subtitle, contents, footer, sections }: LegalDocument = content.legal[page]
  const path = page === 'terms' ? content.footer.terms.href : content.footer.privacy.href
  const sectionGap = { xs: fluid(32, 36), md: desktopScaled(40) }

  return (
    <Box sx={{ ...columnSx, minHeight: '100vh', backgroundColor: COLORS.dark }}>
      <Seo path={path} title={SEO[path].title} description={SEO[path].description} />
      <Header />
      <QuickNav />
      <PageTitle alignDesktop="left" variantDesktop="small" topDesktop={78} widthDesktop={COLUMN_DESKTOP} centerDesktop>
        {title}
      </PageTitle>
      <Typography component="p" sx={{ ...paragraphSx, ...gutterSx, paddingTop: { xs: fluid(14, 16), md: desktopScaled(20) } }}>
        {renderInline(subtitle)}
      </Typography>

      <Box
        component="article"
        sx={{
          ...gutterSx,
          paddingTop: { xs: fluid(40, 44), md: desktopScaled(58) },
          paddingBottom: { xs: fluid(60, 70), md: desktopScaled(110) },
        }}
      >
        {contents && (
          <Box component="nav" aria-label={content.pages.legalContents}>
            <Typography component="h2" sx={headingSx}>
              {content.pages.legalContents}
            </Typography>
            <Box
              component="ul"
              sx={{
                ...textSx,
                margin: 0,
                paddingTop: { xs: fluid(10, 12), md: desktopScaled(12) },
                paddingLeft: { xs: fluid(22, 24), md: desktopScaled(28) },
                '& li + li': { paddingTop: { xs: fluid(4, 5), md: desktopScaled(6) } },
              }}
            >
              {sections.map((section) => (
                <li key={section.heading}>
                  <InlineLink href={`#${section.id}`}>{section.heading}</InlineLink>
                </li>
              ))}
            </Box>
          </Box>
        )}

        {sections.map((section, index) => (
          <Box
            key={section.heading}
            component="section"
            id={section.id}
            sx={{
              paddingTop: index || contents ? sectionGap : 0,
              scrollMarginTop: { xs: fluid(80, 90), md: desktopScaled(120) },
              // Oddělovač mezi sekcemi u dokumentu s obsahem
              ...(contents && {
                marginTop: sectionGap,
                borderTop: `1px solid ${COLORS.gray}`,
              }),
            }}
          >
            <Typography component="h2" sx={headingSx}>
              {section.heading}
            </Typography>
            {section.blocks.map((block, blockIndex) => (
              <LegalBlockView key={blockIndex} block={block} />
            ))}
          </Box>
        ))}

        {footer && (
          <Typography
            component="p"
            sx={{
              ...paragraphSx,
              marginTop: sectionGap,
              paddingTop: sectionGap,
              borderTop: `1px solid ${COLORS.gray}`,
            }}
          >
            {renderInline(footer)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default LegalPage
