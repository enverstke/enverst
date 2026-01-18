import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type EpcBid = Tables<'epc_bids'>;
export type EpcProfile = Tables<'epc_profiles'>;

export type BidWithEpc = EpcBid & {
  epc_profiles: EpcProfile;
};

export function useBidsForRequest(requestId?: string) {
  const { data: bids, isLoading, error, refetch } = useQuery({
    queryKey: ['bids', requestId],
    queryFn: async () => {
      if (!requestId) return [];
      
      const { data, error } = await supabase
        .from('epc_bids')
        .select(`
          *,
          epc_profiles (*)
        `)
        .eq('energy_request_id', requestId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BidWithEpc[];
    },
    enabled: !!requestId,
  });

  return {
    bids: bids || [],
    isLoading,
    error,
    refetch,
  };
}

export function useClientBids(clientProfileId?: string) {
  const { data: bids, isLoading, error } = useQuery({
    queryKey: ['client-bids', clientProfileId],
    queryFn: async () => {
      if (!clientProfileId) return [];
      
      // First get all energy requests for this client
      const { data: requests, error: reqError } = await supabase
        .from('energy_requests')
        .select('id')
        .eq('client_profile_id', clientProfileId);

      if (reqError) throw reqError;
      if (!requests || requests.length === 0) return [];

      const requestIds = requests.map(r => r.id);

      // Then get all bids for those requests
      const { data, error } = await supabase
        .from('epc_bids')
        .select(`
          *,
          epc_profiles (*),
          energy_requests (*)
        `)
        .in('energy_request_id', requestIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!clientProfileId,
  });

  return {
    bids: bids || [],
    isLoading,
    error,
  };
}
