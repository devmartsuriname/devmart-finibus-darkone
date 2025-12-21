import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyGridPlaceholder from '@/components/placeholders/EmptyGridPlaceholder'

const MediaPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Media Library" />
      <EmptyGridPlaceholder 
        title="Media Library" 
        emptyMessage="No media files yet"
      />
      <Footer />
    </>
  )
}

export default MediaPage
