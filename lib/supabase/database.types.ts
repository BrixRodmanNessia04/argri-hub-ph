// Generated-shape database types for migration 003. Regenerate with the
// command in supabase/README.md after linking the project.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row, Insert = Partial<Row>, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

type OwnedRow = {
  id: string;
  owner_id: string;
  organization_id: string | null;
  local_id: string;
  version: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<{
        id: string;
        full_name: string;
        email: string | null;
        phone: string | null;
        province: string | null;
        city_municipality: string | null;
        primary_commodity: string | null;
        avatar_url: string | null;
        preferred_language: string;
        created_at: string;
        updated_at: string;
      }>;
      user_roles: Table<{
        user_id: string;
        role: Database["public"]["Enums"]["app_role"];
        is_primary: boolean;
        created_at: string;
      }>;
      organizations: Table<{
        id: string;
        owner_id: string;
        name: string;
        type: Database["public"]["Enums"]["organization_type"];
        registration_number: string | null;
        contact_email: string | null;
        contact_phone: string | null;
        address: string | null;
        province: string | null;
        city_municipality: string | null;
        verification_status: string;
        created_at: string;
        updated_at: string;
      }>;
      organization_memberships: Table<{
        organization_id: string;
        user_id: string;
        role_in_organization: string;
        status: string;
        created_at: string;
      }>;
      production_sites: Table<
        OwnedRow & {
          name: string;
          site_type: string;
          location: string;
          province: string | null;
          latitude: number | null;
          longitude: number | null;
          primary_commodity: string | null;
        }
      >;
      fishing_vessels: Table<
        OwnedRow & {
          name: string;
          registration_number: string | null;
          home_port: string | null;
          vessel_type: string | null;
          capacity_kg: number | null;
          status: string;
        }
      >;
      fishing_trips: Table<
        OwnedRow & {
          vessel_id: string | null;
          vessel_name: string;
          vessel_registration_number: string | null;
          departure_port: string;
          arrival_port: string | null;
          departed_at: string;
          returned_at: string | null;
          fishing_ground: string;
          fuel_used_liters: number;
          crew_count: number;
          status: string;
        }
      >;
      catch_logs: Table<
        OwnedRow & {
          trip_id: string | null;
          trip_local_id: string;
          species_name: string;
          weight_kg: number;
          quality_grade: string;
          preservation_method: string;
          caught_at_coordinates: string | null;
          caught_at_date: string;
          for_sale_kg: number;
          home_use_kg: number;
        }
      >;
      inventory_items: Table<
        OwnedRow & {
          name: string;
          item_type: string;
          quantity: number;
          unit: string;
          unit_cost: number;
          fisheries_use: boolean;
        }
      >;
      inventory_movements: Table<{
        id: string;
        owner_id: string;
        organization_id: string | null;
        inventory_item_id: string | null;
        inventory_item_local_id: string;
        local_id: string;
        movement_type: string;
        quantity: number;
        unit: string;
        reason: string | null;
        occurred_at: string;
        version: number;
        created_at: string;
      }>;
      documents: Table<
        OwnedRow & {
          title: string;
          document_type: string;
          entity_type: string;
          entity_local_id: string;
          storage_path: string | null;
          file_name: string | null;
          file_size_bytes: number | null;
          mime_type: string | null;
          verification_status: string;
          expires_at: string | null;
        }
      >;
      sync_operations: Table<{
        id: string;
        owner_id: string;
        device_id: string;
        idempotency_key: string;
        entity_type: string;
        entity_local_id: string;
        operation: string;
        client_version: number;
        status: string;
        error_message: string | null;
        payload: Json;
        created_at: string;
      }>;
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { requested_role: Database["public"]["Enums"]["app_role"] };
        Returns: boolean;
      };
      is_org_member: {
        Args: { requested_organization_id: string };
        Returns: boolean;
      };
    };
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
        | "admin";
      organization_type:
        | "cooperative"
        | "buyer"
        | "processor"
        | "transport"
        | "government"
        | "finance"
        | "other";
    };
    CompositeTypes: Record<string, never>;
  };
};

