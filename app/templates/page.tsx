"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, ArrowRight, Sparkles } from "lucide-react"
import { TemplateCard } from "@/components/template-card"
import { TemplateFilter } from "@/components/template-filter"
import { ModernTemplate } from "@/components/resume-templates/modern-template"
import { MinimalTemplate } from "@/components/resume-templates/minimal-template"
import { ProfessionalTemplate } from "@/components/resume-templates/professional-template"
import { CreativeTemplate } from "@/components/resume-templates/creative-template"
import { ExecutiveTemplate } from "@/components/resume-templates/executive-template"
import { TechnicalTemplate } from "@/components/resume-templates/technical-template"
import { CompactTemplate } from "@/components/resume-templates/compact-template"
import { AcademicTemplate } from "@/components/resume-templates/academic-template"

// Sample data for template previews
const sampleData = {
  personal: {
    name: "Alex Johnson",
    title: "Software Developer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    address: "San Francisco, CA",
    summary:
      "Experienced software developer with 5+ years of experience in web development. Proficient in JavaScript, React, and Node.js. Passionate about creating user-friendly applications and solving complex problems.",
    profileImage: null,
  },
  education: [
    {
      id: 1,
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "",
    },
  ],
  experience: [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      description:
        "Led the development of the company's main product using React and TypeScript.\nImplemented responsive design principles to ensure optimal user experience across all devices.\nCollaborated with UX designers to create intuitive user interfaces.",
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      position: "Web Developer",
      location: "Oakland, CA",
      startDate: "2019-06",
      endDate: "2021-02",
      description:
        "Developed and maintained client websites using JavaScript, HTML, and CSS.\nImplemented performance optimizations that improved load times by 40%.\nWorked in an agile team environment with daily stand-ups and sprint planning.",
    },
  ],
  skills: [
    { id: 1, name: "JavaScript", category: "Programming Languages", level: "Expert" },
    { id: 2, name: "React", category: "Frameworks", level: "Expert" },
    { id: 3, name: "Node.js", category: "Frameworks", level: "Advanced" },
    { id: 4, name: "TypeScript", category: "Programming Languages", level: "Advanced" },
    { id: 5, name: "HTML/CSS", category: "Web Technologies", level: "Expert" },
    { id: 6, name: "Git", category: "Tools", level: "Advanced" },
    { id: 7, name: "Problem Solving", category: "Soft Skills", level: "Expert" },
    { id: 8, name: "Team Collaboration", category: "Soft Skills", level: "Expert" },
  ],
  projects: [
    {
      id: 1,
      name: "E-commerce Platform",
      technologies: "React, Node.js, MongoDB, Express",
      link: "https://github.com/alexj/ecommerce",
      startDate: "2022-01",
      endDate: "2022-06",
      description:
        "Built a full-stack e-commerce platform with user authentication, product catalog, and payment processing.\nImplemented responsive design and optimized for mobile devices.\nUtilized Redux for state management and MongoDB for data storage.",
    },
  ],
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean, professional template with a two-column layout and dark header.",
    component: <ModernTemplate data={sampleData} />,
    category: "business",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "A simple, elegant design with minimal styling and clean typography.",
    component: <MinimalTemplate data={sampleData} />,
    category: "business",
  },
  {
    id: "professional",
    name: "Professional",
    description: "A sophisticated layout with professional formatting and clear section dividers.",
    component: <ProfessionalTemplate data={sampleData} />,
    category: "business",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold design with accent colors and a unique layout to stand out.",
    component: <CreativeTemplate data={sampleData} />,
    category: "creative",
  },
  {
    id: "executive",
    name: "Executive",
    description: "A refined, elegant template ideal for senior professionals and executives.",
    component: <ExecutiveTemplate data={sampleData} />,
    category: "business",
  },
  {
    id: "technical",
    name: "Technical",
    description: "A specialized template highlighting technical skills with skill level indicators.",
    component: <TechnicalTemplate data={sampleData} />,
    category: "technical",
  },
  {
    id: "compact",
    name: "Compact",
    description: "A space-efficient design that fits more content on a single page.",
    component: <CompactTemplate data={sampleData} />,
    category: "creative",
  },
  {
    id: "academic",
    name: "Academic",
    description: "A formal template designed for academic CVs and research positions.",
    component: <AcademicTemplate data={sampleData} />,
    category: "academic",
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter templates using useMemo to avoid re-computation on every render
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/builder?template=${selectedTemplate}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              ResumeForU
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Perfect Template</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Each template is crafted to help
                you stand out and land your dream job.
              </p>
            </div>
          </div>

          {/* Continue Button - Floating */}
          {selectedTemplate && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-300">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl px-8 py-3 rounded-full flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Filter Section */}
        <TemplateFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          resultCount={filteredTemplates.length}
          totalCount={templates.length}
        />

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={() => handleSelectTemplate(template.id)}
              
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find the perfect template.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
