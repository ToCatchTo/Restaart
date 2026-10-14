// Formulář přihlášení / registrace – statická podoba bez odeslání
import { Fragment, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Checkbox from '@mui/material/Checkbox'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import type { ResponsiveStyleValue } from '@mui/system'
import { Link } from 'react-router-dom'
import { desktopType, fluid, fluidBetween, fluidDesktop, round } from '../fluid'
import { COLORS, DESKTOP_MAX_WIDTH, columnSx, frostedButtonSx } from '../theme'
import type { AuthAside, AuthField } from '../types'
import FooterCredit from './FooterCredit'
import Header from './Header'
import Icon from './Icon'
import PageBackground from './PageBackground'

interface AuthFormProps {
  title: string
  fields: AuthField[]
  submit: string
  submitIcon: string
  image: string
  // Poznámka pod tlačítkem s odkazem na druhý formulář
  note: { text: string; linkLabel: string; href: string }
  // Povinný souhlas s podmínkami pod poli (jen registrace)
  consent?: {
    before: string
    termsLabel: string
    termsHref: string
    between: string
    privacyLabel: string
    privacyHref: string
    after: string
    ariaLabel: string
  }
  // Druhá část stránky s odkazem na rozpis – desktop pravý panel, mobil blok pod formulářem
  aside?: AuthAside
}

interface ArrowButtonProps {
  label: string
  icon: string
  // Bez odkazu jde o odeslání formuláře
  href?: string
  minWidth: ResponsiveStyleValue<string>
  textWidth: ResponsiveStyleValue<string>
  paddingLeft: ResponsiveStyleValue<string>
}

// Od této šířky jsou pole delšího formuláře ve dvou sloupcích a stránka s druhou částí ve dvou půlkách vedle sebe
const WIDE_MQ = '@media (min-width: 900px)'
const XL_MQ = '@media (min-width: 1920px)'
const FIELD_WIDTH = fluidDesktop(280, 316)

// Desktop se druhou částí: levý panel s fotkou 1029 px z 1920, obsah vycentrovaný na x = 575 (vlevo) a 1364 (vpravo)
const PHOTO_PANEL_WIDTH_PX = 1029
const PHOTO_PANEL_WIDTH = `${round((PHOTO_PANEL_WIDTH_PX / DESKTOP_MAX_WIDTH) * 100)}%`
// Nad 1920 px je sloupec obsahu vycentrovaný, hrana panelu zůstává 69 px za středem okna
const PHOTO_PANEL_WIDTH_WIDE = `calc(50% + ${PHOTO_PANEL_WIDTH_PX - DESKTOP_MAX_WIDTH / 2}px)`
// Formulář je vycentrovaný v panelu posunutém zleva o 11,76 % šířky panelu
const FORM_OFFSET_RATIO = 0.1176
const FORM_OFFSET_LEFT = `${FORM_OFFSET_RATIO * 100}%`
// Kredit autora webu sdílí střed s formulářem – odsazení od okrajů sekce se počítá ze šířky vycentrovaného sloupce
const COLUMN_WIDTH = `min(100%, ${DESKTOP_MAX_WIDTH}px)`
const COLUMN_GUTTER = `(100% - ${COLUMN_WIDTH}) / 2`
const CREDIT_OFFSET_LEFT = `calc(${COLUMN_GUTTER} + ${COLUMN_WIDTH} * ${round((PHOTO_PANEL_WIDTH_PX / DESKTOP_MAX_WIDTH) * FORM_OFFSET_RATIO)})`
const CREDIT_OFFSET_RIGHT = `calc(${COLUMN_GUTTER} + ${COLUMN_WIDTH} * ${round(1 - PHOTO_PANEL_WIDTH_PX / DESKTOP_MAX_WIDTH)})`
// Pravý odstup druhé části: 221 px z 1920 (24,8 % panelu), směrem k 900 px plynule mizí, obsah se posouvá do středu panelu
const ASIDE_OFFSET_RIGHT = fluidBetween(0, 221, 900, 1920)
// Překryv fotky: pod sebou tmavý jako jinde, vedle sebe o něco tmavší (multiply #404040)
const PHOTO_OVERLAY_STACKED = COLORS.overlay
const PHOTO_OVERLAY_SPLIT = 'rgba(0, 0, 0, 0.75)'

// Pole formuláře – bílý rám 1 px, průhledné pozadí
const fieldSx = {
  width: '100%',
  height: { xs: fluid(48, 50), md: fluidDesktop(60, 80) },
  borderRadius: { xs: fluid(24, 25), md: fluidDesktop(30, 40) },
  border: `1px solid ${COLORS.white}`,
  boxSizing: 'border-box',
  paddingLeft: { xs: fluid(29, 30), md: fluidDesktop(30, 41) },
  paddingRight: { xs: fluid(29, 30), md: fluidDesktop(30, 41) },
  color: COLORS.white,
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 25) },
  fontWeight: 600,
  '& input::placeholder': { color: COLORS.white, opacity: 1, fontWeight: 400 },
  // Automatické vyplnění prohlížečem nesmí pole podbarvit
  '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus': {
    WebkitTextFillColor: COLORS.white,
    caretColor: COLORS.white,
    WebkitBackgroundClip: 'text',
    transition: 'background-color 9999s ease-in-out 0s',
  },
} as const

