"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ResultDisplayProps {
  result: string
  type: string
}

export default function ResultDisplay({ result, type }: ResultDisplayProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold dark:text-white">Result</h2>
        <Button variant="outline" onClick={copyToClipboard}>
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </div>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm dark:text-gray-300">
        {type === "extract" ? JSON.stringify(JSON.parse(result), null, 2) : result}
      </pre>
    </div>
  )
}

