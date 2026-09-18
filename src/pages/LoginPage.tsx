// Přihlášení – /prihlaseni (statická podoba bez odeslání)
import { content } from '../content'
import { SEO } from '../seo'
import AuthForm from '../components/AuthForm'
import Seo from '../components/Seo'

export function LoginPage() {
  const { title, emailLabel, passwordLabel, submit, submitIcon, noAccount, register, registerHref, image } = content.pages.login

  return (
    <>
      <Seo path="/prihlaseni" title={SEO['/prihlaseni'].title} description={SEO['/prihlaseni'].description} noindex />
      <AuthForm
        title={title}
        fields={[
          { type: 'email', name: 'email', label: emailLabel, autoComplete: 'email' },
          { type: 'password', name: 'password', label: passwordLabel, autoComplete: 'current-password' },
        ]}
        submit={submit}
        submitIcon={submitIcon}
        image={image}
        note={{ text: noAccount, linkLabel: register, href: registerHref }}
      />
    </>
  )
}

export default LoginPage
