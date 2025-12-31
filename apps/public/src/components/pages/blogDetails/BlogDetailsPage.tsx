import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import BannerWiget from "../blog/BannerWiget";
import NewsPost from "../blog/NewsPost";
import PopularTag from "../blog/PopularTag";
import ServiceList from "../blog/ServiceList";
import SidebarSearch from "../blog/SidebarSearch";
// BlogDetailsComments removed - see docs/Policy_Blog_Comments_Disabled.md
import BlogDetailsWrapper from "./BlogDetailsWrapper";
import { useBlogDetails } from "../../../hooks/useBlogDetails";

function BlogDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogDetails(slug);

  return (
    <>
      <Breadcrumb pageName={post?.title || "Blog Details"} />
      <div className="blog-news sec-mar">
        <div className="container">
          <div className="blog-wrapper">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-8 or2">
                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}
                {!loading && !error && post && (
                  <BlogDetailsWrapper
                    title={post.title}
                    content={post.content}
                    excerpt={post.excerpt || undefined}
                    featuredImage={post.featured_image?.public_url}
                    publishedAt={post.published_at || undefined}
                    category={post.category || undefined}
                  />
                  // Comments section permanently removed - see docs/Policy_Blog_Comments_Disabled.md
                )}
                {!loading && !error && !post && (
                  <div className="alert alert-warning">Post not found.</div>
                )}
              </div>
              <div className="col-12 col-lg-4 col-xl-4 or1">
                <SidebarSearch />
                <ServiceList />
                <NewsPost />
                <PopularTag />
                <BannerWiget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetailsPage;
