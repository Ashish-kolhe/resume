"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/types/resume"

interface PersonalInfoFormProps {
  personalInfo: ResumeData["personalInfo"]
  updatePersonalInfo: (personalInfo: ResumeData["personalInfo"]) => void
}

export default function PersonalInfoForm({ personalInfo, updatePersonalInfo }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(personalInfo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updatePersonalInfo(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="NameLess@someone.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="92------72" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="House No, City, State"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="A brief summary of your professional background and goals"
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        Save Personal Information
      </Button>
    </form>
  )
}

