import React from "react";
import { Link } from "react-router-dom";
import { useAboutPageSettings } from "../../../hooks/useAboutPageSettings";
import { useBlogPosts } from "../../../hooks/useBlogPosts";

function LatesNewsArea() {
  const { latestNews } = useAboutPageSettings();
  const { posts } = useBlogPosts();
  
  // If section is disabled, don't render
  if (!latestNews.enabled) {
    return null;
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Get the number of posts to display (default 2)
  const postsToShow = posts.slice(0, latestNews.posts_count || 2);

  // Format date helper using native Intl.DateTimeFormat (no external dependencies)
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      
      // Format: "05 January, 2021" (matching Finibus demo style)
      const day = date.getDate().toString().padStart(2, '0');
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
      const year = date.getFullYear();
      
      return `${day} ${month}, ${year}`;
    } catch {
      return '';
    }
  };
  
  return (
    <>
      <section className="latest-news sec-mar">
        <div className="container">
          <div className="row gx-4">
            {postsToShow.map((post) => (
              <div className="col-md-6 col-lg-4 col-xl-4" key={post.id}>
                <div className="signle-news">
                  <div className="tag">
                    <Link onClick={scrollTop} to="/">{post.category || 'General'}</Link>
                  </div>
                  <div className="post-img">
                    <Link onClick={scrollTop} to={`/blog/${post.slug}`}>
                      <img
                        src={post.featured_image?.public_url || ''}
                        alt={post.title}
                      />
                    </Link>
                  </div>
                  <div className="news-content">
                    <div className="author">
                      <div className="author-pic">
                        <img
                          src="/images/author/author-1.jpg"
                          alt="author"
                        />
                      </div>
                      <div className="author-info">
                        <h5>Posted by, Admin</h5>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                    <h3>
                      <Link onClick={scrollTop} to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="view-btn">
                      <Link onClick={scrollTop} to={`/blog/${post.slug}`}>
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="title black">
                <span>{latestNews.section_label}</span>
                <h2>{latestNews.section_title}</h2>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to={latestNews.view_all_url}>
                    {latestNews.view_all_label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LatesNewsArea;
