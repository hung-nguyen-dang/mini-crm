'use client'

import { useState } from 'react'
import { PlusIcon, EllipsisIcon } from 'lucide-react'
import Link from 'next/link'
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.length
              ? customers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer">
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.active ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>{dateTimeFormat(new Date(customer.last_contacted))}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon className="cursor-pointer transition-all hover:bg-accent" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <Link href={`/customers/${customer.id}`}>
                            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total: {customers?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}

export default CustomerTable
