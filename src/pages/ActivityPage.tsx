// Univerzální detail aktivity (sport / regenerace) – /aktivity/:slug
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { desktopScaled, desktopType, fluid, fluidDesktop } from '../fluid'
import { COLORS, DESKTOP, FONT_SECONDARY } from '../theme'
import type { Activity } from '../types'
import { useFetch } from '../hooks/useFetch'
import { usePageTitle } from '../hooks/usePageTitle'
import ClassListAccordion from '../components/ClassListAccordion'
import DataStatus from '../components/DataStatus'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Header from '../components/Header'
import PageBackground from '../components/PageBackground'
import PageTitle from '../components/PageTitle'
import PriceList from '../components/PriceList'
import QuickNav from '../components/QuickNav'
import RevealOnScroll from '../components/RevealOnScroll'

export function ActivityPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useFetch<Activity[]>(content.api.activities)
  const activity = data?.find((item) => item.slug === slug) ?? null
  usePageTitle(activity?.title ?? content.titles.activities)
  return (
    <>
      <PageBackground
        image={activity?.backgroundImage ?? content.hero.image}
        minHeight={{ md: desktopScaled(2083) }}
        overlay={{ xs: 'rgba(0, 0, 0, 0.6)', md: 'rgba(0, 0, 0, 0.7)' }}
        position={{ xs: 'center top', md: '50% 84.5%' }}
        size={{ xs: 'cover', md: '103.75% auto' }}
      >
        <Header />
        <QuickNav />

        {activity ? (
          <>
            <PageTitle topDesktop={120}>{activity.title}</PageTitle>
            {/* Desktop: popis vlevo (674 px) a ceník vpravo (673 px) v CSS gridu */}
            <Box
              sx={{
                display: { md: 'grid' },
                gridTemplateColumns: { md: `${desktopScaled(674)} ${desktopScaled(673)}` },
                columnGap: { md: desktopScaled(95) },
                alignItems: { md: 'start' },
                paddingTop: { md: desktopScaled(119) },
                paddingLeft: { md: desktopScaled(DESKTOP.content) },
              }}
            >
              <Typography
                sx={{
                  paddingTop: { xs: fluid(27, 44), md: desktopScaled(34) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 30) },
                  lineHeight: { xs: fluid(25, 30), md: desktopType(35) },
                  color: COLORS.white,
                  fontFamily: FONT_SECONDARY,
                  fontWeight: 200,
                  letterSpacing: '0.02em',
                  ...fadeInUpSx(),
                }}
              >
                {activity.description}
              </Typography>
              <RevealOnScroll threshold={0.5}>
                <PriceList groups={activity.priceGroups} />
              </RevealOnScroll>
            </Box>
            <Gallery images={activity.gallery} alt={activity.title} />
          </>
        ) : (
          <DataStatus loading={loading} error={error} notFound={!loading && !error} />
        )}
      </PageBackground>

      {activity?.hasClassList && activity.classes && <ClassListAccordion classes={activity.classes} />}
      <Footer rating />
    </>
  )
}

export default ActivityPage
