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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_comments: {
        Row: {
          body: string
          commenter_email: string | null
          commenter_name: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          body: string
          commenter_email?: string | null
          commenter_name: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          body?: string
          commenter_email?: string | null
          commenter_name?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_tags: {
        Row: {
          id: string
          post_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          post_id: string
          tag_id: string
        }
        Update: {
          id?: string
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_display_name: string | null
          author_id: string
          canonical_url: string | null
          category: string | null
          content: string
          content_blocks: Json | null
          created_at: string
          excerpt: string | null
          featured_image_media_id: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          noindex: boolean | null
          og_image_media_id: string | null
          published_at: string | null
          quote_author: string | null
          quote_text: string | null
          secondary_content: string | null
          secondary_image_media_id: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_display_name?: string | null
          author_id: string
          canonical_url?: string | null
          category?: string | null
          content: string
          content_blocks?: Json | null
          created_at?: string
          excerpt?: string | null
          featured_image_media_id?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_image_media_id?: string | null
          published_at?: string | null
          quote_author?: string | null
          quote_text?: string | null
          secondary_content?: string | null
          secondary_image_media_id?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_display_name?: string | null
          author_id?: string
          canonical_url?: string | null
          category?: string | null
          content?: string
          content_blocks?: Json | null
          created_at?: string
          excerpt?: string | null
          featured_image_media_id?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_image_media_id?: string | null
          published_at?: string | null
          quote_author?: string | null
          quote_text?: string | null
          secondary_content?: string | null
          secondary_image_media_id?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_featured_image_media_id_fkey"
            columns: ["featured_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_og_image_media_id_fkey"
            columns: ["og_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_secondary_image_media_id_fkey"
            columns: ["secondary_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      global_blocks: {
        Row: {
          block_key: string
          data: Json | null
          id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          block_key: string
          data?: Json | null
          id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          block_key?: string
          data?: Json | null
          id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      homepage_settings: {
        Row: {
          data: Json
          id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          data?: Json
          id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          data?: Json
          id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          notes: string | null
          source: string
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          source?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number
          file_type: string
          filename: string
          id: string
          public_url: string
          storage_path: string
          title: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size: number
          file_type: string
          filename: string
          id?: string
          public_url: string
          storage_path: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number
          file_type?: string
          filename?: string
          id?: string
          public_url?: string
          storage_path?: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string
        }
        Relationships: []
      }
      page_settings: {
        Row: {
          data: Json | null
          id: string
          page_slug: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          data?: Json | null
          id?: string
          page_slug: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          page_slug?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          canonical_url: string | null
          created_at: string
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          noindex: boolean | null
          og_image_media_id: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_image_media_id?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          og_image_media_id?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_og_image_media_id_fkey"
            columns: ["og_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      project_process_steps: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_media_id: string | null
          project_id: string
          step_number: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_media_id?: string | null
          project_id: string
          step_number: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_media_id?: string | null
          project_id?: string
          step_number?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_process_steps_image_media_id_fkey"
            columns: ["image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_process_steps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string
          check_launch_content: string | null
          check_launch_image_media_id: string | null
          client: string | null
          created_at: string
          description: string | null
          display_order: number | null
          end_date: string | null
          featured_image_media_id: string | null
          heading: string
          id: string
          image_media_id: string | null
          is_featured: boolean
          slug: string
          start_date: string | null
          status: string
          title: string
          updated_at: string
          website: string | null
        }
        Insert: {
          category: string
          check_launch_content?: string | null
          check_launch_image_media_id?: string | null
          client?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          featured_image_media_id?: string | null
          heading: string
          id?: string
          image_media_id?: string | null
          is_featured?: boolean
          slug: string
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          category?: string
          check_launch_content?: string | null
          check_launch_image_media_id?: string | null
          client?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          featured_image_media_id?: string | null
          heading?: string
          id?: string
          image_media_id?: string | null
          is_featured?: boolean
          slug?: string
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_check_launch_image_media_id_fkey"
            columns: ["check_launch_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_featured_image_media_id_fkey"
            columns: ["featured_image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_image_media_id_fkey"
            columns: ["image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      service_pricing_plans: {
        Row: {
          billing_period: string
          created_at: string
          cta_label: string
          currency: string
          display_order: number
          features: Json
          id: string
          plan_name: string
          plan_subtitle: string | null
          price_amount: number
          service_id: string
          status: string
          updated_at: string
        }
        Insert: {
          billing_period: string
          created_at?: string
          cta_label?: string
          currency?: string
          display_order?: number
          features?: Json
          id?: string
          plan_name: string
          plan_subtitle?: string | null
          price_amount: number
          service_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          billing_period?: string
          created_at?: string
          cta_label?: string
          currency?: string
          display_order?: number
          features?: Json
          id?: string
          plan_name?: string
          plan_subtitle?: string | null
          price_amount?: number
          service_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_pricing_plans_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_process_steps: {
        Row: {
          created_at: string
          description: string
          id: string
          image_media_id: string | null
          service_id: string
          step_number: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image_media_id?: string | null
          service_id: string
          step_number: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_media_id?: string | null
          service_id?: string
          step_number?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_process_steps_image_media_id_fkey"
            columns: ["image_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_process_steps_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          display_order: number
          full_description: string | null
          icon_media_id: string | null
          id: string
          pricing_monthly_enabled: boolean
          pricing_yearly_enabled: boolean
          short_description: string
          show_pricing: boolean
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          full_description?: string | null
          icon_media_id?: string | null
          id?: string
          pricing_monthly_enabled?: boolean
          pricing_yearly_enabled?: boolean
          short_description: string
          show_pricing?: boolean
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          full_description?: string | null
          icon_media_id?: string | null
          id?: string
          pricing_monthly_enabled?: boolean
          pricing_yearly_enabled?: boolean
          short_description?: string
          show_pricing?: boolean
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_icon_media_id_fkey"
            columns: ["icon_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          author_title: string | null
          avatar_media_id: string | null
          company: string | null
          created_at: string
          display_order: number | null
          featured: boolean
          id: string
          published_at: string | null
          quote: string
          rating: number | null
          status: string
          updated_at: string
        }
        Insert: {
          author_name: string
          author_title?: string | null
          avatar_media_id?: string | null
          company?: string | null
          created_at?: string
          display_order?: number | null
          featured?: boolean
          id?: string
          published_at?: string | null
          quote: string
          rating?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_title?: string | null
          avatar_media_id?: string | null
          company?: string | null
          created_at?: string
          display_order?: number | null
          featured?: boolean
          id?: string
          published_at?: string | null
          quote?: string
          rating?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_avatar_media_id_fkey"
            columns: ["avatar_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
