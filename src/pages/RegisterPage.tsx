// Registrace – /registrace (statická podoba bez odeslání)
import { content } from '../content'
import { SEO } from '../seo'
import AuthForm from '../components/AuthForm'
import Seo from '../components/Seo'

export function RegisterPage() {
  const { title, fields, consent, submit, submitIcon, haveAccount, login, loginHref, image } = content.pages.register

  return (
    <>
      <Seo path="/registrace" title={SEO['/registrace'].title} description={SEO['/registrace'].description} noindex />
      <AuthForm
        title={title}
        fields={fields}
        submit={submit}
        submitIcon={submitIcon}
        image={image}
        note={{ text: haveAccount, linkLabel: login, href: loginHref }}
        consent={consent}
      />
    </>
  )
}

export default RegisterPage
