/**
 * ProjectProcess Component
 * 
 * Migrated from Finibus to React 18 - Exact 1:1 parity
 * Phase 5.4+ Hotfix: Bound to DB fields including process steps + check_launch
 * 
 * DB fields used: client, category, description, featured_image, image,
 *                 website, start_date, end_date, check_launch_content, check_launch_image,
 *                 process_steps (from project_process_steps table)
 */

import React from "react";
import { ProjectWithMedia } from "../../../hooks/useProjects";

interface ProjectProcessProps {
  project: ProjectWithMedia | null;
  loading: boolean;
}

/**
 * Format date string to DD.MM.YYYY format (Finibus template format)
 */
function formatDate(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return null;
  }
}

function ProjectProcess({ project, loading }: ProjectProcessProps) {
  // Loading skeleton - preserve layout spacing
  if (loading) {
    return (
      <>
        <div className="project-process">
          <div className="row justify-content-between">
            <div className="col">
              <div className="process-step">
                <h4>Client:</h4>
                <span>Loading...</span>
              </div>
            </div>
            <div className="col">
              <div className="process-step">
                <h4>Services:</h4>
                <span>Loading...</span>
              </div>
            </div>
            <div className="col">
              <div className="process-step">
                <h4>Website:</h4>
                <span>Loading...</span>
              </div>
            </div>
            <div className="col">
              <div className="process-step">
                <h4>Start Date:</h4>
                <span>Loading...</span>
              </div>
            </div>
            <div className="col">
              <div className="process-step">
                <h4>end Date:</h4>
                <span>Loading...</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="process-banner" style={{ minHeight: '300px', background: '#f0f0f0' }}>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Prepare formatted dates - null if not set
  const formattedStartDate = formatDate(project?.start_date);
  const formattedEndDate = formatDate(project?.end_date);

  // Process steps from DB (sorted by step_number ascending)
  const processSteps = project?.process_steps || [];

  return (
    <>
      <div className="project-process">
        {/* Project Meta Row */}
        <div className="row justify-content-between">
          <div className="col">
            <div className="process-step">
              <h4>Client:</h4>
              <span>{project?.client || "Devmart Client"}</span>
            </div>
          </div>
          <div className="col">
            <div className="process-step">
              <h4>Services:</h4>
              <span>{project?.category || "Design & Development"}</span>
            </div>
          </div>
          {/* Website - only show if present */}
          {project?.website && (
            <div className="col">
              <div className="process-step">
                <h4>Website:</h4>
                <span>{project.website}</span>
              </div>
            </div>
          )}
          {/* Start Date - only show if present */}
          {formattedStartDate && (
            <div className="col">
              <div className="process-step">
                <h4>Start Date:</h4>
                <span>{formattedStartDate}</span>
              </div>
            </div>
          )}
          {/* End Date - only show if present */}
          {formattedEndDate && (
            <div className="col">
              <div className="process-step">
                <h4>end Date:</h4>
                <span>{formattedEndDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Featured Image Banner */}
        <div className="row">
          <div className="col-12">
            <div className="process-banner">
              {project?.featured_image?.public_url ? (
                <img
                  src={project.featured_image.public_url}
                  alt={project.featured_image.alt_text || project.title}
                />
              ) : (
                <img
                  src="/images/process-banner.jpg"
                  alt="images"
                />
              )}
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="project-overview">
          <h3>OVERVIEW</h3>
          <div className="row">
            <div className="col-md-5 col-lg-5 col-xl-5">
              <div className="overview-img">
                {project?.image?.public_url ? (
                  <img
                    src={project.image.public_url}
                    alt={project.image.alt_text || project.title}
                  />
                ) : (
                  <img
                    src="/images/overview-1.jpg"
                    alt="images"
                  />
                )}
              </div>
            </div>
            <div className="col-md-7 col-lg-7 col-xl-7">
              <div className="overview-content">
                <h3>{project?.heading || "Our Client Work Brief"}</h3>
                <p>
                  {project?.description || `In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis
                  finibus, metus sapien venenatis orci, eget lacinia magna justo
                  vehicula metus. Morbi sit amet erat faucibus, sagittis libero
                  sed, condimentum tortor. Aenean ac nunc dolor. Quisque
                  vestibulum mollis nisi, vel dictum nisi. Vestibulum tempor
                  tristique neque non pretium. Etiam leo risus, consectetur
                  sagittis ullamcorper scelerisque, blandit vitae sem. Etiam
                  semper enim sapien, nec consequat lectus pellentesque sit
                  amet. Curabitur viverra ac tortor a porttitor. Donec
                  tristique, dui at molestie facilisis, justo dolor dapibus
                  urna, sit amet viverra elit neque a lectus.Etiam semper enim
                  sapien, nec consequat lectus. neque non pretium. Etiam leo
                  risus, consectetur sagittis ullamcorper scelerisque, blandit
                  vitae sem. Etiam semper enim sapien`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Process Steps - Dynamic from DB */}
        {processSteps.length > 0 && (
          <div className="project-overview right">
            <h3>PROJECT PROCESS</h3>
            <div className="row">
              {/* Render steps in reverse visual order (4, 3, 2, 1) matching Finibus layout */}
              {[...processSteps]
                .sort((a, b) => b.step_number - a.step_number)
                .map((step, index) => (
                  <div 
                    key={step.id} 
                    className={`col-md-6 col-lg-3 col-xl-3 or${4 - index}`}
                  >
                    <div className="project-single-step">
                      <h4>{String(step.step_number).padStart(2, '0')}. {step.title}</h4>
                      <div className="project-step-img">
                        {step.image?.public_url ? (
                          <img
                            src={step.image.public_url}
                            alt={step.image.alt_text || step.title}
                          />
                        ) : (
                          <img
                            src={`/images/project/project-single-step-${step.step_number}.jpg`}
                            alt={step.title}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Fallback: Static Process Steps if no DB steps exist */}
        {processSteps.length === 0 && (
          <div className="project-overview right">
            <h3>PROJECT PROCESS</h3>
            <div className="row">
              <div className="col-md-6 col-lg-3 col-xl-3 or4">
                <div className="project-single-step">
                  <h4>04. Developing</h4>
                  <div className="project-step-img">
                    <img
                      src="/images/project/project-single-step-4.jpg"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 or3">
                <div className="project-single-step">
                  <h4>03. UI Design</h4>
                  <div className="project-step-img">
                    <img
                      src="/images/project/project-single-step-3.jpg"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 or2">
                <div className="project-single-step">
                  <h4>02. Wireframe</h4>
                  <div className="project-step-img">
                    <img
                      src="/images/project/project-single-step-2.jpg"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 or1">
                <div className="project-single-step">
                  <h4>01. Brainstorming</h4>
                  <div className="project-step-img">
                    <img
                      src="/images/project/project-single-step-1.jpg"
                      alt="images"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Check & Launch Section - Dynamic from DB */}
        <div className="project-overview">
          <h3>Check &amp; launch</h3>
          <div className="row">
            <div className="col-md-7 col-lg-7 col-xl-7 or2">
              <div className="overview-content">
                <p>
                  {project?.check_launch_content || `In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis
                  finibus, metus sapien venenatis orci, eget lacinia magna justo
                  vehicula metus. Morbi sit amet erat faucibus, sagittis libero
                  sed, condimentum tortor. Aenean ac nunc dolor. Quisque
                  vestibulum mollis nisi, vel dictum nisi. Vestibulum tempor
                  tristique blandit vitae sem. Etiam semper enim sapien, nec
                  consequat lectus pellentesque sit amet. Curabitur viverra ac
                  tortor a porttitor. Donec tristique, dui at molestie
                  facilisis, justo dolor dapibus urna, neque non pretium. Etiam
                  leo risus, consectetur sagittis ullamcorper scelerisque,
                  blandit vitae sem. Etiam semper enim sapien, nec consequat
                  lectus pellentesque sit amet. Curabitur viverra ac tortor a
                  porttitor. Donec tristique, dui at molestie facilisis, justo
                  dolor dapibus urna, sit amet viverra elit neque a lectus.Etiam
                  semper enim sapien, nec consequat lectus pellentesque sit
                  amet. neque non pretium. Etiam leo risus, consectetur sagittis
                  ullamcorper scelerisque, blandit vitae sem. Etiam semper enim
                  sapien`}
                </p>
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-xl-5 or1">
              <div className="overview-img">
                {project?.check_launch_image?.public_url ? (
                  <img
                    src={project.check_launch_image.public_url}
                    alt={project.check_launch_image.alt_text || "Check and launch"}
                  />
                ) : (
                  <img
                    src="/images/overview-2.jpg"
                    alt="images"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectProcess;
