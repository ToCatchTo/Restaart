// Registrace – /registrace, odesílá se do rezervačního systému
import { content } from '../content'
import { SEO } from '../seo'
import AuthForm from '../components/AuthForm'
import Seo from '../components/Seo'

export function RegisterPage() {
  const { title, action, fields, consent, submit, submitIcon, haveAccount, login, loginHref, image } = content.pages.register

  return (
    <>
      <Seo path="/registrace" title={SEO['/registrace'].title} description={SEO['/registrace'].description} noindex />
      <AuthForm
        title={title}
        action={action}
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
