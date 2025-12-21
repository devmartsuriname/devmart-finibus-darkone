import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const TestimonialsPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Testimonials" />
      <EmptyTablePlaceholder 
        title="Testimonials" 
        columns={['Author', 'Company', 'Status', 'Actions']}
        emptyMessage="No testimonials yet"
      />
      <Footer />
    </>
  )
}

export default TestimonialsPage
