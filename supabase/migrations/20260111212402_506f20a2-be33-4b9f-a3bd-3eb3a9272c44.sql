-- Fix the permissive notifications insert policy by adding proper check
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Allow authenticated users to insert notifications (for system-triggered notifications)
-- The system will validate notification creation through edge functions
CREATE POLICY "Authenticated users can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);