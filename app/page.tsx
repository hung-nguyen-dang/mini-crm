import PrivateRoute from '@/components/private-route'
import CustomerTable from '@/components/customer-table'

export default async function Dashboard() {
  return (
    <PrivateRoute>
      <CustomerTable />
    </PrivateRoute>
  )
}
