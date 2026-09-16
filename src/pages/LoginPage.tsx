// Přihlášení – /prihlaseni (statická podoba přihlášení do rezervačního systému, bez funkčního odeslání)
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { usePageTitle } from '../hooks/usePageTitle'
import { COLORS, frostedButtonSx } from '../theme'
import Header from '../components/Header'
import Icon from '../components/Icon'
import PageBackground from '../components/PageBackground'
import QuickNav from '../components/QuickNav'

// Pole formuláře – bílý rám 1 px, průhledné pozadí (mobilní hodnoty odvozené proporčně, návrh je jen desktopový)
const fieldSx = {
  width: { xs: '100%', md: desktopScaled(316) },
  minWidth: { md: 'max-content' },
  height: { xs: fluid(56, 60), md: desktopType(80) },
  borderRadius: { xs: fluid(28, 30), md: desktopType(40) },
  border: `1px solid ${COLORS.white}`,
  boxSizing: 'border-box',
  paddingLeft: { xs: fluid(28, 30), md: desktopScaled(41) },
  paddingRight: { xs: fluid(28, 30), md: desktopScaled(41) },
  color: COLORS.white,
  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) },
  lineHeight: { xs: fluid(20, 21), md: desktopType(25) },
  fontWeight: 600,
  '& input::placeholder': { color: COLORS.white, opacity: 1 },
} as const

export function LoginPage() {
  const { title, emailLabel, passwordLabel, submit, submitIcon, noAccount, register, registerHref, image } = content.pages.login
  usePageTitle(content.titles.login)

  return (
    <PageBackground
      image={image}
      minHeight={{ xs: fluid(812, 860), md: '0px' }}
      viewportHeight
      overlay={{ xs: 'rgba(0, 0, 0, 0.55)', md: 'rgba(0, 0, 0, 0.7)' }}
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
          paddingTop: { xs: fluid(40, 60), md: desktopScaled(171) },
          paddingLeft: { xs: fluid(30, 34), md: 0 },
          paddingRight: { xs: fluid(30, 34), md: 0 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            margin: 0,
            fontSize: { xs: fluid(26, 28), md: fluidDesktop(26.5, 30) },
            lineHeight: { xs: fluid(30, 32), md: desktopType(30) },
            fontWeight: 400,
            color: COLORS.white,
          }}
        >
          {title}
        </Typography>

        <InputBase type="email" name="email" placeholder={emailLabel} inputProps={{ 'aria-label': emailLabel }} sx={{ ...fieldSx, marginTop: { xs: fluid(24, 26), md: desktopScaled(30) } }} />
        <InputBase type="password" name="password" placeholder={passwordLabel} inputProps={{ 'aria-label': passwordLabel }} sx={{ ...fieldSx, marginTop: { xs: fluid(16, 18), md: desktopScaled(23) } }} />

        <ButtonBase
          type="submit"
          sx={{
            ...frostedButtonSx,
            height: { xs: fluid(50, 52), md: desktopType(60) },
            borderRadius: { xs: fluid(25, 26), md: desktopType(40) },
            minWidth: { xs: fluid(180, 190), md: desktopScaled(210) },
            marginTop: { xs: fluid(32, 36), md: desktopScaled(45) },
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingLeft: { xs: fluid(8, 9), md: desktopScaled(7) },
            paddingRight: { xs: fluid(14, 15), md: desktopScaled(17) },
          }}
        >
          <Typography
            component="span"
            sx={{
              width: { xs: fluid(120, 126), md: desktopScaled(155) },
              minWidth: 'max-content',
              textAlign: 'center',
              fontSize: { xs: fluid(18, 19), md: fluidDesktop(18.5, 24) },
              lineHeight: { xs: fluid(22, 23), md: desktopType(25) },
              fontWeight: 500,
              fontStyle: 'italic',
              color: COLORS.white,
            }}
          >
            {submit}
          </Typography>
          <Box sx={{ marginLeft: 'auto', lineHeight: 0 }}>
            <Icon src={submitIcon} size={{ xs: fluid(24, 25), md: desktopType(27.8) }} />
          </Box>
        </ButtonBase>

        <Box sx={{ display: 'flex', gap: { xs: fluid(10, 11), md: desktopScaled(12) }, paddingTop: { xs: fluid(60, 70), md: desktopScaled(133) } }}>
          <Typography component="span" sx={{ fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) }, lineHeight: { xs: fluid(20, 21), md: desktopType(20) }, color: COLORS.white }}>
            {noAccount}
          </Typography>
          <Typography
            component="a"
            href={registerHref}
            target="_blank"
            rel="noopener"
            sx={{ fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 20) }, lineHeight: { xs: fluid(20, 21), md: desktopType(20) }, color: COLORS.cyanLabel, textDecoration: 'underline' }}
          >
            {register}
          </Typography>
        </Box>
      </Box>
    </PageBackground>
  )
}

export default LoginPage
