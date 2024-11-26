import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface URL {
  id: string
  original_url: string
  short_url: string
}

export function ListURLs() {
  const [urls, setUrls] = useState<URL[]>([])

  const fetchUrls = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/urls`)
      const data = await response.json()
      const urls = data.results
      setUrls(urls)
    } catch (error) {
      console.error("Error fetching URLs:", error)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>List All URLs</CardTitle>
        <CardDescription>View all shortened URLs in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>{url.id}</TableCell>
                <TableCell>
                  <a href={url.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {url.original_url}
                  </a>
                </TableCell>
                <TableCell>
                  <a href={url.short_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {url.short_url}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button onClick={fetchUrls}>Refresh</Button>
        </div>
      </CardContent>
    </Card>
  )
}

