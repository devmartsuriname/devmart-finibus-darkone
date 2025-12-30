import React from "react";
import { Link } from "react-router-dom";
import { useBlogPosts, BlogPostWithMedia } from "../../../hooks/useBlogPosts";

interface NewsLatterAreaProps {
  black?: string;
}

// Static fallback blog posts (Finibus defaults)
const STATIC_POSTS = [
  {
    id: "static-1",
    category: "Web Design",
    title: "Donec a porttitor phari sod tellus Nunc quis erosn.",
    excerpt: "Aptent taciti sociosqu ad litora torquent pi himenaeos. Praesent nec neque at dolor ti venenatis consectetur eu quis ex.",
    slug: "blog",
    featured_image_url: "/images/post/post-1.jpg",
    author_name: "Alen Jodge",
    author_avatar: "/images/author/author-1.jpg",
    published_at: "05 January, 2022"
  },
  {
    id: "static-2",
    category: "Software",
    title: "Mekusa a porttitor phari sod tellus algo quis ksro.",
    excerpt: "Aptent taciti sociosqu ad litora torquent pi himenaeos. Praesent nec neque at dolor ti venenatis consectetur eu quis ex.",
    slug: "blog",
    featured_image_url: "/images/post/post-2.jpg",
    author_name: "Kim karden",
    author_avatar: "/images/author/author-2.jpg",
    published_at: "05 January, 2022"
  }
];

function formatDate(dateString: string | null): string {
  if (!dateString) return "Recent";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
}

function NewsLatterArea({ black = "" }: NewsLatterAreaProps) {
  const { posts: dbPosts } = useBlogPosts();
  
  // Use first 2 DB posts or fallback to static
  const displayPosts = dbPosts.length > 0 
    ? dbPosts.slice(0, 2).map((p, i) => ({
        id: p.id,
        category: p.category || "Blog",
        title: p.title,
        excerpt: p.excerpt || "Read more about this topic...",
        slug: p.slug,
        featured_image_url: p.featured_image?.public_url || STATIC_POSTS[i % 2].featured_image_url,
        author_name: "Admin", // Blog posts don't have author name exposed
        author_avatar: STATIC_POSTS[i % 2].author_avatar,
        published_at: formatDate(p.published_at)
      }))
    : STATIC_POSTS;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      <section className="latest-news sec-mar">
        <div className="container">
          <div className="row gx-4">
            {displayPosts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-4 col-xl-4">
                <div className="signle-news">
                  <div className="tag">
                    <Link onClick={scrollTop} to="#">
                      {post.category}
                    </Link>
                  </div>
                  <div className="post-img">
                    <Link onClick={scrollTop} to={`/blog/${post.slug}`}>
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                      />
                    </Link>
                  </div>
                  <div className="news-content">
                    <div className="author">
                      <div className="author-pic">
                        <img
                          src={post.author_avatar}
                          alt={post.author_name}
                        />
                      </div>
                      <div className="author-info">
                        <h5>Posted by, {post.author_name}</h5>
                        <span>{post.published_at}</span>
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
                        Read Article
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className={`title ${black}`}>
                <span>Blog</span>
                <h2>Latest news And Article modern design.</h2>
                <div className="cmn-btn">
                  <Link onClick={scrollTop} to="/blog">
                    View All Blog
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

export default NewsLatterArea;
