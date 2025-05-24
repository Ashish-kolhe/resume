import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Briefcase, Download, Users, Star, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
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
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/samples" className="text-gray-600 hover:text-gray-900 transition-colors">
                Samples
              </Link>
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">
                Templates
              </Link>
              <Link href="/templates">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </nav>
            <Link href="/templates" className="md:hidden">
              <Button variant="outline" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  Professional Resume Builder
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  ResumeForU: <span className="text-blue-600 dark:text-blue-500">Your Career Catalyst</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Build a standout resume that showcases your skills and experience. Get hired faster with our
                  easy-to-use resume builder.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/templates">
                    <Button size="lg" className="gap-1.5 bg-blue-600 hover:bg-blue-700">
                      Start Building <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/samples">
                    <Button variant="outline" size="lg" className="gap-1.5">
                      View Samples <FileText className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="w-full max-w-[350px] rounded-lg bg-white dark:bg-gray-800 shadow-lg p-4">
                        <div className="h-8 w-32 rounded-md bg-blue-600 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                          <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                          <div className="h-4 w-5/6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="h-20 rounded-md bg-gray-100 dark:bg-gray-700"></div>
                          <div className="h-20 rounded-md bg-gray-100 dark:bg-gray-700"></div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Export as PDF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose ResumeForU?</h2>
              <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
                Our resume builder makes it easy to create a professional resume that stands out to employers.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Professional Templates</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose from professionally designed templates that catch the eye of recruiters.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 transition-colors">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our intuitive interface makes building your resume simple and fast.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Get Hired Faster</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stand out from the competition with a professionally crafted resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Trusted by Job Seekers Worldwide
              </h2>
              <p className="text-gray-500 md:text-xl dark:text-gray-400 mb-12">
                Join thousands of professionals who have successfully landed their dream jobs with ResumeForU.
              </p>
            </div>

            <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">82+</span>
                </div>
                <p className="text-gray-600">Resumes Created</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-gray-600">User Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">100%</span>
                </div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900 dark:text-blue-400 mb-4">
                Ready to get started?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create Your Resume Today</h2>
              <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
                Join thousands of job seekers who have created successful resumes with ResumeForU.
              </p>
              <div className="mt-8">
                <Link href="/templates">
                  <Button size="lg" className="gap-1.5 bg-blue-600 hover:bg-blue-700">
                    Build My Resume <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
