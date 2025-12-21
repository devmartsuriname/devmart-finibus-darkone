import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import ComingSoonPlaceholder from '@/components/placeholders/ComingSoonPlaceholder'

const DashboardPage = () => {
  return (
    <>
      <PageTitle subName="Devmart" title="Dashboard" />
      <ComingSoonPlaceholder 
        title="Admin Dashboard – Coming Soon" 
        description="Dashboard features are under development."
      />
      <Footer />
    </>
  )
}

export default DashboardPage
