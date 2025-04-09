'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '@/lib/supabase/client'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DebouncedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { dateTimeFormat } from '@/lib/utils'

function CustomerTable() {
  const [filter, setFilter] = useState<string>('')

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers', filter],
    queryFn: () => fetchCustomers(filter),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <DebouncedInput onFilter={setFilter} delay={500} placeholder="filter by name / email" />

        <Button startDecorator={<PlusIcon />}>Add customer</Button>
      </div>

      {isLoading ? (
        <p>is loading</p>
      ) : (
        <Table hidden={isLoading}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contacted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.length
              ? customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.active ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>{dateTimeFormat(new Date(customer.last_contacted))}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total: {customers?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}

export default CustomerTable
