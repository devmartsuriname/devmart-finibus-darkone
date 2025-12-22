import { useState } from 'react'
import { Button, Card, CardBody, ProgressBar, Alert, ListGroup } from 'react-bootstrap'
import { supabase } from '@/integrations/supabase/client'

/**
 * Media Seed Pack Definition
 * Based on Finibus template assets
 * Assets served from: public/seed/finibus/
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
  { filename: 'hero-slider-1.jpg', sourcePath: '/seed/finibus/hero/hero-slider-1.jpg', storagePath: 'finibus/hero/hero-slider-1.jpg', category: 'hero', altText: 'Hero slider image 1 - Modern agency showcase', title: 'Hero Slider 1' },
  { filename: 'hero-slider-2.png', sourcePath: '/seed/finibus/hero/hero-slider-2.png', storagePath: 'finibus/hero/hero-slider-2.png', category: 'hero', altText: 'Hero slider image 2 - Creative agency design', title: 'Hero Slider 2' },
  { filename: 'hero-slider-3.png', sourcePath: '/seed/finibus/hero/hero-slider-3.png', storagePath: 'finibus/hero/hero-slider-3.png', category: 'hero', altText: 'Hero slider image 3 - Digital solutions visual', title: 'Hero Slider 3' },

  // Portfolio Images (9)
  { filename: 'portfolio-1.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-1.jpg', storagePath: 'finibus/portfolio/portfolio-1.jpg', category: 'portfolio', altText: 'Portfolio project 1 thumbnail', title: 'Portfolio 1' },
  { filename: 'portfolio-2.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-2.jpg', storagePath: 'finibus/portfolio/portfolio-2.jpg', category: 'portfolio', altText: 'Portfolio project 2 thumbnail', title: 'Portfolio 2' },
  { filename: 'portfolio-3.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-3.jpg', storagePath: 'finibus/portfolio/portfolio-3.jpg', category: 'portfolio', altText: 'Portfolio project 3 thumbnail', title: 'Portfolio 3' },
  { filename: 'portfolio-4.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-4.jpg', storagePath: 'finibus/portfolio/portfolio-4.jpg', category: 'portfolio', altText: 'Portfolio project 4 thumbnail', title: 'Portfolio 4' },
  { filename: 'portfolio-5.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-5.jpg', storagePath: 'finibus/portfolio/portfolio-5.jpg', category: 'portfolio', altText: 'Portfolio project 5 thumbnail', title: 'Portfolio 5' },
  { filename: 'portfolio-6.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-6.jpg', storagePath: 'finibus/portfolio/portfolio-6.jpg', category: 'portfolio', altText: 'Portfolio project 6 thumbnail', title: 'Portfolio 6' },
  { filename: 'portfolio-7.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-7.jpg', storagePath: 'finibus/portfolio/portfolio-7.jpg', category: 'portfolio', altText: 'Portfolio project 7 thumbnail', title: 'Portfolio 7' },
  { filename: 'portfolio-8.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-8.jpg', storagePath: 'finibus/portfolio/portfolio-8.jpg', category: 'portfolio', altText: 'Portfolio project 8 thumbnail', title: 'Portfolio 8' },
  { filename: 'portfolio-9.jpg', sourcePath: '/seed/finibus/portfolio/portfolio-9.jpg', storagePath: 'finibus/portfolio/portfolio-9.jpg', category: 'portfolio', altText: 'Portfolio project 9 thumbnail', title: 'Portfolio 9' },

  // Blog Post Images (8)
  { filename: 'post-1.jpg', sourcePath: '/seed/finibus/blog/post-1.jpg', storagePath: 'finibus/blog/post-1.jpg', category: 'blog', altText: 'Blog post featured image 1', title: 'Blog Post 1' },
  { filename: 'post-2.jpg', sourcePath: '/seed/finibus/blog/post-2.jpg', storagePath: 'finibus/blog/post-2.jpg', category: 'blog', altText: 'Blog post featured image 2', title: 'Blog Post 2' },
  { filename: 'post-3.jpg', sourcePath: '/seed/finibus/blog/post-3.jpg', storagePath: 'finibus/blog/post-3.jpg', category: 'blog', altText: 'Blog post featured image 3', title: 'Blog Post 3' },
  { filename: 'post-4.jpg', sourcePath: '/seed/finibus/blog/post-4.jpg', storagePath: 'finibus/blog/post-4.jpg', category: 'blog', altText: 'Blog post featured image 4', title: 'Blog Post 4' },
  { filename: 'post-5.jpg', sourcePath: '/seed/finibus/blog/post-5.jpg', storagePath: 'finibus/blog/post-5.jpg', category: 'blog', altText: 'Blog post featured image 5', title: 'Blog Post 5' },
  { filename: 'post-6.jpg', sourcePath: '/seed/finibus/blog/post-6.jpg', storagePath: 'finibus/blog/post-6.jpg', category: 'blog', altText: 'Blog post featured image 6', title: 'Blog Post 6' },
  { filename: 'post-7.jpg', sourcePath: '/seed/finibus/blog/post-7.jpg', storagePath: 'finibus/blog/post-7.jpg', category: 'blog', altText: 'Blog post featured image 7', title: 'Blog Post 7' },
  { filename: 'post-8.jpg', sourcePath: '/seed/finibus/blog/post-8.jpg', storagePath: 'finibus/blog/post-8.jpg', category: 'blog', altText: 'Blog post featured image 8', title: 'Blog Post 8' },

  // Author Avatars (7)
  { filename: 'author-1.jpg', sourcePath: '/seed/finibus/avatars/author-1.jpg', storagePath: 'finibus/avatars/author-1.jpg', category: 'avatars', altText: 'Author avatar 1', title: 'Author 1' },
  { filename: 'author-2.jpg', sourcePath: '/seed/finibus/avatars/author-2.jpg', storagePath: 'finibus/avatars/author-2.jpg', category: 'avatars', altText: 'Author avatar 2', title: 'Author 2' },
  { filename: 'author-3.jpg', sourcePath: '/seed/finibus/avatars/author-3.jpg', storagePath: 'finibus/avatars/author-3.jpg', category: 'avatars', altText: 'Author avatar 3', title: 'Author 3' },
  { filename: 'author-4.jpg', sourcePath: '/seed/finibus/avatars/author-4.jpg', storagePath: 'finibus/avatars/author-4.jpg', category: 'avatars', altText: 'Author avatar 4', title: 'Author 4' },
  { filename: 'author-5.jpg', sourcePath: '/seed/finibus/avatars/author-5.jpg', storagePath: 'finibus/avatars/author-5.jpg', category: 'avatars', altText: 'Author avatar 5', title: 'Author 5' },
  { filename: 'author-6.jpg', sourcePath: '/seed/finibus/avatars/author-6.jpg', storagePath: 'finibus/avatars/author-6.jpg', category: 'avatars', altText: 'Author avatar 6', title: 'Author 6' },
  { filename: 'author-7.jpg', sourcePath: '/seed/finibus/avatars/author-7.jpg', storagePath: 'finibus/avatars/author-7.jpg', category: 'avatars', altText: 'Author avatar 7', title: 'Author 7' },

  // Client Photos (3)
  { filename: 'client-1.jpg', sourcePath: '/seed/finibus/clients/client-1.jpg', storagePath: 'finibus/clients/client-1.jpg', category: 'clients', altText: 'Client testimonial photo 1', title: 'Client 1' },
  { filename: 'client-2.jpg', sourcePath: '/seed/finibus/clients/client-2.jpg', storagePath: 'finibus/clients/client-2.jpg', category: 'clients', altText: 'Client testimonial photo 2', title: 'Client 2' },
  { filename: 'client-3.jpg', sourcePath: '/seed/finibus/clients/client-3.jpg', storagePath: 'finibus/clients/client-3.jpg', category: 'clients', altText: 'Client testimonial photo 3', title: 'Client 3' },

  // Background Images (5)
  { filename: 'counter-bg.png', sourcePath: '/seed/finibus/backgrounds/counter-bg.png', storagePath: 'finibus/backgrounds/counter-bg.png', category: 'backgrounds', altText: 'Counter section background', title: 'Counter Background' },
  { filename: 'footer-bg.png', sourcePath: '/seed/finibus/backgrounds/footer-bg.png', storagePath: 'finibus/backgrounds/footer-bg.png', category: 'backgrounds', altText: 'Footer section background', title: 'Footer Background' },
  { filename: 'hero-bg.png', sourcePath: '/seed/finibus/backgrounds/hero-bg.png', storagePath: 'finibus/backgrounds/hero-bg.png', category: 'backgrounds', altText: 'Hero section background pattern', title: 'Hero Background' },
  { filename: 'testimonial-bg.png', sourcePath: '/seed/finibus/backgrounds/testimonial-bg.png', storagePath: 'finibus/backgrounds/testimonial-bg.png', category: 'backgrounds', altText: 'Testimonial section background', title: 'Testimonial Background' },
  { filename: 'breadcrumbs-bg.png', sourcePath: '/seed/finibus/backgrounds/breadcrumbs-bg.png', storagePath: 'finibus/backgrounds/breadcrumbs-bg.png', category: 'backgrounds', altText: 'Breadcrumbs banner background', title: 'Breadcrumbs Background' },

  // Logos (3)
  { filename: 'logo.png', sourcePath: '/seed/finibus/logos/logo.png', storagePath: 'finibus/logos/logo.png', category: 'logos', altText: 'Finibus main logo', title: 'Main Logo' },
  { filename: 'cto-founder.png', sourcePath: '/seed/finibus/logos/cto-founder.png', storagePath: 'finibus/logos/cto-founder.png', category: 'logos', altText: 'CTO Founder signature image', title: 'CTO Founder' },
  { filename: 'cto-founder-dark.png', sourcePath: '/seed/finibus/logos/cto-founder-dark.png', storagePath: 'finibus/logos/cto-founder-dark.png', category: 'logos', altText: 'CTO Founder signature image dark', title: 'CTO Founder Dark' },
]

type SeedStatus = 'idle' | 'preflight' | 'seeding' | 'complete' | 'error'

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
  const [statusMessage, setStatusMessage] = useState('')
  const [dbRowCount, setDbRowCount] = useState<number | null>(null)
  const [storageStats, setStorageStats] = useState({ uploaded: 0, skipped: 0 })

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

  /**
   * Preflight check: verify asset paths are accessible
   */
  const runPreflightCheck = async (): Promise<boolean> => {
    setStatus('preflight')
    setStatusMessage('Preflight: Checking asset availability...')

    const testAsset = SEED_PACK[0]
    try {
      const response = await fetch(testAsset.sourcePath, { method: 'HEAD' })
      if (!response.ok) {
        setStatus('error')
        setStatusMessage(`Preflight FAILED: Asset path not accessible. HTTP ${response.status} for ${testAsset.sourcePath}. Ensure seed assets exist in public/seed/finibus/.`)
        return false
      }
      setStatusMessage('Preflight: Assets accessible. Starting upload...')
      return true
    } catch (err) {
      setStatus('error')
      setStatusMessage(`Preflight FAILED: Network error fetching ${testAsset.sourcePath}. Check that assets exist in public/seed/finibus/.`)
      return false
    }
  }

  /**
   * Verify DB row count after seeding
   */
  const verifyDbRowCount = async (): Promise<number> => {
    const { count, error } = await supabase
      .from('media')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('DB count verification error:', error)
      return -1
    }
    return count ?? 0
  }

  /**
   * Check if a file already exists in storage
   */
  const checkStorageFileExists = async (storagePath: string): Promise<boolean> => {
    const folder = storagePath.substring(0, storagePath.lastIndexOf('/'))
    const filename = storagePath.substring(storagePath.lastIndexOf('/') + 1)
    
    const { data, error } = await supabase.storage
      .from('media')
      .list(folder, { search: filename })
    
    if (error) {
      console.warn(`Storage list check failed for ${storagePath}:`, error)
      return false
    }
    
    return data?.some(f => f.name === filename) ?? false
  }

  const seedMedia = async () => {
    // Step 1: Get current user (required for RLS)
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      setStatus('error')
      setStatusMessage('Error: You must be logged in as admin to seed media.')
      return
    }

    // Step 2: Preflight check
    const preflightPassed = await runPreflightCheck()
    if (!preflightPassed) {
      return
    }

    // Step 3: Begin seeding
    setStatus('seeding')
    setProgress(0)
    setResults([])
    setStorageStats({ uploaded: 0, skipped: 0 })

    const totalItems = SEED_PACK.length
    const newResults: SeedResult[] = []
    let storageUploaded = 0
    let storageSkipped = 0

    for (let i = 0; i < SEED_PACK.length; i++) {
      const item = SEED_PACK[i]
      setCurrentFile(item.filename)
      
      try {
        // Check if file already exists in storage
        const fileExists = await checkStorageFileExists(item.storagePath)
        let fileSize = 0
        
        if (fileExists) {
          // File exists - skip upload, just get size estimate
          storageSkipped++
          setStatusMessage(`Skipping upload (exists): ${item.filename} (${i + 1}/${totalItems})`)
          fileSize = 1024 // Estimate for existing files
        } else {
          // File doesn't exist - fetch and upload
          setStatusMessage(`Uploading: ${item.filename} (${i + 1}/${totalItems})`)
          
          const response = await fetch(item.sourcePath)
          if (!response.ok) {
            throw new Error(`Fetch failed: HTTP ${response.status} - ${item.sourcePath}`)
          }

          const blob = await response.blob()
          const file = new File([blob], item.filename, { type: getMimeType(item.filename) })
          fileSize = file.size

          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(item.storagePath, file, { upsert: true })

          if (uploadError) {
            throw new Error(`Storage error: ${uploadError.message}`)
          }
          storageUploaded++
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(item.storagePath)

        // Upsert metadata row - always do this to ensure DB is in sync
        const { error: insertError } = await supabase
          .from('media')
          .upsert({
            filename: item.filename,
            storage_path: item.storagePath,
            public_url: urlData.publicUrl,
            file_type: getMimeType(item.filename),
            file_size: fileSize,
            alt_text: item.altText,
            title: item.title,
            uploaded_by: user.id,
          }, { 
            onConflict: 'storage_path',
            ignoreDuplicates: false 
          })

        if (insertError) {
          throw new Error(`Database error: ${insertError.message}`)
        }

        newResults.push({ filename: item.filename, success: true })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Failed to seed ${item.filename}:`, err)
        newResults.push({ filename: item.filename, success: false, error: errorMessage })
      }

      setProgress(Math.round(((i + 1) / totalItems) * 100))
      setResults([...newResults])
      setStorageStats({ uploaded: storageUploaded, skipped: storageSkipped })
    }

    // Log storage stats
    console.log(`Storage: ${storageUploaded} uploaded, ${storageSkipped} skipped (already existed)`)

    // Step 4: Verify DB row count
    const rowCount = await verifyDbRowCount()
    setDbRowCount(rowCount)

    const successCount = newResults.filter(r => r.success).length
    const failCount = newResults.filter(r => !r.success).length

    if (failCount === 0) {
      setStatus('complete')
      setStatusMessage(`Seeding complete: ${successCount} files processed successfully.`)
    } else if (successCount > 0) {
      setStatus('complete')
      setStatusMessage(`Seeding finished: ${successCount} succeeded, ${failCount} failed.`)
    } else {
      setStatus('error')
      setStatusMessage('Seeding failed: No files were uploaded. Check console for details.')
    }

    // Trigger parent refresh
    onComplete()
  }

  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  return (
    <Card className="border-warning mb-4">
      <CardBody>
        <h5 className="mb-3">Media Seed Tool</h5>

        <Alert variant="info" className="mb-3">
          <strong>Seed Pack:</strong> {SEED_PACK.length} Finibus template assets
          <br />
          <small className="text-muted">
            Categories: Hero (3), Portfolio (9), Blog (8), Avatars (7), Clients (3), Backgrounds (5), Logos (3)
          </small>
        </Alert>

        {status === 'idle' && (
          <Button variant="warning" onClick={seedMedia}>
            Start Seeding
          </Button>
        )}

        {status === 'preflight' && (
          <div>
            <p className="mb-2">
              <strong>Status:</strong> {statusMessage}
            </p>
            <ProgressBar 
              now={10} 
              label="Checking..." 
              animated 
              striped 
              variant="info"
            />
          </div>
        )}

        {status === 'seeding' && (
          <div>
            <p className="mb-2">
              <strong>Status:</strong> {statusMessage}
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
              {storageStats.skipped > 0 && ` (${storageStats.skipped} already in storage)`}
            </small>
          </div>
        )}

        {status === 'complete' && (
          <div>
            <Alert variant={failCount === 0 ? 'success' : 'warning'}>
              <strong>Result:</strong> {statusMessage}
              <br />
              <span>Success: {successCount} files</span>
              {failCount > 0 && (
                <>
                  <br />
                  <span>Failed: {failCount} files</span>
                </>
              )}
              <br />
              <span>Storage: {storageStats.uploaded} uploaded, {storageStats.skipped} skipped (existed)</span>
              {dbRowCount !== null && (
                <>
                  <br />
                  <strong>DB rows in media: {dbRowCount}</strong>
                </>
              )}
            </Alert>

            {failCount > 0 && (
              <ListGroup className="mt-3" style={{ maxHeight: '200px', overflow: 'auto' }}>
                <ListGroup.Item variant="light">
                  <strong>Failed Files:</strong>
                </ListGroup.Item>
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
            <strong>Error:</strong> {statusMessage}
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
