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
      client_profiles: {
        Row: {
          business_address: string | null
          company_name: string | null
          company_profile: string | null
          company_registration: string | null
          created_at: string | null
          energy_usage_location: string | null
          id: string
          kra_pin: string | null
          personal_id_details: string | null
          profile_id: string
          representative_email: string | null
          representative_name: string | null
          representative_phone: string | null
          residential_address: string | null
          sector: string | null
          supporting_documents: Json | null
          updated_at: string | null
        }
        Insert: {
          business_address?: string | null
          company_name?: string | null
          company_profile?: string | null
          company_registration?: string | null
          created_at?: string | null
          energy_usage_location?: string | null
          id?: string
          kra_pin?: string | null
          personal_id_details?: string | null
          profile_id: string
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          residential_address?: string | null
          sector?: string | null
          supporting_documents?: Json | null
          updated_at?: string | null
        }
        Update: {
          business_address?: string | null
          company_name?: string | null
          company_profile?: string | null
          company_registration?: string | null
          created_at?: string | null
          energy_usage_location?: string | null
          id?: string
          kra_pin?: string | null
          personal_id_details?: string | null
          profile_id?: string
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          residential_address?: string | null
          sector?: string | null
          supporting_documents?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          energy_request_id: string
          epc_bid_id: string
          external_finalization_date: string | null
          financier_proposal_id: string | null
          id: string
          status: Database["public"]["Enums"]["deal_status"] | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          energy_request_id: string
          epc_bid_id: string
          external_finalization_date?: string | null
          financier_proposal_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          energy_request_id?: string
          epc_bid_id?: string
          external_finalization_date?: string | null
          financier_proposal_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["deal_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_energy_request_id_fkey"
            columns: ["energy_request_id"]
            isOneToOne: false
            referencedRelation: "energy_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_epc_bid_id_fkey"
            columns: ["epc_bid_id"]
            isOneToOne: false
            referencedRelation: "epc_bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_financier_proposal_id_fkey"
            columns: ["financier_proposal_id"]
            isOneToOne: false
            referencedRelation: "financier_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      energy_requests: {
        Row: {
          additional_notes: string | null
          calculated_kwh: number | null
          calculated_system_size: number | null
          client_profile_id: string
          created_at: string | null
          current_power_consumption: number | null
          days_of_backup: number | null
          distance_from_roof: number | null
          energy_usage_pattern: string | null
          generator_details: string | null
          ground_nature: string | null
          has_diesel_generator: boolean | null
          hours_of_autonomy: number | null
          hours_of_operation: string | null
          id: string
          installation_location: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          project_timeline: string | null
          roof_area: number | null
          roof_drawings_url: string | null
          roof_material: string | null
          roof_or_ground: string | null
          setup_type: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          supporting_documents: Json | null
          system_type: Database["public"]["Enums"]["system_type"] | null
          updated_at: string | null
        }
        Insert: {
          additional_notes?: string | null
          calculated_kwh?: number | null
          calculated_system_size?: number | null
          client_profile_id: string
          created_at?: string | null
          current_power_consumption?: number | null
          days_of_backup?: number | null
          distance_from_roof?: number | null
          energy_usage_pattern?: string | null
          generator_details?: string | null
          ground_nature?: string | null
          has_diesel_generator?: boolean | null
          hours_of_autonomy?: number | null
          hours_of_operation?: string | null
          id?: string
          installation_location?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          project_timeline?: string | null
          roof_area?: number | null
          roof_drawings_url?: string | null
          roof_material?: string | null
          roof_or_ground?: string | null
          setup_type?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          supporting_documents?: Json | null
          system_type?: Database["public"]["Enums"]["system_type"] | null
          updated_at?: string | null
        }
        Update: {
          additional_notes?: string | null
          calculated_kwh?: number | null
          calculated_system_size?: number | null
          client_profile_id?: string
          created_at?: string | null
          current_power_consumption?: number | null
          days_of_backup?: number | null
          distance_from_roof?: number | null
          energy_usage_pattern?: string | null
          generator_details?: string | null
          ground_nature?: string | null
          has_diesel_generator?: boolean | null
          hours_of_autonomy?: number | null
          hours_of_operation?: string | null
          id?: string
          installation_location?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          project_timeline?: string | null
          roof_area?: number | null
          roof_drawings_url?: string | null
          roof_material?: string | null
          roof_or_ground?: string | null
          setup_type?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          supporting_documents?: Json | null
          system_type?: Database["public"]["Enums"]["system_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "energy_requests_client_profile_id_fkey"
            columns: ["client_profile_id"]
            isOneToOne: false
            referencedRelation: "client_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      epc_bids: {
        Row: {
          autonomy_hours: number | null
          battery_replacement_year: number | null
          battery_specs: string | null
          battery_usable_capacity: number | null
          bill_of_quantities: Json | null
          capex_per_kwp: number | null
          contingency_included: boolean | null
          contingency_percentage: number | null
          created_at: string | null
          decline_reason: string | null
          energy_request_id: string
          epc_profile_id: string
          equipment_cost: number | null
          equipment_specifications: string | null
          equipment_warranty: string | null
          expected_annual_generation: number | null
          id: string
          installation_cost: number | null
          installation_timeline: string | null
          inverter_replacement_year: number | null
          inverter_specs: string | null
          om_cost_annual: number | null
          om_scope: string | null
          other_costs: number | null
          panel_degradation_rate: number | null
          panel_specs: string | null
          payment_milestones: Json | null
          performance_ratio: number | null
          price_validity_days: number | null
          proposed_solution: string | null
          response_time: string | null
          spare_parts_strategy: string | null
          status: Database["public"]["Enums"]["bid_status"] | null
          system_configuration: string | null
          system_losses: number | null
          tilt_orientation: string | null
          total_capex: number | null
          updated_at: string | null
          uptime_assumptions: string | null
          workmanship_warranty: string | null
        }
        Insert: {
          autonomy_hours?: number | null
          battery_replacement_year?: number | null
          battery_specs?: string | null
          battery_usable_capacity?: number | null
          bill_of_quantities?: Json | null
          capex_per_kwp?: number | null
          contingency_included?: boolean | null
          contingency_percentage?: number | null
          created_at?: string | null
          decline_reason?: string | null
          energy_request_id: string
          epc_profile_id: string
          equipment_cost?: number | null
          equipment_specifications?: string | null
          equipment_warranty?: string | null
          expected_annual_generation?: number | null
          id?: string
          installation_cost?: number | null
          installation_timeline?: string | null
          inverter_replacement_year?: number | null
          inverter_specs?: string | null
          om_cost_annual?: number | null
          om_scope?: string | null
          other_costs?: number | null
          panel_degradation_rate?: number | null
          panel_specs?: string | null
          payment_milestones?: Json | null
          performance_ratio?: number | null
          price_validity_days?: number | null
          proposed_solution?: string | null
          response_time?: string | null
          spare_parts_strategy?: string | null
          status?: Database["public"]["Enums"]["bid_status"] | null
          system_configuration?: string | null
          system_losses?: number | null
          tilt_orientation?: string | null
          total_capex?: number | null
          updated_at?: string | null
          uptime_assumptions?: string | null
          workmanship_warranty?: string | null
        }
        Update: {
          autonomy_hours?: number | null
          battery_replacement_year?: number | null
          battery_specs?: string | null
          battery_usable_capacity?: number | null
          bill_of_quantities?: Json | null
          capex_per_kwp?: number | null
          contingency_included?: boolean | null
          contingency_percentage?: number | null
          created_at?: string | null
          decline_reason?: string | null
          energy_request_id?: string
          epc_profile_id?: string
          equipment_cost?: number | null
          equipment_specifications?: string | null
          equipment_warranty?: string | null
          expected_annual_generation?: number | null
          id?: string
          installation_cost?: number | null
          installation_timeline?: string | null
          inverter_replacement_year?: number | null
          inverter_specs?: string | null
          om_cost_annual?: number | null
          om_scope?: string | null
          other_costs?: number | null
          panel_degradation_rate?: number | null
          panel_specs?: string | null
          payment_milestones?: Json | null
          performance_ratio?: number | null
          price_validity_days?: number | null
          proposed_solution?: string | null
          response_time?: string | null
          spare_parts_strategy?: string | null
          status?: Database["public"]["Enums"]["bid_status"] | null
          system_configuration?: string | null
          system_losses?: number | null
          tilt_orientation?: string | null
          total_capex?: number | null
          updated_at?: string | null
          uptime_assumptions?: string | null
          workmanship_warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "epc_bids_energy_request_id_fkey"
            columns: ["energy_request_id"]
            isOneToOne: false
            referencedRelation: "energy_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "epc_bids_epc_profile_id_fkey"
            columns: ["epc_profile_id"]
            isOneToOne: false
            referencedRelation: "epc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      epc_profiles: {
        Row: {
          business_address: string | null
          company_name: string
          company_profile: string | null
          company_registration: string | null
          created_at: string | null
          engineers_cvs: Json | null
          epra_certification: string | null
          id: string
          installation_capacity: string | null
          kra_pin: string | null
          maintenance_services: boolean | null
          profile_id: string
          sector: string | null
          self_financing_capable: boolean | null
          service_regions: string[] | null
          supporting_documents: Json | null
          system_types: string[] | null
          updated_at: string | null
          warranty_terms: string | null
          years_in_operation: number | null
        }
        Insert: {
          business_address?: string | null
          company_name: string
          company_profile?: string | null
          company_registration?: string | null
          created_at?: string | null
          engineers_cvs?: Json | null
          epra_certification?: string | null
          id?: string
          installation_capacity?: string | null
          kra_pin?: string | null
          maintenance_services?: boolean | null
          profile_id: string
          sector?: string | null
          self_financing_capable?: boolean | null
          service_regions?: string[] | null
          supporting_documents?: Json | null
          system_types?: string[] | null
          updated_at?: string | null
          warranty_terms?: string | null
          years_in_operation?: number | null
        }
        Update: {
          business_address?: string | null
          company_name?: string
          company_profile?: string | null
          company_registration?: string | null
          created_at?: string | null
          engineers_cvs?: Json | null
          epra_certification?: string | null
          id?: string
          installation_capacity?: string | null
          kra_pin?: string | null
          maintenance_services?: boolean | null
          profile_id?: string
          sector?: string | null
          self_financing_capable?: boolean | null
          service_regions?: string[] | null
          supporting_documents?: Json | null
          system_types?: string[] | null
          updated_at?: string | null
          warranty_terms?: string | null
          years_in_operation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "epc_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financier_profiles: {
        Row: {
          business_address: string | null
          capital_base: string | null
          created_at: string | null
          down_payment_requirements: string | null
          financing_types:
            | Database["public"]["Enums"]["financing_type"][]
            | null
          geographic_regions: string[] | null
          id: string
          institution_name: string
          institution_type: string | null
          interest_rate_range: string | null
          kra_pin: string | null
          loan_amount_range: string | null
          preferred_project_types: string[] | null
          profile_id: string
          repayment_periods: string | null
          sectors_financed: string[] | null
          supporting_documents: Json | null
          updated_at: string | null
          years_in_operation: number | null
        }
        Insert: {
          business_address?: string | null
          capital_base?: string | null
          created_at?: string | null
          down_payment_requirements?: string | null
          financing_types?:
            | Database["public"]["Enums"]["financing_type"][]
            | null
          geographic_regions?: string[] | null
          id?: string
          institution_name: string
          institution_type?: string | null
          interest_rate_range?: string | null
          kra_pin?: string | null
          loan_amount_range?: string | null
          preferred_project_types?: string[] | null
          profile_id: string
          repayment_periods?: string | null
          sectors_financed?: string[] | null
          supporting_documents?: Json | null
          updated_at?: string | null
          years_in_operation?: number | null
        }
        Update: {
          business_address?: string | null
          capital_base?: string | null
          created_at?: string | null
          down_payment_requirements?: string | null
          financing_types?:
            | Database["public"]["Enums"]["financing_type"][]
            | null
          geographic_regions?: string[] | null
          id?: string
          institution_name?: string
          institution_type?: string | null
          interest_rate_range?: string | null
          kra_pin?: string | null
          loan_amount_range?: string | null
          preferred_project_types?: string[] | null
          profile_id?: string
          repayment_periods?: string | null
          sectors_financed?: string[] | null
          supporting_documents?: Json | null
          updated_at?: string | null
          years_in_operation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financier_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      financier_proposals: {
        Row: {
          additional_fees: Json | null
          approval_timeline_days: number | null
          approved_amount: number | null
          buyout_option: string | null
          cash_flow_forecast: Json | null
          collateral_requirements: string | null
          conditions_precedent: string | null
          created_at: string | null
          decline_reason: string | null
          default_terms: string | null
          deposit_amount: number | null
          epc_bid_id: string
          escalation_percentage: number | null
          financier_profile_id: string
          financing_type: Database["public"]["Enums"]["financing_type"] | null
          fx_treatment: string | null
          grace_period_months: number | null
          id: string
          interest_rate: number | null
          lcoe: number | null
          lease_fee: number | null
          min_dscr: number | null
          monthly_installment: number | null
          offer_validity_days: number | null
          required_insurance: string | null
          savings_on_kwh: number | null
          security_package: string | null
          solar_tariff: number | null
          status: Database["public"]["Enums"]["financing_status"] | null
          term_duration_months: number | null
          updated_at: string | null
        }
        Insert: {
          additional_fees?: Json | null
          approval_timeline_days?: number | null
          approved_amount?: number | null
          buyout_option?: string | null
          cash_flow_forecast?: Json | null
          collateral_requirements?: string | null
          conditions_precedent?: string | null
          created_at?: string | null
          decline_reason?: string | null
          default_terms?: string | null
          deposit_amount?: number | null
          epc_bid_id: string
          escalation_percentage?: number | null
          financier_profile_id: string
          financing_type?: Database["public"]["Enums"]["financing_type"] | null
          fx_treatment?: string | null
          grace_period_months?: number | null
          id?: string
          interest_rate?: number | null
          lcoe?: number | null
          lease_fee?: number | null
          min_dscr?: number | null
          monthly_installment?: number | null
          offer_validity_days?: number | null
          required_insurance?: string | null
          savings_on_kwh?: number | null
          security_package?: string | null
          solar_tariff?: number | null
          status?: Database["public"]["Enums"]["financing_status"] | null
          term_duration_months?: number | null
          updated_at?: string | null
        }
        Update: {
          additional_fees?: Json | null
          approval_timeline_days?: number | null
          approved_amount?: number | null
          buyout_option?: string | null
          cash_flow_forecast?: Json | null
          collateral_requirements?: string | null
          conditions_precedent?: string | null
          created_at?: string | null
          decline_reason?: string | null
          default_terms?: string | null
          deposit_amount?: number | null
          epc_bid_id?: string
          escalation_percentage?: number | null
          financier_profile_id?: string
          financing_type?: Database["public"]["Enums"]["financing_type"] | null
          fx_treatment?: string | null
          grace_period_months?: number | null
          id?: string
          interest_rate?: number | null
          lcoe?: number | null
          lease_fee?: number | null
          min_dscr?: number | null
          monthly_installment?: number | null
          offer_validity_days?: number | null
          required_insurance?: string | null
          savings_on_kwh?: number | null
          security_package?: string | null
          solar_tariff?: number | null
          status?: Database["public"]["Enums"]["financing_status"] | null
          term_duration_months?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financier_proposals_epc_bid_id_fkey"
            columns: ["epc_bid_id"]
            isOneToOne: false
            referencedRelation: "epc_bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financier_proposals_financier_profile_id_fkey"
            columns: ["financier_profile_id"]
            isOneToOne: false
            referencedRelation: "financier_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          entity_type: Database["public"]["Enums"]["entity_type"] | null
          full_name: string | null
          id: string
          is_profile_complete: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          full_name?: string | null
          id?: string
          is_profile_complete?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          full_name?: string | null
          id?: string
          is_profile_complete?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: { Args: never; Returns: undefined }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      bid_status:
        | "submitted"
        | "pending_financier"
        | "financier_declined"
        | "pending_buyer"
        | "buyer_declined"
        | "accepted"
        | "restructured"
        | "withdrawn"
      deal_status: "closed" | "in_progress" | "completed" | "archived"
      entity_type: "individual" | "company"
      financing_status:
        | "under_review"
        | "approved"
        | "declined"
        | "pending_buyer"
        | "buyer_declined"
        | "restructured"
        | "accepted"
        | "withdrawn"
      financing_type: "loan" | "lease" | "ppa"
      notification_type:
        | "bid_received"
        | "bid_accepted"
        | "bid_declined"
        | "financing_approved"
        | "financing_declined"
        | "deal_closed"
        | "profile_reminder"
        | "system"
      payment_method: "self_financing" | "requires_financing"
      request_status:
        | "draft"
        | "active"
        | "pending_bids"
        | "under_review"
        | "bids_received"
        | "pending_financing"
        | "awaiting_decision"
        | "closed"
        | "cancelled"
        | "inactive"
      system_type: "grid_tie" | "hybrid"
      user_role: "admin" | "client" | "epc" | "financier"
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
      bid_status: [
        "submitted",
        "pending_financier",
        "financier_declined",
        "pending_buyer",
        "buyer_declined",
        "accepted",
        "restructured",
        "withdrawn",
      ],
      deal_status: ["closed", "in_progress", "completed", "archived"],
      entity_type: ["individual", "company"],
      financing_status: [
        "under_review",
        "approved",
        "declined",
        "pending_buyer",
        "buyer_declined",
        "restructured",
        "accepted",
        "withdrawn",
      ],
      financing_type: ["loan", "lease", "ppa"],
      notification_type: [
        "bid_received",
        "bid_accepted",
        "bid_declined",
        "financing_approved",
        "financing_declined",
        "deal_closed",
        "profile_reminder",
        "system",
      ],
      payment_method: ["self_financing", "requires_financing"],
      request_status: [
        "draft",
        "active",
        "pending_bids",
        "under_review",
        "bids_received",
        "pending_financing",
        "awaiting_decision",
        "closed",
        "cancelled",
        "inactive",
      ],
      system_type: ["grid_tie", "hybrid"],
      user_role: ["admin", "client", "epc", "financier"],
    },
  },
} as const
