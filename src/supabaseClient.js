// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// URL: https://ndrtrwgxnyjwmkiqtjwc.supabase.co
// Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcnRyd2d4bnlqd21raXF0andjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTg1MDksImV4cCI6MjA5Nzg3NDUwOX0.40XSSphhipH2bfEm695-WjyXqxYoEUjXWhv2rcxg6Yk
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ndrtrwgxnyjwmkiqtjwc.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcnRyd2d4bnlqd21raXF0andjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTg1MDksImV4cCI6MjA5Nzg3NDUwOX0.40XSSphhipH2bfEm695-WjyXqxYoEUjXWhv2rcxg6Yk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);