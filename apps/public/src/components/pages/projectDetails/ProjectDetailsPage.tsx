/**
 * ProjectDetailsPage Component
 * 
 * Migrated from Finibus to React 18 - Exact 1:1 parity
 * Phase 5.4: Wired to Supabase data via useProjectDetails hook
 */

import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../common/Breadcrumb";
import ProjectProcess from "./ProjectProcess";
import ReletedProject from "./ReletedProject";
import LetsTalkArea from "../../common/LetsTalkArea";
import ErrorPage from "../Error/ErrorPage";
import { useProjectDetails } from "../../../hooks/useProjectDetails";

function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, relatedProjects, loading, notFound } = useProjectDetails(slug);

  // Show ErrorPage if slug not found (after loading completes)
  if (!loading && notFound) {
    return <ErrorPage />;
  }

  return (
    <>
      <Breadcrumb pageName={loading ? "Project Details" : (project?.title || "Project Details")} />
      <div className="project-details-area sec-mar">
        <div className="container">
          <ProjectProcess project={project} loading={loading} />
          <ReletedProject projects={relatedProjects} loading={loading} />
        </div>
      </div>
      <LetsTalkArea />
    </>
  );
}

export default ProjectDetailsPage;
