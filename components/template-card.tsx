"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Eye, Sparkles, Briefcase, Code, Users, Zap, Crown, FileText, BookOpen } from "lucide-react"

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

const templateTags = {
  modern: ["Popular", "Clean"],
  minimal: ["Simple", "Elegant"],
  professional: ["Corporate", "Formal"],
  creative: ["Bold", "Unique"],
  executive: ["Premium", "Leadership"],
  technical: ["Developer", "Skills-focused"],
  compact: ["Space-efficient", "Detailed"],
  academic: ["Research", "Formal"],
}

export function TemplateCard({ template, isSelected, onSelect, onPreview, showPreviewButton = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = templateIcons[template.id] || Sparkles

  return (
    <Card
      className={`group relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 h-[180px] ${
        isSelected ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-2xl hover:shadow-blue-100"
      }`}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${templateColors[template.id]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-20 bg-blue-500 text-white p-2 rounded-full shadow-lg animate-in zoom-in duration-200">
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* Preview Button */}
      {showPreviewButton && (
        <div
          className={`absolute top-3 left-3 z-20 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              onPreview()
            }}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>
      )}

      {/* Template Preview */}
      <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-10" />
        <div className={`p-8 rounded-full bg-gradient-to-br ${templateColors[template.id]} text-white shadow-lg mb-4`}>
          <Icon className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 z-20">{template.name}</h3>
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${templateColors[template.id]} text-white shadow-lg`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {templateTags[template.id]?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Hover Effect */}
        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3" />
          <p className="text-xs text-gray-600 text-center">Click to select this template</p>
        </div>
      </CardContent>
    </Card>
  )
}
