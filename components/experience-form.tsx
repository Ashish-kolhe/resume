"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Experience } from "@/types/resume"
import { Trash2 } from "lucide-react"

interface ExperienceFormProps {
  experience: Experience[]
  addExperience: (experience: Experience) => void
  removeExperience: (index: number) => void
}

export default function ExperienceForm({ experience, addExperience, removeExperience }: ExperienceFormProps) {
  const [formData, setFormData] = useState<Experience>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addExperience(formData)
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Example Corp"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Software Engineer"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State or Remote"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={formData.startDate}
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
              value={formData.endDate}
              onChange={handleChange}
              placeholder="Present"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Experience
        </Button>
      </form>

      {experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Added Experience</h3>
          <div className="space-y-3">
            {experience.map((exp, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">{exp.position}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.company}, {exp.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

