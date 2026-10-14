/**
 * ═══════════════════════════════════════════════════════════════════
 *  EDIT THIS FILE + drop files in `public/uploads/` to personalize.
 *  See CUSTOMIZE.md for a full walkthrough.
 * ═══════════════════════════════════════════════════════════════════
 */

import profilePhoto from '~/assets/media/profile.jpg'
import aboutPhoto from '~/assets/media/who.jpg'

/** Profile/about: app/assets/media/*.jpg. Certs/projects: public/uploads/… */
export const site = {
  handle: 'kyle',
  name: 'Kyle',
  title: 'Junior Full-Stack Developer',
  tagline:
    'Junior full-stack developer — I build with Vue & Nuxt, test and QA what ships, and craft UI/UX that feels clear and reliable.',
  metaDescription:
    'Kyle — junior full-stack developer in the Philippines. Vue, Nuxt, QA, UI/UX, and clean code. Portfolio, projects, and credentials.',
  email: 'kydev1323@gmail.com',
  github: 'https://github.com/kydev1323',
  linkedin: '',
  location: 'Baguio City, Philippines',
  /** IANA timezone — Philippines uses Asia/Manila (PHT, UTC+8, no daylight saving). */
  timeZone: 'Asia/Manila',
  availability: 'Open to junior roles & collaborations',
  heroStack: ['Vue', 'Nuxt', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  devStats: [
    'Junior full-stack — Vue, Nuxt, Node.js & Laravel',
    'QA, testing, debugging, and UI/UX (Figma)',
    'Git workflow, clean code, and clear documentation',
  ],
  contact: {
    intro:
      'Open to junior developer roles, freelance UI/UX or full-stack work, QA support, or mentoring collaborations. Email is the fastest way to reach me.',
  },

  media: {
    profile: profilePhoto,
    profileAlt: 'Kyle — junior full-stack developer',
    /** Crop focus — e.g. `center 15%` (higher face), `center top`, `center 35%` */
    profilePosition: 'center 18%',
    /** Replace app/assets/media/who.jpg (854×481 native — do not upscale in layout) */
    about: aboutPhoto,
    aboutAlt:
      'Kyle collaborating and mentoring college students at ACATECH Aviation College',
    aboutCaption:
      'Collaborating, brainstorming, and mentoring with college students',
    aboutCaptionOrg: 'ACATECH Aviation College',
  },

  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certs' },
    { id: 'stack', label: 'Timeline' },
    { id: 'contact', label: 'Contact' },
  ],

  roles: [
    'Junior Full-Stack Developer',
    'QA & Testing',
    'UI/UX Development',
    'Clean Code',
  ],

  about: [
    'I am Kyle—a junior full-stack developer based in Baguio. I also take on testing and QA, and I care about UI/UX: how screens look, how flows feel, and whether features hold up before they go live.',
    'At Baguio LGU I build and maintain web systems as Information System Analyst 1. Outside work I mentor students, volunteer with tech communities, and keep sharpening Vue, Nuxt, Laravel, and design tools like Figma.',
  ],

  skills: {
    languages: ['HTML/CSS', 'JavaScript', 'TypeScript'],
    frameworks: ['Tailwind CSS', 'Vue', 'Nuxt', 'Node.js', 'Laravel'],
    tools: ['Git', 'GitHub Desktop', 'VS Code', 'Figma', 'CMD'],
    focus: ['Clean code', 'Debugging', 'UI/UX', 'QA'],
  },

  projects: [
    {
      id: 'artisthub-baguio',
      name: 'ArtistHub Baguio',
      tag: 'frontend · UI/UX',
      year: '2025',
      summary:
        'Frontend design and development for ArtistHub Baguio, plus full project documentation covering technical and functional requirements.',
      stack: ['Vue', 'JavaScript', 'HTML/CSS', 'Figma'],
      image: null,
      link: '#',
    },
    {
      id: 'ecoswims',
      name: 'EcoSwims',
      tag: 'full-stack',
      year: '2025',
      summary:
        'Baguio City LGU web system for the EcoSwims program — public portal, admin workflows, integrations, QA, and ongoing maintenance.',
      stack: ['Nuxt', 'Vue', 'Node.js', 'Tailwind CSS', 'Laravel'],
      image: null,
      link: 'https://ecoswims.baguio.gov.ph',
    },
    {
      id: 'baguio-lgu-systems',
      name: 'Baguio LGU Web Systems',
      tag: 'full-stack',
      year: '2025',
      summary:
        'Internal web tools and public-facing systems for Baguio City LGU — requirements, UI, integrations, QA, and ongoing maintenance.',
      stack: ['Nuxt', 'Vue', 'Node.js', 'Tailwind CSS', 'Laravel'],
      image: null,
      link: '#',
    },
    {
      id: 'portfolio',
      name: 'Developer Portfolio',
      tag: 'full-stack',
      year: '2026',
      summary:
        'This site — Nuxt 3, Vue, Tailwind, and TDesign, with scroll animations, credentials gallery, and email contact.',
      stack: ['Nuxt', 'Vue', 'Tailwind CSS', 'TypeScript'],
      image: null,
      link: '#',
    },
  ],

  /** Images in public/uploads/Certificates/ — paths must match filenames exactly. */
  certificates: [
    {
      id: 'cert-1',
      order: 1,
      title: 'Entrepreneurship and Start-up Thinking',
      issuer: 'Samvinna',
      issued: '2025',
      description: 'Startup thinking and entrepreneurship fundamentals.',
      image: '/uploads/Certificates/Enterpreneurship and Start-up Thinking by Samvinna.png',
    },
    {
      id: 'cert-2',
      order: 2,
      title: 'Lakbay Likha Digital Creative Roadshow',
      issuer: 'DICT',
      issued: '2025',
      description: 'DICT Lakbay Likha digital creative roadshow.',
      image: '/uploads/Certificates/Lakbay Likha Digital Creative Roadshow By DICT.png',
    },
    {
      id: 'cert-3',
      order: 3,
      title: 'A.I-Deas',
      issuer: 'DICT',
      issued: '2025',
      description: 'DICT A.I-Deas innovation program.',
      image: '/uploads/Certificates/A.I-Deas by DICT.png',
    },
    {
      id: 'cert-4',
      order: 4,
      title: 'Info Session on AI-Powered Future',
      issuer: 'DICT Region 5',
      issued: '2025',
      description: 'AI-powered future and prompt engineering info session.',
      image: '/uploads/Certificates/Info Session on AI powered Future by DICT Region 5.png',
    },
    {
      id: 'cert-5',
      order: 5,
      title: 'Hour of Code',
      issuer: 'AI Ready ASEAN Programme',
      issued: '2025',
      description: 'AI Ready ASEAN Hour of Code.',
      image: '/uploads/Certificates/Hour of Code by AI Ready ASEAN Programme.png',
    },
    {
      id: 'cert-6',
      order: 6,
      title: 'Introduction to Cybersecurity',
      issuer: 'DICT-ITU DTC Initiative · Cisco',
      issued: '2025',
      description: 'DICT–ITU DTC cybersecurity foundations with Cisco.',
      image:
        '/uploads/Certificates/Introduction to Cybersecurity course offered by DICT-ITU DTC Initiative by CISCO.png',
    },
    {
      id: 'cert-7',
      order: 7,
      title: 'Basic Office Productivity Skills',
      issuer: 'University of the Cordilleras',
      issued: '2025',
      description: 'Office productivity and digital tools — University of the Cordilleras.',
      image: '/uploads/Certificates/Basic Office Productivity Skills by University of the Cordilleras.png',
    },
    {
      id: 'cert-8',
      order: 8,
      title: 'Certificate of Completion — Internship',
      issuer: 'UC InTTO',
      issued: '2025',
      description: 'UC InTTO internship — creative and innovation office.',
      image: '/uploads/Certificates/Certificate of Completion Internship by UC-InTTO.png',
    },
    {
      id: 'cert-9',
      order: 9,
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      issued: '2025',
      description: 'Cisco Networking Academy — introduction to cybersecurity.',
      image: '/uploads/Certificates/Course completion Introduction to Cybersecurity by CISCO.png',
    },
    {
      id: 'cert-10',
      order: 10,
      title: 'Endpoint Security',
      issuer: 'Cisco',
      issued: '2025',
      description: 'Cisco — endpoint security course completion.',
      image: '/uploads/Certificates/Course Completion Endpoint Security by CISCO.png',
    },
    {
      id: 'cert-11',
      order: 11,
      title: 'Endpoint Security',
      issuer: 'DICT-ITU DTC Initiative · Cisco',
      issued: '2025',
      description: 'DICT–ITU DTC endpoint security track with Cisco.',
      image:
        '/uploads/Certificates/Endpoint Security course offered by DICT-ITU DTC Initiative by CISCO.png',
    },
  ],

  stackLog: [
    {
      time: '2025 - Present',
      event:
        'Information System Analyst 1 (Web Developer) at Baguio City LGU — full-stack delivery, UI/UX, QA on releases, and maintenance of web systems for daily operations. | Turning stakeholder requirements into interfaces, APIs, and docs the team can own. | Fixing bugs, shipping enhancements, and validating flows before go-live.',
    },
    {
      time: '2025',
      event:
        'Mentored University of the Cordilleras undergraduates on capstone, thesis, and competition builds in IT and software. | Collaborated and brainstormed with teams on architecture, UI/UX, testing, and demos. | Code reviews, QA checks, and unblock sessions so groups could ship defendable projects.',
    },
    {
      time: '2025',
      event:
        'Frontend and UI/UX for ArtistHub Baguio | Wrote technical and functional documentation and the project manuscript end-to-end.',
    },
    {
      time: '2025',
      event:
        'Intern and creative team member at UC InTTO — AVP, posters, and event creative assets. | Event facilitator and working committee on multiple university programs.',
    },
    {
      time: '2025',
      event:
        'Volunteer staff — GDG DevFest 2025 Baguio. | Working committee — GDG Extended I/O at University of Baguio; highlight video for Google I/O Extended. | Volunteer — TARAKI Insight Roundtable (ION Hotel Baguio); event highlight video.',
    },
  ],
}
