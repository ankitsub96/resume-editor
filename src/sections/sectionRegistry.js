import { nanoid } from '../utils/nanoid.js';

/**
 * SECTION REGISTRY — single source of truth for all section types.
 *
 * To add a new section type:
 *  1. Add an entry here
 *  2. Optionally add a dedicated renderer component in renderers.js
 *     (or reuse 'generic' for simple bullet-list sections)
 */
export const SECTION_REGISTRY = {
  projects: {
    type: 'projects',
    label: 'Projects',
    icon: '◈',
    defaultTitle: 'Projects',
    renderer: 'projects',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'New Project',
      subtitle: '',
      period: '',
      bullets: ['Describe what you built and the impact it had'],
    }),
  },

  work: {
    type: 'work',
    label: 'Work Experience',
    icon: '💼',
    defaultTitle: 'Work Experience',
    renderer: 'work',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      jobTitle: 'Job Title',
      company: 'Company Name',
      period: 'MM/YYYY – Present',
      location: '',
      bullets: ['Describe your responsibilities and achievements'],
    }),
  },

  skills: {
    type: 'skills',
    label: 'Core Skills',
    icon: '⚡',
    defaultTitle: 'Core Skills',
    renderer: 'skills',
    addable: true,
    makeItem: () => ({ id: nanoid(), label: 'New Skill' }),
  },

  techSkills: {
    type: 'techSkills',
    label: 'Technical Skills',
    icon: '🔧',
    defaultTitle: 'Technical Skills',
    renderer: 'techSkills',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      category: 'Category',
      skills: 'Skill A, Skill B, Skill C',
    }),
  },

  education: {
    type: 'education',
    label: 'Education',
    icon: '🎓',
    defaultTitle: 'Education',
    renderer: 'education',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      degree: 'Degree / Field of Study',
      institution: 'University Name',
      period: 'MM/YYYY – MM/YYYY',
      location: '',
      gpa: '',
    }),
  },

  certificates: {
    type: 'certificates',
    label: 'Certificates',
    icon: '📜',
    defaultTitle: 'Certificates',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Certificate Name',
      subtitle: 'Issuing Organization',
      period: 'YYYY',
      bullets: [],
    }),
  },

  languages: {
    type: 'languages',
    label: 'Languages',
    icon: '🌐',
    defaultTitle: 'Languages',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Language',
      subtitle: 'Proficiency level',
      period: '',
      bullets: [],
    }),
  },

  achievements: {
    type: 'achievements',
    label: 'Achievements',
    icon: '🏆',
    defaultTitle: 'Achievements',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Achievement Title',
      subtitle: '',
      period: '',
      bullets: ['Describe the achievement'],
    }),
  },

  volunteer: {
    type: 'volunteer',
    label: 'Volunteer',
    icon: '🤝',
    defaultTitle: 'Volunteer Work',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Role',
      subtitle: 'Organization',
      period: '',
      bullets: ['Describe your contribution'],
    }),
  },

  interests: {
    type: 'interests',
    label: 'Interests',
    icon: '★',
    defaultTitle: 'Interests',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Interest',
      subtitle: '',
      period: '',
      bullets: [],
    }),
  },

  publications: {
    type: 'publications',
    label: 'Publications',
    icon: '📖',
    defaultTitle: 'Publications',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Publication Title',
      subtitle: 'Publisher / Journal',
      period: 'YYYY',
      bullets: [],
    }),
  },

  references: {
    type: 'references',
    label: 'References',
    icon: '👤',
    defaultTitle: 'References',
    renderer: 'generic',
    addable: true,
    makeItem: () => ({
      id: nanoid(),
      title: 'Reference Name',
      subtitle: 'Title, Company',
      period: '',
      bullets: [],
    }),
  },
};

/** Returns only types that can be added from the pool */
export function getAddableTypes(existingTypeIds) {
  return Object.values(SECTION_REGISTRY).filter(
    (reg) => reg.addable && !existingTypeIds.includes(reg.type)
  );
}
