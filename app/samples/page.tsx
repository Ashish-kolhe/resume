"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Download,
  Sparkles,
  Briefcase,
  Code,
  Users,
  Zap,
  Crown,
  BookOpen,
} from "lucide-react"
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
    description: "Clean, professional template with two-column layout",
    component: <ModernTemplate data={sampleData} />,
    icon: Sparkles,
    color: "from-blue-500 to-purple-600",
    tags: ["Popular", "Clean"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, elegant design with clean typography",
    component: <MinimalTemplate data={sampleData} />,
    icon: Zap,
    color: "from-gray-500 to-gray-700",
    tags: ["Simple", "Elegant"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Sophisticated layout with professional formatting",
    component: <ProfessionalTemplate data={sampleData} />,
    icon: Briefcase,
    color: "from-slate-600 to-slate-800",
    tags: ["Corporate", "Formal"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with accent colors and unique layout",
    component: <CreativeTemplate data={sampleData} />,
    icon: Users,
    color: "from-purple-500 to-pink-600",
    tags: ["Bold", "Unique"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Refined, elegant template for senior professionals",
    component: <ExecutiveTemplate data={sampleData} />,
    icon: Crown,
    color: "from-gray-800 to-black",
    tags: ["Premium", "Leadership"],
  },
  {
    id: "technical",
    name: "Technical",
    description: "Specialized template highlighting technical skills",
    component: <TechnicalTemplate data={sampleData} />,
    icon: Code,
    color: "from-green-500 to-blue-600",
    tags: ["Developer", "Skills-focused"],
  },
  {
    id: "compact",
    name: "Compact",
    description: "Space-efficient design for detailed content",
    component: <CompactTemplate data={sampleData} />,
    icon: FileText,
    color: "from-orange-500 to-red-600",
    tags: ["Space-efficient", "Detailed"],
  },
  {
    id: "academic",
    name: "Academic",
    description: "Formal template for academic and research positions",
    component: <AcademicTemplate data={sampleData} />,
    icon: BookOpen,
    color: "from-blue-600 to-indigo-700",
    tags: ["Research", "Formal"],
  },
]

export default function SamplesPage() {
  const [activeTemplate, setActiveTemplate] = useState("modern")
  const resumeRef = useRef(null)
  const currentTemplate = templates.find((t) => t.id === activeTemplate)

  const handleDownload = async () => {
    if (!resumeRef.current) return

    try {
      // Convert the resume div to an image with high quality
      const dataUrl = await toPng(resumeRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        skipAutoScale: true,
        backgroundColor: "#ffffff",
        style: {
          margin: "0",
          padding: "0",
          border: "none",
        },
      })

      // Create a new Image to get dimensions
      const img = new Image()
      img.src = dataUrl
      img.crossOrigin = "anonymous"

      await new Promise((resolve) => {
        img.onload = resolve
      })

      // Calculate PDF dimensions based on image aspect ratio
      const imgWidth = img.width
      const imgHeight = img.height
      const imgAspectRatio = imgWidth / imgHeight

      // Set PDF page size based on content
      let pdfWidth, pdfHeight

      if (imgAspectRatio > 1) {
        // Landscape-ish content
        pdfWidth = 297 // A4 landscape width
        pdfHeight = pdfWidth / imgAspectRatio
      } else {
        // Portrait content
        pdfWidth = 210 // A4 portrait width
        pdfHeight = pdfWidth / imgAspectRatio
      }

      // Ensure minimum height
      if (pdfHeight < 297) {
        pdfHeight = 297
      }

      // Create PDF with calculated dimensions
      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      })

      // Add margins
      const margin = 10
      const contentWidth = pdfWidth - margin * 2
      const contentHeight = pdfHeight - margin * 2

      // Calculate scaling to fit content with margins
      const scaleX = contentWidth / (imgWidth * 0.264583) // Convert px to mm
      const scaleY = contentHeight / (imgHeight * 0.264583)
      const scale = Math.min(scaleX, scaleY)

      const finalWidth = imgWidth * 0.264583 * scale
      const finalHeight = imgHeight * 0.264583 * scale

      // Center the content
      const xOffset = margin + (contentWidth - finalWidth) / 2
      const yOffset = margin + (contentHeight - finalHeight) / 2

      // Add the image to PDF
      pdf.addImage(dataUrl, "PNG", xOffset, yOffset, finalWidth, finalHeight)

      // Save the PDF
      pdf.save(`${currentTemplate?.name || "resume"}_sample.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating your PDF. Please try again.")
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Samples</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our professionally designed resume templates with sample content.
              </p>
            </div>
            <Link href="/templates">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 rounded-full px-6">
                Create Resume <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Template Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Templates</h3>
                <div className="space-y-2">
                  {templates.map((template) => {
                    const Icon = template.icon
                    const isActive = activeTemplate === template.id
                    return (
                      <button
                        key={template.id}
                        onClick={() => setActiveTemplate(template.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${template.color} text-white shadow-sm`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">{template.name}</div>
                            <div className="text-xs text-gray-500 truncate">{template.description}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Template Header */}
                <div className="bg-white border-b p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${currentTemplate?.color} text-white shadow-lg`}
                      >
                        {currentTemplate?.icon && <currentTemplate.icon className="h-6 w-6" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentTemplate?.name} Template</h2>
                        <p className="text-gray-600">{currentTemplate?.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Sample
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Template Content */}
                <div className="bg-gray-50 p-6">
                  <div className="mx-auto bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl">
                    <div className="max-h-[600px] overflow-auto">
                      <div ref={resumeRef} className="transform origin-top scale-90">
                        {currentTemplate?.component}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-2xl p-12 shadow-lg border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Your Resume?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Choose from any of our professional templates and start building your perfect resume today.
            </p>
            <Link href="/templates">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2 mx-auto"
              >
                <Sparkles className="h-5 w-5" />
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
