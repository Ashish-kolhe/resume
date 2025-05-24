import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"

export function ProfessionalTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-gray-800 px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Profile Photo */}
          {data.personal.profileImage && (
            <div className="mx-auto md:mx-0 h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white">
              <img
                src={data.personal.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Name and Title */}
          <div className={`text-center md:text-left ${data.personal.profileImage ? "" : "w-full"}`}>
            <h1 className="text-3xl font-bold text-white">{data.personal.name || "Your Name"}</h1>
            <p className="mt-1 text-xl text-gray-300">{data.personal.title || "Professional Title"}</p>

            {/* Contact Details */}
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
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
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.personal.summary && (
          <div className="mb-8">
            <h2 className="mb-3 border-b-2 border-gray-800 pb-1 text-xl font-bold text-gray-800">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 border-b-2 border-gray-800 pb-1 text-xl font-bold text-gray-800">
              Professional Experience
            </h2>
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
          <div className="mb-8">
            <h2 className="mb-4 border-b-2 border-gray-800 pb-1 text-xl font-bold text-gray-800">Key Projects</h2>
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
                            className="text-blue-600 hover:text-blue-800"
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
                        <span className="font-medium">Technologies:</span> {project.technologies}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="mb-4 border-b-2 border-gray-800 pb-1 text-xl font-bold text-gray-800">Education</h2>
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
              <h2 className="mb-4 border-b-2 border-gray-800 pb-1 text-xl font-bold text-gray-800">Skills</h2>
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
                          className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
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
    </div>
  )
}
