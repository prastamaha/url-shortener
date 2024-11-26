'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShortenURL } from "@/components/shorten-url"
import { GetOriginalURL } from "@/components/get-original-url"
import { UpdateURL } from "@/components/update-url"
import { DeleteURL } from "@/components/delete-url"
import { ListURLs } from "@/components/list-urls"

export default function App() {
  const [activeTab, setActiveTab] = useState("shorten")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="shorten">Shorten</TabsTrigger>
        <TabsTrigger value="list">List All</TabsTrigger>
        <TabsTrigger value="original">Get Original</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>
      <TabsContent value="shorten">
        <ShortenURL />
      </TabsContent>
      <TabsContent value="list">
        <ListURLs />
      </TabsContent>
      <TabsContent value="original">
        <GetOriginalURL />
      </TabsContent>
      <TabsContent value="update">
        <UpdateURL />
      </TabsContent>
      <TabsContent value="delete">
        <DeleteURL />
      </TabsContent>
    </Tabs>
  )
}

