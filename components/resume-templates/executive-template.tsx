import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"

export function ExecutiveTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      {/* Header Section */}
      <div className="border-b-8 border-gray-800 px-8 py-8">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 text-xl text-gray-600">{data.personal.title || "Professional Title"}</p>
          </div>

          {/* Profile Photo */}
          {data.personal.profileImage && (
            <div className="mt-4 md:mt-0 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-gray-200">
              <img
                src={data.personal.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Details */}
        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-600">
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personal.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personal.summary && (
          <div className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-gray-800 uppercase tracking-wider">Executive Summary</h2>
            <div className="h-1 w-20 bg-gray-800 mb-4"></div>
            <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-gray-800 uppercase tracking-wider">Professional Experience</h2>
            <div className="h-1 w-20 bg-gray-800 mb-4"></div>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-md font-medium text-gray-700">{exp.company}</p>
                      {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                    </div>
                    <p className="text-sm font-medium text-gray-600 mt-1 md:mt-0">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>
                  {exp.description && (
                    <div className="mt-2">
                      {exp.description.split("\n").map((line, index) => (
                        <div key={index} className="mb-1 flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-800 uppercase tracking-wider">Education</h2>
              <div className="h-1 w-20 bg-gray-800 mb-4"></div>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                    <p className="text-sm font-medium text-gray-700">{edu.school}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="mb-3 text-xl font-bold text-gray-800 uppercase tracking-wider">Core Competencies</h2>
              <div className="h-1 w-20 bg-gray-800 mb-4"></div>
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
                          className="inline-block rounded-sm border border-gray-300 px-2 py-1 text-xs font-medium text-gray-800"
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

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-xl font-bold text-gray-800 uppercase tracking-wider">Key Projects</h2>
            <div className="h-1 w-20 bg-gray-800 mb-4"></div>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 mt-1 md:mt-0">
                      {project.startDate} - {project.endDate || "Present"}
                    </p>
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <div className="mt-2">
                      {project.description.split("\n").map((line, index) => (
                        <div key={index} className="mb-1 flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400"></span>
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
      </div>
    </div>
  )
}
