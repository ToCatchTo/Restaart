// Přihlášení – /prihlaseni (statická podoba přihlášení do rezervačního systému, bez funkčního odeslání)
import { content } from '../content'
import { usePageTitle } from '../hooks/usePageTitle'
import AuthForm from '../components/AuthForm'

export function LoginPage() {
  const { title, emailLabel, passwordLabel, submit, submitIcon, noAccount, register, registerHref, image } = content.pages.login
  usePageTitle(content.titles.login)

  return (
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
  )
}

export default LoginPage
