export interface PersonalInfo {
  name: string
  email: string
  phone: string
  address: string
  summary: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description: string
}

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Skill {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
}

