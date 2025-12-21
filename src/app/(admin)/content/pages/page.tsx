import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const PagesPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Pages" />
      <EmptyTablePlaceholder 
        title="Pages" 
        columns={['Title', 'Slug', 'Status', 'Actions']}
        emptyMessage="No pages yet"
      />
      <Footer />
    </>
  )
}

export default PagesPage
