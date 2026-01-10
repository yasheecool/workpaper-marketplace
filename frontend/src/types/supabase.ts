export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      firm: {
        Row: {
          created_at: string
          id: string
          logo: string | null
          name: string
          short_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo?: string | null
          name: string
          short_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo?: string | null
          name?: string
          short_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      firm_user: {
        Row: {
          created_at: string
          firm_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          firm_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          firm_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "firm_users_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "firm_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      installed_listing: {
        Row: {
          created_at: string
          id: string
          installed_by_firm: string
          installed_by_user: string
          listing_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          installed_by_firm: string
          installed_by_user: string
          listing_id: string
        }
        Update: {
          created_at?: string
          id?: string
          installed_by_firm?: string
          installed_by_user?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installed_listing_installed_by_firm_fkey"
            columns: ["installed_by_firm"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installed_listing_installed_by_user_fkey"
            columns: ["installed_by_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installed_listing_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listing"
            referencedColumns: ["id"]
          },
        ]
      }
      listing: {
        Row: {
          content_type: Database["public"]["Enums"]["listing_type"]
          created_at: string
          created_by_user: string
          description: string
          entity_type: Database["public"]["Enums"]["entity_type"][]
          getting_started_steps: string | null
          id: string
          images_link: string[] | null
          long_description: string | null
          name: string
          owned_by_firm: string
          region: Database["public"]["Enums"]["region"]
          status: Database["public"]["Enums"]["listing_status"]
          updated_at: string
          updated_by_user: string
          visibility: Database["public"]["Enums"]["listing_visibility"]
          workpaper_type: Database["public"]["Enums"]["workpaper_type"][]
        }
        Insert: {
          content_type: Database["public"]["Enums"]["listing_type"]
          created_at?: string
          created_by_user: string
          description: string
          entity_type: Database["public"]["Enums"]["entity_type"][]
          getting_started_steps?: string | null
          id?: string
          images_link?: string[] | null
          long_description?: string | null
          name: string
          owned_by_firm: string
          region?: Database["public"]["Enums"]["region"]
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
          updated_by_user: string
          visibility?: Database["public"]["Enums"]["listing_visibility"]
          workpaper_type: Database["public"]["Enums"]["workpaper_type"][]
        }
        Update: {
          content_type?: Database["public"]["Enums"]["listing_type"]
          created_at?: string
          created_by_user?: string
          description?: string
          entity_type?: Database["public"]["Enums"]["entity_type"][]
          getting_started_steps?: string | null
          id?: string
          images_link?: string[] | null
          long_description?: string | null
          name?: string
          owned_by_firm?: string
          region?: Database["public"]["Enums"]["region"]
          status?: Database["public"]["Enums"]["listing_status"]
          updated_at?: string
          updated_by_user?: string
          visibility?: Database["public"]["Enums"]["listing_visibility"]
          workpaper_type?: Database["public"]["Enums"]["workpaper_type"][]
        }
        Relationships: [
          {
            foreignKeyName: "listing_created_by_user_fkey"
            columns: ["created_by_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_owned_by_firm_fkey"
            columns: ["owned_by_firm"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_updated_by_user_fkey"
            columns: ["updated_by_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_access_control: {
        Row: {
          actioned_at: string | null
          actioned_by_user_id: string | null
          created_at: string
          id: string
          listing: string
          request_status: Database["public"]["Enums"]["request_status"]
          requested_by_firm: string
          requested_by_user: string
        }
        Insert: {
          actioned_at?: string | null
          actioned_by_user_id?: string | null
          created_at?: string
          id?: string
          listing: string
          request_status?: Database["public"]["Enums"]["request_status"]
          requested_by_firm: string
          requested_by_user: string
        }
        Update: {
          actioned_at?: string | null
          actioned_by_user_id?: string | null
          created_at?: string
          id?: string
          listing?: string
          request_status?: Database["public"]["Enums"]["request_status"]
          requested_by_firm?: string
          requested_by_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_access_control_listing_id_fkey"
            columns: ["listing"]
            isOneToOne: false
            referencedRelation: "listing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_access_control_requested_by_firm_id_fkey"
            columns: ["requested_by_firm"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_access_control_requested_by_user_id_fkey"
            columns: ["requested_by_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_listing: {
        Row: {
          created_at: string
          id: string
          listing: string
          saved_by_firm: string
          saved_by_user: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing: string
          saved_by_firm: string
          saved_by_user: string
        }
        Update: {
          created_at?: string
          id?: string
          listing?: string
          saved_by_firm?: string
          saved_by_user?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_listing_listing_id_fkey"
            columns: ["listing"]
            isOneToOne: false
            referencedRelation: "listing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_listing_saved_by_firm_fkey"
            columns: ["saved_by_firm"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_listing_saved_by_user_fkey"
            columns: ["saved_by_user"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          is_admin: boolean
          last_name: string
          profile_image: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          is_admin?: boolean
          last_name: string
          profile_image?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          is_admin?: boolean
          last_name?: string
          profile_image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vendor_profile: {
        Row: {
          created_at: string
          description: string
          firm_email: string
          firm_id: string
          firm_logo: string | null
          id: string
          status: Database["public"]["Enums"]["vendor_status"]
          vendor_since: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description: string
          firm_email: string
          firm_id: string
          firm_logo?: string | null
          id?: string
          status?: Database["public"]["Enums"]["vendor_status"]
          vendor_since?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          firm_email?: string
          firm_id?: string
          firm_logo?: string | null
          id?: string
          status?: Database["public"]["Enums"]["vendor_status"]
          vendor_since?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_profile_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: true
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_request: {
        Row: {
          actioned_at: string | null
          actioned_by: string | null
          created_at: string
          id: string
          request_status: Database["public"]["Enums"]["request_status"]
          requesting_firm_id: string
          requesting_user_id: string
          vendor_contact_email: string
          vendor_contact_phone: string
        }
        Insert: {
          actioned_at?: string | null
          actioned_by?: string | null
          created_at?: string
          id?: string
          request_status?: Database["public"]["Enums"]["request_status"]
          requesting_firm_id: string
          requesting_user_id: string
          vendor_contact_email: string
          vendor_contact_phone: string
        }
        Update: {
          actioned_at?: string | null
          actioned_by?: string | null
          created_at?: string
          id?: string
          request_status?: Database["public"]["Enums"]["request_status"]
          requesting_firm_id?: string
          requesting_user_id?: string
          vendor_contact_email?: string
          vendor_contact_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_request_actioned_by_fkey"
            columns: ["actioned_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_request_requesting_firm_id_fkey"
            columns: ["requesting_firm_id"]
            isOneToOne: false
            referencedRelation: "firm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_request_requesting_user_id_fkey"
            columns: ["requesting_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
    }
    Enums: {
      entity_type: "company" | "individual" | "partnership" | "trust"
      listing_status: "active" | "deleted"
      listing_type:
        | "calculation"
        | "checklist"
        | "report"
        | "procedure"
        | "wiki"
      listing_visibility: "public" | "request_access"
      region: "australia" | "newZealand" | "unitedKingdom" | "republicOfIreland"
      request_status: "pending" | "approved" | "rejected"
      vendor_status: "active" | "blocked"
      workpaper_type: "compliance" | "itr" | "bas" | "taxPlanning" | "fbt"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      entity_type: ["company", "individual", "partnership", "trust"],
      listing_status: ["active", "deleted"],
      listing_type: ["calculation", "checklist", "report", "procedure", "wiki"],
      listing_visibility: ["public", "request_access"],
      region: ["australia", "newZealand", "unitedKingdom", "republicOfIreland"],
      request_status: ["pending", "approved", "rejected"],
      vendor_status: ["active", "blocked"],
      workpaper_type: ["compliance", "itr", "bas", "taxPlanning", "fbt"],
    },
  },
} as const
