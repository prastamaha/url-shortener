import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function GetOriginalURL() {
  const [urlId, setUrlId] = useState("")
  const [originalUrl, setOriginalUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/original?id=${urlId}`)
      const data = await response.json()
      setOriginalUrl(data.original_url)
    } catch (error) {
      console.error("Error getting original URL:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Original URL</CardTitle>
        <CardDescription>Enter a shortened URL to get the original long URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="urlId">Short URL</Label>
              <Input id="urlId" placeholder="Enter url id" value={urlId} onChange={(e) => setUrlId(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" onClick={handleSubmit}>Get Original</Button>
        {originalUrl && (
          <div className="flex items-center space-x-2">
            <span>Original URL:</span>
            <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {originalUrl}
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

