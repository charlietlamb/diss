export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      data: {
        Row: {
          age: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          hobby: string | null
          id: string
          message: string
          name: string
          profession: string | null
          type: string
        }
        Insert: {
          age?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          hobby?: string | null
          id?: string
          message?: string
          name?: string
          profession?: string | null
          type?: string
        }
        Update: {
          age?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          hobby?: string | null
          id?: string
          message?: string
          name?: string
          profession?: string | null
          type?: string
        }
        Relationships: []
      }
      loads: {
        Row: {
          cached: boolean | null
          complexity: string
          created_at: string
          fcp: number | null
          id: string
          inp: number | null
          lcp: number | null
          method: string
          render: string
          time: number
        }
        Insert: {
          cached?: boolean | null
          complexity?: string
          created_at?: string
          fcp?: number | null
          id?: string
          inp?: number | null
          lcp?: number | null
          method?: string
          render?: string
          time?: number
        }
        Update: {
          cached?: boolean | null
          complexity?: string
          created_at?: string
          fcp?: number | null
          id?: string
          inp?: number | null
          lcp?: number | null
          method?: string
          render?: string
          time?: number
        }
        Relationships: []
      }
      submissions: {
        Row: {
          cached: boolean
          complexity: string
          created_at: string
          id: string
          render: string
          time: number
        }
        Insert: {
          cached?: boolean
          complexity?: string
          created_at?: string
          id?: string
          render?: string
          time?: number
        }
        Update: {
          cached?: boolean
          complexity?: string
          created_at?: string
          id?: string
          render?: string
          time?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
