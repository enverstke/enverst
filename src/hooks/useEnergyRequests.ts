import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type EnergyRequest = Tables<'energy_requests'>;

export function useEnergyRequests(clientProfileId?: string) {
  const queryClient = useQueryClient();

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['energy-requests', clientProfileId],
    queryFn: async () => {
      if (!clientProfileId) return [];
      
      const { data, error } = await supabase
        .from('energy_requests')
        .select('*')
        .eq('client_profile_id', clientProfileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!clientProfileId,
  });

  const createRequest = useMutation({
    mutationFn: async (data: Omit<TablesInsert<'energy_requests'>, 'client_profile_id'> & { client_profile_id: string }) => {
      const { data: result, error } = await supabase
        .from('energy_requests')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-requests'] });
    },
  });

  const updateRequest = useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & Partial<EnergyRequest>) => {
      const { data: result, error } = await supabase
        .from('energy_requests')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energy-requests'] });
    },
  });

  return {
    requests: requests || [],
    isLoading,
    error,
    createRequest,
    updateRequest,
  };
}
