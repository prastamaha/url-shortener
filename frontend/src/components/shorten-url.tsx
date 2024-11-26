import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ShortenURL() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: url }),
      })
      const data = await response.json()
      setShortUrl(data.short_url)
    } catch (error) {
      console.error("Error shortening URL:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shorten URL</CardTitle>
        <CardDescription>Enter a long URL to get a shortened version.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="Enter your URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" onClick={handleSubmit}>Shorten</Button>
        {shortUrl && (
          <div className="flex items-center space-x-2">
            <span>Shortened URL:</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {shortUrl}
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

