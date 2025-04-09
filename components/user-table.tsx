'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/lib/supabase/client'
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

function UserTable() {
  const [filter, setFilter] = useState<string>('')

  const { data: users, isLoading } = useQuery({
    queryKey: ['users', filter],
    queryFn: () => fetchUsers(filter),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <DebouncedInput onFilter={setFilter} delay={500} placeholder="filter by name / email" />

        <Button startDecorator={<PlusIcon />}>Add user</Button>
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
            {users?.length
              ? users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.active ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>{dateTimeFormat(new Date(user.last_contacted))}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total: {users?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}

export default UserTable
