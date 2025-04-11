'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  fetchCustomerById,
  updateCustomerById,
  UpdateCustomerInput,
  addCustomers,
  AddCustomerInput,
} from '@/lib/supabase/client'
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
import { getQueryClient } from '@/lib/react-query'

const customerSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter a name',
  }),
  email: z.string().email({ message: 'Invalid email address' }),
  active: z.boolean(),
  last_contacted: z.date(),
})

export default function CustomerDetails() {
  const queryClient = getQueryClient()
  const { customerId } = useParams<{ customerId: string }>()
  const queryKey = ['customerDetails', customerId]

  const { data } = useQuery({
    queryKey,
    queryFn: () => fetchCustomerById(customerId),
    enabled: !!customerId,
  })

  const { mutate: updateCustomer, isPending: isUpdatingCustomer } = useMutation({
    mutationFn: (customer: UpdateCustomerInput) => updateCustomerById(customer),
    onSuccess: () => {
      toast.success('Edited customer successfully')
      queryClient.invalidateQueries({ queryKey }).then(() => {
        if (data && data.length) {
          form.reset({
            name: data[0].name,
            email: data[0].email,
            active: data[0].active,
            last_contacted: new Date(data[0].last_contacted),
          })
        }
      })
    },
  })

  const { mutate: addCustomer, isPending: isAddingCustomer } = useMutation({
    mutationFn: (customer: AddCustomerInput) => addCustomers([customer]),
    onSuccess: () => {
      toast.success('Added customer successfully')
      queryClient.invalidateQueries({ queryKey }).then(() => {
        form.reset({ name: '', email: '', active: false, last_contacted: new Date() })
      })
    },
  })

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      active: false,
      last_contacted: new Date(),
    },
  })

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    try {
      if (!!customerId && data) {
        /**
         * Edit mode
         */
        updateCustomer({
          ...values,
          id: data[0].id,
          last_contacted: format(values.last_contacted, 'yyyy-MM-dd'),
        })
      } else {
        /**
         * Add mode
         */
        addCustomer({
          ...values,
          last_contacted: format(values.last_contacted, 'yyyy-MM-dd'),
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (data && data.length) {
      form.reset({
        name: data[0].name,
        email: data[0].email,
        active: data[0].active,
        last_contacted: new Date(data[0].last_contacted),
      })
    }
  }, [data, form])

  return (
    <div className="max-w-[352px] flex flex-col gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div />
                <FormMessage />
              </FormItem>
            )}
            name="name"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div />
                <FormMessage />
              </FormItem>
            )}
            name="email"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-2">
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
              <FormItem className="grid grid-cols-[1fr_2fr] grid-rows-[2fr_1fr] gap-2">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Checkbox
                    className="cursor-pointer"
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div />
                <FormMessage />
              </FormItem>
            )}
            name="active"
            control={form.control}
          />

          <Button
            loading={isUpdatingCustomer || isAddingCustomer}
            disabled={!form.formState.isDirty || isUpdatingCustomer || isAddingCustomer}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
