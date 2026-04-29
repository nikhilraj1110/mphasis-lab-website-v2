/* ============================================
   PROJECTS DATA
   25+ research projects across 5 pillars
   ============================================ */

window.PROJECTS_DATA = {

  /* ═══════════════════════════════════════════
     AI@ASHOKA — 14 projects
     ═══════════════════════════════════════════ */

  'cancer-ascend': {
    id: 'cancer-ascend',
    title: 'Cancer (ACSCEND & OncoMark)',
    subtitle: 'AI-driven cancer diagnostics through single-cell and bulk gene expression analysis',
    pillar: 'ai',
    pis: [
      { name: 'Debayan Gupta', slug: 'debayan-gupta', role: 'Faculty, Computer Science' },
      { name: 'Shubhasis Haldar', slug: '', role: 'S.N. Bose National Centre for Basic Sciences' }
    ],
    description: 'This project uses AI to investigate single-cell and bulk gene expression data for cancer diagnostics. Two major tools have been developed: ACSCEND, an ML-based cancer stem cell profiler that identifies and quantifies cancer stem cells across multiple tumor types, and OncoMark, a neural multi-task learning framework for comprehensive cancer hallmark quantification.\n\nOncoMark, published in Communications Biology (Nature portfolio), is the first computational tool designed to predict all 10 cancer hallmarks concurrently. It demonstrated high accuracy across multiple cancer types and was validated on independent cohorts and real-world patient samples from major datasets.\n\nThe publication received significant national media coverage from 7+ outlets.',
    highlights: [
      'OncoMark published in Communications Biology (Nature portfolio) — first tool to predict all 10 cancer hallmarks concurrently',
      'Validated across multiple independent cohorts and real-world patient datasets',
      '7+ national media outlets covered the OncoMark publication'
    ],
    publications: [
      {
        title: 'OncoMark: A High-Throughput Neural Multi-Task Learning Framework for Comprehensive Cancer Hallmark Quantification',
        authors: ['Debojyoti Chowdhury', 'Sayan Biswas', 'Shreyansh Priyadarshi', 'Bhavesh Neekhra', 'Debayan Gupta', 'Shubhasis Haldar'],
        venue: 'Communications Biology (Nature portfolio)',
        year: 2025,
        type: 'journal',
        doi: '10.1038/s42003-025-08727-z'
      },
      {
        title: 'Comprehensive Enumeration of Cancer Stem-like Cell Heterogeneity Using Deep Neural Network (ACSCEND)',
        authors: ['Debayan Gupta', 'Shubhasis Haldar', 'et al.'],
        venue: 'bioRxiv',
        year: 2024,
        type: 'preprint',
        doi: '10.1101/2024.11.26.625418v1'
      }
    ],
    team: [
      { name: 'Shivam Sahu', role: 'Research Assistant (Feature Selection)', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'S.N. Bose National Centre for Basic Sciences, Kolkata', country: 'India' },
      { name: 'IIT Kharagpur', country: 'India' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Deep Learning'],
    relatedProjects: ['aim-flow', 'tnbc', 'cmt'],
    status: 'active'
  },

  'ns3-inhibitors': {
    id: 'ns3-inhibitors',
    title: 'Dengue NS3 Protease Inhibitors',
    subtitle: 'Ensemble ML and computational biophysics for discovering small-molecule dengue virus inhibitors',
    pillar: 'ai',
    pis: [
      { name: 'Sourav Chatterjee', slug: 'sourav-chatterjee', role: 'Faculty, Chemistry' },
      { name: 'Rintu Kutum', slug: 'rintu-kutum', role: 'Faculty, Computer Science' }
    ],
    description: 'This project develops computational methods combining machine learning and biophysics to identify potential drug candidates against the dengue virus. The team screened millions of molecules computationally and identified promising compounds, with one showing strong inhibitory activity in laboratory validation conducted in collaboration with IISER Kolkata — marking a significant milestone in the transition from computational prediction to experimental validation.',
    highlights: [
      'Millions of molecules screened computationally, yielding promising drug candidates',
      'Experimental validation achieved in collaboration with IISER Kolkata',
      'Complete FAIR (Findable, Accessible, Interoperable, Reusable) drug discovery workflow from computational screening to experimental validation'
    ],
    publications: [],
    team: [
      { name: 'Rik Ganguly', role: 'Junior Engineer, Folk Computing', institution: 'Ashoka University' },
      { name: 'Gayathri D', role: 'Research Associate', institution: 'Ashoka University' },
      { name: 'Aawaj Kuloong Rai', role: 'Research Associate', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IISER Kolkata', country: 'India' },
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'IISER Bhopal', country: 'India' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Drug Discovery'],
    relatedProjects: ['ai-antibiotic-discovery', 'folk-computing'],
    status: 'active'
  },

  'ai-antibiotic-discovery': {
    id: 'ai-antibiotic-discovery',
    title: 'AI-Driven Antibiotic Discovery',
    subtitle: 'Mining archaic hominin paleogenomes for next-generation antimicrobial peptides using deep learning',
    pillar: 'ai',
    pis: [
      { name: 'Imroze Khan', slug: 'imroze-khan', role: 'Faculty, Biology' }
    ],
    description: 'This project discovers antimicrobial peptides from ancient hominin genomes using a novel deep learning algorithm, large language models, paleogenomics, and molecular dynamics simulation, with the aim of developing next-generation antibiotics to combat drug-resistant bacteria.\n\nThe team developed a first-of-its-kind Kolmogorov-Arnold Transformer (KAT) algorithm that incorporates evolutionary parameters across species. Thousands of archaic peptides have been identified from hominin paleogenome lineages including Neanderthal and Denisovan genomes, with validated candidates now being synthesized and tested against drug-resistant bacteria.\n\nThe project has successfully transitioned from purely computational to wet-lab validation, with synthesized archaic peptides showing activity against critical drug-resistant pathogens.',
    highlights: [
      'Novel KAT (Kolmogorov-Arnold Transformer) algorithm developed — first of its kind',
      'Thousands of archaic peptides identified from hominin paleogenome lineages',
      'Successfully transitioned from computational prediction to wet-lab validation',
      'Oral presentation at Ecological Immunology Workshop 2025, Berlin'
    ],
    publications: [],
    team: [
      { name: 'Ritu Panwar', role: 'Post-doctoral Fellow', institution: 'Ashoka University' },
      { name: 'Krishanu Kanta', role: 'Project Assistant', institution: 'Ashoka University' },
      { name: 'Dipendra Nath Basu', role: 'Collaborator (Simons Fellow)', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'Shiv Nadar University', country: 'India' },
      { name: 'Simons Genome Diversity Project', country: 'International' }
    ],
    themes: ['Computational Health & Translational Medicine', 'Biodiversity & Conservation Biology'],
    relatedProjects: ['ns3-inhibitors', 'ai-biomarker-discovery'],
    status: 'active'
  },

  'ai-biomarker-discovery': {
    id: 'ai-biomarker-discovery',
    title: 'AI-Powered Biomarker Discovery',
    subtitle: 'Predicting mitochondrial function from confocal microscopy to enable targeted cancer therapy',
    pillar: 'ai',
    pis: [
      { name: 'Kasturi Mitra', slug: 'kasturi-mitra', role: 'Faculty, Biology' }
    ],
    description: 'This project develops AI-based predictive models to guide targeted cancer therapy through computational imaging of mitochondrial structure. The work has established a key proof of concept: machine learning can accurately predict mitochondrial function from structural features in networked mitochondria, a biologically significant finding that confirms structural information encodes functional state.\n\nThe deep learning phase uses advanced 3D models to extract higher-dimensional structural features for cancer biomarker identification.',
    highlights: [
      'Proof of concept: networked mitochondria encode function in structure, non-networks do not',
      'Machine learning accurately predicts mitochondrial function from structural features',
      'bioRxiv preprint published',
      'BDSA-25 workshop trained multidisciplinary students in ML for biosciences'
    ],
    publications: [
      {
        title: 'Quantitative analyses of single mitochondrial structure-function heterogeneity uncovers stemness specification by redox-tuned small-mitochondrial-networks',
        authors: ['Mayank Saini', 'et al.'],
        venue: 'bioRxiv',
        year: 2025,
        type: 'preprint',
        doi: '10.1101/2024.12.26.630414'
      }
    ],
    team: [
      { name: 'Abdullah Haneef', role: 'Research Assistant', institution: 'Ashoka University' },
      { name: 'Mayank Saini', role: 'PhD Student', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'Allen Institute of Cell Science', country: 'USA' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Deep Learning'],
    relatedProjects: ['cancer-ascend', 'tnbc'],
    status: 'active'
  },

  'ai-demographic-inference': {
    id: 'ai-demographic-inference',
    title: 'AI-Driven Demographic Inference',
    subtitle: 'Using machine learning to infer species demographic history from genetic data',
    pillar: 'ai',
    pis: [
      { name: 'Kritika Garg', slug: 'kritika-garg', role: 'Former Faculty, Biology' },
      { name: 'Balaji Chattopadhyay', slug: 'balaji-chattopadhyay', role: 'Faculty, Biology' }
    ],
    description: 'This project uses machine learning to infer species demographic history from genetic data. The system classifies demographic scenarios and estimates population parameters from genetic signatures.\n\nModels were validated on real-world Siamese crocodile genetic data, successfully predicting a documented population bottleneck event. The project also introduced a novel evaluation metric for demographic classification.',
    highlights: [
      'Real-world validation on Siamese crocodile data correctly predicted documented bottleneck',
      'Novel evaluation metric introduced for demographic classification',
      'Multiple ML algorithms benchmarked across classification and regression tasks'
    ],
    publications: [],
    team: [],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' }
    ],
    themes: ['Biodiversity & Conservation Biology', 'AI & Deep Learning'],
    relatedProjects: ['acoustic-biodiversity', 'pollen-project'],
    status: 'active'
  },

  'aim-flow': {
    id: 'aim-flow',
    title: 'AIM-Flow',
    subtitle: 'AI-powered analysis of flow cytometry data for leukemia diagnosis in Indian clinical laboratories',
    pillar: 'ai',
    pis: [
      { name: 'Rama Akondy', slug: 'rama-akondy', role: 'Faculty, Biology' }
    ],
    description: 'AIM-Flow develops AI-based methods for analyzing flow cytometry data to improve the diagnosis of leukemia, with a focus on Indian clinical laboratories. Machine learning models achieved high accuracy in identifying leukemia cells from clinical datasets. A clinical partnership has been established with Max Hospital, where the co-PI leads the Molecular Diagnostics division.',
    highlights: [
      'High-accuracy ML models developed for leukemia cell identification from flow cytometry data',
      'Clinical partnership established with Max Hospital for Indian patient data'
    ],
    publications: [],
    team: [
      { name: 'Mezya Sezen', role: 'Project Assistant', institution: 'Ashoka University' },
      { name: 'Krishnapriya Vinod', role: 'PhD Student', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'Max Hospital, Delhi', country: 'India' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Deep Learning'],
    relatedProjects: ['cancer-ascend', 'ai-biomarker-discovery'],
    status: 'active'
  },

  'infant-gaze-analysis': {
    id: 'infant-gaze-analysis',
    title: 'Infant Gaze Pattern Analysis',
    subtitle: 'Eye-tracking and ML for early detection of developmental delays in high-risk infants',
    pillar: 'ai',
    pis: [
      { name: 'Madhavi Maganti', slug: 'madhavi-maganti', role: 'Faculty, Psychology' }
    ],
    description: 'This project analyzes gaze patterns in preterm and term infants at risk for developmental delays using eye-tracking technology. Over 400 infants were assessed at Dr. RML Hospital, New Delhi — among the few studies globally examining gaze patterns in high-risk infants at this scale.\n\nMachine learning models can distinguish developmental gaze patterns across age groups, and the methodology was presented to the Meghalaya Early Childhood Development programme.',
    highlights: [
      'Over 400 infants assessed — one of the largest infant eye-tracking datasets globally',
      'Machine learning models distinguish developmental gaze patterns across age groups',
      'Methodology presented to Meghalaya Early Childhood Development programme'
    ],
    publications: [],
    team: [
      { name: 'Naveen Kumar Bhatraju', role: 'Data Analyst', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'Dr. RML Hospital, New Delhi', country: 'India' },
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'Many Babies Consortium', country: 'International' }
    ],
    themes: ['Computational Health & Translational Medicine', 'Educational Integration & AI Pedagogy'],
    relatedProjects: ['ai-biomarker-discovery', 'cs-pedagogy'],
    status: 'active'
  },

  'cof-screening': {
    id: 'cof-screening',
    title: 'High-Throughput COF Screening',
    subtitle: 'Machine learning for designing covalent organic frameworks to capture CO\u2082',
    pillar: 'ai',
    pis: [
      { name: 'Vidya Avasare', slug: 'vidya-avasare', role: 'Faculty, Chemistry' }
    ],
    description: 'This project uses machine learning to design and screen covalent organic frameworks (COFs) for efficient carbon dioxide capture. COFs are promising materials for carbon capture due to their tunable structures and high surface areas.\n\nThe team has conducted extensive computational screening at an unprecedented scale, compiled an experimental database of synthesized COFs, and developed working machine learning models to predict CO₂ capture performance.',
    highlights: [
      'Unprecedented scale of computational screening for carbon capture materials',
      'Experimental database of synthesized COFs compiled and validated',
      'Working ML models developed to predict CO₂ capture performance',
      'Presentations at TU Berlin, Sorbonne Paris, and FACTS-2025'
    ],
    publications: [],
    team: [
      { name: 'Zeeshan Nazir', role: 'Project Assistant, Carbon Capture Research', institution: 'Ashoka University' },
      { name: 'Shivam Kheral', role: 'Project Assistant', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'TU Berlin', country: 'Germany' },
      { name: 'Sorbonne University, Paris', country: 'France' }
    ],
    themes: ['Materials Science & Chemistry', 'Environmental Monitoring & Climate Science'],
    relatedProjects: ['fire-mapping', 'pollen-project'],
    status: 'active'
  },

  'fire-mapping': {
    id: 'fire-mapping',
    title: 'High-Resolution Fire Mapping',
    subtitle: 'Mapping fires at 30-meter resolution across India using satellite imagery and time-series ML',
    pillar: 'ai',
    pis: [
      { name: 'Meghna Agarwala', slug: 'meghna-agarwala', role: 'Faculty, Environmental Studies' }
    ],
    description: 'This project develops methods for classifying fires in Central India using high-resolution (30-meter) satellite imagery and time-series machine learning techniques, addressing the poor detection rates of existing global fire databases for small fires in heterogeneous dry tropical forests.\n\nThe team tested multiple classification approaches including RandomForest, CatBoost, LSTM, and CNN, with RandomForest performing best. A custom labelling application was built to create more training labels using both point-based and polygon-based approaches. The code for acquiring, classifying, and exporting the wall-to-wall fire product has been finalized. This work was presented at a NASA-SARI meeting at Ashoka University, where NASA scientists commended the approach.',
    highlights: [
      'Custom labelling application built for point-based and polygon-based fire labels',
      'Presented at NASA-SARI meeting — NASA scientists impressed with the approach',
      'Wall-to-wall fire product code finalized for Central India',
      '35 students trained in GIS, remote sensing, and ML'
    ],
    publications: [],
    team: [
      { name: 'Karan Kumar', role: 'Research Assistant', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'NASA-SARI', country: 'USA' }
    ],
    themes: ['Environmental Monitoring & Climate Science', 'AI & Remote Sensing'],
    relatedProjects: ['pollen-project', 'cof-screening'],
    status: 'active'
  },

  'pollen-project': {
    id: 'pollen-project',
    title: 'AI Detection of Pollen',
    subtitle: 'Using AI/ML to identify, classify, and quantify fossil pollen for long-term climate insights',
    pillar: 'ai',
    pis: [
      { name: 'Meghna Agarwala', slug: 'meghna-agarwala', role: 'Faculty, Environmental Studies' }
    ],
    description: 'This project uses AI/ML techniques to identify, classify, and quantify pollen — particularly fossil pollen from paleo-cores — to provide high-resolution insights into long-term climate and human impacts on ecosystems. The work bridges environmental science and computer science with custom hardware innovation.\n\nA key innovation is the collaboration with the Ashoka Makerspace to build a robotic microscope stage attachment that automatically moves the stage in x- and y-directions, adjusts focus in the z-direction, and uses a robotic arm to rotate pollen for 3-dimensional orientation capture. A pollen library has been calibrated for 12 taxa, with over 40 species collected from Satpura Tiger Reserve.\n\nThe project\'s pilot data helped the faculty lead secure the prestigious Schmidt AI for Science Faculty Fellowship at Oxford University — a 3-year fellowship. A technical session has been accepted at the INQUA Congress 2027, titled "Can Artificial Intelligence speed up paleo-sciences? Lessons from fossil pollen and microcharcoal from across the world."',
    highlights: [
      'Pollen library calibrated for 12 taxa with 40+ species collected from Satpura Tiger Reserve',
      'Custom robotic microscope stage attachment developed with Makerspace for 3D pollen imaging',
      'PI awarded Schmidt AI for Science Faculty Fellowship at Oxford University',
      'Technical session accepted at INQUA Congress 2027'
    ],
    publications: [],
    team: [
      { name: 'Aarti Arde', role: 'Project Assistant', institution: 'Ashoka University' },
      { name: 'Larry Tayenjam', role: 'Student Researcher (ML)', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'University of Oxford', country: 'UK' },
      { name: 'French Institute of Pondicherry', country: 'India' },
      { name: 'Ashoka Makerspace', country: 'India' }
    ],
    themes: ['Environmental Monitoring & Climate Science', 'Biodiversity & Conservation Biology'],
    relatedProjects: ['fire-mapping', 'acoustic-biodiversity', 'digital-makerspace'],
    status: 'active'
  },

  'acoustic-biodiversity': {
    id: 'acoustic-biodiversity',
    title: 'Acoustic Biodiversity Monitoring',
    subtitle: 'Automated passive acoustic monitoring for biodiversity estimation using AI',
    pillar: 'ai',
    pis: [
      { name: 'Bittu Kaveri Rajaraman', slug: 'bittu', role: 'Faculty, Biosciences & Psychology' }
    ],
    description: 'This project uses long-term non-invasive biodiversity monitoring through automatic acoustic sampling methods, applying ML/AI to classify insect calls — focusing on crickets and other sound-producing insects — from field recordings collected via passive acoustic monitoring.\n\nSystematic field recording was initiated from November 2025 in Assam (Bihpuria town, Kawoimari village, North Lakhimpur District), yielding approximately 120 hours of audio data across 55+ active recording days. The primary challenge identified is spectral overlap of insect calls, with the team taking a standard ML approach rather than deep learning after technical review.\n\nThe computational pipeline addresses key challenges including arbitrary preprocessing parameters for STFT (Short-Time Fourier Transform), class imbalance in training data, and optimal feature extraction methods. The team collaborates with IIT Kharagpur on algorithm development and classification approaches.',
    highlights: [
      'Approximately 120 hours of acoustic data collected from field sites in Assam',
      '55+ active recording days across a 60-day span',
      'Standard ML approach chosen over deep learning for classification',
      'Systematic recording protocol established for passive acoustic monitoring',
      'Joint work with IIT Kharagpur on ML classification approaches'
    ],
    publications: [],
    team: [
      { name: 'Lucky Neog', role: 'Field Researcher', institution: 'Ashoka University' },
      { name: 'Cocoa Kaushal', role: 'Data Analyst', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' }
    ],
    themes: ['Biodiversity & Conservation Biology', 'Environmental Monitoring & Climate Science'],
    relatedProjects: ['pollen-project', 'ai-demographic-inference'],
    status: 'active'
  },

  'cs-pedagogy': {
    id: 'cs-pedagogy',
    title: 'Adaptive & Inclusive CS Pedagogy',
    subtitle: 'Redesigning introductory CS education with formal methods, scaffolded AI, and universal design',
    pillar: 'ai',
    pis: [
      { name: 'Aalok Thakkar', slug: 'aalok-thakkar', role: 'Faculty, Computer Science' }
    ],
    description: 'This project redesigns Introduction to Computer Science with formal methods tools (BOOP), scaffolded LLM interaction (SocraticAI), syntax obfuscation (OOPS), and Universal Design for Learning (UDL) principles to develop a relevant, adaptive, and inclusive curriculum.\n\nBOOP (Blueprint-Operations-OCaml-Proof) is a modified OCaml parser that enforces course-specific constraints with customized error messages. SocraticAI is a guardrailed LLM system for CS educational contexts with static filters blocking direct solution requests. Both tools were deployed in Ashoka\'s Summer 2025 Intro to CS course, benefiting 25 students directly.\n\nThe project produced 4 papers accepted at ACM COMPUTE 2025. SocraticAI was featured as a case study in MeitY\'s Compendium on the Real-World Impact of AI in Education, launched at the India-AI Impact Summit, Bharat Mandapam, New Delhi on February 17, 2026. The tools have generated interest from IISc Bangalore and IIIT Hyderabad.',
    highlights: [
      '4 papers accepted and presented at ACM COMPUTE 2025',
      'SocraticAI featured as a case study in MeitY\'s Compendium on the Real-World Impact of AI in Education — launched at Bharat Mandapam, Feb 17, 2026',
      'BOOP and SocraticAI tools deployed in Ashoka CS courses, benefiting 49 students',
      'Interest from IISc Bangalore and IIIT Hyderabad in tool adoption',
      'Panel on AI Integration in Education at O.P. Jindal Global University',
      'COMPUTE 2026 regional event organized at Ashoka University'
    ],
    publications: [
      {
        title: 'BOOP: Write Right Code',
        authors: ['Vaani Goenka', 'Aalok Thakkar'],
        venue: 'ACM COMPUTE 2025',
        year: 2025,
        type: 'conference'
      },
      {
        title: 'Accessibility Beyond Accommodations: A Systematic Redesign of Introduction to Computer Science for Students with Visual Impairments',
        authors: ['Vaanee Tripathi', 'Aalok Thakkar'],
        venue: 'ACM COMPUTE 2025',
        year: 2025,
        type: 'conference'
      },
      {
        title: 'Compendium on the Real-World Impact of AI in Education (SocraticAI)',
        authors: ['Aalok Thakkar', 'Ayush Thonge'],
        venue: 'Ministry of Electronics & IT (MeitY), Government of India',
        year: 2026,
        type: 'government',
        url: '../src/assets/docs/India-AI-Impact-Summit-2026-AI-in-Education-Compendium.pdf'
      }
    ],
    team: [
      { name: 'Vaani Goenka', role: 'Research Intern (BOOP Development)', institution: 'Ashoka University' },
      { name: 'Ayush Thonge', role: 'Research Intern (AI Chatbot)', institution: 'Ashoka University' },
      { name: 'Vaanee Tripathi', role: 'Researcher (UDL/Accessibility)', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'IISc Bangalore', country: 'India' },
      { name: 'IIIT Hyderabad', country: 'India' }
    ],
    themes: ['Educational Integration & AI Pedagogy', 'AI & Deep Learning'],
    relatedProjects: ['cwc', 'digital-makerspace'],
    status: 'active'
  },

  'cwc': {
    id: 'cwc',
    title: 'Assistive AI for Academic Writing',
    subtitle: 'Benchmarking AI tools for argumentation quality in humanities and social sciences writing',
    pillar: 'ai',
    pis: [
      { name: 'Neerav Dwivedi', slug: 'neerav-dwivedi', role: 'Senior Writing Fellow, CWC' },
      { name: 'Sampurna Dutta', slug: '', role: 'Senior Writing Tutor, CWC' },
      { name: 'Archishman Sarker', slug: 'archishman-sarker', role: 'Researcher, CWC' }
    ],
    description: 'This project benchmarks AI tools across 5 disciplines in the humanities and social sciences, assessing how AI influences argumentation in academic writing through three sub-parameters: claims backed by evidence, progression of argument, and objectivity in academic tone and writing style.\n\nThe team collected 59 writing sample sets from 26 participants across 5 SSH disciplines (Sociology, English Literature, Political Science, History, and Media Studies). Students wrote 400-500 word responses to assigned prompts with and without AI assistance across 14 experiment rounds.\n\nThe project culminated in a comprehensive report launched on February 7, 2026, with a panel featuring experts from IIT Kharagpur, Ashoka University, and IIT Delhi. An accompanying AI and Academic Integrity Workshop attracted 34 attendees.',
    highlights: [
      '59 writing sample sets collected from 26 participants across 5 SSH disciplines',
      'Project report launched February 7, 2026, with expert panel from IIT KGP, Ashoka, and IIT Delhi',
      'AI and Academic Integrity Workshop conducted with 34 attendees',
      'Panel participation at O.P. Jindal Global University on AI in Education'
    ],
    publications: [
      {
        title: 'Assessing AI Tools for Argumentation in Academic Writing in the Humanities and Social Sciences',
        authors: ['Neerav Dwivedi', 'Sampurna Dutta', 'Archishman Sarker'],
        venue: 'CWC Project Report',
        year: 2026,
        type: 'report'
      }
    ],
    team: [],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'IIT Delhi', country: 'India' }
    ],
    themes: ['Educational Integration & AI Pedagogy', 'Digital Humanities & Media Analysis'],
    relatedProjects: ['cs-pedagogy', 'indiamedialens'],
    status: 'active'
  },

  'indiamedialens': {
    id: 'indiamedialens',
    title: 'IndiaMediaLens',
    subtitle: 'Smart platform for news monitoring and analysis of digital print media in India',
    pillar: 'ai',
    pis: [
      { name: 'Anirban Sen', slug: 'anirban-sen', role: 'Faculty, Computer Science' },
      { name: 'Debayan Gupta', slug: 'debayan-gupta', role: 'Faculty, Computer Science' }
    ],
    description: 'IndiaMediaLens develops a smart platform for news monitoring and analysis of digital print media in India, consisting of two proof-of-concept components: the News Adjudication Monitor — an interactive dashboard analyzing Press Council of India (PCI) adjudications from 1990-2024 using a Knowledge Graph — and the News Similarity Analyzer — a Chrome browser extension analyzing ideological bias and clustering of news sources.\n\nFor the PCI analysis, the team analyzed thousands of articles across 20 news sources spanning the last decade. The PCI Knowledge Graph was expanded to cover 34 years of adjudication data (1990-2024). A Neo4j-based Knowledge Graph was built with entity extraction, deduplication, and an interactive API.\n\nThe News Similarity Analyzer uses entity extraction and stance classification with Gemini-2.5-pro and few-shot learning. The project has found that most complaints by press are against police authorities (especially UP police), while most complaints against press are by the Election Commission of India.',
    highlights: [
      'Thousands of news articles analyzed across 20 sources for major Indian events',
      'PCI Knowledge Graph spanning 34 years of adjudication data (1990-2024)',
      'Two proof-of-concept systems: PCI dashboard and Chrome browser extension',
      'Neo4j Knowledge Graph with NLP-based entity extraction and deduplication',
      'Interactive API deployed for PCI research queries'
    ],
    publications: [],
    team: [
      { name: 'Ritwik Ray', role: 'Research Intern', institution: 'Ashoka University' },
      { name: 'Pranav Jayanandan', role: 'Research Intern', institution: 'Ashoka University' }
    ],
    collaborations: [],
    themes: ['Digital Humanities & Media Analysis', 'AI & Deep Learning'],
    relatedProjects: ['cwc', 'cs-pedagogy'],
    status: 'active'
  },

  /* ═══════════════════════════════════════════
     BHARATSIM — 1 project
     ═══════════════════════════════════════════ */

  'bharatsim': {
    id: 'bharatsim',
    title: 'BharatSim',
    subtitle: 'A distributed, multi-scale agent-based simulation framework for epidemiological and social models',
    pillar: 'bharatsim',
    pis: [
      { name: 'Gautam Menon', slug: 'gautam-menon', role: 'Faculty, Physics' },
      { name: 'Debayan Gupta', slug: 'debayan-gupta', role: 'Faculty, Computer Science' }
    ],
    description: 'BharatSim provides a distributed, multi-scale simulation framework for agent-based models. Originally designed for COVID-19 epidemiology, the platform has been extended to describe a wide range of communicable diseases and social phenomena, enabling large-scale simulations at the population level with realistic demographic data and intervention strategies.\n\nIn 2025, the project produced a landmark study on potential zoonotic spillover of H5N1 avian influenza in India, published in BMC Public Health. The model simulated interventions including bird-culling, quarantines, and vaccinations. The publication received coverage from BBC, NDTV, Nature India, CNBC-TV18, Sydney Morning Herald, and 20+ international media outlets. A parallel effort modelled mpox outbreaks in low- and middle-income countries.\n\nCollaborations have extended the platform to air quality modelling (with IIT Delhi) and defense applications. The main BharatSim platform paper was published in PLOS Computational Biology in 2024.',
    highlights: [
      'H5N1 avian influenza paper in BMC Public Health with coverage by BBC, NDTV, and 20+ international outlets',
      'BharatSim platform paper published in PLOS Computational Biology (2024)',
      '10+ invited talks including Wellcome Trust London, WHO-SEARO, IIT Bombay, and Border Security Force Academy',
      'Mpox modelling for low- and middle-income countries on medRxiv'
    ],
    publications: [
      {
        title: 'Modelling a potential zoonotic spillover event of H5N1 influenza',
        authors: ['Philip Cherian', 'Gautam I. Menon'],
        venue: 'BMC Public Health',
        year: 2025,
        type: 'journal',
        doi: '10.1186/s12889-025-21218-2'
      },
      {
        title: 'Mpox agent-based model for LMICs',
        authors: ['Gautam Menon', 'et al.'],
        venue: 'medRxiv',
        year: 2025,
        type: 'preprint',
        url: 'https://www.medrxiv.org/content/10.1101/2025.06.29.25330499v1'
      },
      {
        title: 'BharatSim: An agent-based modelling framework for India',
        authors: ['Gautam Menon', 'Debayan Gupta', 'et al.'],
        venue: 'PLOS Computational Biology',
        year: 2024,
        type: 'journal'
      }
    ],
    team: [
      { name: 'Philip Cherian', role: 'PhD Student', institution: 'Ashoka University' },
      { name: 'Abhishek Panchal', role: 'Research Scientist', institution: 'Ashoka University' },
      { name: 'Bhavesh Neekhra', role: 'Researcher', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'National AIDS Control Organisation (NACO)', country: 'India' },
      { name: 'Complutense University of Madrid', country: 'Spain' },
      { name: 'Johns Hopkins University', country: 'USA' },
      { name: 'IIT Delhi', country: 'India' },
      { name: 'IIT Bombay', country: 'India' },
      { name: 'CMC Vellore', country: 'India' },
      { name: 'IISc Bengaluru', country: 'India' },
      { name: 'Wellcome Trust', country: 'UK' },
      { name: 'WHO-SEARO', country: 'International' },
      { name: 'BSF Academy Gwalior', country: 'India' }
    ],
    themes: ['Public Health & Epidemiological Modeling', 'Computational Health & Translational Medicine'],
    relatedProjects: ['cancer-ascend', 'folk-computing'],
    status: 'active'
  },

  /* ═══════════════════════════════════════════
     CHART — 3 projects
     ═══════════════════════════════════════════ */

  'folk-computing': {
    id: 'folk-computing',
    title: 'Folk Computing for Abdominal Pain',
    subtitle: 'AI-powered conversational mHealth for probable diagnosis of abdominal pain using physician-guided rules and small LLMs',
    pillar: 'chart',
    pis: [
      { name: 'Rintu Kutum', slug: 'rintu-kutum', role: 'Faculty, Computer Science' }
    ],
    description: 'The Folk Computing project develops PRISM (Physician Rules Integrated with Small large language Models), a conversational mHealth AI technology for probable diagnosis of abdominal pain in outpatient clinical settings. The system combines physician-guided rule-based diagnostic reasoning with small open-source language models for empathic patient-facing conversation and clinical keyword extraction.\n\nPRISM outperforms end-to-end small-LLM approaches on physician-curated simulated patient Q/A pairs. The work was accepted and presented at the GenAI4Health workshop at NeurIPS 2025 in San Diego.\n\nThe project has integrated Hindi language voice input via Google Firebase.',
    highlights: [
      'PRISM paper accepted and presented at GenAI4Health workshop at NeurIPS 2025, San Diego',
      'Android mHealth app with Hindi voice interaction',
      'Hindi language voice integration completed',
      'Lightning talk at OHDSI India Symposium 2025, Bangalore'
    ],
    publications: [
      {
        title: 'PRISM: Physician Rules Integrated with Small large language Models for probable diagnoses associated with Abdominal Pain',
        authors: ['Gautam Ahuja', 'Rintu Kutum', 'Govind K. Makharia', 'et al.'],
        venue: 'GenAI4Health Workshop, NeurIPS 2025, San Diego',
        year: 2025,
        type: 'workshop',
        url: 'https://openreview.net/forum?id=c8QFEI1XBI'
      }
    ],
    team: [
      { name: 'Anurag Agrawal', slug: 'anurag-agrawal', role: 'Advisor, Dean, Trivedi School of Biosciences', institution: 'Ashoka University' },
      { name: 'Rik Ganguly', role: 'Junior Engineer', institution: 'Ashoka University' },
      { name: 'Gautam Ahuja', role: 'Multimodal AI Engineer', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'AIIMS New Delhi', country: 'India' },
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'UC Irvine', country: 'USA' },
      { name: 'University of Southampton', country: 'UK' },
      { name: 'University of Massachusetts Amherst', country: 'USA' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Deep Learning'],
    relatedProjects: ['multimodal-food-computing', 'tnbc', 'ns3-inhibitors'],
    status: 'active'
  },

  'multimodal-food-computing': {
    id: 'multimodal-food-computing',
    title: 'Multimodal Food Computing',
    subtitle: 'Building an intelligent, culturally-grounded digital infrastructure for Indian food through AI and knowledge graphs',
    pillar: 'chart',
    pis: [
      { name: 'Partha Pratim Das', slug: 'partha-pratim-das', role: 'Faculty, Computer Science' },
      { name: 'Lipika Dey', slug: 'lipika-dey', role: 'Faculty, Computer Science' }
    ],
    description: 'The Multimodal Food Computing project builds an intelligent, multimodal, and culturally-grounded digital infrastructure to represent and analyze Indian food through AI, knowledge graphs, and interdisciplinary research on health, agroecology, and food systems. The centerpiece is FKG.in (Food Knowledge Graph for India), expanded to contain nutritional information for over 10,000 standardized recipes and ingredients.\n\nThe team developed and deployed an interactive recipe discovery system with full semantic search, voice-based interaction, multilingual support, and Retrieval-Augmented Generation (RAG) capabilities. Research directions span food claim traceability networks, cooking action graphs, personalized health recommendations, food safety legal text analytics, and novel recipe generation.\n\nIn 2025, the team organized the 1st International Workshop on Multimodal Food Computing (MMFood\'25) at ACM Multimedia 2025 in Dublin, published 6 peer-reviewed papers at top venues including ACM, EMNLP, and NeurIPS, and won the Promising Innovation Award at the INFUSE Innovation Summit for SmartDiet India.',
    highlights: [
      'Organized 1st International Workshop on Multimodal Food Computing (MMFood\'25) at ACM Multimedia 2025, Dublin',
      'Won Promising Innovation Award at INFUSE Innovation Summit 2025 (NIN/ICMR) for SmartDiet India',
      '6 peer-reviewed publications at ACM, EMNLP, NeurIPS, and IJCNLP-AACL',
      'FKG.in expanded to over 10,000 items',
      'RASOI Data Challenge at NCVPRIPG 2025 with 11 participating teams',
      'Collaborations with Karya Inc., Microsoft Research, and University of South Carolina'
    ],
    publications: [
      {
        title: 'Extending FKG.in: Towards a Food Claim Traceability Network',
        authors: ['Saransh Kumar Gupta', 'Lipika Dey', 'Partha Pratim Das', 'et al.'],
        venue: 'ACM MMFood\'25 @ ACM Multimedia 2025, Dublin',
        year: 2025,
        type: 'workshop',
        url: 'https://arxiv.org/abs/2508.16117'
      },
      {
        title: 'Towards an Action-Centric Ontology for Cooking Procedures Using Temporal Graphs',
        authors: ['Aarush Kumbhakern', 'et al.'],
        venue: 'ACM MMFood\'25 @ ACM Multimedia 2025, Dublin',
        year: 2025,
        type: 'workshop',
        url: 'https://arxiv.org/abs/2509.04159'
      },
      {
        title: 'What\'s Not on the Plate? Rethinking Food Computing through Indigenous Indian Datasets',
        authors: ['Team members'],
        venue: 'ACM MMFood\'25 @ ACM Multimedia 2025, Dublin',
        year: 2025,
        type: 'workshop',
        url: 'https://arxiv.org/abs/2509.16286'
      },
      {
        title: 'LLM Driven Legal Text Analytics: A Case Study For Food Safety Violation Cases',
        authors: ['Suyog Joshi', 'Soumyajit Basu', 'Lipika Dey', 'Partha Pratim Das'],
        venue: 'JUST-NLP at IJCNLP-AACL 2025, Mumbai',
        year: 2025,
        type: 'workshop'
      },
      {
        title: 'NLKI: A Lightweight Natural Language Knowledge Integration Framework for Improving Small VLMs in Commonsense VQA Tasks',
        authors: ['Aritra Dutta', 'Swapnanil Mukherjee', 'Deepanway Ghosal', 'Somak Aditya'],
        venue: 'Findings of EMNLP 2025, Suzhou, China',
        year: 2025,
        type: 'conference',
        url: 'https://arxiv.org/abs/2508.19724'
      }
    ],
    team: [
      { name: 'Saransh Kumar Gupta', role: 'Senior Software Developer / Lab Coordinator', institution: 'Ashoka University' },
      { name: 'Mohammad Sarfaraz', role: 'Post-Doctoral Fellow', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'Karya Inc. & Microsoft Research', country: 'India / USA' },
      { name: 'University of South Carolina', country: 'USA' },
      { name: 'McGill University', country: 'Canada' },
      { name: 'UC Irvine', country: 'USA' },
      { name: 'IIT Kharagpur', country: 'India' },
      { name: 'National Institute of Nutrition (ICMR)', country: 'India' },
      { name: 'AIIMS New Delhi', country: 'India' }
    ],
    themes: ['Digital Humanities & Media Analysis', 'Computational Health & Translational Medicine'],
    relatedProjects: ['folk-computing', 'tnbc'],
    status: 'active'
  },

  'tnbc': {
    id: 'tnbc',
    title: 'Triple Negative Breast Cancer',
    subtitle: 'Computational tools for stratification of TNBC patients for personalized treatment in India',
    pillar: 'chart',
    pis: [
      { name: 'L.S. Shashidhara', slug: 'ls-shashidhara', role: 'Faculty, Biology' }
    ],
    description: 'This project develops computational tools for the stratification of Triple Negative Breast Cancer (TNBC) patients for treatment customization and better clinical outcomes, focusing on understanding the molecular and cellular profiles of TNBC specifically in the Indian population.\n\nThe team has completed molecular profiling of 100 TNBC patients using actionable markers and immune cell analysis, with key findings linking immune markers to patient outcomes — patients with strong immune responses showed significantly better outcomes. Clinical data collected from nearly 5,000 breast cancer cases — making this one of the largest epidemiological breast cancer datasets compiled in India.\n\nA novel sub-project on collagen deposition in breast cancer tissue tests whether digital pathology using whole slide imaging can replicate the results of expensive specialized microscopy — a low-cost alternative with significant clinical potential.',
    highlights: [
      '100 TNBC patients profiled with actionable markers and immune cell survival analysis',
      'Clinical data collected from nearly 5,000 breast cancer cases — among the largest datasets in India',
      'Presented at EACR 2025 Conference in Lisbon (European Association for Cancer Research)',
      'Innovative collagen deposition sub-project using digital pathology as low-cost alternative to specialized microscopy'
    ],
    publications: [],
    team: [
      { name: 'Madhura Kulkarni', role: 'Co-Investigator', institution: 'IISER Pune' },
      { name: 'Vedant Ingawale', role: 'Research Assistant', institution: 'IISER Pune / Ashoka University' },
      { name: 'Aditi Singh', role: 'Research Assistant (Image Analysis)', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'Max Hospital, Delhi', country: 'India' },
      { name: 'IISER Pune', country: 'India' }
    ],
    themes: ['Computational Health & Translational Medicine', 'AI & Deep Learning'],
    relatedProjects: ['cancer-ascend', 'folk-computing', 'multimodal-food-computing'],
    status: 'active'
  },

  /* ═══════════════════════════════════════════
     CYBERSECURITY — 1 project
     ═══════════════════════════════════════════ */

  'pqc': {
    id: 'pqc',
    title: 'Post-Quantum Cryptography',
    subtitle: 'Advancing quantum-safe cryptographic systems and PQC migration for critical infrastructure',
    pillar: 'cyber',
    pis: [
      { name: 'Mahavir Jhawar', slug: 'mahavir-jhawar', role: 'Faculty, Computer Science' }
    ],
    description: 'With rapid advancements in quantum computing, this project addresses the security of critical systems in a post-quantum world. The research spans security analysis of post-quantum cryptographic systems, migration research for critical internet infrastructure like DNS security, and advanced cryptographic system design with post-quantum security guarantees.\n\nThe flagship achievement is a quantum-safe signatureless DNS security protocol, with published formal security proofs and multiple papers across top-tier venues. An earlier paper in this line received the Best Paper Award at SPACE 2023.\n\nA second research stream on network security has developed novel approaches to network security testing.',
    highlights: [
      'Paper accepted and presented at ACM ASIACCS 2025, Hanoi (top-tier security conference)',
      'Best Paper Award at SPACE 2023 for post-quantum DNS security work',
      'Published formal security proofs for quantum-safe protocols'
    ],
    publications: [
      {
        title: 'Quantum-safe Signatureless DNSSEC',
        authors: ['Aditya Singh Rawat', 'Mahabir Prasad Jhanwar'],
        venue: 'ACM ASIACCS 2025, Hanoi, Vietnam',
        year: 2025,
        type: 'conference'
      },
      {
        title: 'On the Security of SL-DNSSEC',
        authors: ['Aditya Singh Rawat', 'Mahabir Prasad Jhanwar'],
        venue: 'IACR ePrint Archive',
        year: 2025,
        type: 'preprint',
        url: 'https://eprint.iacr.org/2025/1770.pdf'
      },
      {
        title: 'Post-Quantum DNSSEC with Faster TCP Fallbacks',
        authors: ['Aditya Singh Rawat', 'Mahabir Prasad Jhanwar'],
        venue: 'Indocrypt 2024, Springer LNCS vol 15495',
        year: 2024,
        type: 'conference'
      },
      {
        title: 'Post-quantum DNSSEC over UDP via QNAME-Based Fragmentation',
        authors: ['Aditya Singh Rawat', 'Mahabir Prasad Jhanwar'],
        venue: 'SPACE 2023, Springer LNCS vol 14412 (Best Paper Award)',
        year: 2023,
        type: 'conference'
      }
    ],
    team: [
      { name: 'Aditya Singh Rawat', role: 'Senior Research Fellow (PhD)', institution: 'Ashoka University' },
      { name: 'Pritam Chandra', role: 'Research Associate', institution: 'Ashoka University' },
      { name: 'Adityavir Singh', role: 'PhD Student', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'IIT Kharagpur', country: 'India' }
    ],
    themes: ['Cybersecurity & Post-Quantum Cryptography'],
    relatedProjects: ['bharatsim', 'digital-makerspace'],
    status: 'active'
  },

  /* ═══════════════════════════════════════════
     MAKERSPACE — 4 projects
     ═══════════════════════════════════════════ */

  'cmt': {
    id: 'cmt',
    title: 'Covalent Magnetic Tweezers',
    subtitle: 'One-of-a-kind multiplexed single-molecule force spectroscopy instrument for biophysics and drug screening',
    pillar: 'makerspace',
    pis: [
      { name: 'Debayan Gupta', slug: 'debayan-gupta', role: 'Faculty, Computer Science' },
      { name: 'Shubhasis Haldar', slug: '', role: 'S.N. Bose National Centre for Basic Sciences' }
    ],
    description: 'The Covalent Magnetic Tweezers (CMT) project develops a multiplexed instrument capable of monitoring hundreds of single molecules simultaneously at millisecond and nanometer resolution. The setup integrates high-precision control of magnetic forces for real-time, non-invasive manipulation of biological and synthetic particles at the nanometre scale. It is described as one of its kind in India.\n\nThe team completed the hardware assembly and software system: full hardware assembly (Zeiss Axiovert 5 microscope, XIMEA camera, P-725 piezo, upgraded controllers) and a new C++/Python hybrid software system with GUI, bead selection, real-time tracking, and data visualization. The software reproduces all essential step-by-step experimental routines including force ramps, force clamps, and unfolding/refolding cycles.\n\nThe project produced three peer-reviewed publications, including a paper in Communications Biology (Nature portfolio). Two studies using CMT revealed how antibodies enhance antigen mechanical robustness and how the p47 protein plays a stabilizing mechanical role in protein folding. The technology was previously recognized as Technology of the Month by Cell Press.',
    highlights: [
      '3 peer-reviewed publications in Communications Biology (Nature), Protein Science, and Biochemistry',
      'CMT setup fully completed with C++/Python hybrid software',
      'Only instrument of its kind in India for single-molecule research',
      'Recognized as Technology of the Month by Cell Press'
    ],
    publications: [
      {
        title: 'OncoMark: A High-Throughput Neural Multi-Task Learning Framework (CMT collaboration)',
        authors: ['Shreyansh Priyadarshi', 'et al.'],
        venue: 'Communications Biology (Nature portfolio)',
        year: 2025,
        type: 'journal',
        doi: '10.1038/s42003-025-08727-z'
      },
      {
        title: 'Antibody-antigen mechanical robustness study',
        authors: ['CMT Team'],
        venue: 'Protein Science, 34: e70201',
        year: 2025,
        type: 'journal'
      },
      {
        title: 'p47 stabilizing mechanical role in protein folding',
        authors: ['CMT Team'],
        venue: 'Biochemistry, 64(15):3272-3279',
        year: 2025,
        type: 'journal'
      }
    ],
    team: [
      { name: 'Shreyansh Priyadarshi', role: 'Software Developer', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'S.N. Bose National Centre for Basic Sciences, Kolkata', country: 'India' }
    ],
    themes: ['Materials Science & Chemistry', 'Digital Fabrication & Innovation'],
    relatedProjects: ['cancer-ascend', 'digital-makerspace', 'table-top-experiments'],
    status: 'active'
  },

  'digital-makerspace': {
    id: 'digital-makerspace',
    title: 'Digital Makerspace',
    subtitle: 'An interdisciplinary fabrication and innovation workspace integrating manufacturing, curriculum, and entrepreneurship',
    pillar: 'makerspace',
    pis: [
      { name: 'Deepraj Pandey', slug: 'deepraj-pandey', role: 'Makerspace Co-Lead' },
      { name: 'Sai Khurana', slug: '', role: 'Makerspace Co-Lead' },
      { name: 'Kanishk Singh', slug: '', role: 'Makerspace Co-Lead' }
    ],
    description: 'The Digital Makerspace is a collaborative, interdisciplinary fabrication and innovation workspace at Ashoka University integrating advanced manufacturing capabilities with academic curriculum, research collaboration, community building, and an entrepreneurship pipeline. The space is equipped with industrial-grade tools including a Trotec Speedy 400 laser cutter, CNC (Computer Numerical Control) router, Formlabs SLS (Selective Laser Sintering) and SLA (Stereolithography) printers, CNC turning machine, fabric workstations, and DJI drones with DGCA (Directorate General of Civil Aviation)-certified pilots.\n\nThe Makerspace has engaged over 1,450 students, integrated with 4+ academic courses across departments, and launched a competitive Maker-in-Residence program with residents working on SLAM (Simultaneous Localization and Mapping) robotics and Drosophila thermal maze instrumentation. Partnerships have been established with Param Innovation, TinkerHub Foundation, and Maker Bhavan Foundation.\n\nThe flagship event, RedBrick Hacks III, transformed into a comprehensive national hackathon attracting 450+ applications from 91 universities. The 48-hour on-campus finals produced 8 recognized projects spanning carbon credit verification, women\'s safety, sign language learning, food rescue, and field-deployable diagnostics, with post-hackathon outcomes including a research manuscript with Stanford University.',
    highlights: [
      'RedBrick Hacks III: 430+ applicants from 91 universities, post-hackathon collaborations with Stanford',
      '1,450+ students engaged and 2,000+ community/K-12 outreach participants',
      '4,500 sq ft Makerspace facility in the Innovation Centre',
      'Maker-in-Residence program launched with residents on SLAM robotics and Drosophila maze',
      'Partnerships with Param Innovation, TinkerHub, and Maker Bhavan Foundation',
      'Publications at Proceedings of the Royal Society B, HCII 2025, and ACM COMPUTE 2025'
    ],
    publications: [
      {
        title: 'Dots: Refreshable Tactile Dot Grid',
        authors: ['Makerspace Team'],
        venue: 'HCII 2025, Gothenburg, Sweden',
        year: 2025,
        type: 'conference'
      }
    ],
    team: [
      { name: 'Ojas Tripathi', role: 'Community-Making Lead', institution: 'Ashoka University' },
      { name: 'Ayush Tiwari', role: 'Maker-in-Residence (SLAM Robot)', institution: 'Ashoka University' },
      { name: 'Ajad Ismail', role: 'Maker-in-Residence (Drosophila Maze)', institution: 'Ashoka University' },
      { name: 'Deepak Jangra', role: 'Technical Staff', institution: 'Ashoka University' }
    ],
    collaborations: [
      { name: 'TinkerHub Foundation', country: 'India' },
      { name: 'Param Innovation / Param Foundation', country: 'India' },
      { name: 'Maker Bhavan Foundation', country: 'India' },
      { name: 'Stanford University', country: 'USA' },
      { name: 'NCBS', country: 'India' },
      { name: 'IIT Gandhinagar', country: 'India' }
    ],
    themes: ['Digital Fabrication & Innovation', 'Educational Integration & AI Pedagogy'],
    relatedProjects: ['cmt', 'table-top-experiments', 'pedagogical-experiments'],
    status: 'active'
  },

  'table-top-experiments': {
    id: 'table-top-experiments',
    title: 'Table-Top Glacier Flow Dynamics',
    subtitle: 'Using non-Newtonian fluid flows to model glacier dynamics and train undergraduates in experimental physics',
    pillar: 'makerspace',
    pis: [
      { name: 'Pramoda Kumar', slug: 'pramoda-kumar', role: 'Faculty, Physics' }
    ],
    description: 'Table-top fluid experiments studying glacier flow dynamics, with results confirming theoretical predictions. The project uses non-Newtonian fluid flows to model glacier dynamics at laboratory scale, investigating phenomena that occur at geological scales.\n\nThe team conducted 35+ controlled experiments, demonstrating that flow profiles exhibit universal self-similarity. A custom Python analysis toolkit was built for contour detection, flow measurement, and visualization.',
    highlights: [
      '35+ controlled experiments confirming theoretical predictions of glacier flow behavior',
      '3rd place at Meera Memorial Paper Reading Competition, St. Stephen\'s College, Delhi University',
      'Custom Python analysis toolkit built for flow analysis and visualization',
      'Featured on Ashoka University website: "Understanding Glaciers One Fluid at a Time"'
    ],
    publications: [],
    team: [
      { name: 'Rohit Kumar Vishwakarma', role: 'Research Assistant', institution: 'Ashoka University' },
      { name: 'Simar Randhawa', role: 'Undergraduate Intern', institution: 'Ashoka University' },
      { name: 'Drishana Kundu', role: 'Undergraduate Intern', institution: 'Ashoka University' },
      { name: 'Bhavana', role: 'Undergraduate Intern', institution: 'Ashoka University' }
    ],
    collaborations: [],
    themes: ['Environmental Monitoring & Climate Science', 'Educational Integration & AI Pedagogy'],
    relatedProjects: ['pedagogical-experiments', 'digital-makerspace'],
    status: 'active'
  },

  'pedagogical-experiments': {
    id: 'pedagogical-experiments',
    title: 'Pedagogical Physics Experiments',
    subtitle: 'Novel experimental setups for undergraduate quantum and statistical physics labs',
    pillar: 'makerspace',
    pis: [
      { name: 'Pramoda Kumar', slug: 'pramoda-kumar', role: 'Faculty, Physics' }
    ],
    description: 'Designed and built quantum optics and statistical physics experimental setups for the undergraduate Physics curriculum at Ashoka University. The experimental kits and course materials were delivered to the Physics department, demonstrating the Makerspace\'s role in supporting hands-on pedagogy across departments.',
    highlights: [
      'Quantum optics experiments set up from Thorlabs Educational Kit',
      'Statistical physics experimental setup built using Makerspace fabrication',
      'Lab handouts and course materials produced and delivered to the Physics department',
      'Demonstrated Makerspace\'s role in supporting pedagogical innovation across departments'
    ],
    publications: [],
    team: [
      { name: 'Bharti Chachra', role: 'Research Assistant', institution: 'Ashoka University' },
      { name: 'Satwik Wats', role: 'Research Assistant', institution: 'Ashoka University' }
    ],
    collaborations: [],
    themes: ['Educational Integration & AI Pedagogy', 'Digital Fabrication & Innovation'],
    relatedProjects: ['table-top-experiments', 'digital-makerspace'],
    status: 'completed'
  }

};
