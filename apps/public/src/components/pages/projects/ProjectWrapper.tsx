/**
 * ProjectWrapper Component
 * 
 * Phase 5.4: Now fetches projects from DB and passes to CartFilter
 * CartFilter remains presentational (receives projects as prop)
 */

import React from "react";
import CartFilter from "../../common/CartFilter";
import { useProjects } from "../../../hooks/useProjects";

function ProjectWrapper() {
  const { projects, loading } = useProjects();

  return (
    <>
      <section className="project-area sec-mar">
        <div className="container">
          <CartFilter projects={projects} loading={loading} />
        </div>
      </section>
    </>
  );
}

export default ProjectWrapper;
