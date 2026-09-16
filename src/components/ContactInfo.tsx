// E-mail a telefon (malá varianta v patičce, velká na stránce Kontakt)
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'

interface ContactInfoProps {
  size?: 'small' | 'large'
}

export function ContactInfo({ size = 'small' }: ContactInfoProps) {
  const large = size === 'large'
  const linkSx = {
    display: 'block',
    fontSize: large ? fluid(26, 28) : fluid(16, 17),
    lineHeight: large ? fluid(50, 34) : fluid(30, 21),
    color: COLORS.white,
    textDecoration: 'none',
    fontFamily: FONT_SECONDARY,
    fontWeight: 200,
  } as const

  return (
    <Box>
      <Typography component="a" href={`mailto:${content.contact.email}`} sx={linkSx}>
        {content.contact.email}
      </Typography>
      <Typography
        component="a"
        href={content.contact.phoneHref}
        sx={{ ...linkSx }}
      >
        {content.contact.phone}
      </Typography>
    </Box>
  )
}

export default ContactInfo
