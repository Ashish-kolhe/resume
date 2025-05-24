import { Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} ResumeForU. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by Ashish
        </div>
      </div>
    </footer>
  )
}
