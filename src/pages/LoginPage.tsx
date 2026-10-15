// Přihlášení – /prihlaseni, odesílá se do rezervačního systému; vedle formuláře odkaz na veřejný rozpis
import { content } from '../content'
import { SEO } from '../seo'
import AuthForm from '../components/AuthForm'
import Seo from '../components/Seo'

export function LoginPage() {
  const { title, action, emailLabel, passwordLabel, submit, submitIcon, noAccount, register, registerHref, image, schedule } = content.pages.login

  return (
    <>
      <Seo path="/prihlaseni" title={SEO['/prihlaseni'].title} description={SEO['/prihlaseni'].description} noindex />
      <AuthForm
        title={title}
        action={action}
        // Názvy polí odpovídají rezervačnímu systému (jmeno = e-mail)
        fields={[
          { type: 'email', name: 'jmeno', label: emailLabel, autoComplete: 'email' },
          { type: 'password', name: 'heslo', label: passwordLabel, autoComplete: 'current-password' },
        ]}
        submit={submit}
        submitIcon={submitIcon}
        image={image}
        note={{ text: noAccount, linkLabel: register, href: registerHref }}
        aside={schedule}
      />
    </>
  )
}

export default LoginPage
