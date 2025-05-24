"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

export function EducationForm({ data, updateData }) {
  const [educationList, setEducationList] = useState(data || [])
  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  useEffect(() => {
    if (data) {
      setEducationList(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentEducation((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddEducation = (e) => {
    e.preventDefault()
    const newEducationList = [...educationList, { ...currentEducation, id: Date.now() }]
    setEducationList(newEducationList)
    updateData(newEducationList)
    setCurrentEducation({
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleRemoveEducation = (id) => {
    const newEducationList = educationList.filter((edu) => edu.id !== id)
    setEducationList(newEducationList)
    updateData(newEducationList)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {educationList.map((education) => (
          <Card key={education.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{education.school}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveEducation(education.id)}
                className="h-8 w-8 text-red-500"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="font-medium">{education.degree}</div>
                <div className="text-sm text-gray-500">
                  {education.fieldOfStudy} • {education.startDate} - {education.endDate || "Present"}
                </div>
                {education.description && <div className="mt-2 text-sm">{education.description}</div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleAddEducation} className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-medium">Add Education</h3>
        <div className="space-y-2">
          <Label htmlFor="school">School/University</Label>
          <Input
            id="school"
            name="school"
            value={currentEducation.school}
            onChange={handleChange}
            placeholder="Harvard University"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={currentEducation.degree}
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
              value={currentEducation.fieldOfStudy}
              onChange={handleChange}
              placeholder="Computer Science"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={currentEducation.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date (or expected)</Label>
            <Input
              id="endDate"
              name="endDate"
              type="month"
              value={currentEducation.endDate}
              onChange={handleChange}
              placeholder="Leave blank if current"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            value={currentEducation.description}
            onChange={handleChange}
            placeholder="Relevant coursework, achievements, etc."
            rows={3}
          />
        </div>
        <Button type="submit" className="flex w-full items-center gap-2">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </form>
    </div>
  )
}
