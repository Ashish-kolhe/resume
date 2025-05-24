"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User, GraduationCap, Briefcase, Lightbulb, FolderKanban } from "lucide-react"

const sections = [
  { id: "personal", label: "Personal Information", icon: <User className="mr-2 h-4 w-4" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
  { id: "experience", label: "Work Experience", icon: <Briefcase className="mr-2 h-4 w-4" /> },
  { id: "skills", label: "Skills", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
  { id: "projects", label: "Projects", icon: <FolderKanban className="mr-2 h-4 w-4" /> },
]

export function SectionNavigator({ activeSection, onSectionChange }) {
  const [open, setOpen] = useState(false)

  const activeLabel = sections.find((section) => section.id === activeSection)?.label || "Select Section"

  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
        >
          {sections.find((section) => section.id === activeSection)?.icon}
          {activeLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-gray-200 shadow-lg">
        {sections.map((section) => (
          <DropdownMenuItem
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`flex items-center cursor-pointer py-2.5 ${
              activeSection === section.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
            }`}
          >
            <div
              className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full ${
                activeSection === section.id ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {section.icon}
            </div>
            {section.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
