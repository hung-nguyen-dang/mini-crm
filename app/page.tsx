import PrivateRoute from '@/components/private-route'
import CustomerTable from '@/app/customer-table'

export default async function Dashboard() {
  return (
    <PrivateRoute>
      <CustomerTable />
    </PrivateRoute>
  )
}
