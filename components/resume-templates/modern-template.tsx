import { Mail, MapPin, Phone, User, ExternalLink } from "lucide-react"

export function ModernTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-slate-700 px-8 py-6 text-white">
        <div className="flex items-center gap-6">
          {/* Profile Photo */}
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-slate-500">
            {data.personal.profileImage ? (
              <img
                src={data.personal.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <User className="h-12 w-12 text-white" />
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div>
            <h1 className="text-3xl font-bold">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 text-lg text-slate-200">{data.personal.title || "Professional Title"}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-slate-100 p-6">
          {/* Contact Details */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-slate-800">Contact Details</h2>
            <div className="space-y-3">
              {data.personal.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{data.personal.phone}</span>
                </div>
              )}
              {data.personal.address && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700">{data.personal.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-bold text-slate-800">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-slate-300 pl-4">
                    <h3 className="font-semibold text-slate-800">{edu.degree}</h3>
                    <p className="text-sm text-slate-600">{edu.fieldOfStudy}</p>
                    <p className="text-sm font-medium text-slate-700">{edu.school}</p>
                    <p className="text-xs text-slate-500">
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
              <h2 className="mb-4 text-lg font-bold text-slate-800">Skills</h2>

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
                    <h3 className="mb-2 text-sm font-semibold text-slate-700">{category}</h3>
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level || "Expert"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              })()}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Summary */}
          {data.personal.summary && (
            <div className="mb-8">
              <h2 className="mb-3 border-b-2 border-slate-300 pb-1 text-xl font-bold text-slate-800">Summary</h2>
              <p className="text-slate-700 leading-relaxed">{data.personal.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 border-b-2 border-slate-300 pb-1 text-xl font-bold text-slate-800">
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-slate-800">
                        {exp.position}, {exp.company}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="ml-4">
                        {exp.description.split("\n").map((line, index) => (
                          <div key={index} className="mb-1 flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400"></span>
                            <span className="text-sm text-slate-700">{line}</span>
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
              <h2 className="mb-4 border-b-2 border-slate-300 pb-1 text-xl font-bold text-slate-800">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-800">{project.name}</h3>
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
                      <p className="text-sm text-slate-600">
                        {project.startDate} - {project.endDate || "Present"}
                      </p>
                      {project.technologies && (
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Technologies:</span> {project.technologies}
                        </p>
                      )}
                    </div>
                    {project.description && (
                      <div className="ml-4">
                        {project.description.split("\n").map((line, index) => (
                          <div key={index} className="mb-1 flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400"></span>
                            <span className="text-sm text-slate-700">{line}</span>
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
