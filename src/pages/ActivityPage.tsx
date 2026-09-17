// Univerzální detail aktivity (sport / regenerace) – /aktivity/:slug
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { desktopScaled, fluid, fluidDesktop } from '../fluid'
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

// Od této šířky je popis a ceník vedle sebe, pod ní pod sebou
const SIDE_BY_SIDE_MQ = '@media (min-width: 900px)'

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
            {/* Desktop od 900 px: popis vlevo (674 px) a ceník vpravo (673 px) v CSS gridu; užší okna: pod sebou */}
            <Box
              sx={{
                paddingTop: { md: desktopScaled(119) },
                paddingLeft: { md: desktopScaled(DESKTOP.content) },
                paddingRight: { md: desktopScaled(DESKTOP.content) },
                [SIDE_BY_SIDE_MQ]: {
                  display: 'grid',
                  gridTemplateColumns: `${desktopScaled(674)} ${desktopScaled(673)}`,
                  columnGap: desktopScaled(95),
                  alignItems: 'start',
                  paddingRight: 0,
                },
              }}
            >
              <Typography
                sx={{
                  paddingTop: { xs: fluid(27, 44), md: desktopScaled(34) },
                  paddingLeft: { xs: fluid(30, 34), md: 0 },
                  paddingRight: { xs: fluid(30, 34), md: 0 },
                  fontSize: { xs: fluid(16, 17), md: fluidDesktop(16.5, 30) },
                  lineHeight: { xs: fluid(25, 30), md: fluidDesktop(26, 35) },
                  color: COLORS.white,
                  fontFamily: FONT_SECONDARY,
                  fontWeight: 200,
                  letterSpacing: '0.02em',
                  ...fadeInUpSx(),
                }}
              >
                {activity.description}
              </Typography>
              <Box sx={{ paddingTop: { md: fluidDesktop(48, 60) }, [SIDE_BY_SIDE_MQ]: { paddingTop: 0 } }}>
                <PriceList groups={activity.priceGroups} />
              </Box>
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
