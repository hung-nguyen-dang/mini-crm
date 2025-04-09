import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function fetchUsers(filter: string) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .or(`name.ilike.%${filter}%, email.ilike.%${filter}%`)
  return data
}
