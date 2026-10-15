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
    'Eager to become a full-stack developer — I build with Nuxt, Laravel, and Node, test what ships, and design with Figma and Adobe tools.',
  metaDescription:
    'Kyle — full-stack developer in training, Baguio Philippines. JavaScript, Java, Python, Laravel, Nuxt, React, PostgreSQL, QA, and UI/UX.',
  githubBio: {
    headline: 'Eager to become a Full Stack Developer',
    learningIntro: "I'm currently learning",
    learning: [
      'JavaScript',
      'Java',
      'Tailwind CSS',
      'C++',
      'Python',
      'Laravel',
      'Photoshop',
      'Adobe Premiere Pro',
      'After Effects',
      'MySQL',
      'Basic Web Vulnerabilities',
      'Assembly (machine language)',
    ],
  },
  email: 'kydev1323@gmail.com',
  github: 'https://github.com/DevKyLeOfficial',
  linkedin: 'https://www.linkedin.com/in/kylejoshuanoelalvaro/',
  location: 'Baguio City, Philippines',
  /** IANA timezone — Philippines uses Asia/Manila (PHT, UTC+8, no daylight saving). */
  timeZone: 'Asia/Manila',
  availability: 'OPEN FOR WORK OR COLLABORATIONS',
  /** Badge image → certificate image (public/uploads/Badges & Certificates). */
  badges: [
    {
      id: 'badge-js-essentials-1',
      title: 'JavaScript Essentials 1',
      badge: '/uploads/Badges/JavaScript Essential 1.png',
      certificate: '/uploads/Certificates/JavaScript Essentials 1.png',
    },
    {
      id: 'badge-intro-cyber',
      title: 'Introduction to Cybersecurity',
      badge: '/uploads/Badges/Introduction to Cybersecurity.png',
      certificate: '/uploads/Certificates/Course completion Introduction to Cybersecurity by CISCO.png',
    },
    {
      id: 'badge-endpoint',
      title: 'Endpoint Security',
      badge: '/uploads/Badges/Endpoint.png',
      certificate: '/uploads/Certificates/Course Completion Endpoint Security by CISCO.png',
    },
  ],
  heroStack: ['JavaScript', 'Nuxt', 'Laravel', 'Tailwind CSS', 'Node.js', 'Python'],
  devStats: [
    'Stacks I use — Git, Java, JS, PHP, Python, Laravel, React, Nuxt, Node, PostgreSQL',
    'Design & media — Figma, Photoshop, Lightroom, Premiere Pro',
    'QA, debugging, and growing in MySQL, C++, and web security',
  ],
  contact: {
    intro:
      'Open for work or collaborations. Email is the fastest way to reach me.',
    image: '/uploads/Contact.png',
    imageAlt: 'Kyle at a dual-monitor development workspace',
    imageCaption: 'Building, debugging, and shipping from the desk',
  },

  /** PWA + APK (built in CI → public/downloads/). */
  pwa: {
    displayName: 'Kyle | Portfolio',
    apkFileName: 'Kyle-Portfolio.apk',
    apkPath: '/downloads/Kyle-Portfolio.apk',
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
    'Aspiring Full-Stack Developer',
    'QA & Testing',
    'UI/UX & Creative Tools',
    'Clean Code',
  ],

  about: [
    'I am Kyle—based in Baguio and eager to grow into a full-stack developer. I work with JavaScript, Java, Python, PHP, Laravel, Nuxt, React, and Tailwind, and I care about QA, UI/UX, and shipping reliable web systems.',
    'At Baguio LGU I build and maintain web systems as Information System Analyst 1. In the other hand I also mentor students, collaborate with peers, contribute to tech communities, and keep leveling up design and media tools (Figma, Photoshop, Premiere Pro) alongside backend and security basics.',
  ],

  skillGroups: [
    { key: 'languages', label: 'Languages' },
    { key: 'frameworks', label: 'Frameworks & libraries' },
    { key: 'data', label: 'Databases' },
    { key: 'creative', label: 'Design & media' },
    { key: 'tools', label: 'Tools' },
    { key: 'learning', label: 'Currently learning' },
  ],

  skills: {
    languages: ['HTML/CSS', 'JavaScript', 'Java', 'PHP', 'Python', 'C++'],
    frameworks: ['React', 'Vue', 'Nuxt', 'Node.js', 'Laravel', 'Tailwind CSS'],
    data: ['MySQL', 'PostgreSQL'],
    creative: ['Figma', 'Photoshop', 'Lightroom', 'Premiere Pro', 'After Effects'],
    tools: ['Git', 'GitHub', 'VS Code'],
    learning: [
      'JavaScript',
      'Java',
      'Tailwind CSS',
      'C++',
      'Python',
      'Laravel',
      'Photoshop',
      'Premiere Pro',
      'After Effects',
      'MySQL',
      'Web vulnerabilities',
      'Assembly',
    ],
  },

  projects: [
    {
      id: 'ecoswims',
      name: 'EcoSwims',
      tag: 'full-stack',
      year: '2026',
      summary:
        "EcoSwims Web System — aggregated solid-waste intake, collection volumes, and sorted-material movement for monitoring and analysis.",
      stack: ['Nuxt', 'Vue', 'Node.js', 'JavaScript', 'Tailwind CSS', 'Laravel'],
      image: '/uploads/Projects/Ecoswims.png',
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      tag: 'Basic web game',
      year: '2025',
      summary:
        "Tic Tac Toe game built with modern web technologies.",
      stack: ['CSS','JavaScript', 'HTML'],
      image: '/uploads/Projects/tictactoe.png',
      button: {
        label: 'Play',
        url: 'https://devkyleofficial.github.io/Titactoe-Game/',
      },
    },
  ],

  /** Section order and labels for grouped credentials. */
  certificateGroups: [
    { id: 'dict', title: 'DICT' },
    { id: 'cisco', title: 'Cisco' },
    { id: 'others', title: 'Others' },
  ],

  /** Images in public/uploads/Certificates/ — paths must match filenames exactly. */
  certificates: [
    {
      id: 'cert-1',
      order: 1,
      group: 'others',
      title: 'Entrepreneurship and Start-up Thinking',
      issuer: 'Samvinna',
      issued: '2025',
      description: 'Startup thinking and entrepreneurship fundamentals.',
      image: '/uploads/Certificates/Enterpreneurship and Start-up Thinking by Samvinna.png',
    },
    {
      id: 'cert-2',
      order: 2,
      group: 'dict',
      title: 'Lakbay Likha Digital Creative Roadshow',
      issuer: 'DICT',
      issued: '2025',
      description: 'DICT Lakbay Likha digital creative roadshow.',
      image: '/uploads/Certificates/Lakbay Likha Digital Creative Roadshow By DICT.png',
    },
    {
      id: 'cert-3',
      order: 3,
      group: 'dict',
      title: 'A.I-Deas',
      issuer: 'DICT',
      issued: '2025',
      description: 'DICT A.I-Deas innovation program.',
      image: '/uploads/Certificates/A.I-Deas by DICT.png',
    },
    {
      id: 'cert-4',
      order: 4,
      group: 'dict',
      title: 'Info Session on AI-Powered Future',
      issuer: 'DICT Region 5',
      issued: '2025',
      description: 'AI-powered future and prompt engineering info session.',
      image: '/uploads/Certificates/Info Session on AI powered Future by DICT Region 5.png',
    },
    {
      id: 'cert-5',
      order: 5,
      group: 'others',
      title: 'Hour of Code',
      issuer: 'AI Ready ASEAN Programme',
      issued: '2025',
      description: 'AI Ready ASEAN Hour of Code.',
      image: '/uploads/Certificates/Hour of Code by AI Ready ASEAN Programme.png',
    },
    {
      id: 'cert-6',
      order: 6,
      group: 'dict',
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
      group: 'others',
      title: 'Basic Office Productivity Skills',
      issuer: 'University of the Cordilleras',
      issued: '2025',
      description: 'Office productivity and digital tools — University of the Cordilleras.',
      image: '/uploads/Certificates/Basic Office Productivity Skills by University of the Cordilleras.png',
    },
    {
      id: 'cert-8',
      order: 8,
      group: 'others',
      title: 'Certificate of Completion — Internship',
      issuer: 'UC InTTO',
      issued: '2025',
      description: 'UC InTTO internship — creative and innovation office.',
      image: '/uploads/Certificates/Certificate of Completion Internship by UC-InTTO.png',
    },
    {
      id: 'cert-9',
      order: 9,
      group: 'cisco',
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      issued: '2025',
      description: 'Cisco Networking Academy — introduction to cybersecurity.',
      image: '/uploads/Certificates/Course completion Introduction to Cybersecurity by CISCO.png',
    },
    {
      id: 'cert-10',
      order: 10,
      group: 'cisco',
      title: 'Endpoint Security',
      issuer: 'Cisco',
      issued: '2025',
      description: 'Cisco — endpoint security course completion.',
      image: '/uploads/Certificates/Course Completion Endpoint Security by CISCO.png',
    },
    {
      id: 'cert-11',
      order: 11,
      group: 'dict',
      title: 'Endpoint Security',
      issuer: 'DICT-ITU DTC Initiative · Cisco',
      issued: '2025',
      description: 'DICT–ITU DTC endpoint security track with Cisco.',
      image:
        '/uploads/Certificates/Endpoint Security course offered by DICT-ITU DTC Initiative by CISCO.png',
    },
    {
      id: 'cert-12',
      order: 12,
      group: 'cisco',
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco',
      issued: '2025',
      description: 'JavaScript essentials 1 track with Cisco.',
      image:
        '/uploads/Certificates/JavaScript Essentials 1.png',
    },
    {
      id: 'cert-13',
      order: 13,
      group: 'dict',
      title: 'IoT & Smart Solutions For PH Communities',
      issuer: 'DICT CAR · Cisco',
      issued: '2025',
      description: 'IoT and smart solutions for Philippine communities.',
      image:
        '/uploads/Certificates/Iot & Smart Solutions for Ph Communities by ICT Literacy and Competency Development Bureaus Digital Workforce Program by DICT CAR.png',
    },
    {
      id: 'cert-14',
      order: 14,
      group: 'others',
      title: 'DevFest Baguio 2025 — Participation',
      issuer: 'Google Developer Group Baguio',
      issued: '2025',
      description:
        'Certificate of participation — DevFest Baguio 2025, Baguio Convention and Cultural Center.',
      image: '/uploads/Certificates/DevFest baguio 2025 by Google Developers Group Baguio.png',
    },
    {
      id: 'cert-15',
      order: 15,
      group: 'others',
      title: 'DevFest Baguio 2025 — Volunteer Staff',
      issuer: 'Google Developer Group Baguio',
      issued: '2025',
      description:
        'Certificate of appreciation for volunteer staff service during DevFest Baguio 2025.',
      image:
        '/uploads/Certificates/Volunteer Staff During DevFest by Google Developers Group Baguio.png',
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
