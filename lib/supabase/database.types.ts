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
    PostgrestVersion: "14.15"
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
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      catch_logs: {
        Row: {
          caught_at_coordinates: string | null
          caught_at_date: string
          created_at: string
          deleted_at: string | null
          for_sale_kg: number
          home_use_kg: number
          id: string
          local_id: string
          organization_id: string | null
          owner_id: string
          preservation_method: string
          quality_grade: string
          species_name: string
          trip_id: string | null
          trip_local_id: string
          updated_at: string
          version: number
          weight_kg: number
        }
        Insert: {
          caught_at_coordinates?: string | null
          caught_at_date: string
          created_at?: string
          deleted_at?: string | null
          for_sale_kg?: number
          home_use_kg?: number
          id?: string
          local_id: string
          organization_id?: string | null
          owner_id: string
          preservation_method: string
          quality_grade: string
          species_name: string
          trip_id?: string | null
          trip_local_id: string
          updated_at?: string
          version?: number
          weight_kg: number
        }
        Update: {
          caught_at_coordinates?: string | null
          caught_at_date?: string
          created_at?: string
          deleted_at?: string | null
          for_sale_kg?: number
          home_use_kg?: number
          id?: string
          local_id?: string
          organization_id?: string | null
          owner_id?: string
          preservation_method?: string
          quality_grade?: string
          species_name?: string
          trip_id?: string | null
          trip_local_id?: string
          updated_at?: string
          version?: number
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "catch_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catch_logs_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "fishing_trips"
            referencedColumns: ["id"]
          },
        ]
      }
      cooperatives: {
        Row: {
          created_at: string | null
          id: string
          leader_id: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          leader_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooperatives_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_cycles: {
        Row: {
          created_at: string | null
          crop: string
          estimated_harvest_at: string
          id: string
          planted_at: string
          plot_id: string
          status: string
          target_yield_kg: number | null
          updated_at: string | null
          user_id: string
          variety: string | null
        }
        Insert: {
          created_at?: string | null
          crop: string
          estimated_harvest_at: string
          id?: string
          planted_at: string
          plot_id: string
          status?: string
          target_yield_kg?: number | null
          updated_at?: string | null
          user_id: string
          variety?: string | null
        }
        Update: {
          created_at?: string | null
          crop?: string
          estimated_harvest_at?: string
          id?: string
          planted_at?: string
          plot_id?: string
          status?: string
          target_yield_kg?: number | null
          updated_at?: string | null
          user_id?: string
          variety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_cycles_plot_id_fkey"
            columns: ["plot_id"]
            isOneToOne: false
            referencedRelation: "plots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crop_cycles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          deleted_at: string | null
          document_type: string
          entity_local_id: string
          entity_type: string
          expires_at: string | null
          file_name: string | null
          file_size_bytes: number | null
          id: string
          local_id: string
          mime_type: string | null
          organization_id: string | null
          owner_id: string
          storage_path: string | null
          title: string
          updated_at: string
          verification_status: string
          version: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          document_type: string
          entity_local_id: string
          entity_type: string
          expires_at?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          id?: string
          local_id: string
          mime_type?: string | null
          organization_id?: string | null
          owner_id: string
          storage_path?: string | null
          title: string
          updated_at?: string
          verification_status?: string
          version?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          document_type?: string
          entity_local_id?: string
          entity_type?: string
          expires_at?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          id?: string
          local_id?: string
          mime_type?: string | null
          organization_id?: string | null
          owner_id?: string
          storage_path?: string | null
          title?: string
          updated_at?: string
          verification_status?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string | null
          description: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date?: string | null
          description: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string | null
          description?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      farmers: {
        Row: {
          coop_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          coop_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          coop_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farmers_coop_id_fkey"
            columns: ["coop_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farmers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          area_hectares: number
          cooperative_id: string | null
          created_at: string | null
          id: string
          location: string
          name: string
          primary_crop: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area_hectares?: number
          cooperative_id?: string | null
          created_at?: string | null
          id?: string
          location: string
          name: string
          primary_crop?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area_hectares?: number
          cooperative_id?: string | null
          created_at?: string | null
          id?: string
          location?: string
          name?: string
          primary_crop?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "farms_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      field_activities: {
        Row: {
          activity_type: string
          cost: number
          created_at: string | null
          crop_cycle_id: string
          description: string
          id: string
          logged_at: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          cost?: number
          created_at?: string | null
          crop_cycle_id: string
          description: string
          id?: string
          logged_at?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          cost?: number
          created_at?: string | null
          crop_cycle_id?: string
          description?: string
          id?: string
          logged_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_activities_crop_cycle_id_fkey"
            columns: ["crop_cycle_id"]
            isOneToOne: false
            referencedRelation: "crop_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "field_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fishing_trips: {
        Row: {
          arrival_port: string | null
          created_at: string
          crew_count: number
          deleted_at: string | null
          departed_at: string
          departure_port: string
          fishing_ground: string
          fuel_used_liters: number
          id: string
          local_id: string
          organization_id: string | null
          owner_id: string
          returned_at: string | null
          status: string
          updated_at: string
          version: number
          vessel_id: string | null
          vessel_name: string
          vessel_registration_number: string | null
        }
        Insert: {
          arrival_port?: string | null
          created_at?: string
          crew_count?: number
          deleted_at?: string | null
          departed_at: string
          departure_port: string
          fishing_ground: string
          fuel_used_liters?: number
          id?: string
          local_id: string
          organization_id?: string | null
          owner_id: string
          returned_at?: string | null
          status?: string
          updated_at?: string
          version?: number
          vessel_id?: string | null
          vessel_name: string
          vessel_registration_number?: string | null
        }
        Update: {
          arrival_port?: string | null
          created_at?: string
          crew_count?: number
          deleted_at?: string | null
          departed_at?: string
          departure_port?: string
          fishing_ground?: string
          fuel_used_liters?: number
          id?: string
          local_id?: string
          organization_id?: string | null
          owner_id?: string
          returned_at?: string | null
          status?: string
          updated_at?: string
          version?: number
          vessel_id?: string | null
          vessel_name?: string
          vessel_registration_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fishing_trips_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fishing_trips_vessel_id_fkey"
            columns: ["vessel_id"]
            isOneToOne: false
            referencedRelation: "fishing_vessels"
            referencedColumns: ["id"]
          },
        ]
      }
      fishing_vessels: {
        Row: {
          capacity_kg: number | null
          created_at: string
          deleted_at: string | null
          home_port: string | null
          id: string
          local_id: string
          name: string
          organization_id: string | null
          owner_id: string
          registration_number: string | null
          status: string
          updated_at: string
          version: number
          vessel_type: string | null
        }
        Insert: {
          capacity_kg?: number | null
          created_at?: string
          deleted_at?: string | null
          home_port?: string | null
          id?: string
          local_id: string
          name: string
          organization_id?: string | null
          owner_id: string
          registration_number?: string | null
          status?: string
          updated_at?: string
          version?: number
          vessel_type?: string | null
        }
        Update: {
          capacity_kg?: number | null
          created_at?: string
          deleted_at?: string | null
          home_port?: string | null
          id?: string
          local_id?: string
          name?: string
          organization_id?: string | null
          owner_id?: string
          registration_number?: string | null
          status?: string
          updated_at?: string
          version?: number
          vessel_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fishing_vessels_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      harvest_logs: {
        Row: {
          created_at: string | null
          crop: string
          farmer_id: string
          id: string
          status: string
          weight_kg: number
        }
        Insert: {
          created_at?: string | null
          crop: string
          farmer_id: string
          id?: string
          status?: string
          weight_kg: number
        }
        Update: {
          created_at?: string | null
          crop?: string
          farmer_id?: string
          id?: string
          status?: string
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "harvest_logs_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          created_at: string
          deleted_at: string | null
          fisheries_use: boolean
          id: string
          item_type: string
          local_id: string
          name: string
          organization_id: string | null
          owner_id: string
          quantity: number
          reserved_quantity: number
          unit: string
          unit_cost: number
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          fisheries_use?: boolean
          id?: string
          item_type: string
          local_id: string
          name: string
          organization_id?: string | null
          owner_id: string
          quantity?: number
          reserved_quantity?: number
          unit: string
          unit_cost?: number
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          fisheries_use?: boolean
          id?: string
          item_type?: string
          local_id?: string
          name?: string
          organization_id?: string | null
          owner_id?: string
          quantity?: number
          reserved_quantity?: number
          unit?: string
          unit_cost?: number
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string
          id: string
          inventory_item_id: string | null
          inventory_item_local_id: string
          local_id: string
          movement_type: string
          occurred_at: string
          organization_id: string | null
          owner_id: string
          quantity: number
          reason: string | null
          unit: string
          version: number
        }
        Insert: {
          created_at?: string
          id?: string
          inventory_item_id?: string | null
          inventory_item_local_id: string
          local_id: string
          movement_type: string
          occurred_at?: string
          organization_id?: string | null
          owner_id: string
          quantity: number
          reason?: string | null
          unit: string
          version?: number
        }
        Update: {
          created_at?: string
          id?: string
          inventory_item_id?: string | null
          inventory_item_local_id?: string
          local_id?: string
          movement_type?: string
          occurred_at?: string
          organization_id?: string | null
          owner_id?: string
          quantity?: number
          reason?: string | null
          unit?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          commodity_id: string | null
          coop_id: string
          cooperative_organization_id: string | null
          created_at: string | null
          crop: string
          id: string
          inventory_item_id: string | null
          listing_status: string
          price_per_kg: number
          product_sector: string | null
          quality_grade: string | null
          reserved_weight_kg: number
          total_weight_kg: number
          updated_at: string
        }
        Insert: {
          commodity_id?: string | null
          coop_id: string
          cooperative_organization_id?: string | null
          created_at?: string | null
          crop: string
          id?: string
          inventory_item_id?: string | null
          listing_status?: string
          price_per_kg: number
          product_sector?: string | null
          quality_grade?: string | null
          reserved_weight_kg?: number
          total_weight_kg: number
          updated_at?: string
        }
        Update: {
          commodity_id?: string | null
          coop_id?: string
          cooperative_organization_id?: string | null
          created_at?: string | null
          crop?: string
          id?: string
          inventory_item_id?: string | null
          listing_status?: string
          price_per_kg?: number
          product_sector?: string | null
          quality_grade?: string | null
          reserved_weight_kg?: number
          total_weight_kg?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_coop_id_fkey"
            columns: ["coop_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_listings_cooperative_organization_id_fkey"
            columns: ["cooperative_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_listings_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
      }
      negotiation_events: {
        Row: {
          actor_organization_id: string | null
          actor_user_id: string | null
          created_at: string
          event_type: string
          id: string
          negotiation_id: string
          offer_id: string | null
          order_id: string | null
          payload: Json
        }
        Insert: {
          actor_organization_id?: string | null
          actor_user_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          negotiation_id: string
          offer_id?: string | null
          order_id?: string | null
          payload?: Json
        }
        Update: {
          actor_organization_id?: string | null
          actor_user_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          negotiation_id?: string
          offer_id?: string | null
          order_id?: string | null
          payload?: Json
        }
        Relationships: [
          {
            foreignKeyName: "negotiation_events_actor_organization_id_fkey"
            columns: ["actor_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_events_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_events_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "negotiation_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      negotiation_messages: {
        Row: {
          created_at: string
          deleted_at: string | null
          edited_at: string | null
          id: string
          message: string
          negotiation_id: string
          related_offer_id: string | null
          sender_organization_id: string
          sender_user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          message: string
          negotiation_id: string
          related_offer_id?: string | null
          sender_organization_id: string
          sender_user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          edited_at?: string | null
          id?: string
          message?: string
          negotiation_id?: string
          related_offer_id?: string | null
          sender_organization_id?: string
          sender_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "negotiation_messages_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_messages_related_offer_id_fkey"
            columns: ["related_offer_id"]
            isOneToOne: false
            referencedRelation: "negotiation_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_messages_sender_organization_id_fkey"
            columns: ["sender_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      negotiation_offers: {
        Row: {
          created_at: string
          created_by_organization_id: string
          created_by_user_id: string
          delivery_date: string
          delivery_location: string
          id: string
          negotiation_id: string
          notes: string | null
          offer_number: number
          payment_terms: string
          quality_grade: string
          quality_notes: string | null
          quantity: number
          status: Database["public"]["Enums"]["negotiation_offer_status"]
          unit: string
          unit_price: number
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          created_by_organization_id: string
          created_by_user_id: string
          delivery_date: string
          delivery_location: string
          id?: string
          negotiation_id: string
          notes?: string | null
          offer_number: number
          payment_terms: string
          quality_grade: string
          quality_notes?: string | null
          quantity: number
          status?: Database["public"]["Enums"]["negotiation_offer_status"]
          unit?: string
          unit_price: number
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          created_by_organization_id?: string
          created_by_user_id?: string
          delivery_date?: string
          delivery_location?: string
          id?: string
          negotiation_id?: string
          notes?: string | null
          offer_number?: number
          payment_terms?: string
          quality_grade?: string
          quality_notes?: string | null
          quantity?: number
          status?: Database["public"]["Enums"]["negotiation_offer_status"]
          unit?: string
          unit_price?: number
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "negotiation_offers_created_by_organization_id_fkey"
            columns: ["created_by_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_offers_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
        ]
      }
      negotiation_participants: {
        Row: {
          can_accept_offer: boolean
          can_make_offer: boolean
          created_at: string
          id: string
          negotiation_id: string
          organization_id: string
          participant_role: string
          user_id: string | null
        }
        Insert: {
          can_accept_offer?: boolean
          can_make_offer?: boolean
          created_at?: string
          id?: string
          negotiation_id: string
          organization_id: string
          participant_role: string
          user_id?: string | null
        }
        Update: {
          can_accept_offer?: boolean
          can_make_offer?: boolean
          created_at?: string
          id?: string
          negotiation_id?: string
          organization_id?: string
          participant_role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "negotiation_participants_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiation_participants_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      negotiations: {
        Row: {
          accepted_offer_id: string | null
          buyer_organization_id: string
          buyer_request_id: string | null
          commodity_id: string
          commodity_name: string
          cooperative_organization_id: string
          created_at: string
          current_offer_id: string | null
          deleted_at: string | null
          expires_at: string | null
          id: string
          initiated_by_user_id: string
          inventory_item_id: string | null
          last_activity_at: string
          listing_id: string | null
          product_sector: string
          reservation_rule: string
          resulting_order_id: string | null
          status: Database["public"]["Enums"]["negotiation_status"]
          updated_at: string
          version: number
        }
        Insert: {
          accepted_offer_id?: string | null
          buyer_organization_id: string
          buyer_request_id?: string | null
          commodity_id: string
          commodity_name: string
          cooperative_organization_id: string
          created_at?: string
          current_offer_id?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          initiated_by_user_id: string
          inventory_item_id?: string | null
          last_activity_at?: string
          listing_id?: string | null
          product_sector?: string
          reservation_rule?: string
          resulting_order_id?: string | null
          status?: Database["public"]["Enums"]["negotiation_status"]
          updated_at?: string
          version?: number
        }
        Update: {
          accepted_offer_id?: string | null
          buyer_organization_id?: string
          buyer_request_id?: string | null
          commodity_id?: string
          commodity_name?: string
          cooperative_organization_id?: string
          created_at?: string
          current_offer_id?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          initiated_by_user_id?: string
          inventory_item_id?: string | null
          last_activity_at?: string
          listing_id?: string | null
          product_sector?: string
          reservation_rule?: string
          resulting_order_id?: string | null
          status?: Database["public"]["Enums"]["negotiation_status"]
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "negotiations_accepted_offer_fkey"
            columns: ["accepted_offer_id"]
            isOneToOne: false
            referencedRelation: "negotiation_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_buyer_organization_id_fkey"
            columns: ["buyer_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_cooperative_organization_id_fkey"
            columns: ["cooperative_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_current_offer_fkey"
            columns: ["current_offer_id"]
            isOneToOne: false
            referencedRelation: "negotiation_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negotiations_resulting_order_id_fkey"
            columns: ["resulting_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          metadata: Json
          notification_type: string
          organization_id: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json
          notification_type: string
          organization_id?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json
          notification_type?: string
          organization_id?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          accepted_offer_id: string | null
          buyer_id: string | null
          buyer_organization_id: string | null
          commercial_notes: string | null
          commodity_id: string | null
          commodity_name: string | null
          cooperative_organization_id: string | null
          created_at: string | null
          delivery_date: string | null
          delivery_location: string | null
          id: string
          listing_id: string | null
          negotiation_id: string | null
          order_source: string
          payment_terms: string | null
          quality_grade: string | null
          quality_notes: string | null
          quantity: number | null
          reservation_rule: string
          status: string
          stock_reserved_at: string | null
          stock_reserved_quantity: number
          total_amount: number | null
          unit: string
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          accepted_offer_id?: string | null
          buyer_id?: string | null
          buyer_organization_id?: string | null
          commercial_notes?: string | null
          commodity_id?: string | null
          commodity_name?: string | null
          cooperative_organization_id?: string | null
          created_at?: string | null
          delivery_date?: string | null
          delivery_location?: string | null
          id?: string
          listing_id?: string | null
          negotiation_id?: string | null
          order_source?: string
          payment_terms?: string | null
          quality_grade?: string | null
          quality_notes?: string | null
          quantity?: number | null
          reservation_rule?: string
          status?: string
          stock_reserved_at?: string | null
          stock_reserved_quantity?: number
          total_amount?: number | null
          unit?: string
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          accepted_offer_id?: string | null
          buyer_id?: string | null
          buyer_organization_id?: string | null
          commercial_notes?: string | null
          commodity_id?: string | null
          commodity_name?: string | null
          cooperative_organization_id?: string | null
          created_at?: string | null
          delivery_date?: string | null
          delivery_location?: string | null
          id?: string
          listing_id?: string | null
          negotiation_id?: string | null
          order_source?: string
          payment_terms?: string | null
          quality_grade?: string | null
          quality_notes?: string | null
          quantity?: number | null
          reservation_rule?: string
          status?: string
          stock_reserved_at?: string | null
          stock_reserved_quantity?: number
          total_amount?: number | null
          unit?: string
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_accepted_offer_id_fkey"
            columns: ["accepted_offer_id"]
            isOneToOne: false
            referencedRelation: "negotiation_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_buyer_organization_id_fkey"
            columns: ["buyer_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_cooperative_organization_id_fkey"
            columns: ["cooperative_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_negotiation_id_fkey"
            columns: ["negotiation_id"]
            isOneToOne: false
            referencedRelation: "negotiations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_memberships: {
        Row: {
          created_at: string
          organization_id: string
          role_in_organization: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          organization_id: string
          role_in_organization?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          organization_id?: string
          role_in_organization?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          city_municipality: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          name: string
          owner_id: string
          province: string | null
          registration_number: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
          verification_status: string
        }
        Insert: {
          address?: string | null
          city_municipality?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name: string
          owner_id: string
          province?: string | null
          registration_number?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          verification_status?: string
        }
        Update: {
          address?: string | null
          city_municipality?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          province?: string | null
          registration_number?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          verification_status?: string
        }
        Relationships: []
      }
      plots: {
        Row: {
          area_sq_meters: number
          created_at: string | null
          farm_id: string
          id: string
          name: string
          soil_type: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area_sq_meters?: number
          created_at?: string | null
          farm_id: string
          id?: string
          name: string
          soil_type?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area_sq_meters?: number
          created_at?: string | null
          farm_id?: string
          id?: string
          name?: string
          soil_type?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plots_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      production_sites: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          latitude: number | null
          local_id: string
          location: string
          longitude: number | null
          name: string
          organization_id: string | null
          owner_id: string
          primary_commodity: string | null
          province: string | null
          site_type: string
          updated_at: string
          version: number
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          latitude?: number | null
          local_id: string
          location: string
          longitude?: number | null
          name: string
          organization_id?: string | null
          owner_id: string
          primary_commodity?: string | null
          province?: string | null
          site_type: string
          updated_at?: string
          version?: number
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          latitude?: number | null
          local_id?: string
          location?: string
          longitude?: number | null
          name?: string
          organization_id?: string | null
          owner_id?: string
          primary_commodity?: string | null
          province?: string | null
          site_type?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "production_sites_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          city_municipality: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          preferred_language: string
          primary_commodity: string | null
          province: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          city_municipality?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          phone?: string | null
          preferred_language?: string
          primary_commodity?: string | null
          province?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          city_municipality?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          preferred_language?: string
          primary_commodity?: string | null
          province?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          buyer_name: string
          created_at: string | null
          crop: string
          id: string
          price_per_kg: number
          sold_at: string | null
          total_amount: number
          user_id: string
          weight_kg: number
        }
        Insert: {
          buyer_name: string
          created_at?: string | null
          crop: string
          id?: string
          price_per_kg: number
          sold_at?: string | null
          total_amount: number
          user_id: string
          weight_kg: number
        }
        Update: {
          buyer_name?: string
          created_at?: string | null
          crop?: string
          id?: string
          price_per_kg?: number
          sold_at?: string | null
          total_amount?: number
          user_id?: string
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_operations: {
        Row: {
          client_version: number
          created_at: string
          device_id: string
          entity_local_id: string
          entity_type: string
          error_message: string | null
          id: string
          idempotency_key: string
          operation: string
          owner_id: string
          payload: Json
          status: string
        }
        Insert: {
          client_version?: number
          created_at?: string
          device_id: string
          entity_local_id: string
          entity_type: string
          error_message?: string | null
          id?: string
          idempotency_key: string
          operation: string
          owner_id: string
          payload?: Json
          status?: string
        }
        Update: {
          client_version?: number
          created_at?: string
          device_id?: string
          entity_local_id?: string
          entity_type?: string
          error_message?: string | null
          id?: string
          idempotency_key?: string
          operation?: string
          owner_id?: string
          payload?: Json
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          is_primary: boolean
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          is_primary?: boolean
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          is_primary?: boolean
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          name: string
          phone_number: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          phone_number: string
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          phone_number?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_negotiation: {
        Args: { p_negotiation_id: string }
        Returns: string
      }
      add_negotiation_message: {
        Args: { p_message: string; p_negotiation_id: string }
        Returns: string
      }
      can_access_negotiation: {
        Args: { requested_negotiation_id: string }
        Returns: boolean
      }
      confirm_negotiated_order: {
        Args: { p_order_id: string }
        Returns: boolean
      }
      counter_negotiation: {
        Args: {
          p_delivery_date: string
          p_delivery_location: string
          p_negotiation_id: string
          p_notes?: string
          p_payment_terms: string
          p_quality_grade: string
          p_quality_notes?: string
          p_quantity: number
          p_unit: string
          p_unit_price: number
          p_valid_until?: string
        }
        Returns: string
      }
      create_negotiation: {
        Args: {
          p_buyer_organization_id: string
          p_commodity_id: string
          p_commodity_name: string
          p_cooperative_organization_id: string
          p_delivery_date: string
          p_delivery_location: string
          p_expires_at?: string
          p_inventory_item_id: string
          p_listing_id: string
          p_notes?: string
          p_payment_terms: string
          p_product_sector: string
          p_quality_grade: string
          p_quality_notes?: string
          p_quantity: number
          p_reservation_rule?: string
          p_unit: string
          p_unit_price: number
        }
        Returns: string
      }
      has_role: {
        Args: { requested_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      is_org_member: {
        Args: { requested_organization_id: string }
        Returns: boolean
      }
      negotiation_actor_organization: {
        Args: { requested_negotiation_id: string }
        Returns: string
      }
      notify_negotiation_party: {
        Args: {
          excluded_organization_id: string
          requested_message: string
          requested_negotiation_id: string
          requested_title: string
          requested_type: string
        }
        Returns: undefined
      }
      respond_to_negotiation: {
        Args: { p_action: string; p_negotiation_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "farmer"
        | "fisher"
        | "coop"
        | "buyer"
        | "processor"
        | "transport"
        | "government"
        | "finance"
        | "admin"
      negotiation_offer_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "superseded"
        | "withdrawn"
        | "expired"
      negotiation_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "countered"
        | "accepted"
        | "rejected"
        | "withdrawn"
        | "expired"
        | "converted_to_order"
        | "cancelled"
      organization_type:
        | "cooperative"
        | "buyer"
        | "processor"
        | "transport"
        | "government"
        | "finance"
        | "other"
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
      app_role: [
        "farmer",
        "fisher",
        "coop",
        "buyer",
        "processor",
        "transport",
        "government",
        "finance",
        "admin",
      ],
      negotiation_offer_status: [
        "pending",
        "accepted",
        "rejected",
        "superseded",
        "withdrawn",
        "expired",
      ],
      negotiation_status: [
        "draft",
        "submitted",
        "under_review",
        "countered",
        "accepted",
        "rejected",
        "withdrawn",
        "expired",
        "converted_to_order",
        "cancelled",
      ],
      organization_type: [
        "cooperative",
        "buyer",
        "processor",
        "transport",
        "government",
        "finance",
        "other",
      ],
    },
  },
} as const
