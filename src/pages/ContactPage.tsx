// Kontakt – /kontakt
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS } from '../theme'
import { usePageTitle } from '../hooks/usePageTitle'
import ContactInfo from '../components/ContactInfo'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Icon from '../components/Icon'
import OpeningHours from '../components/OpeningHours'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'

const textSx = {
  display: 'block',
  fontSize: fluid(16, 17),
  lineHeight: fluid(20, 21),
  color: COLORS.white,
  fontWeight: 200,
  letterSpacing: '0.02em',
} as const

export function ContactPage() {
  const { addressTitle, addressLines, mapUrl, parkingTitle, parkingLines, social } = content.contact
  usePageTitle(content.titles.contact)

  return (
    <>
      <PageBackground image={content.pages.contact.image} minHeight={fluid(1621, 1700)} overlay="rgba(0, 0, 0, 0.6)">
        <Header />
        <QuickNav />

        <Box sx={{ paddingTop: fluid(102, 122), paddingLeft: fluid(30, 34), paddingRight: fluid(30, 34) }}>
          <ContactInfo size="large" />

          <Box sx={{ paddingTop: fluid(70, 64) }}>
            <OpeningHours />
          </Box>

          <Box sx={{ paddingTop: fluid(45, 54) }}>
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
          </Box>

          <Box sx={{ paddingTop: fluid(45, 44) }}>
            <Typography component="span" sx={textSx}>
              {parkingTitle}
            </Typography>
            {parkingLines.map((line) => (
              <Typography key={line} component="span" sx={textSx}>
                {line}
              </Typography>
            ))}
          </Box>

          <Box sx={{ paddingTop: fluid(75, 106), display: 'flex', gap: fluid(50, 40) }}>
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
                <Icon src={item.icon} size={fluid(46, 48)} />
              </ButtonBase>
            ))}
          </Box>
        </Box>

        <Footer compact embedded />
      </PageBackground>
    </>
  )
}

export default ContactPage
