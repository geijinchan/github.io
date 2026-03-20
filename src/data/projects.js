export const projects = [
  {
    id: 1,
    title: 'RAG from Scratch',
    subtitle: 'Production RAG with Groq & LLaMA 3.1',
    description:
      'Developed a GPU-accelerated Retrieval-Augmented Generation system from scratch using Docker, PyTorch, and Streamlit. Engineered a containerized pipeline for scalable document ingestion, embedding, and semantic search with Groq\'s ultra-fast inference.',
    tags: ['LLaMA', 'Groq', 'RAG', 'Streamlit', 'FAISS'],
    category: 'rag',
    github: 'https://github.com/geijinchan/RAG-from-Scratch-LLama-3.1-8B-',
    featured: true,
    icon: '🧠',
  },
  {
    id: 2,
    title: 'MultiModal RAG',
    subtitle: 'Vision + Audio + Text Retrieval',
    description:
      'Created a system processing video, audio, and text using CLIP, Whisper, and FAISS for efficient retrieval. Applied Whisper for transcription, CLIP for embeddings, and LLaVA/LLaMA for augmenting and summarizing retrieved data.',
    tags: ['CLIP', 'Whisper', 'FAISS', 'LLaVA', 'Multi-modal'],
    category: 'rag',
    github:
      'https://github.com/geijinchan/MultiModal-RAG-trying-with-open-source-models',
    featured: true,
    icon: '👁️',
  },
  {
    id: 3,
    title: 'Multiple Disease Prediction',
    subtitle: 'Streamlit ML Healthcare App',
    description:
      'Developed a scalable ML application predicting multiple diseases including diabetes, heart disease, and breast cancer. Implemented multiple models with a modular design for easy addition of new disease detections.',
    tags: ['Scikit-learn', 'Streamlit', 'Healthcare', 'ML'],
    category: 'ml',
    github:
      'https://github.com/geijinchan/Multiple-Disease-Prediction-Using-ML-Streamlit',
    featured: true,
    icon: '🏥',
  },
  {
    id: 4,
    title: 'Credit Card Default Prediction',
    subtitle: 'End-to-End MLOps + AWS CI/CD',
    description:
      'Architected and deployed a comprehensive MLOps pipeline on AWS, integrating data extraction, validation, model training, and evaluation. Co-authored IEEE research paper on MLOps-driven prediction.',
    tags: ['MLflow', 'Docker', 'AWS', 'CI/CD', 'IEEE'],
    category: 'mlops',
    github: 'https://github.com/geijinchan/Credit-Card-Default-Prediction',
    featured: true,
    icon: '💳',
  },
  {
    id: 5,
    title: 'LLMOps',
    subtitle: 'LLM Operations & Orchestration',
    description:
      'Explored LLM operations and orchestration techniques for production-grade AI systems. Covers model lifecycle management, deployment strategies, and optimization patterns.',
    tags: ['LLMOps', 'Python', 'LLM', 'Production'],
    category: 'rag',
    github: 'https://github.com/geijinchan/LLMOps',
    featured: true,
    icon: '⚙️',
  },
  {
    id: 6,
    title: 'Building ML Pipeline',
    subtitle: 'Full ML Pipeline Implementation',
    description:
      'Built a complete machine learning pipeline covering data ingestion, preprocessing, feature engineering, model training, evaluation, and deployment. Production-grade architecture with modular components.',
    tags: ['Pipeline', 'MLOps', 'Python', 'Automation'],
    category: 'mlops',
    github:
      'https://github.com/geijinchan/Building_Machine_Learning_Pipeline',
    featured: true,
    icon: '🔧',
  },
  {
    id: 7,
    title: 'Better RAG with LOTR',
    subtitle: 'Merge Retriever Architecture',
    description:
      'Implemented an advanced RAG system using Merge Retriever (LOTR) for improved retrieval quality. Combines multiple retrieval strategies for better context and accuracy.',
    tags: ['RAG', 'Retrieval', 'LangChain', 'Python'],
    category: 'rag',
    github:
      'https://github.com/geijinchan/Better-RAG-with-Merge-Retriever-LOTR-',
    featured: false,
    icon: '📚',
  },
  {
    id: 8,
    title: 'APS Fault Detection',
    subtitle: 'Industrial ML Application',
    description:
      'Built a machine learning model for Air Pressure System fault detection in heavy-duty vehicles. Applied classification techniques with imbalanced data handling.',
    tags: ['ML', 'Classification', 'Python', 'Industrial'],
    category: 'ml',
    github: 'https://github.com/geijinchan/aps-fault-detection',
    featured: false,
    icon: '🏭',
  },
  {
    id: 9,
    title: 'CNN & Object Detection',
    subtitle: 'Computer Vision Models',
    description:
      'Explored Convolutional Neural Networks and object detection techniques. Implemented models for image classification and localization tasks.',
    tags: ['CNN', 'Deep Learning', 'Computer Vision', 'PyTorch'],
    category: 'ml',
    github: 'https://github.com/geijinchan/CNN-and-Object-detection',
    featured: false,
    icon: '📷',
  },
  {
    id: 10,
    title: 'ChatBot LLaMA 2',
    subtitle: 'Conversational AI with LLaMA',
    description:
      'Built a conversational chatbot powered by the LLaMA 2 language model. Features natural language understanding and context-aware responses.',
    tags: ['LLaMA 2', 'Chatbot', 'NLP', 'Python'],
    category: 'rag',
    github: 'https://github.com/geijinchan/Chat_Bot_LLama2',
    featured: false,
    icon: '💬',
  },
]

