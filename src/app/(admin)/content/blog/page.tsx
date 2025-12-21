import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const BlogPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Blog" />
      <EmptyTablePlaceholder 
        title="Blog Posts" 
        columns={['Title', 'Status', 'Date', 'Actions']}
        emptyMessage="No blog posts yet"
      />
      <Footer />
    </>
  )
}

export default BlogPage
