import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import ProjectWrapper from "./ProjectWrapper";
import LetsTalkArea from "../../common/LetsTalkArea";

function ProjectsPage() {
  return (
    <>
      <Breadcrumb pageName="Projects" />
      <ProjectWrapper />
      <LetsTalkArea />
    </>
  );
}

export default ProjectsPage;
