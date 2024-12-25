export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          status: string
          last_seen: string
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          status?: string
          last_seen?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          status?: string
          last_seen?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          profile_id: string
          content: string
          created_at: string
          is_edited: boolean
        }
        Insert: {
          id?: string
          chat_id: string
          profile_id: string
          content: string
          created_at?: string
          is_edited?: boolean
        }
        Update: {
          id?: string
          chat_id?: string
          profile_id?: string
          content?: string
          created_at?: string
          is_edited?: boolean
        }
      }
    }
  }
}