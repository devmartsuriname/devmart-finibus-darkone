import React from "react";
import { Link } from "react-router-dom";

interface BlogCartProps {
  tag: string;
  postImg: string;
  authorIMG: string;
  // Dynamic props from DB
  slug?: string;
  title?: string;
  excerpt?: string;
  authorName?: string;
  publishedAt?: string;
}

function BlogCart({ 
  tag, 
  postImg, 
  authorIMG,
  slug,
  title,
  excerpt,
  authorName,
  publishedAt
}: BlogCartProps) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Use slug-based URL if slug provided, otherwise fallback to static
  const detailUrl = slug ? `/blog-details/${slug}` : "/blog-details";
  
  // Default values for template parity
  const displayTitle = title || "Donec a porttitor phari sod tellus Nunc quis erosn.";
  const displayExcerpt = excerpt || "Aptent taciti sociosqu ad litora torquent pi himenaeos. Praesent nec neque at dolor ti venenatis consectetur eu quis ex.";
  const displayAuthor = authorName || "Alen Jodge";
  const displayDate = publishedAt || "05 January, 2022";
  
  return (
    <>
      <div className="col-12 col-lg-6 col-xl-6">
        <div className="signle-news">
          <div className="tag">
            <Link onClick={scrollTop} to="/">
              {tag}
            </Link>
          </div>
          <div className="post-img">
            <Link onClick={scrollTop} to={detailUrl}>
              <img src={postImg} alt="blog images" />
            </Link>
          </div>
          <div className="news-content">
            <div className="author">
              <div className="author-pic">
                <img src={authorIMG} alt="blog images" />
              </div>
              <div className="author-info">
                <h5>Posted by, {displayAuthor}</h5>
                <span>{displayDate}</span>
              </div>
            </div>
            <h3>
              <Link onClick={scrollTop} to={detailUrl}>
                {displayTitle}
              </Link>
            </h3>
            <p>
              {displayExcerpt}
            </p>
            <div className="view-btn">
              <Link onClick={scrollTop} to={detailUrl}>
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCart;
