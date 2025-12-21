import Footer from '@/components/layout/Footer'
import PageTitle from '@/components/PageTitle'
import EmptyTablePlaceholder from '@/components/placeholders/EmptyTablePlaceholder'

const ProjectsPage = () => {
  return (
    <>
      <PageTitle subName="Content" title="Projects" />
      <EmptyTablePlaceholder 
        title="Projects" 
        columns={['Name', 'Status', 'Date', 'Actions']}
        emptyMessage="No projects yet"
      />
      <Footer />
    </>
  )
}

export default ProjectsPage
