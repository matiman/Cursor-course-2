"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters."
  }).max(50, {
    message: "Title cannot exceed 50 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
  }),
  requestType: z.string().min(1, {
    message: "Request type is required."
  })
})

export default function FeatureRequest() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

  const titleLength = form.watch("title")?.length || 0
  const isNearLimit = titleLength >= 40
  const isAtLimit = titleLength >= 50

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this to your backend
    console.log(values)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value
    if (value.length <= 50) {
      field.onChange(value)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Form {...form}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center min-h-screen space-y-4 w-full">
          <h1 className="text-2xl font-bold mb-2">Submit a Feature Request</h1>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Feature Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter feature title" 
                      {...field}
                      onChange={(e) => handleTitleChange(e, field)}
                      className={isAtLimit ? "border-red-500 focus:ring-red-500" : ""}
                      maxLength={50}
                    />
                    <span className={`absolute right-2 top-2 text-sm ${
                      isAtLimit ? "text-red-500" : 
                      isNearLimit ? "text-yellow-500" : 
                      "text-gray-400"
                    }`}>
                      {titleLength}/50
                    </span>
                  </div>
                </FormControl>
                {isNearLimit && !isAtLimit && (
                  <Alert className="mt-2 bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You're approaching the character limit
                    </AlertDescription>
                  </Alert>
                )}
                {isAtLimit && (
                  <Alert className="mt-2 bg-red-50 text-red-800 border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You've reached the maximum character limit
                    </AlertDescription>
                  </Alert>
                )}
                <FormDescription>
                  A brief title describing your feature request
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            nad
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the feature you'd like to see..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide detailed information about the feature and why it would be valuable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requestType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Request Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a request type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="enhancement">Enhancement</SelectItem>
                    <SelectItem value="bugfix">Bug Fix</SelectItem>
                    <SelectItem value="newFeature">New Feature</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the type of request you are submitting
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit Request</Button>
        </form>
      </Form>
    </div>
  )
}
