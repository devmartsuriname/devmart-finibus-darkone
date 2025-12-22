import { useState } from 'react'
import { Button, Card, CardBody, ProgressBar, Alert, ListGroup } from 'react-bootstrap'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'react-toastify'
import IconifyIcon from '@/components/wrapper/IconifyIcon'

/**
 * Media Seed Pack Definition
 * Based on Finibus template assets
 */
const SEED_PACK: Array<{
  filename: string
  sourcePath: string
  storagePath: string
  category: string
  altText: string
  title: string
}> = [
  // Hero Images (3)
  { filename: 'hero-slider-1.jpg', sourcePath: '/finibus/public/images/hero-slider-1.jpg', storagePath: 'finibus/hero/hero-slider-1.jpg', category: 'hero', altText: 'Hero slider image 1 - Modern agency showcase', title: 'Hero Slider 1' },
  { filename: 'hero-slider-2.png', sourcePath: '/finibus/public/images/hero-slider-2.png', storagePath: 'finibus/hero/hero-slider-2.png', category: 'hero', altText: 'Hero slider image 2 - Creative agency design', title: 'Hero Slider 2' },
  { filename: 'hero-slider-3.png', sourcePath: '/finibus/public/images/hero-slider-3.png', storagePath: 'finibus/hero/hero-slider-3.png', category: 'hero', altText: 'Hero slider image 3 - Digital solutions visual', title: 'Hero Slider 3' },

  // Portfolio Images (9)
  { filename: 'portfolio-1.jpg', sourcePath: '/finibus/public/images/portfolio-1.jpg', storagePath: 'finibus/portfolio/portfolio-1.jpg', category: 'portfolio', altText: 'Portfolio project 1 thumbnail', title: 'Portfolio 1' },
  { filename: 'portfolio-2.jpg', sourcePath: '/finibus/public/images/portfolio-2.jpg', storagePath: 'finibus/portfolio/portfolio-2.jpg', category: 'portfolio', altText: 'Portfolio project 2 thumbnail', title: 'Portfolio 2' },
  { filename: 'portfolio-3.jpg', sourcePath: '/finibus/public/images/portfolio-3.jpg', storagePath: 'finibus/portfolio/portfolio-3.jpg', category: 'portfolio', altText: 'Portfolio project 3 thumbnail', title: 'Portfolio 3' },
  { filename: 'portfolio-4.jpg', sourcePath: '/finibus/public/images/portfolio-4.jpg', storagePath: 'finibus/portfolio/portfolio-4.jpg', category: 'portfolio', altText: 'Portfolio project 4 thumbnail', title: 'Portfolio 4' },
  { filename: 'portfolio-5.jpg', sourcePath: '/finibus/public/images/portfolio-5.jpg', storagePath: 'finibus/portfolio/portfolio-5.jpg', category: 'portfolio', altText: 'Portfolio project 5 thumbnail', title: 'Portfolio 5' },
  { filename: 'portfolio-6.jpg', sourcePath: '/finibus/public/images/portfolio-6.jpg', storagePath: 'finibus/portfolio/portfolio-6.jpg', category: 'portfolio', altText: 'Portfolio project 6 thumbnail', title: 'Portfolio 6' },
  { filename: 'portfolio-7.jpg', sourcePath: '/finibus/public/images/portfolio-7.jpg', storagePath: 'finibus/portfolio/portfolio-7.jpg', category: 'portfolio', altText: 'Portfolio project 7 thumbnail', title: 'Portfolio 7' },
  { filename: 'portfolio-8.jpg', sourcePath: '/finibus/public/images/portfolio-8.jpg', storagePath: 'finibus/portfolio/portfolio-8.jpg', category: 'portfolio', altText: 'Portfolio project 8 thumbnail', title: 'Portfolio 8' },
  { filename: 'portfolio-9.jpg', sourcePath: '/finibus/public/images/portfolio-9.jpg', storagePath: 'finibus/portfolio/portfolio-9.jpg', category: 'portfolio', altText: 'Portfolio project 9 thumbnail', title: 'Portfolio 9' },

  // Blog Post Images (8)
  { filename: 'post-1.jpg', sourcePath: '/finibus/public/images/post/post-1.jpg', storagePath: 'finibus/blog/post-1.jpg', category: 'blog', altText: 'Blog post featured image 1', title: 'Blog Post 1' },
  { filename: 'post-2.jpg', sourcePath: '/finibus/public/images/post/post-2.jpg', storagePath: 'finibus/blog/post-2.jpg', category: 'blog', altText: 'Blog post featured image 2', title: 'Blog Post 2' },
  { filename: 'post-3.jpg', sourcePath: '/finibus/public/images/post/post-3.jpg', storagePath: 'finibus/blog/post-3.jpg', category: 'blog', altText: 'Blog post featured image 3', title: 'Blog Post 3' },
  { filename: 'post-4.jpg', sourcePath: '/finibus/public/images/post/post-4.jpg', storagePath: 'finibus/blog/post-4.jpg', category: 'blog', altText: 'Blog post featured image 4', title: 'Blog Post 4' },
  { filename: 'post-5.jpg', sourcePath: '/finibus/public/images/post/post-5.jpg', storagePath: 'finibus/blog/post-5.jpg', category: 'blog', altText: 'Blog post featured image 5', title: 'Blog Post 5' },
  { filename: 'post-6.jpg', sourcePath: '/finibus/public/images/post/post-6.jpg', storagePath: 'finibus/blog/post-6.jpg', category: 'blog', altText: 'Blog post featured image 6', title: 'Blog Post 6' },
  { filename: 'post-7.jpg', sourcePath: '/finibus/public/images/post/post-7.jpg', storagePath: 'finibus/blog/post-7.jpg', category: 'blog', altText: 'Blog post featured image 7', title: 'Blog Post 7' },
  { filename: 'post-8.jpg', sourcePath: '/finibus/public/images/post/post-8.jpg', storagePath: 'finibus/blog/post-8.jpg', category: 'blog', altText: 'Blog post featured image 8', title: 'Blog Post 8' },

  // Author Avatars (7)
  { filename: 'author-1.jpg', sourcePath: '/finibus/public/images/author/author-1.jpg', storagePath: 'finibus/avatars/author-1.jpg', category: 'avatars', altText: 'Author avatar 1', title: 'Author 1' },
  { filename: 'author-2.jpg', sourcePath: '/finibus/public/images/author/author-2.jpg', storagePath: 'finibus/avatars/author-2.jpg', category: 'avatars', altText: 'Author avatar 2', title: 'Author 2' },
  { filename: 'author-3.jpg', sourcePath: '/finibus/public/images/author/author-3.jpg', storagePath: 'finibus/avatars/author-3.jpg', category: 'avatars', altText: 'Author avatar 3', title: 'Author 3' },
  { filename: 'author-4.jpg', sourcePath: '/finibus/public/images/author/author-4.jpg', storagePath: 'finibus/avatars/author-4.jpg', category: 'avatars', altText: 'Author avatar 4', title: 'Author 4' },
  { filename: 'author-5.jpg', sourcePath: '/finibus/public/images/author/author-5.jpg', storagePath: 'finibus/avatars/author-5.jpg', category: 'avatars', altText: 'Author avatar 5', title: 'Author 5' },
  { filename: 'authoe-6.jpg', sourcePath: '/finibus/public/images/author/authoe-6.jpg', storagePath: 'finibus/avatars/author-6.jpg', category: 'avatars', altText: 'Author avatar 6', title: 'Author 6' },
  { filename: 'author-7.jpg', sourcePath: '/finibus/public/images/author/author-7.jpg', storagePath: 'finibus/avatars/author-7.jpg', category: 'avatars', altText: 'Author avatar 7', title: 'Author 7' },

  // Client Photos (3)
  { filename: 'client.jpg', sourcePath: '/finibus/public/images/client.jpg', storagePath: 'finibus/clients/client-1.jpg', category: 'clients', altText: 'Client testimonial photo 1', title: 'Client 1' },
  { filename: 'client-2.jpg', sourcePath: '/finibus/public/images/client-2.jpg', storagePath: 'finibus/clients/client-2.jpg', category: 'clients', altText: 'Client testimonial photo 2', title: 'Client 2' },
  { filename: 'client-3.jpg', sourcePath: '/finibus/public/images/client-3.jpg', storagePath: 'finibus/clients/client-3.jpg', category: 'clients', altText: 'Client testimonial photo 3', title: 'Client 3' },

  // Background Images (5)
  { filename: 'counter-bg.png', sourcePath: '/finibus/public/images/counter-bg.png', storagePath: 'finibus/backgrounds/counter-bg.png', category: 'backgrounds', altText: 'Counter section background', title: 'Counter Background' },
  { filename: 'footer-bg.png', sourcePath: '/finibus/public/images/footer-bg.png', storagePath: 'finibus/backgrounds/footer-bg.png', category: 'backgrounds', altText: 'Footer section background', title: 'Footer Background' },
  { filename: 'hero-bg.png', sourcePath: '/finibus/public/images/hero-bg.png', storagePath: 'finibus/backgrounds/hero-bg.png', category: 'backgrounds', altText: 'Hero section background pattern', title: 'Hero Background' },
  { filename: 'testimonial-bg.png', sourcePath: '/finibus/public/images/testimonial-bg.png', storagePath: 'finibus/backgrounds/testimonial-bg.png', category: 'backgrounds', altText: 'Testimonial section background', title: 'Testimonial Background' },
  { filename: 'breadcrumbs-bg.png', sourcePath: '/finibus/public/images/breadcrumbs-bg.png', storagePath: 'finibus/backgrounds/breadcrumbs-bg.png', category: 'backgrounds', altText: 'Breadcrumbs banner background', title: 'Breadcrumbs Background' },

  // Logos (3)
  { filename: 'logo.png', sourcePath: '/finibus/public/images/logo.png', storagePath: 'finibus/logos/logo.png', category: 'logos', altText: 'Finibus main logo', title: 'Main Logo' },
  { filename: 'ctoFounder.png', sourcePath: '/finibus/public/images/ctoFounder.png', storagePath: 'finibus/logos/cto-founder.png', category: 'logos', altText: 'CTO Founder signature image', title: 'CTO Founder' },
  { filename: 'ctoFounder-dark.png', sourcePath: '/finibus/public/images/ctoFounder-dark.png', storagePath: 'finibus/logos/cto-founder-dark.png', category: 'logos', altText: 'CTO Founder signature image dark', title: 'CTO Founder Dark' },
]

