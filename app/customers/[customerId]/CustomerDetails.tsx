'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchCustomerById } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import DatePickerField from '@/components/date-picker'
import { z } from 'zod'

const customerSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter a name.',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  active: z.boolean(),
  last_contacted: z.date(),
})

export default function CustomerDetails() {
  const { customerId } = useParams<{ customerId: string }>()

  const { data } = useQuery({
    queryKey: ['customerDetails', customerId],
    queryFn: () => fetchCustomerById(customerId),
  })

  if (!data) {
    return 'Not Found'
  }

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data[0].name || '',
      email: data[0].email || '',
      active: data[0].active || false,
      last_contacted: new Date(data[0].last_contacted) || undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    try {
      console.log(values)
      // Call your update function here
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="max-w-[352px] flex flex-col gap-8">
      <h1>Customer Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            render={({ field }) => (
              <FormItem className="flex gap-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="name"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className="flex gap-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="email"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className="flex gap-4">
                <FormLabel>Last contacted</FormLabel>
                <FormControl>
                  <DatePickerField
                    triggerClassName="flex-1"
                    onSelect={field.onChange}
                    date={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="last_contacted"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className="flex gap-4">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Checkbox
                    className="cursor-pointer"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="active"
            control={form.control}
          />

          <Button>Save</Button>
        </form>
      </Form>
    </div>
  )
}
