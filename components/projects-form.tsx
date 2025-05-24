"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash, ExternalLink } from "lucide-react"

export function ProjectsForm({ data, updateData }) {
  const [projectsList, setProjectsList] = useState(data || [])
  const [currentProject, setCurrentProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    if (data) {
      setProjectsList(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    const newProjectsList = [...projectsList, { ...currentProject, id: Date.now() }]
    setProjectsList(newProjectsList)
    updateData(newProjectsList)
    setCurrentProject({
      name: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleRemoveProject = (id) => {
    const newProjectsList = projectsList.filter((project) => project.id !== id)
    setProjectsList(newProjectsList)
    updateData(newProjectsList)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {projectsList.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveProject(project.id)}
                className="h-8 w-8 text-red-500"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="text-sm text-gray-600">
                  {project.startDate} - {project.endDate || "Present"}
                </div>
                {project.technologies && (
                  <div className="text-sm">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </div>
                )}
                {project.description && <div className="mt-2 text-sm">{project.description}</div>}
                {project.link && (
                  <div className="mt-2 flex items-center gap-1 text-sm text-blue-600">
                    <ExternalLink className="h-3 w-3" />
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      View Project
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleAddProject} className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-medium">Add Project</h3>
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            name="name"
            value={currentProject.name}
            onChange={handleChange}
            placeholder="E-commerce Website"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies Used</Label>
          <Input
            id="technologies"
            name="technologies"
            value={currentProject.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, Tailwind CSS"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="projectStartDate">Start Date</Label>
            <Input
              id="projectStartDate"
              name="startDate"
              type="month"
              value={currentProject.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectEndDate">End Date</Label>
            <Input
              id="projectEndDate"
              name="endDate"
              type="month"
              value={currentProject.endDate}
              onChange={handleChange}
              placeholder="Leave blank if ongoing"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectLink">Project Link (optional)</Label>
          <Input
            id="projectLink"
            name="link"
            type="url"
            value={currentProject.link}
            onChange={handleChange}
            placeholder="https://github.com/username/project or https://project-demo.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectDescription">Description</Label>
          <Textarea
            id="projectDescription"
            name="description"
            value={currentProject.description}
            onChange={handleChange}
            placeholder="Describe the project, your role, key features, and achievements"
            rows={4}
            required
          />
        </div>
        <Button type="submit" className="flex w-full items-center gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </form>
    </div>
  )
}