// Poznámka pod tlačítkem
const noteSx = {
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: '20px' },
  fontWeight: 400,
} as const

// Odkazy v textu souhlasu
const consentLinkSx = {
  color: COLORS.cyanLabel,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
} as const

// Sloupec formuláře – mobil přes celou šířku s okraji, desktop podle šířky polí
const formSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: { xs: '100%', md: 'auto' },
  boxSizing: 'border-box',
  paddingTop: fluid(40, 60),
  paddingLeft: { xs: fluid(30, 34), md: 0 },
  paddingRight: { xs: fluid(30, 34), md: 0 },
} as const

// Výška sekce alespoň jako okno prohlížeče
const viewportHeightSx = {
  minHeight: '100vh',
  '@supports (height: 100dvh)': { minHeight: '100dvh' },
} as const

// Prosklené tlačítko se šipkou – odeslání formuláře nebo odkaz
function ArrowButton({ label, icon, href, minWidth, textWidth, paddingLeft }: ArrowButtonProps) {
  const inner: ReactNode = (
    <>
      <Typography
        component="span"
        sx={{
          width: textWidth,
          minWidth: 'max-content',
          textAlign: 'center',
          fontSize: { xs: fluid(16, 17), md: fluidDesktop(18.5, 24) },
          lineHeight: { xs: fluid(20, 21), md: fluidDesktop(22, 25) },
          fontWeight: 400,
          fontStyle: 'italic',
          color: COLORS.white,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ marginLeft: 'auto', lineHeight: 0 }}>
        <Icon src={icon} size={{ xs: fluid(27, 28), md: fluidDesktop(24, 27.8) }} />
      </Box>
    </>
  )
  const sx = {
    ...frostedButtonSx,
    height: { xs: fluid(54, 56), md: fluidDesktop(50, 60) },
    borderRadius: { xs: fluid(27, 28), md: fluidDesktop(25, 40) },
    minWidth,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingLeft,
    paddingRight: { xs: fluid(12, 13), md: fluidDesktop(14, 17) },
  } as const

  if (href) {
    return (
      <ButtonBase component={Link} to={href} sx={sx}>
        {inner}
      </ButtonBase>
    )
  }
  return (
    <ButtonBase type="submit" sx={sx}>
      {inner}
    </ButtonBase>
  )
}

