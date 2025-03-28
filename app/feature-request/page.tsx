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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this to your backend
    console.log(values)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">



      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center min-h-screen space-y-4 w-full">
          <h1 className="text-2xl font-bold mb-2">Submit a Feature Request</h1>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Feature Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter feature title" {...field} />
                </FormControl>
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

          <Button type="submit">Submit Request</Button>
        </form>
      </Form>
    </div>
  )
}
