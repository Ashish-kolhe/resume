"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { EducationForm } from "@/components/education-form"
import { ExperienceForm } from "@/components/experience-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Smartphone,
  FileText,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Lightbulb,
  FolderKanban,
  PanelLeft,
  PanelLeftClose,
  LayoutTemplate,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function BuilderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState("personal")
  const [showPreview, setShowPreview] = useState(!isMobile)
  const [mobilePreview, setMobilePreview] = useState(false)
  const [template, setTemplate] = useState("modern")
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      profileImage: null,
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  })

  // Get template from URL if available
  useEffect(() => {
    const templateParam = searchParams.get("template")
    if (templateParam) {
      setTemplate(templateParam)
    }
  }, [searchParams])

  const handleSectionChange = (value) => {
    setActiveSection(value)
  }

  const handleNext = () => {
    const sections = ["personal", "education", "experience", "skills", "projects"]
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const sections = ["personal", "education", "experience", "skills", "projects"]
    const currentIndex = sections.indexOf(activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1])
    }
  }

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleExportPDF = () => {
    // This will trigger the PDF download in the ResumePreview component
    const previewDownloadButton = document.querySelector(".resume-preview-download-button")
    if (previewDownloadButton) {
      previewDownloadButton.click()
    } else {
      toast({
        title: "Preview not available",
        description: "Please open the preview to download your resume.",
        variant: "destructive",
      })
    }
  }

  const toggleMobilePreview = () => {
    setMobilePreview(!mobilePreview)
  }

  const getSectionIcon = (section) => {
    switch (section) {
      case "personal":
        return <User className="h-5 w-5" />
      case "education":
        return <GraduationCap className="h-5 w-5" />
      case "experience":
        return <Briefcase className="h-5 w-5" />
      case "skills":
        return <Lightbulb className="h-5 w-5" />
      case "projects":
        return <FolderKanban className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  const getSectionTitle = (section) => {
    switch (section) {
      case "personal":
        return "Personal Information"
      case "education":
        return "Education"
      case "experience":
        return "Work Experience"
      case "skills":
        return "Skills"
      case "projects":
        return "Projects"
      default:
        return "Personal Information"
    }
  }

  const renderActiveForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm data={resumeData.personal} updateData={(data) => updateResumeData("personal", data)} />
      case "education":
        return <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
      case "experience":
        return (
          <ExperienceForm data={resumeData.experience} updateData={(data) => updateResumeData("experience", data)} />
        )
      case "skills":
        return <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
      case "projects":
        return <ProjectsForm data={resumeData.projects} updateData={(data) => updateResumeData("projects", data)} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link href="/templates">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
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
            <div className="flex flex-wrap items-center gap-2">
              {isMobile && (
                <Button
                  variant="outline"
                  onClick={toggleMobilePreview}
                  className="flex items-center gap-2 rounded-full"
                >
                  <Smartphone className="h-4 w-4" />
                  {mobilePreview ? "Hide Preview" : "Preview & Download"}
                </Button>
              )}
              {!isMobile && (
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 rounded-full"
                >
                  {showPreview ? (
                    <>
                      <PanelLeftClose className="h-4 w-4" /> Hide Preview
                    </>
                  ) : (
                    <>
                      <PanelLeft className="h-4 w-4" /> Show Preview
                    </>
                  )}
                </Button>
              )}
              <TemplateSelector activeTemplate={template} onTemplateChange={setTemplate} />
             
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Preview (Full Screen) */}
      {isMobile && mobilePreview && (
        <div className="fixed inset-0 z-50 bg-white p-4 overflow-auto">
          <div className="sticky top-0 z-10 flex justify-between items-center bg-white pb-4 mb-4 border-b">
            <h2 className="text-xl font-bold">Resume Preview</h2>
            <Button variant="outline" onClick={toggleMobilePreview} className="rounded-full">
              Close Preview
            </Button>
          </div>
          <div className="scale-[0.85] origin-top">
            <ResumePreview data={resumeData} template={template} />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8 hidden md:block">
          <div className="flex items-center justify-between">
            {["personal", "education", "experience", "skills", "projects"].map((section, index) => (
              <div
                key={section}
                className="flex flex-col items-center"
                onClick={() => setActiveSection(section)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    activeSection === section
                      ? "bg-blue-600 text-white"
                      : index < ["personal", "education", "experience", "skills", "projects"].indexOf(activeSection)
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                  } transition-all duration-200 cursor-pointer hover:bg-blue-500 hover:text-white`}
                >
                  {getSectionIcon(section)}
                </div>
                <div
                  className={`mt-2 text-xs font-medium ${
                    activeSection === section ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {getSectionTitle(section)}
                </div>
                {index < 4 && (
                  <div
                    className={`mt-2 h-1 w-16 ${
                      index < ["personal", "education", "experience", "skills", "projects"].indexOf(activeSection)
                        ? "bg-blue-400"
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-5">
          <div className={showPreview && !isMobile ? "xl:col-span-2" : "xl:col-span-5"}>
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                      {getSectionIcon(activeSection)}
                    </div>
                    <h2 className="text-xl font-bold text-white">{getSectionTitle(activeSection)}</h2>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    Step {["personal", "education", "experience", "skills", "projects"].indexOf(activeSection) + 1} of 5
                  </Badge>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="p-6">{renderActiveForm()}</div>

                <div className="border-t bg-gray-50 px-6 py-4">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={activeSection === "personal"}
                      className="flex items-center gap-2 rounded-full"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={activeSection === "projects"}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-full"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {showPreview && !isMobile && (
            <div className="xl:col-span-3">
              <Card className="sticky top-24 border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                        <LayoutTemplate className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-bold text-white">Resume Preview</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <TemplateSelector activeTemplate={template} onTemplateChange={setTemplate} />
                      <Button
                        variant="outline"
                        onClick={handleExportPDF}
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-full"
                      >
                        <Download className="h-4 w-4 mr-2" /> Export
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="bg-gray-100 p-6 max-h-[800px] overflow-auto">
                    <div className="rounded-lg border overflow-hidden shadow-xl bg-white">
                      <ResumePreview data={resumeData} template={template} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 rounded-xl bg-white p-6 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Resume Building Tips</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-800">Keep it concise</h3>
              <p className="text-sm text-gray-600">
                Aim for a one-page resume unless you have extensive relevant experience.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-800">Use action verbs</h3>
              <p className="text-sm text-gray-600">
                Start bullet points with strong action verbs like "achieved," "implemented," or "managed."
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-800">Quantify achievements</h3>
              <p className="text-sm text-gray-600">
                Include numbers and percentages to demonstrate the impact of your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