export function AuthForm({ title, fields, submit, submitIcon, image, note, consent, aside }: AuthFormProps) {
  const twoColumns = fields.length > 2

  const form = (
    <Box
      component="form"
      onSubmit={(event) => event.preventDefault()}
      sx={{
        ...formSx,
        // Bez druhé části je u spodního okraje kredit autora webu
        ...(aside
          ? {
              paddingTop: fluid(40, 60),
              paddingBottom: fluid(44, 48),
              [WIDE_MQ]: { paddingTop: fluidDesktop(68, 129), paddingBottom: fluidDesktop(70, 95) },
            }
          : {
              paddingTop: { xs: fluid(40, 60), md: fluidDesktop(90, 171) },
              paddingBottom: { xs: fluid(68, 68), md: fluidDesktop(70, 95) },
            }),
      }}
    >
      <Typography
        component="h1"
        sx={{
          margin: 0,
          fontSize: { xs: fluid(20, 21), md: fluidDesktop(26.5, 30) },
          lineHeight: { xs: fluid(24, 25), md: '30px' },
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
          rowGap: { xs: fluid(14, 15), md: fluidDesktop(18, 23) },
          marginTop: { xs: fluid(23, 24), md: fluidDesktop(24, 30) },
          ...(twoColumns && { [WIDE_MQ]: { gridTemplateColumns: `repeat(2, ${FIELD_WIDTH})` } }),
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

        {consent && (
          <Box
            component="label"
            sx={{
              // Řádek přes oba sloupce mřížky
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'flex-start',
              gap: { xs: fluid(8, 9), md: fluidDesktop(8, 10) },
              cursor: 'pointer',
            }}
          >
            <Checkbox
              required
              name="consent"
              slotProps={{ input: { 'aria-label': consent.ariaLabel } }}
              sx={{
                padding: 0,
                color: COLORS.white,
                '&.Mui-checked': { color: COLORS.cyanLabel },
                '& .MuiSvgIcon-root': { fontSize: { xs: fluid(20, 21), md: fluidDesktop(20, 24) } },
              }}
            />
            <Typography component="span" sx={{ ...noteSx, color: COLORS.white }}>
              {consent.before}
              <Box component={Link} to={consent.termsHref} sx={consentLinkSx}>
                {consent.termsLabel}
              </Box>
              {consent.between}
              <Box component={Link} to={consent.privacyHref} sx={consentLinkSx}>
                {consent.privacyLabel}
              </Box>
              {consent.after}
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: { xs: fluid(29, 30), md: fluidDesktop(34, 45) } }}>
        <ArrowButton
          label={submit}
          icon={submitIcon}
          minWidth={{ xs: fluid(188, 190), md: fluidDesktop(180, 210) }}
          textWidth={{ xs: fluid(137, 140), md: fluidDesktop(125, 155) }}
          paddingLeft={{ xs: fluid(11, 12), md: fluidDesktop(8, 7) }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: { xs: fluid(13, 14), md: fluidDesktop(10, 12) }, paddingTop: { xs: fluid(36, 38), md: fluidDesktop(60, 133) } }}>
        <Typography component="span" sx={{ ...noteSx, color: COLORS.white }}>
          {note.text}
        </Typography>
        <Typography component={Link} to={note.href} sx={{ ...noteSx, color: COLORS.cyanLabel, textDecoration: 'underline' }}>
          {note.linkLabel}
        </Typography>
      </Box>
    </Box>
  )

  if (!aside) {
    return (
      <PageBackground
        image={image}
        // Mobil: bez patičky, fotka pokryje celou výšku okna
        minHeight={{ xs: `max(${fluid(812, 860)}, 100vh)`, md: '0px' }}
        viewportHeight
        position={{ xs: 'center top', md: '50% 42.6%' }}
      >
        <Header action="backToWeb" />
        {form}
        <FooterCredit />
      </PageBackground>
    )
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.teal,
        ...viewportHeightSx,
      }}
    >
      {/* Fotka s překryvem – pod sebou celá sekce (dole ji zakryje tyrkysový blok), vedle sebe levý panel */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: COLORS.dark,
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: '24.5% 0',
          '&::before': { content: '""', position: 'absolute', inset: 0, backgroundColor: PHOTO_OVERLAY_STACKED },
          [WIDE_MQ]: { width: PHOTO_PANEL_WIDTH, backgroundPosition: '0 17.3%', '&::before': { backgroundColor: PHOTO_OVERLAY_SPLIT } },
          [XL_MQ]: { width: PHOTO_PANEL_WIDTH_WIDE },
        }}
      >
        {document.visibilityState !== 'hidden' && <link rel="preload" as="image" href={image} fetchPriority="high" />}
      </Box>

      <Box sx={{ ...columnSx, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header action="backToWeb" />

        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            gridTemplateColumns: '100%',
            gridTemplateRows: '1fr auto',
            [WIDE_MQ]: { gridTemplateColumns: `${PHOTO_PANEL_WIDTH} 1fr`, gridTemplateRows: 'auto' },
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', [WIDE_MQ]: { paddingLeft: FORM_OFFSET_LEFT } }}>{form}</Box>

          {/* Druhá část – odkaz na veřejný rozpis */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxSizing: 'border-box',
              backgroundColor: COLORS.teal,
              paddingTop: fluid(47, 52),
              paddingLeft: fluid(30, 34),
              paddingRight: fluid(30, 34),
              // Pod sebou: místo pro kredit autora webu u spodního okraje
              paddingBottom: fluid(90, 100),
              [WIDE_MQ]: {
                paddingTop: fluidDesktop(108, 206),
                paddingLeft: 0,
                paddingRight: ASIDE_OFFSET_RIGHT,
                paddingBottom: fluidDesktop(70, 95),
              },
            }}
          >
            <Typography
              component="p"
              sx={{
                margin: 0,
                textAlign: 'center',
                fontSize: fluid(20, 21),
                lineHeight: fluid(25, 26),
                fontWeight: 400,
                color: COLORS.white,
                [WIDE_MQ]: { fontSize: desktopType(30), lineHeight: desktopType(35) },
              }}
            >
              {aside.lines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </Typography>
            <Box sx={{ marginTop: fluid(21, 24), [WIDE_MQ]: { marginTop: fluidDesktop(40, 71) } }}>
              <ArrowButton
                label={aside.label}
                icon={aside.icon}
                href={aside.href}
                minWidth={{ xs: fluid(188, 190), md: fluidDesktop(200, 240) }}
                textWidth={{ xs: fluid(137, 140), md: fluidDesktop(160, 195) }}
                paddingLeft={{ xs: fluid(4, 5), md: '0px' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Vedle sebe: kredit na stejné ose jako formulář v levém panelu */}
      <FooterCredit
        sx={{ [WIDE_MQ]: { left: CREDIT_OFFSET_LEFT, right: CREDIT_OFFSET_RIGHT } }}
      />
    </Box>
  )
}

export default AuthForm
