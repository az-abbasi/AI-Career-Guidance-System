// Helper utility for mapping degree programs to skills, academic subjects, and roadmaps

export const DEGREE_GROUPS = [
  {
    label: "💻 Computing & Technology",
    options: [
      { value: "BSCS", label: "BSCS - Computer Science" },
      { value: "BSSE", label: "BSSE - Software Engineering" },
      { value: "BSIT", label: "BSIT - Information Technology" },
      { value: "BSAI", label: "BSAI - Artificial Intelligence" },
      { value: "BSDS", label: "BSDS - Data Science" },
      { value: "BS Cyber", label: "BS Cyber Security" },
    ]
  },
  {
    label: "🩺 Medical & Health Sciences",
    options: [
      { value: "MBBS", label: "MBBS - Doctor of Medicine" },
      { value: "BDS", label: "BDS - Dental Surgery" },
      { value: "PharmD", label: "Pharm.D - Doctor of Pharmacy" },
      { value: "BS Nursing", label: "BS Nursing & Health Care" },
    ]
  },
  {
    label: "⚙️ Engineering & Technology",
    options: [
      { value: "BS Electrical", label: "BS Electrical Engineering" },
      { value: "BS Mechanical", label: "BS Mechanical Engineering" },
      { value: "BS Civil", label: "BS Civil Engineering" },
      { value: "BS Chemical", label: "BS Chemical Engineering" },
    ]
  },
  {
    label: "🎨 Arts, Media & Design",
    options: [
      { value: "BS Design", label: "BS Graphic & Product Design" },
      { value: "BS UIUX", label: "BS UI/UX & Interactive Design" },
      { value: "BS Fine Arts", label: "BS Fine Arts & Visual Media" },
    ]
  },
  {
    label: "📈 Business & Finance",
    options: [
      { value: "BBA", label: "BBA - Business Administration" },
      { value: "BS Finance", label: "BS Accounting & Finance" },
      { value: "BS Marketing", label: "BS Marketing & E-Commerce" },
    ]
  },
  {
    label: "🔬 Natural Sciences & Math",
    options: [
      { value: "BS Math", label: "BS Mathematics & Data Modeling" },
      { value: "BS Biotech", label: "BS Biotechnology" },
      { value: "BS Physics", label: "BS Applied Physics" },
    ]
  },
  {
    label: "⚖️ Law & Humanities",
    options: [
      { value: "LLB", label: "LLB - Bachelor of Laws" },
      { value: "BS Psychology", label: "BS Psychology" },
    ]
  }
];

export function getDegreeCategory(degreeVal) {
  if (!degreeVal) return 'computing';
  const val = degreeVal.toLowerCase();

  if (val.includes('mbbs') || val.includes('doctor') || val.includes('bds') || val.includes('pharm') || val.includes('nursing') || val.includes('medical')) {
    return 'medical';
  }
  if (val.includes('design') || val.includes('uiux') || val.includes('art') || val.includes('graphic') || val.includes('media')) {
    return 'design';
  }
  if (val.includes('bba') || val.includes('finance') || val.includes('business') || val.includes('marketing') || val.includes('account')) {
    return 'business';
  }
  if (val.includes('electrical') || val.includes('mechanical') || val.includes('civil') || val.includes('chemical') || val.includes('engineer')) {
    return 'engineering';
  }
  if (val.includes('llb') || val.includes('law') || val.includes('legal')) {
    return 'law';
  }
  if (val.includes('math') || val.includes('biotech') || val.includes('physics') || val.includes('science')) {
    return 'science';
  }
  return 'computing';
}

