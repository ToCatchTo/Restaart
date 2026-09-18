// Registrace – /registrace (statická podoba registrace do rezervačního systému, bez funkčního odeslání)
import { content } from '../content'
import { usePageTitle } from '../hooks/usePageTitle'
import AuthForm from '../components/AuthForm'

export function RegisterPage() {
  const { title, fields, consent, submit, submitIcon, haveAccount, login, loginHref, image } = content.pages.register
  usePageTitle(content.titles.register)

  return (
    <AuthForm
      title={title}
      fields={fields}
      submit={submit}
      submitIcon={submitIcon}
      image={image}
      note={{ text: haveAccount, linkLabel: login, href: loginHref }}
      consent={consent}
    />
  )
}

export default RegisterPage
