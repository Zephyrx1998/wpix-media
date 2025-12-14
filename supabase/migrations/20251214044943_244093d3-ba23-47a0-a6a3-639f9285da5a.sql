-- Add explicit DENY policy for anonymous/unauthenticated SELECT access on leads table
-- This makes it explicit that anonymous users cannot read lead data

CREATE POLICY "Deny anonymous select on leads" 
ON public.leads 
FOR SELECT 
TO anon
USING (false);

-- Also add a policy for authenticated but non-admin users (explicit deny)
CREATE POLICY "Deny non-admin authenticated select on leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));