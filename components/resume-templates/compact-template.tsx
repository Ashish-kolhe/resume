import { Mail, MapPin, Phone, ExternalLink } from "lucide-react"

export function CompactTemplate({ data }) {
  return (
    <div className="mx-auto max-w-[800px] bg-white shadow-lg p-6">
      {/* Header Section */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{data.personal.name || "Your Name"}</h1>
        <p className="text-gray-600">{data.personal.title || "Professional Title"}</p>

        {/* Contact Details */}
        <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{data.personal.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm">
        {/* Summary */}
        {data.personal.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">Summary</h2>
            <p className="text-gray-700 text-xs leading-relaxed">{data.personal.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">Experience</h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ""}
                  </p>
                  {exp.description && (
                    <div className="ml-3 text-xs">
                      {exp.description.split("\n").map((line, index) => (
                        <div key={index} className="mb-1 flex items-start gap-1">
                          <span className="mt-1.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          <span className="text-gray-700">{line}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                  {edu.fieldOfStudy && <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">Skills</h2>
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
                <div key={category} className="mb-2">
                  <h3 className="text-xs font-semibold text-gray-700">{category}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-block rounded-sm bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800"
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

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-gray-700 border-b border-gray-200 pb-1 mb-2">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {project.startDate} - {project.endDate || "Present"}
                    </p>
                  </div>
                  {project.technologies && (
                    <p className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">Tech:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <div className="ml-3 text-xs">
                      {project.description.split("\n").map((line, index) => (
                        <div key={index} className="mb-1 flex items-start gap-1">
                          <span className="mt-1.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                          <span className="text-gray-700">{line}</span>
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
