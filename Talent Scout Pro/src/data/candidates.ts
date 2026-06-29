import avatarKishore from "@/assets/avatar-kishore.jpg";
import avatarKartik from "@/assets/avatar-kartik.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarArjun from "@/assets/avatar-arjun.jpg";
import avatarShankar from "@/assets/avatar-shankar.jpg";

export type Candidate = {
  slug: string;
  name: string;
  initials: string;
  avatar: string;
  experience: string;
  experienceShort: string;
  salary: string;
  expects?: string;
  location: string;
  prefLocations: string[];
  currentRole: string;
  company: string;
  since: string;
  servingTill?: string;
  education: string;
  skills: string[];
  mayAlsoKnow: string[];
  phone: string;
  similarCount: number;
  views: number;
  modified: string;
  active: string;
  aiBlurb: string;
  joinedYear: string;
  email: string;
};

export const candidates: Candidate[] = [
  {
    slug: "kishore-tm",
    avatar: avatarKishore,
    name: "Kishore TM",
    initials: "KT",
    experience: "4y 0m",
    experienceShort: "4y",
    salary: "₹ 16.39 Lacs",
    expects: "₹ 20 Lacs",
    location: "Hyderabad",
    prefLocations: ["Hyderabad", "Chennai", "Bengaluru"],
    currentRole: "Senior Software Engineer",
    company: "HSBC",
    since: "Aug '22",
    servingTill: "Currently serving till 10 May",
    education: "B.Tech / B.E, Amrita Vishwa Vidyapeetham, Coimbatore 2022",
    skills: ["Python", "RAG Pipelines", "LLMs", "LangChain", "CrewAI", "LoRA", "Vertex AI", "Docker", "Kubernetes", "AWS", "GCP"],
    mayAlsoKnow: ["FastAPI", "PyTorch", "Hugging Face", "MLflow", "Airflow"],
    phone: "6383301828",
    similarCount: 12,
    views: 8,
    modified: "Modified in last 30 days",
    active: "Active yesterday",
    aiBlurb: "AI-matched: strong GenAI / LLM ops profile with cloud-native deployment experience.",
    joinedYear: "2022",
    email: "kishoretm23@gmail.com",
  },
  {
    slug: "kartik-karande",
    avatar: avatarKartik,
    name: "Kartik Karande",
    initials: "KK",
    experience: "3y 8m",
    experienceShort: "3y 8m",
    salary: "₹ 14.50 Lacs",
    expects: "₹ 18 Lacs",
    location: "Pune",
    prefLocations: ["Pune", "Mumbai", "Bengaluru"],
    currentRole: "Software Engineer",
    company: "Infosys",
    since: "Jul '21",
    education: "B.Tech / B.E, VIT Pune 2021",
    skills: ["Java", "Spring Boot", "Microservices", "AWS", "MySQL", "Redis", "Docker"],
    mayAlsoKnow: ["Kafka", "Kubernetes", "REST APIs", "JUnit"],
    phone: "9890011223",
    similarCount: 9,
    views: 5,
    modified: "Modified in last 30 days",
    active: "Active yesterday",
    aiBlurb: "AI-matched: solid backend microservices engineer with cloud delivery exposure.",
    joinedYear: "2021",
    email: "kartik.karande@outlook.com",
  },
  {
    slug: "priya-nair",
    avatar: avatarPriya,
    name: "Priya Nair",
    initials: "PN",
    experience: "5y 2m",
    experienceShort: "5y 2m",
    salary: "₹ 22.00 Lacs",
    expects: "₹ 28 Lacs",
    location: "Bengaluru",
    prefLocations: ["Bengaluru", "Hyderabad", "Remote"],
    currentRole: "Senior Developer",
    company: "Wipro",
    since: "Mar '19",
    education: "B.Tech / B.E, NIT Calicut 2019",
    skills: ["Python", "Machine Learning", "TensorFlow", "Keras", "FastAPI", "PostgreSQL", "Azure"],
    mayAlsoKnow: ["Pandas", "Scikit-learn", "Docker", "Airflow"],
    phone: "9845112233",
    similarCount: 14,
    views: 11,
    modified: "Modified in last 30 days",
    active: "Active yesterday",
    aiBlurb: "AI-matched: applied ML engineer with strong production deployment background.",
    joinedYear: "2019",
    email: "priya.nair@gmail.com",
  },
  {
    slug: "arjun-mehta",
    avatar: avatarArjun,
    name: "Arjun Mehta",
    initials: "AM",
    experience: "4y 5m",
    experienceShort: "4y 5m",
    salary: "₹ 18.75 Lacs",
    expects: "₹ 24 Lacs",
    location: "Chennai",
    prefLocations: ["Chennai", "Bengaluru", "Hyderabad"],
    currentRole: "ML Engineer",
    company: "Cognizant",
    since: "Jun '20",
    education: "B.Tech / B.E, IIT Madras 2020",
    skills: ["Python", "PyTorch", "ONNX", "Triton", "CUDA", "MLOps", "GCP", "Vertex AI"],
    mayAlsoKnow: ["Kubernetes", "Ray", "TensorRT", "Kubeflow"],
    phone: "9786543210",
    similarCount: 10,
    views: 7,
    modified: "Modified in last 30 days",
    active: "Active yesterday",
    aiBlurb: "AI-matched: GPU/ML inference specialist with strong MLOps practice.",
    joinedYear: "2020",
    email: "arjun.mehta@yahoo.com",
  },
];

export const getCandidate = (slug: string) => candidates.find((c) => c.slug === slug);

export const similarProfile = {
  name: "Shankar R",
  initials: "SR",
  avatar: avatarShankar,
  title: "Senior Software Engineer at HSBC since 2025",
  experience: "2y 9m",
  salary: "₹ 14 Lacs",
  location: "Hyderabad",
  prefLocations: ["Hyderabad", "Gurugram", "Pune", "Noida"],
  skills: ["Java", "Python", "SQL", "Bash", "C++", "Groovy", "Golang", "GCP", "Git", "Docker", "Kubernetes", "Jenkins", "Grafana"],
  moreSkills: 27,
};
