import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type FinancierProposal = Tables<'financier_proposals'>;
export type FinancierProfile = Tables<'financier_profiles'>;

export type ProposalWithFinancier = FinancierProposal & {
  financier_profiles: FinancierProfile;
};

export function useProposalsForBid(bidId?: string) {
  const { data: proposals, isLoading, error, refetch } = useQuery({
    queryKey: ['proposals', bidId],
    queryFn: async () => {
      if (!bidId) return [];
      
      const { data, error } = await supabase
        .from('financier_proposals')
        .select(`
          *,
          financier_profiles (*)
        `)
        .eq('epc_bid_id', bidId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProposalWithFinancier[];
    },
    enabled: !!bidId,
  });

  return {
    proposals: proposals || [],
    isLoading,
    error,
    refetch,
  };
}

export function useClientProposals(clientProfileId?: string) {
  const { data: proposals, isLoading, error } = useQuery({
    queryKey: ['client-proposals', clientProfileId],
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

      // Get bids for those requests
      const { data: bids, error: bidError } = await supabase
        .from('epc_bids')
        .select('id')
        .in('energy_request_id', requestIds);

      if (bidError) throw bidError;
      if (!bids || bids.length === 0) return [];

      const bidIds = bids.map(b => b.id);

      // Get proposals for those bids
      const { data, error } = await supabase
        .from('financier_proposals')
        .select(`
          *,
          financier_profiles (*),
          epc_bids (
            *,
            energy_requests (*)
          )
        `)
        .in('epc_bid_id', bidIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!clientProfileId,
  });

  return {
    proposals: proposals || [],
    isLoading,
    error,
  };
}
