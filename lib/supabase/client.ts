import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function fetchCustomers(filter: string) {
  const { data } = await supabase
    .from('customers')
    .select('*')
    .or(`name.ilike.%${filter}%, email.ilike.%${filter}%`)
  return data as Array<Customer>
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
