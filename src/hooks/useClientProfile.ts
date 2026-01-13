import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth-context';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type ClientProfile = Tables<'client_profiles'>;

export function useClientProfile() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  const { data: clientProfile, isLoading, error } = useQuery({
    queryKey: ['client-profile', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return null;
      
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('profile_id', profile.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.id,
  });

  const createProfile = useMutation({
    mutationFn: async (data: Omit<TablesInsert<'client_profiles'>, 'profile_id'>) => {
      if (!profile?.id) throw new Error('No profile found');
      
      const { data: result, error } = await supabase
        .from('client_profiles')
        .insert({ ...data, profile_id: profile.id })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data: TablesUpdate<'client_profiles'>) => {
      if (!clientProfile?.id) throw new Error('No client profile found');
      
      const { data: result, error } = await supabase
        .from('client_profiles')
        .update(data)
        .eq('id', clientProfile.id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
    },
  });

  return {
    clientProfile,
    isLoading,
    error,
    createProfile,
    updateProfile,
  };
}
