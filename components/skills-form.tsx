"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/types/resume"
import { X } from "lucide-react"

interface SkillsFormProps {
  skills: Skill[]
  updateSkills: (skills: Skill[]) => void
}

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [skillLevel, setSkillLevel] = useState<Skill["level"]>("Intermediate")

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSkill.trim()) {
      updateSkills([...skills, { name: newSkill.trim(), level: skillLevel }])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    updateSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddSkill} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill">Skill</Label>
          <Input
            id="skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="JavaScript, Project Management, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Proficiency Level</Label>
          <select
            id="level"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as Skill["level"])}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <Button type="submit" className="w-full">
          Add Skill
        </Button>
      </form>

      {skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Added Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                {skill.name} ({skill.level})
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

