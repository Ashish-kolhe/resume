"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Check,
  ChevronDown,
  Layout,
  Sparkles,
  Zap,
  Briefcase,
  Users,
  Crown,
  Code,
  FileText,
  BookOpen,
} from "lucide-react"

const templateIcons = {
  modern: Sparkles,
  minimal: Zap,
  professional: Briefcase,
  creative: Users,
  executive: Crown,
  technical: Code,
  compact: FileText,
  academic: BookOpen,
}

const templateColors = {
  modern: "from-blue-500 to-purple-600",
  minimal: "from-gray-500 to-gray-700",
  professional: "from-slate-600 to-slate-800",
  creative: "from-purple-500 to-pink-600",
  executive: "from-gray-800 to-black",
  technical: "from-green-500 to-blue-600",
  compact: "from-orange-500 to-red-600",
  academic: "from-blue-600 to-indigo-700",
}

const templates = [
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
  { id: "professional", label: "Professional" },
  { id: "creative", label: "Creative" },
  { id: "executive", label: "Executive" },
  { id: "technical", label: "Technical" },
  { id: "compact", label: "Compact" },
  { id: "academic", label: "Academic" },
]

export function TemplateSelector({ activeTemplate, onTemplateChange }) {
  const [open, setOpen] = useState(false)
  const Icon = templateIcons[activeTemplate] || Layout

  const handleTemplateChange = (templateId) => {
    onTemplateChange(templateId)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 rounded-full">
          <div className={`h-5 w-5 rounded-full bg-gradient-to-br ${templateColors[activeTemplate]}`}>
            <Icon className="h-3 w-3 text-white m-1" />
          </div>
          {templates.find((template) => template.id === activeTemplate)?.label || "Modern"} Template
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg w-[220px]">
        {templates.map((template) => {
          const TemplateIcon = templateIcons[template.id] || Layout
          return (
            <DropdownMenuItem
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className="flex items-center justify-between cursor-pointer py-2.5 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${templateColors[template.id]}`}>
                  <TemplateIcon className="h-3.5 w-3.5 text-white m-1.25" />
                </div>
                <span>{template.label}</span>
              </div>
              {activeTemplate === template.id && <Check className="h-4 w-4 text-blue-600" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
