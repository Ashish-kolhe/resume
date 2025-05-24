import { Mail, MapPin, Phone, User, ExternalLink } from "lucide-react"

export function CreativeTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="bg-purple-700 p-6 text-white md:col-span-1">
          {/* Profile Photo */}
          <div className="mb-6 flex justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/20">
              {data.personal.profileImage ? (
                <img
                  src={data.personal.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600">
                  <User className="h-16 w-16 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 text-purple-200">{data.personal.title || "Professional Title"}</p>
          </div>

          {/* Contact Details */}
          <div className="mb-8">
            <h2 className="mb-4 border-b border-purple-500 pb-2 text-lg font-bold">Contact</h2>
            <div className="space-y-3">
              {data.personal.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-purple-300" />
                  <span>{data.personal.email}</span>
                </div>
              )}
              {data.personal.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-purple-300" />
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {data.personal.address && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-purple-300" />
                  <span>{data.personal.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="mb-4 border-b border-purple-500 pb-2 text-lg font-bold">Skills</h2>
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
                    <h3 className="mb-2 text-sm font-semibold text-purple-200">{category}</h3>
                    <div className="space-y-2">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-300"></div>
                          <span className="text-sm">{skill.name}</span>
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
        <div className="p-8 md:col-span-2">
          {/* Summary */}
          {data.personal.summary && (
            <div className="mb-8">
              <h2 className="mb-3 border-b-2 border-purple-200 pb-1 text-xl font-bold text-gray-800">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 border-b-2 border-purple-200 pb-1 text-xl font-bold text-gray-800">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-purple-500"></div>
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

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 border-b-2 border-purple-200 pb-1 text-xl font-bold text-gray-800">
                Work Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-md text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="ml-2">
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
              <h2 className="mb-4 border-b-2 border-purple-200 pb-1 text-xl font-bold text-gray-800">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project) => (
                  <div key={project.id} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {project.startDate} - {project.endDate || "Present"}
                      </p>
                      {project.technologies && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Technologies:</span> {project.technologies}
                        </p>
                      )}
                    </div>
                    {project.description && (
                      <div className="ml-2">
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
