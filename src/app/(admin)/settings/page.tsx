import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import ComingSoonPlaceholder from '@/components/placeholders/ComingSoonPlaceholder'

const SettingsPage = () => {
  return (
    <>
      <PageTitle subName="System" title="Settings" />
      <ComingSoonPlaceholder 
        title="Settings – Coming Soon" 
        description="System settings are under development."
      />
      <Footer />
    </>
  )
}

export default SettingsPage