export const experience = [
  {
    id: 1,
    role: 'Founding Engineer / Data Scientist',
    company: 'Startup',
    period: 'Jan 2025 – Present',
    description:
      'Building AI-powered products from ground up with serverless architecture on AWS. Working with RAG systems, reinforcement learning, and full-stack AI integration.',
    technologies: [
      'AWS CDK',
      'Lambda',
      'DynamoDB',
      'Azure AI',
      'RAG',
      'PyTorch',
      'Ray RLlib',
    ],
    type: 'current',
  },
  {
    id: 2,
    role: 'Data Scientist',
    company: 'TechGuru',
    period: 'Nov 2023 – Dec 2024',
    description:
      'Designed and deployed a retrieval-augmented chatbot for an LMS platform. Built grade-aware assessment pipelines and optimized semantic search with custom chunking strategies.',
    technologies: [
      'Azure AI Foundry',
      'RAG',
      'Prompt Engineering',
      'REST APIs',
      'LangChain',
    ],
    type: 'past',
  },
  {
    id: 3,
    role: 'Data Scientist Intern',
    company: 'iNeuron Intelligence',
    period: 'Jun 2023 – Oct 2023',
    description:
      'Built end-to-end credit card default prediction pipeline. Implemented MLOps workflows with CI/CD automation. Co-authored IEEE research paper on MLOps-driven prediction.',
    technologies: ['MLflow', 'AWS SageMaker', 'SMOTE', 'Docker', 'CI/CD'],
    type: 'past',
  },
]

export const education = [
  {
    degree: 'M.Sc Data Science',
    institution: 'Chandigarh University',
    location: 'Mohali, Punjab',
    period: '2022 – 2024',
    highlight: 'IEEE Xplore Publication',
  },
  {
    degree: 'BCA (Bachelor of Computer Application)',
    institution: 'B.B.S Public Degree College',
    location: 'Prayagraj, UP',
    period: '2019 – 2022',
    highlight: 'Foundation in DSA & Programming',
  },
]

export const skills = {
  'ML & Deep Learning': [
    { name: 'PyTorch', level: 90 },
    { name: 'TensorFlow / Keras', level: 85 },
    { name: 'Scikit-learn', level: 92 },
    { name: 'Neural Networks', level: 88 },
  ],
  'GenAI & LLMs': [
    { name: 'RAG Systems', level: 95 },
    { name: 'LLaMA / LLMs', level: 90 },
    { name: 'LangChain', level: 88 },
    { name: 'Prompt Engineering', level: 92 },
  ],
  'Data & Analytics': [
    { name: 'Python (Pandas/NumPy)', level: 95 },
    { name: 'SQL / NoSQL', level: 88 },
    { name: 'Data Visualization', level: 85 },
    { name: 'Statistical Analysis', level: 82 },
  ],
  'Cloud & MLOps': [
    { name: 'AWS (Lambda/CDK/S3)', level: 85 },
    { name: 'Docker', level: 82 },
    { name: 'MLflow / CI/CD', level: 88 },
    { name: 'Azure AI Foundry', level: 80 },
  ],
}

export const certifications = [
  'ML Specialization',
  'Convolutional Neural Networks',
  'Intro to ML in Production',
  'Improving Neural Networks',
  'Python for Data Science',
]

export const socialLinks = {
  github: 'https://github.com/geijinchan',
  email: 'abhishekravikumar24@gmail.com',
  phone: '+916386373320',
  location: 'Kanpur, Uttar Pradesh, India',
}
