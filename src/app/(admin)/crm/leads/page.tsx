import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const LeadsPage = () => {
  return (
    <>
      <PageTitle subName="CRM" title="Leads" />
      <EmptyTablePlaceholder 
        title="Leads" 
        columns={['Name', 'Email', 'Source', 'Date', 'Status']}
        emptyMessage="No leads captured yet"
      />
      <Footer />
    </>
  )
}

export default LeadsPage
