/**
 * CartFilter Component (Portfolio Filter)
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 * Phase 5.4: Now receives projects as prop (presentational component)
 * Note: Removed simple-react-lightbox (deprecated, not React 18 compatible)
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProjectWithMedia } from '../../hooks/useProjects'

interface CartFilterProps {
  active?: boolean
  projects?: ProjectWithMedia[]
  loading?: boolean
}

function CartFilter({ active, projects = [], loading = false }: CartFilterProps) {
  const [items, setItems] = useState<ProjectWithMedia[]>(projects)
  const [activeFilter, setActiveFilter] = useState<string>('All')

  // Update items when projects prop changes
  useEffect(() => {
    if (activeFilter === 'All') {
      setItems(projects)
    } else {
      setItems(projects.filter(p => p.category === activeFilter))
    }
  }, [projects, activeFilter])

  // Extract unique categories from projects
  const categories = React.useMemo(() => {
    const cats = new Set(projects.map(p => p.category))
    return Array.from(cats)
  }, [projects])

  const filterItem = (categoryItem: string) => {
    setActiveFilter(categoryItem)
    const updateItems = projects.filter((currentElement) => {
      return currentElement.category === categoryItem
    })
    setItems(updateItems)
  }

  const showAll = () => {
    setActiveFilter('All')
    setItems(projects)
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Loading state
  if (loading) {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="project-tab">
              <ul className="project-filter-tab">
                <li className="active">All</li>
                <li>Loading...</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row g-4 project-items-wrapper">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-md-6 col-lg-4 col-xl-4 project-single-item">
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <div style={{ height: '250px', background: '#f0f0f0' }}></div>
                </div>
                <div className="portfolio-inner">
                  <span>Loading...</span>
                  <h4>Loading...</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="project-tab">
            <ul className="project-filter-tab">
              <li
                className={activeFilter === 'All' ? 'active' : ''}
                onClick={showAll}
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={activeFilter === cat ? 'active' : ''}
                  onClick={() => filterItem(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="row g-4 project-items-wrapper">
        {items.map((element) => {
          const { id, title, slug, heading, category, featured_image, image } = element
          
          // Use image (thumbnail) if available, fallback to featured_image
          const imageUrl = image?.public_url || featured_image?.public_url
          const imageAlt = featured_image?.alt_text || image?.alt_text || heading

          return (
            <div
              key={id}
              className="col-md-6 col-lg-4 col-xl-4 project-single-item uiux"
            >
              <div className="single-portfolio">
                <div className="portfolio-data">
                  {imageUrl ? (
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                      <img src={imageUrl} alt={imageAlt} />
                    </a>
                  ) : (
                    <div style={{ height: '250px', background: '#f0f0f0' }}></div>
                  )}
                </div>
                <div className="portfolio-inner">
                  <span>{category || title}</span>
                  <h4>{heading}</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to={`/project-details/${slug}`}
                      className="case-btn"
                    >
                      View Project
                    </Link>
                    {imageUrl && (
                      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          alt="Search"
                          src="/images/portfolio/search-2.svg"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CartFilter
