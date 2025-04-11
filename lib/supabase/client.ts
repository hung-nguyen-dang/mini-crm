import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ioirtjdjyonsytpaurvn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaXJ0amRqeW9uc3l0cGF1cnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODMyODcsImV4cCI6MjA1OTc1OTI4N30.IEz-0CpsYfHvYBGOdqbSNgEk31yeu8YxnGkp0zp2jSc',
)

export async function fetchCustomers(
  filter: string,
  { page, pageSize }: { page: number; pageSize: number },
) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count } = await supabase
    .from('customers')
    .select('*', { count: 'exact' })
    .or(`name.ilike.%${filter}%, email.ilike.%${filter}%`)
    .range(from, to)

  return { customers: data, total: count } as {
    customers: Array<Customer>
    total: number
  }
}

export async function fetchCustomerById(id: string) {
  const { data } = await supabase.from('customers').select('*').eq('id', id)
  return data as Array<Customer>
}

export type UpdateCustomerInput = Omit<Customer, 'created_at'>

export async function updateCustomerById(customer: UpdateCustomerInput) {
  const { data } = await supabase.from('customers').update(customer).eq('id', customer.id).select()
  return data
}

export type AddCustomerInput = Omit<Customer, 'created_at' | 'id'>

export async function addCustomers(customers: Array<AddCustomerInput>) {
  const { data } = await supabase.from('customers').insert(customers).select()
  return data
}
