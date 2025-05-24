import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

export const metadata = {
  title: "ResumeForU | Professional Resume Builder",
  description: "Create professional resumes easily with ResumeForU",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzI1NjNlYiIvPgo8cGF0aCBkPSJNOCA4aDE2djJIOHptMCA0aDE2djJIOHptMCA0aDEydjJIOHptMCA0aDh2Mkg4eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
    shortcut:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzI1NjNlYiIvPgo8cGF0aCBkPSJNOCA4aDEydjJIOHptMCA0aDEydjJIOHptMCA0aDEydjJIOHptMCA0aDh2Mkg4eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+",
  },
   
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
