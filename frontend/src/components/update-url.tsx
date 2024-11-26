import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function UpdateURL() {
  const [id, setId] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, original_url: newUrl }),
      })
      const data = await response.json()
      setMessage(data.message || "URL updated successfully")
    } catch (error) {
      console.error("Error updating URL:", error)
      setMessage("Error updating URL")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update URL</CardTitle>
        <CardDescription>Update an existing shortened URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id">Short URL ID</Label>
              <Input id="id" placeholder="Enter short URL ID" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newUrl">New URL</Label>
              <Input id="newUrl" placeholder="Enter new URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" onClick={handleSubmit}>Update</Button>
        {message && <span>{message}</span>}
      </CardFooter>
    </Card>
  )
}

