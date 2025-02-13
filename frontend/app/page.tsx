import { GrapeIcon as Grain } from "lucide-react"
import UrlCrawlerForm from "./components/url-crawler-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Grain className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl text-foreground">Frumenta</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Playground
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1 text-foreground">Preview</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Take a look at the API response (Preview limited to 5 pages)
          </p>
          <UrlCrawlerForm />
        </div>
      </main>
    </div>
  )
}

