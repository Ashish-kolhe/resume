"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Education } from "@/types/resume"
import { Trash2 } from "lucide-react"

interface EducationFormProps {
  education: Education[]
  addEducation: (education: Education) => void
  removeEducation: (index: number) => void
}

export default function EducationForm({ education, addEducation, removeEducation }: EducationFormProps) {
  const [formData, setFormData] = useState<Education>({
    institution: "",
    degree: "",
    fieldOfStudy: "",
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
    addEducation(formData)
    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="institution">Institution</Label>
          <Input
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="University of Example"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Bachelor of Science"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            placeholder="Computer Science"
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
            <Label htmlFor="endDate">End Date (or Expected)</Label>
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
            placeholder="Relevant coursework, achievements, etc."
            rows={3}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Education
        </Button>
      </form>

      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Added Education</h3>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
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

