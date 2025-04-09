import PrivateRoute from '@/components/private-route'
import UserTable from '@/app/user-table'

export default async function Dashboard() {
  return (
    <PrivateRoute>
      Dashboard <UserTable />
    </PrivateRoute>
  )
}
