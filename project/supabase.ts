import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          title: string
          description: string
          image: string
          category: string
          date: string
          technologies: string[]
          details: string
          price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description: string
          image: string
          category: string
          date: string
          technologies: string[]
          details: string
          price?: number | null
        }
        Update: {
          title?: string
          description?: string
          image?: string
          category?: string
          date?: string
          technologies?: string[]
          details?: string
          price?: number | null
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          project_id: number
          status: string
          message: string
          created_at: string
        }
        Insert: {
          user_id: string
          project_id: number
          status?: string
          message: string
        }
        Update: {
          status?: string
        }
      }
    }
  }
}