// 1. SKILLS PER CATEGORY
export const DEGREE_SKILLS = {
  computing: [
    { icon: '💻', key: 'Programming', label: 'Programming & Logic' },
    { icon: '🧠', key: 'Data Structures', label: 'Algorithms & Data Structures' },
    { icon: '🤖', key: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { icon: '🗄️', key: 'Database Systems', label: 'Database Systems & SQL' },
    { icon: '🌐', key: 'Web Development', label: 'Web & Cloud Development' },
    { icon: '🛠️', key: 'Problem Solving', label: 'System Problem Solving' },
    { icon: '💬', key: 'Communication', label: 'Technical Communication' },
  ],
  medical: [
    { icon: '🩺', key: 'Anatomy & Physiology', label: 'Anatomy & Physiology' },
    { icon: '🧪', key: 'Pharmacology', label: 'Pharmacology & Diagnostics' },
    { icon: '🔬', key: 'Pathology & Lab Care', label: 'Pathology & Laboratory Care' },
    { icon: '🏥', key: 'Clinical Diagnosis', label: 'Clinical Diagnosis & Practice' },
    { icon: '⚕️', key: 'Medical Ethics', label: 'Medical Ethics & Patient Care' },
    { icon: '🩸', key: 'Emergency Medicine', label: 'Emergency & Surgical Basics' },
    { icon: '💬', key: 'Patient Communication', label: 'Patient Communication' },
  ],
  design: [
    { icon: '🎨', key: 'UI/UX Design', label: 'UI/UX & Interface Design' },
    { icon: '✏️', key: 'Visual Composition', label: 'Visual Composition & Layout' },
    { icon: '📐', key: 'Wireframing & Figma', label: 'Figma Prototyping & Tools' },
    { icon: '✒️', key: 'Typography & Branding', label: 'Typography & Brand Systems' },
    { icon: '🎬', key: 'Motion & Animation', label: 'Motion Graphics & Interaction' },
    { icon: '💡', key: 'Design Thinking', label: 'User Research & Empathy' },
    { icon: '💬', key: 'Client Presentation', label: 'Client & Stakeholder Pitching' },
  ],
  business: [
    { icon: '📈', key: 'Financial Modeling', label: 'Financial Modeling & Valuation' },
    { icon: '📊', key: 'Business Analytics', label: 'Business & Market Analytics' },
    { icon: '📢', key: 'Digital Marketing', label: 'Digital Marketing & Strategy' },
    { icon: '💼', key: 'Project Management', label: 'Agile & Project Management' },
    { icon: '🤝', key: 'Negotiation & Sales', label: 'Negotiation & Business Sales' },
    { icon: '🎯', key: 'Strategic Planning', label: 'Corporate Strategy & Leadership' },
    { icon: '💬', key: 'Executive Pitching', label: 'Executive Communication' },
  ],
  engineering: [
    { icon: '📐', key: 'CAD & Drafting', label: 'CAD Drafting & 3D Modeling' },
    { icon: '🏗️', key: 'Structural Analysis', label: 'Structural & Material Mechanics' },
    { icon: '⚡', key: 'Circuit & Signals', label: 'Circuits, Systems & Electronics' },
    { icon: '🔥', key: 'Thermodynamics', label: 'Thermodynamics & Fluid Dynamics' },
    { icon: '🛠️', key: 'Manufacturing', label: 'Prototyping & Manufacturing' },
    { icon: '🧮', key: 'Engineering Math', label: 'Calculus & Differential Equations' },
    { icon: '💬', key: 'Safety & Field Work', label: 'Field Management & Safety' },
  ],
  law: [
    { icon: '⚖️', key: 'Constitutional Law', label: 'Constitutional & Criminal Law' },
    { icon: '📜', key: 'Contract Drafting', label: 'Contract Drafting & Negotiation' },
    { icon: '🔍', key: 'Legal Research', label: 'Case Analysis & Legal Research' },
    { icon: '🏛️', key: 'Courtroom Advocacy', label: 'Litigation & Courtroom Advocacy' },
    { icon: '🛡️', key: 'Legal Ethics', label: 'Professional Legal Ethics' },
    { icon: '📑', key: 'Regulatory Compliance', label: 'Corporate & Regulatory Compliance' },
    { icon: '💬', key: 'Client Counseling', label: 'Client Counseling & Mediation' },
  ],
  science: [
    { icon: '🧮', key: 'Advanced Calculus', label: 'Advanced Calculus & Algebra' },
    { icon: '🧬', key: 'Biotechnology', label: 'Genetics & Molecular Biology' },
    { icon: '🧪', key: 'Lab Methodology', label: 'Experimental Design & Lab Research' },
    { icon: '📊', key: 'Statistical Modeling', label: 'Statistical Data Analytics' },
    { icon: '⚛️', key: 'Applied Physics', label: 'Quantum Mechanics & Applied Physics' },
    { icon: '🔬', key: 'Scientific Writing', label: 'Peer-Reviewed Scientific Writing' },
    { icon: '💬', key: 'Peer Collaboration', label: 'Research Collaboration' },
  ]
};

// 2. ACADEMIC SUBJECTS PER CATEGORY
export const DEGREE_SUBJECTS = {
  computing: [
    'Programming Fundamentals',
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Computer Networks'
  ],
  medical: [
    'Human Anatomy',
    'Human Physiology',
    'Biochemistry',
    'Pathology & Microbiology',
    'Pharmacology & Therapeutics'
  ],
  design: [
    'Design Fundamentals & Color Theory',
    'UI/UX Design Principles',
    'Typography & Layout Design',
    'Digital Illustration & Vector Art',
    'Design Systems & Prototyping'
  ],
  business: [
    'Financial Accounting',
    'Principles of Management',
    'Microeconomics & Macroeconomics',
    'Marketing Management',
    'Business Statistics & Analytics'
  ],
  engineering: [
    'Calculus & Linear Algebra',
    'Engineering Physics & Mechanics',
    'Electric Circuit Analysis',
    'Thermodynamics & Heat Transfer',
    'CAD & Engineering Graphics'
  ],
  law: [
    'Constitutional Law',
    'Law of Contracts',
    'Criminal Law & Procedure',
    'Jurisprudence & Legal Theory',
    'Public International Law'
  ],
  science: [
    'Calculus & Analytical Geometry',
    'General Chemistry & Organic Synthesis',
    'Molecular Biology & Genetics',
    'Classical Mechanics & Electromagnetism',
    'Probability & Mathematical Statistics'
  ]
};

// 3. ROADMAP STAGES PER CATEGORY
export const DEGREE_ROADMAPS = {
  computing: {
    title: "Software Engineering & Tech Specialist",
    steps: [
      { step: 1, title: 'Learn Programming Basics', desc: 'Master Python, C++, or JavaScript fundamentals & problem solving.', duration: '2 months' },
      { step: 2, title: 'Data Structures & Algorithms', desc: 'Understand arrays, linked lists, trees, graphs, sorting & algorithmic complexity.', duration: '2 months' },
      { step: 3, title: 'Build Full Stack Projects', desc: 'Develop 2-3 real-world web/mobile applications with backend APIs.', duration: '3 months' },
      { step: 4, title: 'Master Frameworks & Cloud', desc: 'Learn React/Next.js, Node.js/Django, Docker, and AWS deployment.', duration: '2 months' },
      { step: 5, title: 'Apply for Technical Roles', desc: 'Prepare for LeetCode, mock interviews, and software engineer internships.', duration: 'Ongoing' },
    ]
  },
  medical: {
    title: "Doctor of Medicine & Healthcare Specialist",
    steps: [
      { step: 1, title: 'Pre-Clinical Foundations', desc: 'Master Human Anatomy, Physiology, and Medical Biochemistry.', duration: '12 months' },
      { step: 2, title: 'Para-Clinical Science', desc: 'Study Pathology, Microbiology, Pharmacology, and Forensic Medicine.', duration: '12 months' },
      { step: 3, title: 'Clinical Rotations & Wards', desc: 'Hands-on ward training in Internal Medicine, General Surgery, and Pediatrics.', duration: '24 months' },
      { step: 4, title: 'Medical Licensing Exams', desc: 'Prepare for National Medical Commission / PMDC / USMLE licensing boards.', duration: '6 months' },
      { step: 5, title: 'House Job & Residency', desc: 'Complete 1-year mandatory hospital house job and select FCPS/Specialist residency.', duration: 'Ongoing' },
    ]
  },
  design: {
    title: "Graphic, UI/UX & Product Design Specialist",
    steps: [
      { step: 1, title: 'Design Fundamentals & Color', desc: 'Master typography, visual composition, grid systems, and color psychology.', duration: '2 months' },
      { step: 2, title: 'Industry Software Mastery', desc: 'Become proficient in Figma, Adobe Illustrator, Photoshop & After Effects.', duration: '3 months' },
      { step: 3, title: 'UI/UX & User Research', desc: 'Learn wireframing, interactive prototyping, usability testing, and design systems.', duration: '3 months' },
      { step: 4, title: 'Build Case Study Portfolio', desc: 'Create 3 comprehensive UI/UX and product design case studies for Behance/Dribbble.', duration: '3 months' },
      { step: 5, title: 'Design Studio & Freelance Placement', desc: 'Apply for UI/UX Designer, Brand Strategist, or Product Design roles.', duration: 'Ongoing' },
    ]
  },
  business: {
    title: "Corporate Management & Financial Strategist",
    steps: [
      { step: 1, title: 'Business & Economics Fundamentals', desc: 'Understand corporate accounting, microeconomics, and business ethics.', duration: '3 months' },
      { step: 2, title: 'Financial Modeling & Analytics', desc: 'Master Excel financial modeling, valuation techniques, and SQL/Power BI.', duration: '3 months' },
      { step: 3, title: 'Marketing & Digital Growth', desc: 'Learn performance marketing, SEO, brand positioning, and customer analytics.', duration: '2 months' },
      { step: 4, title: 'Corporate Internship', desc: 'Gain hands-on corporate experience in business analytics, finance, or HR.', duration: '4 months' },
      { step: 5, title: 'Executive Placement & Venture Launch', desc: 'Apply for Management Trainee, Financial Analyst, or Product Manager roles.', duration: 'Ongoing' },
    ]
  },
  engineering: {
    title: "Professional Engineering & Structural Specialist",
    steps: [
      { step: 1, title: 'Engineering Mathematics & Physics', desc: 'Master multivariable calculus, linear algebra, and classical physics.', duration: '4 months' },
      { step: 2, title: 'CAD & 3D Computer Modeling', desc: 'Learn AutoCAD, SolidWorks, MATLAB, or Revit drafting tools.', duration: '3 months' },
      { step: 3, title: 'Core Field Specialization', desc: 'Deep dive into Circuits (Electrical), Thermodynamics (Mechanical), or Structures (Civil).', duration: '6 months' },
      { step: 4, title: 'Capstone Design Project', desc: 'Design, simulate, and fabricate a hardware prototype or structural solution.', duration: '4 months' },
      { step: 5, title: 'PEC License & Field Placement', desc: 'Register with Engineering Council and secure site engineer/design roles.', duration: 'Ongoing' },
    ]
  },
  law: {
    title: "Legal Advocate & Corporate Compliance Officer",
    steps: [
      { step: 1, title: 'Constitutional & Civil Law', desc: 'Study constitutional principles, jurisprudence, and civil procedure code.', duration: '6 months' },
      { step: 2, title: 'Legal Drafting & Briefing', desc: 'Master contract drafting, writ petitions, legal opinions, and case briefing.', duration: '4 months' },
      { step: 3, title: 'Courtroom Apprenticeship', desc: 'Shadow senior advocates in District & High Courts for litigation practice.', duration: '6 months' },
      { step: 4, title: 'Bar Council Licensing', desc: 'Pass the Bar Law Assessment Test (GAT) and obtain advocacy license.', duration: '3 months' },
      { step: 5, title: 'Corporate Counsel or Chamber Practice', desc: 'Practice active litigation or join corporate legal advisory firms.', duration: 'Ongoing' },
    ]
  },
  science: {
    title: "Research Scientist & Applied Analyst",
    steps: [
      { step: 1, title: 'Theoretical Foundations', desc: 'Deepen knowledge in advanced mathematics, molecular genetics, or physics.', duration: '6 months' },
      { step: 2, title: 'Laboratory Methodology', desc: 'Gain proficiency in lab safety, spectro-photometry, PCR, or data modeling.', duration: '4 months' },
      { step: 3, title: 'Statistical & Computational Research', desc: 'Learn R/Python for bio-informatics, statistical data analysis, and modeling.', duration: '4 months' },
      { step: 4, title: 'Thesis & Peer Publication', desc: 'Conduct original research thesis and publish in peer-reviewed scientific journals.', duration: '6 months' },
      { step: 5, title: 'R&D Fellowships & Industry Research', desc: 'Apply for PhD research fellowships or corporate R&D lab positions.', duration: 'Ongoing' },
    ]
  }
};
