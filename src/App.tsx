// Kořenová komponenta – obal aplikace a definice cest
import { Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import { content } from './content'
import ActivityPage from './pages/ActivityPage'
import ContactPage from './pages/ContactPage'
import EventDetailPage from './pages/EventDetailPage'
import EventsPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aktivity/:slug" element={<ActivityPage />} />
        <Route path="/akce" element={<EventsPage />} />
        <Route path="/akce/:slug" element={<EventDetailPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/prihlaseni" element={<LoginPage />} />
        <Route path={content.footer.terms.href} element={<LegalPage page="terms" />} />
        <Route path={content.footer.privacy.href} element={<LegalPage page="privacy" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
