'use client'

import { useState } from 'react'
import { PlusIcon, EllipsisIcon, RefreshCwIcon, Loader2 } from 'lucide-react'
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
import { cn, dateTimeFormat } from '@/lib/utils'

function CustomerTable() {
  const [filter, setFilter] = useState<string>('')

  const {
    data: customers,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['customers', filter],
    queryFn: () => fetchCustomers(filter),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <DebouncedInput onFilter={setFilter} delay={500} placeholder="filter by name / email" />

        <Link href="/customers/new">
          <Button startDecorator={<PlusIcon />}>Add customer</Button>
        </Link>
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Table hidden={isLoading}>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => refetch()}>
                  <RefreshCwIcon
                    className={cn({
                      'animate-spin': isFetching,
                    })}
                  />
                </Button>
              </TableHead>
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
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <EllipsisIcon className="cursor-pointer transition-all hover:bg-accent" />
                          </Button>
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
