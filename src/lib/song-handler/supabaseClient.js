import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sxbffejgjbmumzydpozl.supabase.co'
const supabasePublishableKey = 'sb_publishable_p3rhol9aS_8p2BsSUvgiTg_BL02c2lV'

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
)
