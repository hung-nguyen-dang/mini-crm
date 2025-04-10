import CustomerDetails from '@/app/customers/customer-details'
import PrivateRoute from '@/components/private-route'

export default function Page() {
  return (
    <PrivateRoute>
      <CustomerDetails />
    </PrivateRoute>
  )
}