type SeedStatus = 'idle' | 'seeding' | 'complete' | 'error'

interface SeedResult {
  filename: string
  success: boolean
  error?: string
}

const MediaSeedTool = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState<SeedStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<SeedResult[]>([])
  const [currentFile, setCurrentFile] = useState('')

  const getMimeType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
      case 'gif':
        return 'image/gif'
      case 'svg':
        return 'image/svg+xml'
      case 'webp':
        return 'image/webp'
      default:
        return 'application/octet-stream'
    }
  }

  const seedMedia = async () => {
    setStatus('seeding')
    setProgress(0)
    setResults([])

    const totalItems = SEED_PACK.length
    const newResults: SeedResult[] = []

    for (let i = 0; i < SEED_PACK.length; i++) {
      const item = SEED_PACK[i]
      setCurrentFile(item.filename)

      try {
        // Fetch the file from the public path
        const response = await fetch(item.sourcePath)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }

        const blob = await response.blob()
        const file = new File([blob], item.filename, { type: getMimeType(item.filename) })

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(item.storagePath, file, { upsert: true })

        if (uploadError) {
          throw new Error(`Storage: ${uploadError.message}`)
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(item.storagePath)

        // Insert metadata row (upsert based on storage_path)
        const { error: insertError } = await supabase
          .from('media')
          .upsert({
            filename: item.filename,
            storage_path: item.storagePath,
            public_url: urlData.publicUrl,
            file_type: getMimeType(item.filename),
            file_size: file.size,
            alt_text: item.altText,
            title: item.title,
            uploaded_by: null, // System seeded
          }, { 
            onConflict: 'storage_path',
            ignoreDuplicates: false 
          })

        if (insertError) {
          throw new Error(`Database: ${insertError.message}`)
        }

        newResults.push({ filename: item.filename, success: true })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Failed to seed ${item.filename}:`, err)
        newResults.push({ filename: item.filename, success: false, error: errorMessage })
      }

      setProgress(Math.round(((i + 1) / totalItems) * 100))
      setResults([...newResults])
    }

    const successCount = newResults.filter(r => r.success).length
    const failCount = newResults.filter(r => !r.success).length

    if (failCount === 0) {
      setStatus('complete')
      toast.success(`Successfully seeded ${successCount} media files`)
    } else if (successCount > 0) {
      setStatus('complete')
      toast.warn(`Seeded ${successCount} files, ${failCount} failed`)
    } else {
      setStatus('error')
      toast.error('Seeding failed - no files were uploaded')
    }

    onComplete()
  }

  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  return (
    <Card className="border-warning mb-4">
      <CardBody>
        <div className="d-flex align-items-center mb-3">
          <IconifyIcon icon="bx:package" className="text-warning me-2" style={{ fontSize: '24px' }} />
          <h5 className="mb-0">Media Seed Tool</h5>
        </div>

        <Alert variant="info" className="mb-3">
          <strong>Seed Pack:</strong> {SEED_PACK.length} Finibus template assets
          <br />
          <small className="text-muted">
            Categories: Hero (3), Portfolio (9), Blog (8), Avatars (7), Clients (3), Backgrounds (5), Logos (3)
          </small>
        </Alert>

        {status === 'idle' && (
          <Button variant="warning" onClick={seedMedia}>
            <IconifyIcon icon="bx:upload" className="me-1" />
            Start Seeding
          </Button>
        )}

        {status === 'seeding' && (
          <div>
            <p className="mb-2">
              <strong>Uploading:</strong> {currentFile}
            </p>
            <ProgressBar 
              now={progress} 
              label={`${progress}%`} 
              animated 
              striped 
              variant="warning"
            />
            <small className="text-muted mt-2 d-block">
              {results.length} / {SEED_PACK.length} files processed
            </small>
          </div>
        )}

        {status === 'complete' && (
          <div>
            <Alert variant="success">
              <strong>Seeding Complete!</strong>
              <br />
              ✅ {successCount} files uploaded successfully
              {failCount > 0 && (
                <>
                  <br />
                  ⚠️ {failCount} files failed
                </>
              )}
            </Alert>

            {failCount > 0 && (
              <ListGroup className="mt-3" style={{ maxHeight: '200px', overflow: 'auto' }}>
                {results.filter(r => !r.success).map((r, i) => (
                  <ListGroup.Item key={i} variant="danger">
                    <strong>{r.filename}</strong>: {r.error}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        )}

        {status === 'error' && (
          <Alert variant="danger">
            <strong>Seeding Failed</strong>
            <br />
            No files were successfully uploaded. Check console for details.
            <br />
            <Button variant="outline-danger" size="sm" className="mt-2" onClick={seedMedia}>
              Retry
            </Button>
          </Alert>
        )}
      </CardBody>
    </Card>
  )
}

export default MediaSeedTool
