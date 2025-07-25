// Fields, domains, subjects, and resources data
window.fieldsData = [
  {
    id: "tech",
    name: "Purely Tech",
    description: "Explore core technology domains.",
    domains: [
      { id: "ai-ml", name: "AI & ML", description: "Artificial Intelligence and Machine Learning" },
      { id: "cybersecurity", name: "Cybersecurity", description: "Protecting systems and data from threats" },
      // ... more domains
    ]
  },
  {
    id: "non-tech",
    name: "Purely Non-Tech",
    description: "Business, marketing, and more.",
    domains: [
      { id: "business", name: "Business Administration", description: "Business fundamentals and management" },
      // ... more domains
    ]
  },
  {
    id: "inter",
    name: "Interdisciplinary",
    description: "Bridging tech and non-tech fields.",
    domains: [
      { id: "fintech", name: "FinTech", description: "Finance and technology combined" },
      // ... more domains
    ]
  },
  {
    id: "misc",
    name: "Miscellaneous",
    description: "Essential life and career skills.",
    domains: [
      { id: "resume", name: "Resume Building", description: "Crafting effective resumes" },
      // ... more domains
    ]
  }
];

window.domainsData = {
  "ai-ml": {
    id: "ai-ml",
    name: "AI & ML",
    description: "Artificial Intelligence and Machine Learning",
    subjects: [
      {
        id: "intro-ai",
        name: "Introduction to AI",
        description: "Basics of Artificial Intelligence",
        type: "Core",
        difficulty: "Beginner",
        resources: [
          {
            id: "ai-article-1",
            title: "What is AI?",
            type: "Article",
            link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
            completion: "Not Started"
          },
          {
            id: "ai-video-1",
            title: "AI Explained (YouTube)",
            type: "Video",
            link: "https://www.youtube.com/watch?v=2ePf9rue1Ao",
            completion: "Not Started"
          }
        ]
      },
      {
        id: "ml-basics",
        name: "Machine Learning Basics",
        description: "Fundamentals of ML algorithms",
        type: "Core",
        difficulty: "Beginner",
        resources: [
          {
            id: "ml-article-1",
            title: "Intro to Machine Learning",
            type: "Article",
            link: "https://www.ibm.com/cloud/learn/machine-learning",
            completion: "Not Started"
          }
        ]
      }
    ]
  },
  // ... more domains
}; 