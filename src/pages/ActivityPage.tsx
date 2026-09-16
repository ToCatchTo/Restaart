// Univerzální detail aktivity (sport / regenerace) – /aktivity/:slug
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { fadeInUpSx } from '../animations'
import { content } from '../content'
import { fluid } from '../fluid'
import { COLORS, FONT_SECONDARY } from '../theme'
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
  const tempGallery = [
    '/images/activity_gallery_image.png',
    '/images/activity_bg_sauna.png',
    '/images/contact_bg.png',
  ]

  return (
    <>
      <PageBackground image={activity?.backgroundImage ?? content.hero.image} overlay="rgba(0, 0, 0, 0.6)">
        <Header />
        <QuickNav />

        {activity ? (
          <>
            <PageTitle>{activity.title}</PageTitle>
            <Typography
              sx={{
                paddingTop: fluid(27, 44),
                paddingLeft: fluid(30, 34),
                paddingRight: fluid(30, 34),
                fontSize: fluid(16, 17),
                lineHeight: fluid(25, 30),
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
            <Gallery images={tempGallery} alt={activity.title} />
          </>
        ) : (
          <DataStatus loading={loading} error={error} notFound={!loading && !error} />
        )}
      </PageBackground>

      {activity?.hasClassList && activity.classes && <ClassListAccordion classes={activity.classes} />}
      <Footer />
    </>
  )
}

export default ActivityPage
