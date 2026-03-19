export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseProjectsBucket = process.env.NEXT_PUBLIC_SUPABASE_PROJECTS_BUCKET || "project-images";

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
export const hasSupabaseServiceRole = Boolean(supabaseUrl && supabaseServiceRoleKey);
