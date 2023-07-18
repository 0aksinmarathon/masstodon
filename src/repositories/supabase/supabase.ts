import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmlavbfoeebojpbvxhcg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log(supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey ?? '');
