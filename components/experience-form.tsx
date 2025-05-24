"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

export function ExperienceForm({ data, updateData }) {
  const [experienceList, setExperienceList] = useState(data || [])
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  useEffect(() => {
    if (data) {
      setExperienceList(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddExperience = (e) => {
    e.preventDefault()
    const newExperienceList = [...experienceList, { ...currentExperience, id: Date.now() }]
    setExperienceList(newExperienceList)
    updateData(newExperienceList)
    setCurrentExperience({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleRemoveExperience = (id) => {
    const newExperienceList = experienceList.filter((exp) => exp.id !== id)
    setExperienceList(newExperienceList)
    updateData(newExperienceList)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {experienceList.map((experience) => (
          <Card key={experience.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{experience.position}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveExperience(experience.id)}
                className="h-8 w-8 text-red-500"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="font-medium">{experience.company}</div>
                <div className="text-sm text-gray-500">
                  {experience.location} • {experience.startDate} - {experience.endDate || "Present"}
                </div>
                {experience.description && <div className="mt-2 text-sm">{experience.description}</div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleAddExperience} className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-medium">Add Work Experience</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={currentExperience.company}
              onChange={handleChange}
              placeholder="Google"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={currentExperience.position}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={currentExperience.location}
            onChange={handleChange}
            placeholder="Mountain View, CA"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={currentExperience.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="month"
              value={currentExperience.endDate}
              onChange={handleChange}
              placeholder="Leave blank if current"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={currentExperience.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements"
            rows={4}
            required
          />
        </div>
        <Button type="submit" className="flex w-full items-center gap-2">
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </form>
    </div>
  )
}
