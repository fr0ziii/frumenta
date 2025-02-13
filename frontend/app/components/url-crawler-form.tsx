"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "lucide-react"
import ResultDisplay from "./result-display"

export default function UrlCrawlerForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("scrape")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    const apiUrl = activeTab === "scrape" ? "/scrape" : "/crawl";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, depth: 2 }),
      });

      if (!response.ok) {
        throw new Error("Failed to process URL");
      }

      const data = await response.json();
      setResult(JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="scrape" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100/80 dark:bg-gray-800/80 p-1 h-auto">
          <TabsTrigger value="scrape" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Single URL <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">/scrape</span>
          </TabsTrigger>
          <TabsTrigger value="crawl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Crawl <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">/crawl</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Map <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">/map</span>
          </TabsTrigger>
          <TabsTrigger value="extract" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            Extract <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">/extract</span>
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded">
              Beta
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">URL</label>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://docs.frumenta.dev"
              required
              className="flex-grow dark:bg-gray-800 dark:text-white"
            />
            <Button
              variant="outline"
              className="flex items-center gap-2 dark:text-gray-300 dark:border-gray-600"
            >
              <Code className="h-4 w-4" />
              Get Code
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90"
            >
              {isLoading ? "Processing..." : "Run"}
            </Button>
          </form>
        </div>

        <div>
          <Button
            variant="ghost"
            className="text-sm text-gray-600 px-0 hover:bg-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => {}}
          >
            Options
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path d="M6 8.5L2 4.5H10L6 8.5Z" fill="currentColor" />
            </svg>
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
      {!result && !error && !isLoading && (
        <div className="text-gray-500 dark:text-gray-400 text-sm mt-8">Start exploring with our playground!</div>
      )}
      {result && <ResultDisplay result={result} type={activeTab} />}
    </div>
  )
}
