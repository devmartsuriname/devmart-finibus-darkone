import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import ComingSoonPlaceholder from '@/components/placeholders/ComingSoonPlaceholder'

const AnalyticsPage = () => {
  return (
    <>
      <PageTitle subName="Devmart" title="Analytics" />
      <ComingSoonPlaceholder 
        title="Analytics – Coming Soon" 
        description="Analytics features are under development."
      />
      <Footer />
    </>
  )
}

export default AnalyticsPage
