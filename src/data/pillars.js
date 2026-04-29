/* ============================================
   PILLARS DATA — Mphasis AI & Applied Tech Lab
   5 research pillars with descriptions, metrics, and project lists
   ============================================ */

window.PILLARS_DATA = {

  'ai': {
    name: 'AI@Ashoka',
    tagline: 'Interdisciplinary AI research across 14 projects and 7 academic departments',
    description: 'AI@Ashoka is the lab\'s largest research pillar, with 14 active projects spanning 7 academic departments — including Computer Science, Biology, Chemistry, Environmental Studies, Physics, Psychology, and Communication. Rather than treating AI as a field unto itself, we integrate machine learning methods into research domains where they can make a genuine difference: detecting cancer, accelerating drug discovery, monitoring environmental change, and analysing media at scale.\n\nNotable outcomes include a publication in the Nature portfolio for cancer research, recognition by India\'s Ministry of Electronics and Information Technology at the India-AI Impact Summit, and a Schmidt AI for Science Fellowship at Oxford.',
    keyMetrics: [
      { value: '14', label: 'Projects' },
      { value: '7', label: 'Departments' },
      { value: '7+', label: 'Publications' },
      { value: '17', label: 'Faculty' }
    ],
    projects: [
      'cancer-ascend',
      'ns3-inhibitors',
      'ai-antibiotic-discovery',
      'ai-biomarker-discovery',
      'ai-demographic-inference',
      'aim-flow',
      'infant-gaze-analysis',
      'cof-screening',
      'fire-mapping',
      'pollen-project',
      'acoustic-biodiversity',
      'cs-pedagogy',
      'cwc',
      'indiamedialens'
    ],
    themes: [
      'Computational Health & Translational Medicine',
      'Educational Integration & AI Pedagogy',
      'Environmental Monitoring & Climate Science',
      'Biodiversity & Conservation Biology',
      'Digital Humanities & Media Analysis',
      'Materials Science & Chemistry'
    ]
  },

  'bharatsim': {
    name: 'BharatSim',
    tagline: 'India-scale agent-based epidemiological modelling and public health simulation',
    description: 'BharatSim is an open-source simulation framework built to model how diseases spread across India\'s diverse and complex population. Drawing on census data, geographic variation, and real behavioural patterns, it can simulate outbreaks at national scale — giving researchers and policymakers a way to test interventions before deploying them in the real world.\n\nOriginally developed during the COVID-19 pandemic, BharatSim has since been used to model avian influenza (H5N1), mpox, HIV/AIDS, and dengue. A study on H5N1 published in BMC Public Health was covered by over 20 international outlets including the BBC, NDTV, and the Sydney Morning Herald. The team has presented their work at the WHO, Wellcome Trust, IIT Bombay, and other leading institutions.',
    keyMetrics: [
      { value: '1', label: 'Large-Scale Project' },
      { value: '20+', label: 'Media Outlets' },
      { value: '10+', label: 'Invited Talks' }
    ],
    projects: [
      'bharatsim'
    ],
    themes: [
      'Public Health & Epidemiological Modeling',
      'Computational Health & Translational Medicine'
    ]
  },

  'chart': {
    name: 'CHART',
    tagline: 'Centre for Health Analytics Research and Trends',
    description: 'CHART applies computational methods to problems at the frontiers of healthcare and food science. Its three research projects address: AI-assisted clinical diagnosis, the science of food and nutrition through multimodal data, and molecular profiling of an aggressive form of breast cancer.\n\nThe pillar has produced over 8 peer-reviewed publications in top venues including NeurIPS, ACM Multimedia, and EMNLP. PRISM, our conversational AI system for abdominal pain diagnosis, was accepted at the NeurIPS 2025 GenAI4Health workshop. Our food computing project organised the first International Workshop on Multimodal Food Computing at ACM Multimedia in Dublin, and won the Promising Innovation Award at INFUSE 2025. Our breast cancer dataset — covering 4,800 cases and 100 patients profiled across 9 molecular markers — is among the largest of its kind in India.',
    keyMetrics: [
      { value: '3', label: 'Projects' },
      { value: '8+', label: 'Publications' },
      { value: '10,000+', label: 'Recipes in Database' },
      { value: '100+', label: 'Patients in Clinical Studies' }
    ],
    projects: [
      'folk-computing',
      'multimodal-food-computing',
      'tnbc'
    ],
    themes: [
      'Computational Health & Translational Medicine',
      'Digital Humanities & Media Analysis',
      'Public Health & Epidemiological Modeling'
    ]
  },

  'cyber': {
    name: 'Cybersecurity',
    tagline: 'Post-quantum cryptography research for securing critical internet infrastructure',
    description: 'As quantum computers grow more powerful, the encryption standards that currently secure the internet will become vulnerable. The Cybersecurity pillar focuses on post-quantum cryptography — designing protocols that remain robust even against quantum attacks.\n\nOur primary focus is securing the Domain Name System (DNS), the internet\'s foundational directory. We have developed a novel approach that removes the need for digital signatures in DNS security, significantly reducing data overhead and improving performance — while maintaining strong security guarantees. This work was published at ACM ASIACCS 2025, one of the leading venues in computer security, and received the Best Paper Award at SPACE 2023.',
    keyMetrics: [
      { value: '1', label: 'Project' },
      { value: '4', label: 'Publications' },
      { value: '1', label: 'Best Paper Award' }
    ],
    projects: [
      'pqc'
    ],
    themes: [
      'Cybersecurity & Post-Quantum Cryptography'
    ]
  },

  'makerspace': {
    name: 'Makerspace',
    tagline: 'Digital fabrication, scientific instrumentation, and hands-on innovation',
    description: 'The Makerspace is both a professional fabrication facility and a hub for cross-disciplinary research. Equipped with laser cutters, CNC machines, industrial-grade 3D printers, and DGCA-certified drones, it supports projects that require physical prototyping alongside computational work.\n\nIts most significant research output is the Covalent Magnetic Tweezers (CMT) — a precision instrument for studying biological molecules at the single-molecule level, and one of a kind in India. Research using the CMT has resulted in 3 publications in Nature portfolio and other major journals. The Makerspace also runs RedBrick Hacks, Ashoka\'s annual innovation hackathon, which drew over 430 applications from 91 universities in its most recent edition — with winning projects including a carbon credits platform and a diagnostic tool for a neglected tropical disease, the latter selected for research collaboration with Stanford. Through school outreach programmes, the Makerspace has directly engaged over 2,000 K–12 students.',
    keyMetrics: [
      { value: '4', label: 'Core Projects' },
      { value: '2,000+', label: 'K-12 Students Engaged' },
      { value: '5', label: 'Publications' },
      { value: '430+', label: 'Hackathon Applicants' }
    ],
    projects: [
      'cmt',
      'digital-makerspace',
      'table-top-experiments',
      'pedagogical-experiments'
    ],
    themes: [
      'Digital Fabrication & Innovation',
      'Materials Science & Chemistry',
      'Educational Integration & AI Pedagogy'
    ]
  }

};
