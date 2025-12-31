/**
 * Content Blocks → HTML Compiler
 * 
 * Compiles structured content blocks (JSONB) to HTML string
 * for storage in blog_posts.content field.
 * 
 * This maintains dual-storage model:
 * - content_blocks: JSONB (admin authoring source-of-truth)
 * - content: HTML (public rendering)
 */

export interface ContentBlock {
  id: string
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'image'
  content: string
  level?: 2 | 3 | 4           // For headings: h2, h3, h4
  items?: string[]            // For lists
}

/**
 * Escape HTML special characters to prevent XSS
 */
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

/**
 * Compile a single content block to HTML
 */
const compileBlock = (block: ContentBlock): string => {
  switch (block.type) {
    case 'heading': {
      const level = block.level || 2
      return `<h${level}>${escapeHtml(block.content)}</h${level}>`
    }
    
    case 'paragraph': {
      return `<p>${escapeHtml(block.content)}</p>`
    }
    
    case 'list': {
      if (!block.items || block.items.length === 0) {
        return ''
      }
      const items = block.items
        .map(item => `<li>${escapeHtml(item)}</li>`)
        .join('\n  ')
      return `<ul>\n  ${items}\n</ul>`
    }
    
    case 'quote': {
      return `<blockquote>${escapeHtml(block.content)}</blockquote>`
    }
    
    case 'image': {
      // content contains the image URL
      if (!block.content) return ''
      return `<img src="${escapeHtml(block.content)}" alt="" class="img-fluid" />`
    }
    
    default:
      return ''
  }
}

/**
 * Compile array of content blocks to HTML string
 */
export const compileBlocksToHtml = (blocks: ContentBlock[]): string => {
  if (!blocks || blocks.length === 0) {
    return ''
  }
  
  return blocks
    .map(block => compileBlock(block))
    .filter(html => html.length > 0)
    .join('\n\n')
}

/**
 * Validate content blocks structure
 * Returns true if valid, false if invalid
 */
export const validateContentBlocks = (blocks: ContentBlock[]): { valid: boolean; error?: string } => {
  if (!Array.isArray(blocks)) {
    return { valid: false, error: 'Content blocks must be an array' }
  }
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    
    if (!block.id || typeof block.id !== 'string') {
      return { valid: false, error: `Block ${i + 1}: Missing or invalid ID` }
    }
    
    if (!block.type) {
      return { valid: false, error: `Block ${i + 1}: Missing type` }
    }
    
    const validTypes = ['paragraph', 'heading', 'list', 'quote', 'image']
    if (!validTypes.includes(block.type)) {
      return { valid: false, error: `Block ${i + 1}: Invalid type "${block.type}"` }
    }
    
    // Lists require items array
    if (block.type === 'list') {
      if (!block.items || !Array.isArray(block.items)) {
        return { valid: false, error: `Block ${i + 1}: List blocks require items array` }
      }
    } else {
      // Other types require content
      if (block.type !== 'image' && (!block.content || typeof block.content !== 'string')) {
        return { valid: false, error: `Block ${i + 1}: Missing content` }
      }
    }
    
    // Headings: validate level if provided
    if (block.type === 'heading' && block.level) {
      if (![2, 3, 4].includes(block.level)) {
        return { valid: false, error: `Block ${i + 1}: Heading level must be 2, 3, or 4` }
      }
    }
  }
  
  return { valid: true }
}

/**
 * Generate a unique block ID
 */
export const generateBlockId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create a new empty block of given type
 */
export const createEmptyBlock = (type: ContentBlock['type']): ContentBlock => {
  const id = generateBlockId()
  
  switch (type) {
    case 'list':
      return { id, type, content: '', items: [''] }
    case 'heading':
      return { id, type, content: '', level: 2 }
    default:
      return { id, type, content: '' }
  }
}
