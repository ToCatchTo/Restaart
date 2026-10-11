// E-mail a telefon – malá varianta v patičce, velká na stránce Kontakt
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid, fluidDesktop } from '../fluid'
import { COLORS } from '../theme'

interface ContactInfoProps {
  size?: 'small' | 'large'
}

export function ContactInfo({ size = 'small' }: ContactInfoProps) {
  const large = size === 'large'
  const linkSx = {
    display: 'block',
    fontSize: { xs: large ? fluid(26, 28) : fluid(16, 17), md: fluidDesktop(large ? 26.5 : 16.5, 30) },
    lineHeight: { xs: large ? fluid(50, 34) : fluid(30, 21), md: fluidDesktop(large ? 36 : 27.5, 50) },
    color: COLORS.white,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    '&:hover': { textDecoration: 'underline' },
  } as const

  return (
    <Box>
      <Typography component="a" href={`mailto:${content.contact.email}`} sx={linkSx}>
        {content.contact.email}
      </Typography>
      <Typography component="a" href={content.contact.phoneHref} sx={linkSx}>
        {content.contact.phone}
      </Typography>
      {/* Dovětek k telefonu */}
      <Typography
        component="p"
        sx={{
          margin: 0,
          fontSize: { xs: large ? fluid(14, 15) : fluid(11, 12), md: fluidDesktop(large ? 14 : 11, large ? 18 : 15) },
          lineHeight: { xs: large ? fluid(20, 21) : fluid(16, 17), md: fluidDesktop(large ? 20 : 16, large ? 26 : 22) },
          color: COLORS.white,
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {content.contact.phoneNote}
      </Typography>
    </Box>
  )
}

export default ContactInfo
