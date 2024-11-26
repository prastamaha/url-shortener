import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DeleteURL() {
  const [id, setId] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete?id=${id}`, {
        method: "DELETE"
      })
      const data = await response.json()
      setMessage(data.message || "URL deleted successfully")
    } catch (error) {
      console.error("Error deleting URL:", error)
      setMessage("Error deleting URL")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete URL</CardTitle>
        <CardDescription>Delete an existing shortened URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id">Short URL ID</Label>
              <Input id="id" placeholder="Enter short URL ID" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" onClick={handleSubmit}>Delete</Button>
        {message && <span>{message}</span>}
      </CardFooter>
    </Card>
  )
}

