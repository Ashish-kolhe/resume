"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { ModernTemplate } from "./resume-templates/modern-template"
import { MinimalTemplate } from "./resume-templates/minimal-template"
import { ProfessionalTemplate } from "./resume-templates/professional-template"
import { CreativeTemplate } from "./resume-templates/creative-template"
import { ExecutiveTemplate } from "./resume-templates/executive-template"
import { TechnicalTemplate } from "./resume-templates/technical-template"
import { CompactTemplate } from "./resume-templates/compact-template"
import { AcademicTemplate } from "./resume-templates/academic-template"

export function ResumePreview({ data, template = "modern" }) {
  const resumeRef = useRef(null)

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
      pdf.save(`${data.personal.name || "resume"}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating your PDF. Please try again.")
    }
  }

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalTemplate data={data} />
      case "professional":
        return <ProfessionalTemplate data={data} />
      case "creative":
        return <CreativeTemplate data={data} />
      case "executive":
        return <ExecutiveTemplate data={data} />
      case "technical":
        return <TechnicalTemplate data={data} />
      case "compact":
        return <CompactTemplate data={data} />
      case "academic":
        return <AcademicTemplate data={data} />
      case "modern":
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="absolute right-2 top-2 z-10 flex items-center gap-1 bg-white shadow-md resume-preview-download-button"
      >
        <Download className="h-4 w-4" /> Download
      </Button>

      <div className="mx-auto bg-white shadow-lg" style={{ maxWidth: "800px" }}>
        <div ref={resumeRef} className="mx-auto bg-white">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}
