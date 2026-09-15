<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Career;

class CareerSeeder extends Seeder
{
    public function run()
    {
        // Clear existing careers
        Career::truncate();

        $careers = [
            [
                'title' => 'Software Engineer',
                'description' => 'Build, develop, and maintain complex software applications and systems.',
                'salary_range' => '$70,000 - $120,000/year',
                'demand_level' => 'Very High',
                'required_skills' => json_encode(['Python', 'JavaScript', 'React', 'Node.js', 'SQL']),
            ],
            [
                'title' => 'Data Scientist',
                'description' => 'Analyze large, complex datasets to identify patterns and find useful business insights.',
                'salary_range' => '$80,000 - $130,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Python', 'Machine Learning', 'SQL', 'Statistics', 'R']),
            ],
            [
                'title' => 'AI Engineer',
                'description' => 'Design, build, and deploy intelligent artificial intelligence and neural network systems.',
                'salary_range' => '$95,000 - $160,000/year',
                'demand_level' => 'Very High',
                'required_skills' => json_encode(['Python', 'TensorFlow', 'Deep Learning', 'NLP', 'PyTorch']),
            ],
            [
                'title' => 'Cybersecurity Expert',
                'description' => 'Protect organization infrastructure, systems, and sensitive data from cyber threats.',
                'salary_range' => '$75,000 - $125,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Networking', 'Ethical Hacking', 'Linux', 'Cryptography']),
            ],
            [
                'title' => 'Web Developer',
                'description' => 'Build, layout, and design responsive websites and modern front-end web applications.',
                'salary_range' => '$60,000 - $110,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['HTML', 'CSS', 'JavaScript', 'React', 'Git']),
            ],
            [
                'title' => 'Mobile App Developer',
                'description' => 'Design and construct mobile applications for iOS and Android platforms.',
                'salary_range' => '$70,000 - $115,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Swift', 'Kotlin', 'React Native', 'Flutter', 'Mobile UI']),
            ],
            [
                'title' => 'Network Engineer',
                'description' => 'Design, configure, and maintain local and wide area computer networks.',
                'salary_range' => '$65,000 - $105,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Routing & Switching', 'Firewalls', 'Cisco', 'TCP/IP']),
            ],
            [
                'title' => 'Database Administrator',
                'description' => 'Store, organize, manage, and protect database architectures and services.',
                'salary_range' => '$68,000 - $110,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['SQL Server', 'MySQL', 'Database Tuning', 'Backups']),
            ],
            [
                'title' => 'Cloud Engineer',
                'description' => 'Deploy, architect, and manage cloud infrastructures on AWS, GCP, or Azure.',
                'salary_range' => '$85,000 - $135,000/year',
                'demand_level' => 'Very High',
                'required_skills' => json_encode(['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux']),
            ],
            [
                'title' => 'Game Developer',
                'description' => 'Design, program, and build interactive 2D and 3D video games.',
                'salary_range' => '$60,000 - $115,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['C#', 'C++', 'Unity', 'Unreal Engine', '3D Math']),
            ],
            [
                'title' => 'QA Engineer',
                'description' => 'Test software builds, write test plans, and ensure overall release stability.',
                'salary_range' => '$58,000 - $98,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Selenium', 'Unit Testing', 'QA Methodologies', 'Bug Tracking']),
            ],
            [
                'title' => 'UI/UX Designer',
                'description' => 'Create user flows, wireframes, and gorgeous, user-centered interface layouts.',
                'salary_range' => '$65,000 - $110,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Figma', 'Adobe XD', 'Prototyping', 'User Research']),
            ],
            [
                'title' => 'Business Analyst',
                'description' => 'Analyze business models, processes, and systems to propose optimal solutions.',
                'salary_range' => '$70,000 - $115,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Agile', 'Requirements Gathering', 'Process Modeling', 'Jira']),
            ],
            [
                'title' => 'Accountant / Financial Analyst',
                'description' => 'Prepare and analyze financial accounts, records, tax structures, and statements.',
                'salary_range' => '$62,000 - $105,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Accounting principles', 'Excel', 'Financial Modeling', 'Taxation']),
            ],
            [
                'title' => 'Marketing Manager',
                'description' => 'Plan, direct, and coordinate digital and physical marketing strategies.',
                'salary_range' => '$65,000 - $112,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['SEO', 'Content Strategy', 'Social Media', 'Google Analytics']),
            ],
            [
                'title' => 'Entrepreneur',
                'description' => 'Establish, launch, and grow independent business opportunities and startups.',
                'salary_range' => '$50,000 - $200,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Business Strategy', 'Pitching', 'Leadership', 'Financial planning']),
            ],
            [
                'title' => 'HR Manager',
                'description' => 'Manage candidate recruitment, employee relations, and administrative organizational policies.',
                'salary_range' => '$60,000 - $100,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Recruiting', 'Conflict Resolution', 'Employment Law', 'Payroll']),
            ],
            [
                'title' => 'Supply Chain Manager',
                'description' => 'Coordinate logistically the flow of raw materials, operations, and final goods.',
                'salary_range' => '$68,000 - $110,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Logistics', 'Inventory Management', 'Negotiation', 'SAP']),
            ],
            [
                'title' => 'E-Commerce Specialist',
                'description' => 'Develop, manage, and coordinate commercial sales transactions over online channels.',
                'salary_range' => '$58,000 - $95,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Shopify', 'Digital Ads', 'Analytics', 'Conversion Tuning']),
            ],
            [
                'title' => 'Doctor / Surgeon',
                'description' => 'Diagnose and treat diseases, prescribe medications, and perform surgical procedures.',
                'salary_range' => '$150,000 - $350,000/year',
                'demand_level' => 'Very High',
                'required_skills' => json_encode(['Internal Medicine', 'Surgery', 'Patient Diagnostics', 'Pharmacology']),
            ],
            [
                'title' => 'Pharmacist',
                'description' => 'Dispense prescription medications, verify dosages, and counsel patients.',
                'salary_range' => '$100,000 - $135,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Pharmacology', 'Dosage Calculation', 'Patient Counsel', 'Inventory']),
            ],
            [
                'title' => 'Nurse / Healthcare Worker',
                'description' => 'Provide medical care, administer medicines, and support overall hospital operations.',
                'salary_range' => '$60,000 - $98,000/year',
                'demand_level' => 'Very High',
                'required_skills' => json_encode(['Patient Care', 'CPR', 'Vitals Monitoring', 'Emergency Response']),
            ],
            [
                'title' => 'Biologist / Research Scientist',
                'description' => 'Conduct scientific experiments, analyze biological processes, and study organisms.',
                'salary_range' => '$55,000 - $95,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Lab techniques', 'Data Analysis', 'Microscopy', 'Report Writing']),
            ],
            [
                'title' => 'Chemist / Lab Scientist',
                'description' => 'Analyze chemical properties, test formulations, and develop safe chemical compounds.',
                'salary_range' => '$56,000 - $94,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Organic Chemistry', 'Spectroscopy', 'Lab Safety', 'Formulation']),
            ],
            [
                'title' => 'Physicist / Research Scientist',
                'description' => 'Investigate fundamental physics theories, study quantum interactions, and design models.',
                'salary_range' => '$68,000 - $120,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Quantum Mechanics', 'Matlab', 'Data Modeling', 'Scientific Writing']),
            ],
            [
                'title' => 'Mathematician / Statistician',
                'description' => 'Apply advanced numerical formulas and statistical equations to corporate logistics.',
                'salary_range' => '$72,000 - $115,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Probability', 'R', 'SAS', 'Linear Algebra', 'Statistical Modeling']),
            ],
            [
                'title' => 'Biotechnologist',
                'description' => 'Research genetics and cell structures to formulate modern pharmaceutical compounds.',
                'salary_range' => '$64,000 - $110,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Gene Editing', 'Bioinformatics', 'PCR', 'Cell Culture']),
            ],
            [
                'title' => 'Environmental Scientist',
                'description' => 'Formulate remediation models to protect ecosystems and audit municipal waste patterns.',
                'salary_range' => '$55,000 - $90,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Ecology', 'GIS Mapping', 'Field Sampling', 'Regulatory Audit']),
            ],
            [
                'title' => 'Electrical Engineer',
                'description' => 'Design, prototype, and manufacture custom circuit systems and electrical components.',
                'salary_range' => '$72,000 - $115,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Circuit Design', 'CAD', 'Microcontrollers', 'Power Systems']),
            ],
            [
                'title' => 'Mechanical Engineer',
                'description' => 'Architect and construct mechanical tools, engine assemblies, and thermodynamic devices.',
                'salary_range' => '$70,000 - $112,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['SolidWorks', 'Thermodynamics', 'Materials Science', 'FEA']),
            ],
            [
                'title' => 'Civil Engineer',
                'description' => 'Design and coordinate the structural engineering of roads, bridges, and municipal assets.',
                'salary_range' => '$68,000 - $110,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Structural Design', 'AutoCAD', 'Project Management', 'Surveying']),
            ],
            [
                'title' => 'Chemical Engineer',
                'description' => 'Supervise industrial operations relating to manufacturing, gas refine, and chemical conversion.',
                'salary_range' => '$74,000 - $118,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Thermodynamics', 'Process Engineering', 'Safety audits', 'Simulation']),
            ],
            [
                'title' => 'Teacher / Professor',
                'description' => 'Educate students, design course curriculum, and guide class activities.',
                'salary_range' => '$45,000 - $85,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Classroom Management', 'Lesson Planning', 'Mentoring', 'Public Speaking']),
            ],
            [
                'title' => 'Psychologist / Counselor',
                'description' => 'Consult patients regarding behavior, study mental health patterns, and deliver support sessions.',
                'salary_range' => '$62,000 - $105,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Clinical Psychology', 'Therapy Methods', 'Active Listening', 'Empathy']),
            ],
            [
                'title' => 'Lawyer / Legal Advisor',
                'description' => 'Represent clients, file legal petitions, and advise on corporate contract matrices.',
                'salary_range' => '$90,000 - $180,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['Litigation', 'Legal Research', 'Contract Drafting', 'Negotiation']),
            ],
            [
                'title' => 'Journalist / Media Professional',
                'description' => 'Interview sources, edit standard print copy, and produce television news programs.',
                'salary_range' => '$46,000 - $82,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Copywriting', 'Interviewing', 'Video Editing', 'Publishing Tools']),
            ],
            [
                'title' => 'Animator / Visual Artist',
                'description' => 'Design vector models, coordinate rendering pipelines, and animate 3D video assets.',
                'salary_range' => '$52,000 - $92,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Maya', '3D Modeling', 'Character Design', 'Drawing', 'After Effects']),
            ],
            [
                'title' => 'Architect / Interior Designer',
                'description' => 'Plan building blueprints, formulate interior layouts, and select materials structural components.',
                'salary_range' => '$68,000 - $115,000/year',
                'demand_level' => 'High',
                'required_skills' => json_encode(['AutoCAD', 'Revit', 'Interior Design', 'Building Codes']),
            ],
            [
                'title' => 'Social Worker / NGO Professional',
                'description' => 'Manage community outreach programs, help vulnerable groups, and implement charity campaigns.',
                'salary_range' => '$42,000 - $70,000/year',
                'demand_level' => 'Medium',
                'required_skills' => json_encode(['Case Management', 'Community Outreach', 'Crisis Intervention', 'NGO policies']),
            ],
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }
    }
}