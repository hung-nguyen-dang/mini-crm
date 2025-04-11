'use client'

import { useState, useEffect } from 'react'
import {
  PlusIcon,
  RefreshCwIcon,
  Loader2,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
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
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 5

export default function CustomerTable() {
  const [filter, setFilter] = useState<string>('')
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  const {
    data: { customers, total } = { customers: [], total: 0 },
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['customers', filter, page],
    queryFn: () => fetchCustomers(filter, { page, pageSize: PAGE_SIZE }),
  })

  useEffect(() => {
    setTotalPages(Math.ceil((total || 0) / PAGE_SIZE))
  }, [total])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <DebouncedInput onFilter={setFilter} delay={500} placeholder="filter by Name / Email" />

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
                    <TableCell>
                      {customer.active ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(customer.last_contacted), 'MMMM do, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" className="cursor-pointer">
                        <Link href={`/customers/${customer.id}`}>
                          <EditIcon>Edit</EditIcon>
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex gap-4 items-center">
                  <Button
                    variant="outline"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page <= 1}
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page >= totalPages}
                  >
                    <ChevronRightIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}
