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
