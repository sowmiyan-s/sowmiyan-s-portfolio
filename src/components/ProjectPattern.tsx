import React from 'react';
import './ProjectPattern.css';

const ProjectPattern = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed Background Pattern */}
      <div className="fixed inset-0 z-0 project-pattern-container pointer-events-none" />
      
      {/* Scrollable Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default ProjectPattern;
