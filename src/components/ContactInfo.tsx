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
    </Box>
  )
}

export default ContactInfo
