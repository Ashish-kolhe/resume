"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

export function SkillsForm({ data, updateData }) {
  const [skills, setSkills] = useState(data || [])
  const [currentSkill, setCurrentSkill] = useState("")
  const [currentCategory, setCurrentCategory] = useState("Technical Skills")
  const [currentLevel, setCurrentLevel] = useState("Expert")
  const [categories, setCategories] = useState(["Technical Skills", "Soft Skills", "Languages", "Tools", "Other"])
  const [newCategory, setNewCategory] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)

  useEffect(() => {
    if (data) {
      setSkills(data)

      // Extract unique categories from existing skills
      const existingCategories = data
        .map((skill) => skill.category)
        .filter((category, index, self) => category && self.indexOf(category) === index)

      if (existingCategories.length > 0) {
        setCategories([...new Set([...categories, ...existingCategories])])
      }
    }
  }, [data])

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (currentSkill.trim() === "") return

    const newSkill = {
      id: Date.now(),
      name: currentSkill.trim(),
      category: currentCategory,
      level: currentLevel,
    }

    const newSkills = [...skills, newSkill]
    setSkills(newSkills)
    updateData(newSkills)
    setCurrentSkill("")
  }

  const handleRemoveSkill = (id) => {
    const newSkills = skills.filter((skill) => skill.id !== id)
    setSkills(newSkills)
    updateData(newSkills)
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (newCategory.trim() === "") return

    const updatedCategories = [...categories, newCategory.trim()]
    setCategories(updatedCategories)
    setCurrentCategory(newCategory.trim())
    setNewCategory("")
    setShowAddCategory(false)
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <Label htmlFor="skills" className="text-lg font-medium">
              Skills
            </Label>
            <p className="text-sm text-gray-500">Add skills that showcase your abilities</p>
          </div>

          <form onSubmit={handleAddSkill} className="mb-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="skill">Skill Name</Label>
                <Input
                  id="skill"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="e.g., JavaScript, Project Management"
                  className="flex-1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select value={currentLevel} onValueChange={setCurrentLevel}>
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="skillCategory">Skill Category</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="h-8 text-xs"
                >
                  {showAddCategory ? "Cancel" : "Add New Category"}
                </Button>
              </div>

              {showAddCategory ? (
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddCategory} disabled={!newCategory.trim()}>
                    Add
                  </Button>
                </div>
              ) : (
                <Select value={currentCategory} onValueChange={setCurrentCategory}>
                  <SelectTrigger id="skillCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button type="submit" disabled={!currentSkill.trim()} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </form>

          <div className="space-y-4">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                      {skill.name}
                      <span className="mx-1 text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{skill.level}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSkill(skill.id)}
                        className="ml-1 h-4 w-4 rounded-full p-0 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill.name}</span>
                      </Button>
                    </Badge>
                  ))}
                  {categorySkills.length === 0 && (
                    <p className="text-sm text-gray-500">No skills in this category yet.</p>
                  )}
                </div>
              </div>
            ))}

            {skills.length === 0 && (
              <p className="text-sm text-gray-500">No skills added yet. Add some skills above.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
