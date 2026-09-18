// Kontakt – /kontakt; desktop: tři sloupce (kontakt + otevírací doba | sociální sítě + adresa | provozovatel)
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
import { useGoogleRating } from '../hooks/useGoogleRating'
import { localBusinessJsonLd, SEO } from '../seo'
import { COLORS, DESKTOP, FONT_SECONDARY } from '../theme'
import ContactInfo from '../components/ContactInfo'
import Footer from '../components/Footer'
import FooterCredit from '../components/FooterCredit'
import Header from '../components/Header'
import Icon from '../components/Icon'
import JsonLd from '../components/JsonLd'
import OpeningHours from '../components/OpeningHours'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'
import Seo from '../components/Seo'

const textSx = {
  display: 'block',
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 25) },
  color: COLORS.white,
  fontFamily: FONT_SECONDARY,
  fontWeight: 200,
  letterSpacing: '0.02em',
} as const

// Mobilní okraje bloků (mimo patičku, která má vlastní)
const gutterSx = { paddingLeft: { xs: fluid(30, 34), md: 0 }, paddingRight: { xs: fluid(30, 34), md: 0 } } as const

// Užší desktop: provozovatel pod prvními dvěma sloupci
const TWO_COLUMN_MQ = '@media (min-width: 600px) and (max-width: 1199.95px)'

// Desktop: sloupec 552 px (x = 278, 830, 1382), nikdy užší než obsah
const columnItemSx = {
  width: { md: desktopScaled(552) },
  minWidth: { md: 'max-content' },
  paddingRight: { md: fluidDesktop(32, 30) },
  boxSizing: 'border-box',
  [TWO_COLUMN_MQ]: { width: 'auto', paddingRight: 0 },
} as const

export function ContactPage() {
  const { addressTitle, addressLines, mapUrl, parkingTitle, parkingLines, social } = content.contact
  const { rating, count, live } = useGoogleRating()

  return (
    <>
      <Seo path="/kontakt" title={SEO['/kontakt'].title} description={SEO['/kontakt'].description} />
      <JsonLd data={localBusinessJsonLd(live ? { value: rating, count } : undefined)} />
      <PageBackground
        image={content.pages.contact.image}
        minHeight={{ xs: fluid(1621, 1700), md: '0px' }}
        viewportHeight
        position={{ xs: 'center top', md: '52.2% 34.3%' }}
        size={{ xs: 'cover', md: '237% auto' }}
      >
        <Header />
        <QuickNav />

        {/* Mobil: bloky pod sebou; desktop: dva řádky sloupců, které se při nedostatku místa zalomí */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            alignItems: { md: 'flex-start' },
            paddingTop: { xs: fluid(102, 122), md: fluidDesktop(110, 236) },
            paddingLeft: { md: desktopScaled(DESKTOP.content) },
            // Místo pro kredit u spodního okraje
            paddingBottom: { md: fluidDesktop(70, 95) },
            [TWO_COLUMN_MQ]: {
              display: 'grid',
              gridTemplateColumns: '1fr max-content',
              columnGap: '32px',
              justifyItems: 'start',
              paddingRight: desktopScaled(DESKTOP.content),
            },
          }}
        >
          <Box sx={{ ...gutterSx, ...columnItemSx, order: { xs: 0, md: 0 }, paddingTop: { md: desktopScaled(0) } }}>
            <ContactInfo size="large" />
          </Box>

          {/* Desktop: zalomení řádku za sociálními sítěmi */}
          <Box aria-hidden sx={{ display: { xs: 'none', md: 'block' }, flexBasis: '100%', order: 2, [TWO_COLUMN_MQ]: { display: 'none' } }} />

          <Box sx={{ ...gutterSx, ...columnItemSx, order: { xs: 1, md: 3 }, paddingTop: { xs: fluid(70, 64), md: fluidDesktop(40, 58) } }}>
            <OpeningHours column />
          </Box>

          <Box sx={{ ...gutterSx, ...columnItemSx, order: { xs: 3, md: 1 }, paddingTop: { xs: fluid(75, 106), md: 0 }, display: 'flex', gap: { xs: fluid(50, 40), md: fluidDesktop(40, 93) } }}>
            {social.map((item) => (
              <ButtonBase
                key={item.label}
                component="a"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                sx={{ borderRadius: '50%' }}
              >
                <Icon src={item.icon} size={{ xs: fluid(46, 48), md: fluidDesktop(34, 45) }} />
              </ButtonBase>
            ))}
          </Box>

          <Box sx={{ ...gutterSx, ...columnItemSx, order: { xs: 2, md: 4 }, paddingTop: { xs: fluid(45, 54), md: fluidDesktop(40, 58) } }}>
            <Typography component="span" sx={textSx}>
              {addressTitle}
            </Typography>
            <Typography component="a" href={mapUrl} target="_blank" rel="noreferrer" sx={{ ...textSx, textDecoration: 'underline' }}>
              {addressLines.map((line) => (
                <Typography key={line} component="span" sx={textSx}>
                  {line}
                </Typography>
              ))}
            </Typography>

            <Box sx={{ paddingTop: { xs: fluid(45, 44), md: fluidDesktop(40, 93) } }}>
              <Typography component="span" sx={textSx}>
                {parkingTitle}
              </Typography>
              {parkingLines.map((line) => (
                <Typography key={line} component="span" sx={textSx}>
                  {line}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ order: { xs: 4, md: 5 }, flexGrow: { md: 1 }, minWidth: { md: 'max-content' }, [TWO_COLUMN_MQ]: { gridColumn: '1 / -1' } }}>
            <Footer compact embedded />
          </Box>
        </Box>

        <FooterCredit />
      </PageBackground>
    </>
  )
}

export default ContactPage
