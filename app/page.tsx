import PrivateRoute from '@/components/private-route'
import UserTable from '@/components/user-table'

export default async function Dashboard() {
  return (
    <PrivateRoute>
      <UserTable />
    </PrivateRoute>
  )
}
