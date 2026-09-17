// Formulář účtu (přihlášení / registrace) – statická podoba rezervačního systému, bez funkčního odeslání
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { fluid, fluidDesktop } from '../fluid'
import { COLORS, FONT_SECONDARY, frostedButtonSx } from '../theme'
import type { AuthField } from '../types'
import FooterCredit from './FooterCredit'
import Header from './Header'
import Icon from './Icon'
import PageBackground from './PageBackground'
import QuickNav from './QuickNav'

interface AuthFormProps {
  title: string
  fields: AuthField[]
  submit: string
  submitIcon: string
  image: string
  // Poznámka pod tlačítkem s odkazem na druhý formulář
  note: { text: string; linkLabel: string; href: string }
}

// Od této šířky jsou pole delšího formuláře ve dvou sloupcích
const TWO_COLUMN_MQ = '@media (min-width: 900px)'
const FIELD_WIDTH = fluidDesktop(280, 316)

// Pole formuláře – bílý rám 1 px, průhledné pozadí (mobilní hodnoty odvozené proporčně, návrh je jen desktopový)
const fieldSx = {
  width: '100%',
  height: { xs: fluid(56, 60), md: fluidDesktop(60, 80) },
  borderRadius: { xs: fluid(28, 30), md: fluidDesktop(30, 40) },
  border: `1px solid ${COLORS.white}`,
  boxSizing: 'border-box',
  paddingLeft: { xs: fluid(28, 30), md: fluidDesktop(30, 41) },
  paddingRight: { xs: fluid(28, 30), md: fluidDesktop(30, 41) },
  color: COLORS.white,
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 25) },
  fontWeight: 600,
  '& input::placeholder': { color: COLORS.white, opacity: 1, fontWeight: 400 },
  // Automatické vyplnění prohlížečem nesmí pole podbarvit (bílé pozadí Chrome)
  '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
    WebkitTextFillColor: COLORS.white,
    caretColor: COLORS.white,
    WebkitBackgroundClip: 'text',
    transition: 'background-color 9999s ease-in-out 0s',
  },
} as const

// Text „Nemáte účet? Registrovat“ – Outfit 200
const noteSx = {
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: '20px' },
  fontFamily: FONT_SECONDARY,
  fontWeight: 200,
} as const

export function AuthForm({ title, fields, submit, submitIcon, image, note }: AuthFormProps) {
  const twoColumns = fields.length > 2

  return (
    <PageBackground
      image={image}
      // Mobil: stránka nemá patičku, fotka proto vždy pokryje celou výšku okna
      minHeight={{ xs: `max(${fluid(812, 860)}, 100vh)`, md: '0px' }}
      viewportHeight
      position={{ xs: 'center top', md: '50% 42.6%' }}
    >
      <Header action="backToWeb" />
      <QuickNav />

      <Box
        component="form"
        onSubmit={(event) => event.preventDefault()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: { xs: fluid(40, 60), md: fluidDesktop(90, 171) },
          paddingLeft: { xs: fluid(30, 34), md: 0 },
          paddingRight: { xs: fluid(30, 34), md: 0 },
          // Místo pro kredit autora webu u spodního okraje
          paddingBottom: { xs: fluid(68, 68), md: fluidDesktop(70, 95) },
        }}
      >
        <Typography
          component="h1"
          sx={{
            margin: 0,
            fontSize: { xs: fluid(26, 28), md: fluidDesktop(26.5, 30) },
            lineHeight: { xs: fluid(30, 32), md: '30px' },
            fontWeight: 400,
            color: COLORS.white,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            width: { xs: '100%', md: 'auto' },
            gridTemplateColumns: { xs: '100%', md: FIELD_WIDTH },
            columnGap: fluidDesktop(18, 23),
            rowGap: { xs: fluid(16, 18), md: fluidDesktop(18, 23) },
            marginTop: { xs: fluid(24, 26), md: fluidDesktop(24, 30) },
            ...(twoColumns && { [TWO_COLUMN_MQ]: { gridTemplateColumns: `repeat(2, ${FIELD_WIDTH})` } }),
          }}
        >
          {fields.map((field) => (
            <InputBase
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.label}
              autoComplete={field.autoComplete}
              inputProps={{ 'aria-label': field.label }}
              sx={fieldSx}
            />
          ))}
        </Box>

        <ButtonBase
          type="submit"
          sx={{
            ...frostedButtonSx,
            height: { xs: fluid(50, 52), md: fluidDesktop(50, 60) },
            borderRadius: { xs: fluid(25, 26), md: fluidDesktop(25, 40) },
            minWidth: { xs: fluid(180, 190), md: fluidDesktop(180, 210) },
            marginTop: { xs: fluid(32, 36), md: fluidDesktop(34, 45) },
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingLeft: { xs: fluid(8, 9), md: fluidDesktop(8, 7) },
            paddingRight: { xs: fluid(14, 15), md: fluidDesktop(14, 17) },
          }}
        >
          <Typography
            component="span"
            sx={{
              width: { xs: fluid(120, 126), md: fluidDesktop(125, 155) },
              minWidth: 'max-content',
              textAlign: 'center',
              fontSize: { xs: fluid(18, 19), md: fluidDesktop(18.5, 24) },
              lineHeight: { xs: fluid(22, 23), md: fluidDesktop(22, 25) },
              fontFamily: FONT_SECONDARY,
              fontWeight: 200,
              fontStyle: 'italic',
              color: COLORS.white,
            }}
          >
            {submit}
          </Typography>
          <Box sx={{ marginLeft: 'auto', lineHeight: 0 }}>
            <Icon src={submitIcon} size={{ xs: fluid(24, 25), md: fluidDesktop(24, 27.8) }} />
          </Box>
        </ButtonBase>

        <Box sx={{ display: 'flex', gap: { xs: fluid(10, 11), md: fluidDesktop(10, 12) }, paddingTop: { xs: fluid(60, 70), md: fluidDesktop(60, 133) } }}>
          <Typography component="span" sx={{ ...noteSx, color: COLORS.white }}>
            {note.text}
          </Typography>
          <Typography component={Link} to={note.href} sx={{ ...noteSx, color: COLORS.cyanLabel, textDecoration: 'underline' }}>
            {note.linkLabel}
          </Typography>
        </Box>
      </Box>

      <FooterCredit />
    </PageBackground>
  )
}

export default AuthForm
