import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import BlogCart from "./BlogCart";
import SidebarSearch from "./SidebarSearch";
import ServiceList from "./ServiceList";
import NewsPost from "./NewsPost";
import PopularTag from "./PopularTag";
import BannerWiget from "./BannerWiget";
import Pagination from "../../common/Pagination";
import LetsTalkArea from "../../common/LetsTalkArea";
import { useBlogPosts } from "../../../hooks/useBlogPosts";

function BlogPage() {
  const { posts, loading, error } = useBlogPosts();

  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <Breadcrumb pageName="Blog" />
      <div className="blog-news sec-mar">
        <div className="container">
          <div className="blog-wrapper">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-xl-4">
                <SidebarSearch />
                <ServiceList />
                <NewsPost />
                <PopularTag />
                <BannerWiget />
              </div>
              <div className="col-md-6 col-lg-8 col-xl-8">
                <div className="row g-4">
                  {loading && (
                    <div className="col-12 text-center py-5">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-danger">{error}</div>
                    </div>
                  )}
                  {!loading && !error && posts.length === 0 && (
                    <div className="col-12">
                      <p className="text-center">No blog posts available.</p>
                    </div>
                  )}
                  {!loading && !error && posts.map((post) => (
                    <BlogCart
                      key={post.id}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt || undefined}
                      tag={post.category || "General"}
                      postImg={post.featured_image?.public_url || "/images/post/post-1.jpg"}
                      authorIMG="/images/author/author-1.jpg"
                      authorName="Devmart Team"
                      publishedAt={formatDate(post.published_at)}
                    />
                  ))}
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LetsTalkArea />
    </>
  );
}

export default BlogPage;
