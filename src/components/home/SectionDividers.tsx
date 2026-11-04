import React from 'react';

/**
 * Clean, geometric bespoke section dividers
 */

// 01. Red Pill Bar (Hero → Metrics)
export const HeroToMetricsDivider: React.FC = () => (
  <div className="w-full flex items-center justify-center py-6 sm:py-8 bg-[#FAFAF9]" aria-hidden="true">
    <div className="w-28 sm:w-36 h-2 bg-red-600 rounded-full shadow-brutal-sm" />
  </div>
);

// 02. Three Geometric Dots (Metrics → Work)
export const MetricsToWorkDivider: React.FC = () => (
  <div className="w-full flex items-center justify-center gap-6 py-8 sm:py-10 bg-[#FAFAF9]" aria-hidden="true">
    <span className="w-3 h-3 bg-zinc-900 rounded-full" />
    <span className="w-3.5 h-3.5 bg-red-600 rounded-full shadow-brutal-sm" />
    <span className="w-3 h-3 bg-zinc-900 rounded-full" />
  </div>
);

// 03. Section Line Rule (Work → Skills)
export const WorkToSkillsDivider: React.FC = () => (
  <div className="w-full h-1 bg-zinc-900" aria-hidden="true" />
);

// 04. Minimalist Transition (Skills → Bound By Code)
export const SkillsToMediaDivider: React.FC = () => (
  <div className="w-full h-1 bg-zinc-900" aria-hidden="true" />
);

// 05. Clean Transition (Bound By Code → Medium Blog)
export const MediaToBlogDivider: React.FC = () => (
  <div className="w-full h-1 bg-zinc-900" aria-hidden="true" />
);

// 06. Centered Pill Separator (Blog → Contact)
export const BlogToContactDivider: React.FC = () => (
  <div className="w-full flex items-center justify-center py-8 gap-3 bg-white" aria-hidden="true">
    <div className="w-16 h-1.5 bg-zinc-900 rounded-full" />
    <div className="w-8 h-1.5 bg-red-600 rounded-full" />
    <div className="w-16 h-1.5 bg-zinc-900 rounded-full" />
  </div>
);

// 07. Solid Bottom Rule (Contact → Footer)
export const ContactToFooterDivider: React.FC = () => (
  <div className="w-full h-1 bg-zinc-900" aria-hidden="true" />
);
