"use client"

import { forwardRef } from "react"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  resumeData: ResumeData
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills } = resumeData

  return (
    <div ref={ref} className="bg-white w-full max-w-[800px] mx-auto p-8 shadow-sm" style={{ minHeight: "1100px" }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.name || "Your Name"}</h1>
        <div className="text-sm text-gray-600 mt-1 space-y-1">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          <div className="flex justify-center gap-2">
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.phone && personalInfo.address && <span>|</span>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm">
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </p>
                {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium">{edu.institution}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm">
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </p>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

ResumePreview.displayName = "ResumePreview"

export default ResumePreview

