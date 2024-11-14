import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ztkatvhyenxarzbpdszf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0a2F0dmh5ZW54YXJ6YnBkc3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwODgxOTksImV4cCI6MjA0MjY2NDE5OX0.HC5ynICVGSSblAcTrbb2aS9b0Rv1yToi17ZDtBMZ5ZU'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
