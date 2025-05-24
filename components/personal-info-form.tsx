"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Upload } from "lucide-react"

export function PersonalInfoForm({ data, updateData }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    profileImage: null,
    ...data,
  })
  const [previewUrl, setPreviewUrl] = useState(data?.profileImage || null)

  useEffect(() => {
    if (data) {
      setFormData({
        name: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
        profileImage: null,
        ...data,
      })
      setPreviewUrl(data.profileImage || null)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = {
      ...formData,
      [name]: value,
    }
    setFormData(updatedData)
    updateData(updatedData)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageDataUrl = event.target.result
      setPreviewUrl(imageDataUrl)
      const updatedData = {
        ...formData,
        profileImage: imageDataUrl,
      }
      setFormData(updatedData)
      updateData(updatedData)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateData(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Profile Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Picture</Label>
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
            {previewUrl ? (
              <img src={previewUrl || "/placeholder.svg"} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label
              htmlFor="profileImage"
              className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              <Upload className="h-4 w-4" />
              {previewUrl ? "Change Photo" : "Upload Photo"}
            </Label>
            <p className="mt-1 text-xs text-gray-500">Recommended: Square image, 300x300px or larger</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Customer Service Professional"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St, City, State, Zip"
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
