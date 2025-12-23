/**
 * ProjectProcess Component
 * 
 * Migrated from Finibus to React 18 - Exact 1:1 parity
 * Phase 5.4: Wired to Supabase data
 * 
 * DB fields used: client, category, description, featured_image, image
 * Static template text kept for: Website, Start Date, End Date (not in DB)
 * Process steps section: Template static (projects don't have steps like services)
 */

import React from "react";
import { ProjectWithMedia } from "../../../hooks/useProjects";

interface ProjectProcessProps {
  project: ProjectWithMedia | null;
  loading: boolean;
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

  return (
    <>
      <div className="project-process">
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
          <div className="col">
            <div className="process-step">
              <h4>Website:</h4>
              <span>www.devmart.com</span>
            </div>
          </div>
          <div className="col">
            <div className="process-step">
              <h4>Start Date:</h4>
              <span>09.03.2022</span>
            </div>
          </div>
          <div className="col">
            <div className="process-step">
              <h4>end Date:</h4>
              <span>01.05.2022</span>
            </div>
          </div>
        </div>
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
        {/* Project Process Steps - Template static content (projects don't have steps like services) */}
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
        <div className="project-overview">
          <h3>Check &amp; launch</h3>
          <div className="row">
            <div className="col-md-7 col-lg-7 col-xl-7 or2">
              <div className="overview-content">
                <p>
                  In euismod lacinia rhoncus. Morbi ornare, lectus quis mattis
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
                  sapien
                </p>
              </div>
            </div>
            <div className="col-md-5 col-lg-5 col-xl-5 or1">
              <div className="overview-img">
                <img
                  src="/images/overview-2.jpg"
                  alt="images"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectProcess;
