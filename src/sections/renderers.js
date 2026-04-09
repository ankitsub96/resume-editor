/**
 * RENDERER MAP — maps renderer key → React component.
 *
 * Resume.jsx looks up: RENDERERS[SECTION_REGISTRY[section.type].renderer]
 * Fallback: GenericSection
 */
import ProjectsSection from './ProjectsSection.jsx';
import WorkSection from './WorkSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import TechSkillsSection from './TechSkillsSection.jsx';
import EducationSection from './EducationSection.jsx';
import GenericSection from './GenericSection.jsx';

export const RENDERERS = {
  projects: ProjectsSection,
  work: WorkSection,
  skills: SkillsSection,
  techSkills: TechSkillsSection,
  education: EducationSection,
  generic: GenericSection,
};
