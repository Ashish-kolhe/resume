"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Sparkles, Briefcase, Code, Users, BookOpen } from "lucide-react"

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles, count: 8 },
  { id: "business", label: "Business", icon: Briefcase, count: 3 },
  { id: "creative", label: "Creative", icon: Users, count: 2 },
  { id: "technical", label: "Technical", icon: Code, count: 2 },
  { id: "academic", label: "Academic", icon: BookOpen, count: 1 },
]

export function TemplateFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultCount,
  totalCount,
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="ml-1">
                1
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Filter Categories */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-in slide-in-from-top duration-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex flex-col items-center gap-2 h-auto py-4 px-3 ${
                    isSelected ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{category.label}</div>
                    <div className="text-xs opacity-70">{category.count} templates</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {resultCount} of {totalCount} templates
          {searchTerm && (
            <span className="ml-1">
              for "<span className="font-medium text-gray-900">{searchTerm}</span>"
            </span>
          )}
        </div>

        {(selectedCategory !== "all" || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange("all")
              onSearchChange("")
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
