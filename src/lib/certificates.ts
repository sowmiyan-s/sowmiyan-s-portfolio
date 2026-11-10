export interface Certificate {
  name: string;
  image: string;
  issuer?: string;
}

// Dynamically match all image files inside the src/assets/CERTIFICATE directory
const certModules = import.meta.glob<{ default: string }>('../assets/CERTIFICATE/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true });

// Top Goated priority order (Top 4 enterprise credentials guaranteed on top)
const GOATED_ORDER: string[] = [
  'SERVICENOW INTERN',
  'AWS',
  'MS GEN AI COURSERA',
  'TCS CODEVITA SEASON 13',
  'INFOSIS PYTHON FOR DATA SCIENCE',
  'INFOSIS GEN I',
  'IJCRT CYBERSECURITY',
  'Responsible & Safe AI',
  'FUTURESKILL YUVA AI',
  'PYTHON DATA SCIENCE - BOARD INFINITY',
  'ISEA CYBER',
  'AISECT INTERNSHIP',
  'FORAGE',
  'SOAR',
  'SPARKATHON',
  'UDEMY JAVA',
];

const PRETTY_TITLES: Record<string, string> = {
  'SERVICENOW INTERN': 'ServiceNow Software Engineering Internship',
  'AWS': 'AWS Cloud Fundamentals & Architecture',
  'MS GEN AI COURSERA': 'Microsoft Generative AI Specialization (Coursera)',
  'TCS CODEVITA SEASON 13': 'TCS CodeVita Season 13 Global Coding Contest',
  'INFOSIS PYTHON FOR DATA SCIENCE': 'Infosys Python for Data Science',
  'INFOSIS GEN I': 'Infosys Generative AI Certification',
  'INFOSIS GEN I ': 'Infosys Generative AI Certification',
  'IJCRT CYBERSECURITY': 'IJCRT Peer-Reviewed Cybersecurity Publication',
  'Responsible & Safe AI': 'Responsible & Safe AI Certification',
  'FUTURESKILL YUVA AI': 'FutureSkills Prime Yuva AI Certification',
  'PYTHON DATA SCIENCE - BOARD INFINITY': 'Python for Data Science · Board Infinity',
  'ISEA CYBER': 'ISEA Government Information Security & Cyber Defense',
  'AISECT INTERNSHIP': 'AISECT Software Engineering Internship',
  'FORAGE': 'Forage Software Engineering Virtual Experience',
  'SOAR': 'SOAR Technical Excellence Award',
  'SPARKATHON': 'Sparkathon Hackathon Innovation',
  'UDEMY JAVA': 'Java Programming Complete Masterclass (Udemy)',
  'GUVI AI FOR INDIA': 'GUVI AI for India Certification',
  'GUVI BUILD YOUR AI APP': 'GUVI Build Your AI Application',
  'GUVI BUILDATHON': 'GUVI National Buildathon Hackathon',
  'GUVI CHAT GPT': 'GUVI Generative AI & Prompt Engineering',
  'GUVI FULLSTACK': 'GUVI Full-Stack Web Development',
  'GUVI HACKING B': 'GUVI Ethical Hacking Foundations',
  'GUVI HTML': 'GUVI HTML5 Modern Architecture',
  'GUVI LEARNATHON': 'GUVI Learnathon Technical Achievement',
  'GUVI PYTHON': 'GUVI Python Programming Fundamentals',
  'GUVI SEO': 'GUVI SEO & Search Optimization',
  'GUVI TAILWIND': 'GUVI Modern Tailwind CSS Framework',
  'GUVI UIUX': 'GUVI UI/UX Design System Foundations',
  'HACK GREEN_page-0001': 'HackGreen National Hackathon',
  'INTERNSHIP STUDIO': 'Internship Studio Software Internship',
  'IPR WEBINAR': 'Intellectual Property Rights (IPR) Workshop',
  'CIT WORKSHOP': 'CIT Technical AI & Systems Workshop',
  'ML': 'Machine Learning Foundations',
  'NO CODE ML': 'No-Code Machine Learning Systems',
  'PANDAS': 'Pandas Data Analysis & Manipulation',
  'SCHOLARSHIP TEST GUVI': 'GUVI National Technical Scholarship',
  'SKILL INTERN AMBASSATOR': 'Skill Intern Technical Ambassador',
};

export const certificatesList: Certificate[] = Object.entries(certModules)
  // Remove Canva milestone completely as requested
  .filter(([path]) => !/canva/i.test(path))
  .map(([path, module]) => {
    const filename = path.split('/').pop() || '';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')).trim();

    // Match custom title or format default title
    const customTitle = PRETTY_TITLES[nameWithoutExt] || PRETTY_TITLES[nameWithoutExt.replace(/\s+/g, ' ')];
    const defaultTitle = nameWithoutExt
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return {
      rawKey: nameWithoutExt,
      name: customTitle || defaultTitle,
      image: module.default,
    };
  })
  .sort((a, b) => {
    const getRank = (rawName: string) => {
      const idx = GOATED_ORDER.findIndex((key) =>
        rawName.toUpperCase().includes(key.toUpperCase())
      );
      return idx === -1 ? 999 : idx;
    };

    const rankA = getRank(a.rawKey);
    const rankB = getRank(b.rawKey);

    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.name.localeCompare(b.name);
  })
  .map(({ name, image }) => ({ name, image }));
