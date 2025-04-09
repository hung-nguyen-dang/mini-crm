import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import PrivateRoute from '@/components/private-route'
import CustomerDetails from '@/app/customers/[customerId]/customer-details'
import { getQueryClient } from '@/lib/react-query'
import { fetchCustomerById } from '@/lib/supabase/client'

export default async function Page({ params }: { params: Promise<{ customerId: string }> }) {
  const { customerId } = await params
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['customerDetails', customerId],
    queryFn: () => fetchCustomerById(customerId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PrivateRoute>
        <CustomerDetails />
      </PrivateRoute>
    </HydrationBoundary>
  )
}
