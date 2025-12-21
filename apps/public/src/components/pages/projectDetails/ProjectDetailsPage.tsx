/**
 * ProjectDetailsPage Component
 * 
 * Migrated from Finibus to React 18 - Exact 1:1 parity
 * Structure matches finibus/src/components/pages/projectDetails/ProjectDetailsPage.jsx
 */

import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import LetsTalkArea from "../../common/LetsTalkArea";
import ProjectProcess from "./ProjectProcess";
import ReletedProject from "./ReletedProject";

function ProjectDetailsPage() {
  return (
    <>
      <Breadcrumb pageName="Project Details" />
      <div className="project-details-area sec-mar">
        <div className="container">
          <ProjectProcess />
          <ReletedProject />
        </div>
      </div>
      <LetsTalkArea />
    </>
  );
}

export default ProjectDetailsPage;