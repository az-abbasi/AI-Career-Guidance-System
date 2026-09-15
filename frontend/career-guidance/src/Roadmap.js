import React from 'react';
import { theme } from './Theme';
import { getDegreeCategory, DEGREE_ROADMAPS } from './degreeHelper';

const roadmaps = {
  // Computer Science
  'Software Engineer': [
    { step: 1, title: 'Learn Programming Basics', desc: 'Start with Python or JavaScript fundamentals.', duration: '2 months' },
    { step: 2, title: 'Data Structures & Algorithms', desc: 'Learn arrays, linked lists, sorting algorithms.', duration: '2 months' },
    { step: 3, title: 'Build Projects', desc: 'Build 2-3 real world projects for portfolio.', duration: '3 months' },
    { step: 4, title: 'Learn Frameworks', desc: 'Learn React, Node.js or Django.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Start applying and prepare for interviews.', duration: '1 month' },
  ],
  'Data Scientist': [
    { step: 1, title: 'Learn Python & Statistics', desc: 'Master Python and basic statistics.', duration: '2 months' },
    { step: 2, title: 'Data Analysis', desc: 'Learn Pandas, NumPy and data visualization.', duration: '2 months' },
    { step: 3, title: 'Machine Learning', desc: 'Learn ML algorithms using Scikit-learn.', duration: '3 months' },
    { step: 4, title: 'Deep Learning', desc: 'Learn TensorFlow or PyTorch.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Build portfolio and apply for Data Science roles.', duration: '1 month' },
  ],
  'AI Engineer': [
    { step: 1, title: 'Learn Python', desc: 'Master Python programming language.', duration: '1 month' },
    { step: 2, title: 'Mathematics for AI', desc: 'Learn linear algebra, calculus and probability.', duration: '2 months' },
    { step: 3, title: 'Machine Learning', desc: 'Learn core ML concepts and algorithms.', duration: '3 months' },
    { step: 4, title: 'Deep Learning & NLP', desc: 'Learn neural networks and language models.', duration: '3 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Build AI projects and apply for roles.', duration: '1 month' },
  ],
  'Cybersecurity Expert': [
    { step: 1, title: 'Learn Networking Basics', desc: 'Understand TCP/IP, DNS, firewalls.', duration: '2 months' },
    { step: 2, title: 'Learn Linux', desc: 'Master Linux operating system.', duration: '1 month' },
    { step: 3, title: 'Ethical Hacking', desc: 'Learn penetration testing and ethical hacking.', duration: '3 months' },
    { step: 4, title: 'Get Certified', desc: 'Get CEH or CompTIA Security+ certification.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for cybersecurity analyst roles.', duration: '1 month' },
  ],
  'Web Developer': [
    { step: 1, title: 'Learn HTML & CSS', desc: 'Build the structure and style of websites.', duration: '1 month' },
    { step: 2, title: 'Learn JavaScript', desc: 'Add interactivity to websites.', duration: '2 months' },
    { step: 3, title: 'Learn React', desc: 'Build modern web applications.', duration: '2 months' },
    { step: 4, title: 'Learn Backend', desc: 'Learn Node.js and databases.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Build portfolio and apply for web dev roles.', duration: '1 month' },
  ],
  'Mobile App Developer': [
    { step: 1, title: 'Learn Programming Basics', desc: 'Learn JavaScript or Dart basics.', duration: '1 month' },
    { step: 2, title: 'Learn React Native or Flutter', desc: 'Pick a cross-platform framework.', duration: '2 months' },
    { step: 3, title: 'Build Mobile Apps', desc: 'Build 2-3 real mobile apps for portfolio.', duration: '3 months' },
    { step: 4, title: 'Publish on App Store', desc: 'Publish your app on Google Play or App Store.', duration: '1 month' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for mobile developer roles.', duration: '1 month' },
  ],
  'Network Engineer': [
    { step: 1, title: 'Learn Networking Basics', desc: 'Study OSI model, TCP/IP, subnetting.', duration: '2 months' },
    { step: 2, title: 'Learn Cisco Technologies', desc: 'Study routers, switches and VLAN.', duration: '2 months' },
    { step: 3, title: 'Get CCNA Certified', desc: 'Pass Cisco CCNA certification exam.', duration: '3 months' },
    { step: 4, title: 'Learn Network Security', desc: 'Study firewalls, VPN and security protocols.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for network engineer positions.', duration: '1 month' },
  ],
  'Database Administrator': [
    { step: 1, title: 'Learn SQL Basics', desc: 'Master SELECT, INSERT, UPDATE, DELETE.', duration: '1 month' },
    { step: 2, title: 'Learn Database Design', desc: 'Study normalization, ER diagrams.', duration: '2 months' },
    { step: 3, title: 'Learn MySQL & PostgreSQL', desc: 'Work with popular database systems.', duration: '2 months' },
    { step: 4, title: 'Learn Database Security', desc: 'Study backup, recovery and security.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for DBA roles.', duration: '1 month' },
  ],
  'Cloud Engineer': [
    { step: 1, title: 'Learn Linux & Networking', desc: 'Master Linux commands and networking basics.', duration: '2 months' },
    { step: 2, title: 'Learn AWS or Azure', desc: 'Study cloud services and infrastructure.', duration: '3 months' },
    { step: 3, title: 'Learn DevOps Tools', desc: 'Learn Docker, Kubernetes and CI/CD.', duration: '2 months' },
    { step: 4, title: 'Get Cloud Certified', desc: 'Get AWS Solutions Architect certification.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for cloud engineer roles.', duration: '1 month' },
  ],
  'Game Developer': [
    { step: 1, title: 'Learn Programming', desc: 'Learn C# or C++ basics.', duration: '2 months' },
    { step: 2, title: 'Learn Unity or Unreal', desc: 'Master a game development engine.', duration: '3 months' },
    { step: 3, title: 'Build Simple Games', desc: 'Build 2D and 3D games for portfolio.', duration: '3 months' },
    { step: 4, title: 'Learn Game Design', desc: 'Study game mechanics and level design.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Publish games and apply for studios.', duration: '1 month' },
  ],
  'QA Engineer': [
    { step: 1, title: 'Learn Software Testing Basics', desc: 'Study manual testing and test cases.', duration: '1 month' },
    { step: 2, title: 'Learn Automation Testing', desc: 'Learn Selenium or Cypress.', duration: '2 months' },
    { step: 3, title: 'Learn API Testing', desc: 'Use Postman for API testing.', duration: '1 month' },
    { step: 4, title: 'Get ISTQB Certified', desc: 'Pass ISTQB foundation level exam.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for QA engineer roles.', duration: '1 month' },
  ],
  'UI/UX Designer': [
    { step: 1, title: 'Learn Design Basics', desc: 'Study color theory, typography and layout.', duration: '1 month' },
    { step: 2, title: 'Learn Figma', desc: 'Master Figma for UI design.', duration: '2 months' },
    { step: 3, title: 'Study UX Research', desc: 'Learn user research and usability testing.', duration: '2 months' },
    { step: 4, title: 'Build Portfolio', desc: 'Design 3-5 real projects for portfolio.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for UI/UX designer roles.', duration: '1 month' },
  ],
  // Business
  'Business Analyst': [
    { step: 1, title: 'Learn Business Fundamentals', desc: 'Study management, economics and strategy.', duration: '2 months' },
    { step: 2, title: 'Learn Data Analysis', desc: 'Master Excel, SQL and Power BI.', duration: '2 months' },
    { step: 3, title: 'Learn Requirements Gathering', desc: 'Study business process modeling.', duration: '2 months' },
    { step: 4, title: 'Get Certified', desc: 'Get CBAP or PMI-PBA certification.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for business analyst roles.', duration: '1 month' },
  ],
  'Accountant / Financial Analyst': [
    { step: 1, title: 'Learn Accounting Basics', desc: 'Study debit, credit, journal entries and ledgers.', duration: '2 months' },
    { step: 2, title: 'Learn Financial Statements', desc: 'Master balance sheet, income statement and cash flow.', duration: '2 months' },
    { step: 3, title: 'Learn Excel & Accounting Software', desc: 'Master Excel, QuickBooks or SAP.', duration: '2 months' },
    { step: 4, title: 'Get Certified', desc: 'Pursue ACCA, CA or CPA certification.', duration: '6 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for accountant or financial analyst roles.', duration: '1 month' },
  ],
  'Marketing Manager': [
    { step: 1, title: 'Learn Marketing Basics', desc: 'Study 4Ps of marketing and consumer behavior.', duration: '1 month' },
    { step: 2, title: 'Learn Digital Marketing', desc: 'Master SEO, social media and email marketing.', duration: '2 months' },
    { step: 3, title: 'Learn Analytics', desc: 'Use Google Analytics and Facebook Ads.', duration: '2 months' },
    { step: 4, title: 'Build Campaigns', desc: 'Run real marketing campaigns for experience.', duration: '2 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for marketing manager roles.', duration: '1 month' },
  ],
  'Entrepreneur': [
    { step: 1, title: 'Develop Business Idea', desc: 'Identify a problem and create a solution.', duration: '1 month' },
    { step: 2, title: 'Learn Business Planning', desc: 'Write a business plan and study your market.', duration: '2 months' },
    { step: 3, title: 'Learn Finance & Funding', desc: 'Study startup funding, investors and budgeting.', duration: '2 months' },
    { step: 4, title: 'Build MVP', desc: 'Build minimum viable product and test it.', duration: '3 months' },
    { step: 5, title: 'Launch & Scale', desc: 'Launch your business and grow it.', duration: 'Ongoing' },
  ],
  'HR Manager': [
    { step: 1, title: 'Learn HR Basics', desc: 'Study recruitment, onboarding and HR policies.', duration: '2 months' },
    { step: 2, title: 'Learn Labor Laws', desc: 'Study employment laws and regulations.', duration: '2 months' },
    { step: 3, title: 'Learn HR Software', desc: 'Master HRMS tools like SAP HR or Workday.', duration: '2 months' },
    { step: 4, title: 'Get Certified', desc: 'Get SHRM or CIPD certification.', duration: '3 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for HR manager roles.', duration: '1 month' },
  ],
  // Medical
  'Doctor / Surgeon': [
    { step: 1, title: 'Complete Pre-Medical', desc: 'Excel in Biology, Chemistry and Physics.', duration: '2 years' },
    { step: 2, title: 'Get MBBS Degree', desc: 'Complete 5 year medical degree program.', duration: '5 years' },
    { step: 3, title: 'Complete House Job', desc: 'Do 1 year mandatory house job training.', duration: '1 year' },
    { step: 4, title: 'Specialization', desc: 'Choose a specialty and complete residency.', duration: '3-5 years' },
    { step: 5, title: 'Practice Medicine', desc: 'Start practicing as a qualified doctor.', duration: 'Ongoing' },
  ],
  'Pharmacist': [
    { step: 1, title: 'Study Pre-Medical', desc: 'Focus on Chemistry and Biology.', duration: '2 years' },
    { step: 2, title: 'Complete Pharm-D', desc: 'Complete 5 year pharmacy degree.', duration: '5 years' },
    { step: 3, title: 'Complete Internship', desc: 'Do pharmacy internship training.', duration: '1 year' },
    { step: 4, title: 'Get Licensed', desc: 'Pass pharmacy licensing exam.', duration: '3 months' },
    { step: 5, title: 'Start Career', desc: 'Work in hospital, clinic or pharmacy.', duration: 'Ongoing' },
  ],
  'Nurse / Healthcare Worker': [
    { step: 1, title: 'Complete BSN Degree', desc: 'Get Bachelor of Science in Nursing.', duration: '4 years' },
    { step: 2, title: 'Clinical Training', desc: 'Complete practical hospital training.', duration: '1 year' },
    { step: 3, title: 'Get Licensed', desc: 'Pass nursing licensing examination.', duration: '3 months' },
    { step: 4, title: 'Gain Experience', desc: 'Work in hospital or clinic setting.', duration: '2 years' },
    { step: 5, title: 'Specialize', desc: 'Specialize in ICU, pediatrics or surgery.', duration: 'Ongoing' },
  ],
  'Biologist / Research Scientist': [
    { step: 1, title: 'Get Biology Degree', desc: 'Complete BSc in Biology or Life Sciences.', duration: '4 years' },
    { step: 2, title: 'Learn Lab Skills', desc: 'Master laboratory techniques and equipment.', duration: '1 year' },
    { step: 3, title: 'Complete Masters', desc: 'Get MSc in specialized biology field.', duration: '2 years' },
    { step: 4, title: 'Research & Publications', desc: 'Publish research papers in journals.', duration: '2 years' },
    { step: 5, title: 'Apply for Positions', desc: 'Apply for research scientist roles.', duration: '1 month' },
  ],
  'Chemist / Lab Scientist': [
    { step: 1, title: 'Get Chemistry Degree', desc: 'Complete BSc in Chemistry.', duration: '4 years' },
    { step: 2, title: 'Master Lab Techniques', desc: 'Learn spectroscopy, chromatography.', duration: '1 year' },
    { step: 3, title: 'Complete Masters', desc: 'Get MSc in Chemistry or related field.', duration: '2 years' },
    { step: 4, title: 'Research & Development', desc: 'Work on R&D projects in industry.', duration: '2 years' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for chemist or lab scientist roles.', duration: '1 month' },
  ],
  // Engineering
  'Electrical Engineer': [
    { step: 1, title: 'Get Electrical Engineering Degree', desc: 'Complete BE/BSc in Electrical Engineering.', duration: '4 years' },
    { step: 2, title: 'Learn Circuit Design', desc: 'Master circuit analysis and PCB design.', duration: '1 year' },
    { step: 3, title: 'Learn Programming', desc: 'Learn MATLAB, Python or C for engineering.', duration: '6 months' },
    { step: 4, title: 'Get Certified', desc: 'Get PEC license or relevant certification.', duration: '6 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for electrical engineer roles.', duration: '1 month' },
  ],
  'Mechanical Engineer': [
    { step: 1, title: 'Get Mechanical Engineering Degree', desc: 'Complete BE/BSc in Mechanical Engineering.', duration: '4 years' },
    { step: 2, title: 'Learn CAD Software', desc: 'Master AutoCAD, SolidWorks or CATIA.', duration: '6 months' },
    { step: 3, title: 'Learn Thermodynamics', desc: 'Study heat transfer and fluid mechanics.', duration: '1 year' },
    { step: 4, title: 'Complete Internship', desc: 'Get hands-on industry experience.', duration: '6 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for mechanical engineer roles.', duration: '1 month' },
  ],
  'Civil Engineer': [
    { step: 1, title: 'Get Civil Engineering Degree', desc: 'Complete BE/BSc in Civil Engineering.', duration: '4 years' },
    { step: 2, title: 'Learn AutoCAD', desc: 'Master AutoCAD and structural design.', duration: '6 months' },
    { step: 3, title: 'Learn Project Management', desc: 'Study construction management and planning.', duration: '6 months' },
    { step: 4, title: 'Get Licensed', desc: 'Get PEC license for engineering practice.', duration: '6 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for civil engineer roles.', duration: '1 month' },
  ],
  'Chemical Engineer': [
    { step: 1, title: 'Get Chemical Engineering Degree', desc: 'Complete BE/BSc in Chemical Engineering.', duration: '4 years' },
    { step: 2, title: 'Learn Process Design', desc: 'Study chemical processes and plant design.', duration: '1 year' },
    { step: 3, title: 'Learn Simulation Software', desc: 'Master ASPEN Plus or HYSYS.', duration: '6 months' },
    { step: 4, title: 'Complete Internship', desc: 'Work in chemical or petroleum industry.', duration: '6 months' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for chemical engineer roles.', duration: '1 month' },
  ],
  // Education & Arts
  'Teacher / Professor': [
    { step: 1, title: 'Get Relevant Degree', desc: 'Complete BSc/BA in your subject of choice.', duration: '4 years' },
    { step: 2, title: 'Get B.Ed Degree', desc: 'Complete Bachelor of Education degree.', duration: '1 year' },
    { step: 3, title: 'Do Teaching Practice', desc: 'Complete supervised classroom teaching.', duration: '6 months' },
    { step: 4, title: 'Get Certified', desc: 'Get teaching certification from education board.', duration: '3 months' },
    { step: 5, title: 'Start Teaching', desc: 'Apply for teaching positions in schools or universities.', duration: 'Ongoing' },
  ],
  'Psychologist / Counselor': [
    { step: 1, title: 'Get Psychology Degree', desc: 'Complete BSc in Psychology.', duration: '4 years' },
    { step: 2, title: 'Complete Masters', desc: 'Get MSc in Clinical or Counseling Psychology.', duration: '2 years' },
    { step: 3, title: 'Complete Supervised Hours', desc: 'Complete required supervised practice hours.', duration: '1 year' },
    { step: 4, title: 'Get Licensed', desc: 'Get psychology license from relevant board.', duration: '3 months' },
    { step: 5, title: 'Start Practice', desc: 'Work in hospitals, schools or private practice.', duration: 'Ongoing' },
  ],
  'Lawyer / Legal Advisor': [
    { step: 1, title: 'Get LLB Degree', desc: 'Complete Bachelor of Laws degree.', duration: '5 years' },
    { step: 2, title: 'Complete Internship', desc: 'Intern at a law firm or court.', duration: '1 year' },
    { step: 3, title: 'Pass Bar Exam', desc: 'Pass the bar examination to practice law.', duration: '6 months' },
    { step: 4, title: 'Gain Experience', desc: 'Work as junior lawyer to build experience.', duration: '2 years' },
    { step: 5, title: 'Start Practice', desc: 'Start your own practice or join a firm.', duration: 'Ongoing' },
  ],
  'Journalist / Media Professional': [
    { step: 1, title: 'Get Mass Communication Degree', desc: 'Complete BS in Mass Communication or Journalism.', duration: '4 years' },
    { step: 2, title: 'Learn Writing & Reporting', desc: 'Master news writing and investigative reporting.', duration: '6 months' },
    { step: 3, title: 'Learn Digital Media', desc: 'Learn social media, video editing and podcasting.', duration: '6 months' },
    { step: 4, title: 'Build Portfolio', desc: 'Write articles and build your media portfolio.', duration: '1 year' },
    { step: 5, title: 'Apply for Jobs', desc: 'Apply for journalist or media roles.', duration: '1 month' },
  ],
  'Architect / Interior Designer': [
    { step: 1, title: 'Get Architecture Degree', desc: 'Complete B.Arch degree.', duration: '5 years' },
    { step: 2, title: 'Learn CAD & 3D Software', desc: 'Master AutoCAD, SketchUp and 3ds Max.', duration: '1 year' },
    { step: 3, title: 'Complete Internship', desc: 'Work with experienced architects.', duration: '1 year' },
    { step: 4, title: 'Get Licensed', desc: 'Get architecture license from council.', duration: '6 months' },
    { step: 5, title: 'Start Practice', desc: 'Join a firm or start your own studio.', duration: 'Ongoing' },
  ],
  'Social Worker / NGO Professional': [
    { step: 1, title: 'Get Social Work Degree', desc: 'Complete BSW - Bachelor of Social Work.', duration: '4 years' },
    { step: 2, title: 'Complete Field Work', desc: 'Do practical community fieldwork.', duration: '1 year' },
    { step: 3, title: 'Learn Project Management', desc: 'Study NGO management and grant writing.', duration: '6 months' },
    { step: 4, title: 'Volunteer & Network', desc: 'Work with NGOs to build experience.', duration: '1 year' },
    { step: 5, title: 'Apply for Positions', desc: 'Apply for social work or NGO roles.', duration: '1 month' },
  ],
};

function Roadmap({ career }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userDegree = user.degree || 'BSCS';
  const category = getDegreeCategory(userDegree);
  const degreeRoadmap = DEGREE_ROADMAPS[category] || DEGREE_ROADMAPS.computing;

  const steps = (career && roadmaps[career]) ? roadmaps[career] : degreeRoadmap.steps;
  const displayTitle = (career && roadmaps[career]) ? career : `${userDegree} Roadmap (${degreeRoadmap.title})`;

  return (
    <div style={{ padding: '60px 20px', fontFamily: "'Outfit', sans-serif", maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '65px', height: '65px', background: theme.gradientPrimary, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px', boxShadow: theme.shadowGlow }}>🗺️</div>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: theme.text, margin: '0 0 6px' }}>Career Roadmap</h2>
        <h3 style={{ color: theme.primary, margin: '0 0 8px', fontSize: '18px', fontWeight: '800' }}>{displayTitle}</h3>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14.5px', fontFamily: "'Inter', sans-serif" }}>Follow these customized stages to manifest your career trajectory</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
        {/* Connecting Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '21px', // half of 42px width
          top: '20px',
          bottom: '20px',
          width: '3px',
          background: theme.gradientPrimary,
          borderRadius: '2px',
          zIndex: 1,
          opacity: 0.4
        }} />

        {steps.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'stretch', position: 'relative', zIndex: 2 }}>
            {/* Step Number Circle */}
            <div style={{
              background: theme.gradientPrimary,
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '16px',
              color: 'white',
              flexShrink: 0,
              boxShadow: theme.shadowGlow,
              border: `3px solid ${theme.bg}`
            }}>
              {item.step}
            </div>

            {/* Content Card */}
            <div style={{
              flex: 1,
              backgroundColor: theme.surface,
              borderRadius: '16px',
              padding: '20px 24px',
              boxShadow: theme.shadowMd,
              border: `1px solid ${theme.border}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 120, 0, 0.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = theme.shadowMd;
            }}
            >
              <h4 style={{ margin: '0 0 6px', color: theme.text, fontWeight: '800', fontSize: '16px', fontFamily: "'Outfit', sans-serif" }}>
                {item.title}
              </h4>
              <p style={{ margin: '0 0 10px', color: theme.textSecondary, fontSize: '13.5px', lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
                {item.desc}
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 120, 0, 0.08)',
                color: theme.primary,
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                fontFamily: "'Outfit', sans-serif"
              }}>
                ⏱ Duration: {item.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;