"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfoForm from "./personal-info-form"
import EducationForm from "./education-form"
import ExperienceForm from "./experience-form"
import SkillsForm from "./skills-form"
import ResumePreview from "./resume-preview"
import type { ResumeData, Education, Experience, Skill } from "@/types/resume"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
  })

  const resumeRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (resumeRef.current) {
      const printContents = resumeRef.current.innerHTML
      const originalContents = document.body.innerHTML

      // Create a new window for printing
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.open()
        printWindow.document.write(`
          <html>
            <head>
              <title>${resumeData.personalInfo.name || "Resume"}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  max-width: 800px;
                  margin: 0 auto;
                }
                @media print {
                  body {
                    padding: 0;
                  }
                }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `)
        printWindow.document.close()

        // Wait for content to load before printing
        printWindow.onload = () => {
          printWindow.print()
          printWindow.onafterprint = () => {
            printWindow.close()
          }
        }
      }
    }
  }

  const updatePersonalInfo = (personalInfo: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo }))
  }

  const addEducation = (education: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addExperience = (experience: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const updateSkills = (skills: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PersonalInfoForm personalInfo={resumeData.personalInfo} updatePersonalInfo={updatePersonalInfo} />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm
              education={resumeData.education}
              addEducation={addEducation}
              removeEducation={removeEducation}
            />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceForm
              experience={resumeData.experience}
              addExperience={addExperience}
              removeExperience={removeExperience}
            />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm skills={resumeData.skills} updateSkills={updateSkills} />
          </TabsContent>
        </Tabs>
        <Button onClick={handlePrint} className="w-full">
          Export as PDF
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 border">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <div className="overflow-auto max-h-[800px]">
          <ResumePreview resumeData={resumeData} ref={resumeRef} />
        </div>
      </div>
    </div>
  )
}

