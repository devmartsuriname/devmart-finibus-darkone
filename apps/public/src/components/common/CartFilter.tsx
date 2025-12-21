/**
 * CartFilter Component (Portfolio Filter)
 * 
 * Migrated from Finibus to React 18 + react-router-dom v6
 * Note: Removed simple-react-lightbox (deprecated, not React 18 compatible)
 * Lightbox functionality can be added later with a React 18 compatible library
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Data from '../data/Data'

interface DataItem {
  id: number
  title: string
  heading: string
  image: string
  category: string
}

interface CartFilterProps {
  active?: boolean
}

function CartFilter({ active }: CartFilterProps) {
  const [items, setItems] = useState<DataItem[]>(Data)

  const filterItem = (categoryItem: string) => {
    const updateItems = Data.filter((currentElement: DataItem) => {
      return currentElement.category === categoryItem
    })
    setItems(updateItems)
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="project-tab">
            <ul className="project-filter-tab">
              <li
                className={`${active ? '' : 'active'}`}
                onClick={() => setItems(Data)}
              >
                All
              </li>
              <li onClick={() => filterItem('UI/UX')}>UI/UX</li>
              <li onClick={() => filterItem('Web Design')}>Web Design</li>
              <li onClick={() => filterItem('Developing')}>Developing</li>
              <li onClick={() => filterItem('Graphic Design')}>Graphic Design</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row g-4 project-items-wrapper">
        {items.map((element) => {
          const { id, title, image, heading } = element

          return (
            <div
              key={id}
              className="col-md-6 col-lg-4 col-xl-4 project-single-item uiux"
            >
              <div className="single-portfolio">
                <div className="portfolio-data">
                  <a href={image} target="_blank" rel="noopener noreferrer">
                    <img src={image} alt={heading} />
                  </a>
                </div>
                <div className="portfolio-inner">
                  <span>{title}</span>
                  <h4>{heading}</h4>
                  <div className="portfolio-hover">
                    <Link
                      onClick={scrollTop}
                      to="/project-details"
                      className="case-btn"
                    >
                      Case Study
                    </Link>
                    <a href={image} target="_blank" rel="noopener noreferrer">
                      <img
                        alt="Search"
                        src="/images/portfolio/search-2.svg"
                      />
                    </a>
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
