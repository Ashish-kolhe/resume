import { Mail, MapPin, Phone, ExternalLink, BookOpen, Award, FileText } from "lucide-react"

export function AcademicTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      {/* Header Section */}
      <div className="border-b-4 border-blue-800 px-8 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{data.personal.name || "Your Name"}</h1>
        <p className="mt-1 text-xl text-gray-600">{data.personal.title || "Professional Title"}</p>

        {/* Contact Details */}
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-blue-800" />
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-blue-800" />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-blue-800" />
              <span>{data.personal.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personal.summary && (
          <div className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-blue-800">Research Interests</h2>
            <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-blue-800 flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                  <p className="text-sm font-medium text-gray-700">{edu.school}</p>
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                  {edu.description && <p className="mt-1 text-sm text-gray-600">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications Section (Simulated from Projects) */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-blue-800 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Publications
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-blue-200 pl-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm italic text-gray-600">
                      {project.technologies || "Journal of Academic Research"}
                    </p>
                    <p className="text-sm text-gray-500">Published: {project.startDate || "2023"}</p>
                  </div>
                  {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-blue-800 flex items-center gap-2">
              <Award className="h-5 w-5" /> Academic Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-md text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>
                  {exp.description && (
                    <div className="ml-4">
                      {exp.description.split("\n").map((line, index) => (
                        <div key={index} className="mb-1 flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400"></span>
                          <span className="text-sm text-gray-700">{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-bold text-blue-800">Research Skills & Expertise</h2>
            {/* Group skills by category */}
            {(() => {
              // Group skills by category
              const skillsByCategory = data.skills.reduce((acc, skill) => {
                const category = skill.category || "Other"
                if (!acc[category]) {
                  acc[category] = []
                }
                acc[category].push(skill)
                return acc
              }, {})

              // Render skills by category
              return Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h3 className="mb-2 text-sm font-semibold text-gray-700">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-block rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 border border-blue-100"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
