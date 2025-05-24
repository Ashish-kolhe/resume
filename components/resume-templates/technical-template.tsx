import { Mail, MapPin, Phone, ExternalLink, Github, Linkedin, Globe } from "lucide-react"

export function TechnicalTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 text-lg text-gray-300">{data.personal.title || "Professional Title"}</p>
          </div>

          {/* Profile Photo */}
          {data.personal.profileImage && (
            <div className="mt-4 md:mt-0 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-600">
              <img
                src={data.personal.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Details */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>{data.personal.email || "email@example.com"}</span>
          </div>
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
          <div className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <span>github.com/username</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="h-4 w-4" />
            <span>linkedin.com/in/username</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            <span>portfolio.dev</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left Sidebar */}
        <div className="bg-gray-100 p-6 md:col-span-1">
          {/* Technical Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">Technical Skills</h2>
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
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{skill.name}</span>
                          <div className="w-24 bg-gray-300 rounded-full h-2">
                            <div
                              className="bg-gray-800 h-2 rounded-full"
                              style={{
                                width:
                                  skill.level === "Expert"
                                    ? "100%"
                                    : skill.level === "Advanced"
                                      ? "75%"
                                      : skill.level === "Intermediate"
                                        ? "50%"
                                        : "25%",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              })()}
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">Education</h2>
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
        </div>

        {/* Main Content */}
        <div className="p-6 md:col-span-2">
          {/* Summary */}
          {data.personal.summary && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-4 text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">Work Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-sm font-medium text-gray-600">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                      </div>
                      <p className="text-md text-gray-700">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ""}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="ml-4">
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

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">Technical Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
                        <p className="text-sm font-medium text-gray-600">
                          {project.startDate} - {project.endDate || "Present"}
                        </p>
                      </div>
                      {project.technologies && (
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Tech Stack:</span> {project.technologies}
                        </p>
                      )}
                    </div>
                    {project.description && (
                      <div className="ml-4">
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
    </div>
  )
}
