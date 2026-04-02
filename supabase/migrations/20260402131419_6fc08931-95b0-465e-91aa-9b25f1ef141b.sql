-- Add explicit deny policies for authenticated role on user_roles
-- to prevent privilege escalation

CREATE POLICY "No authenticated role insertion"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "No authenticated role deletion"
ON public.user_roles
FOR DELETE
TO authenticated
USING (false);

CREATE POLICY "No authenticated role updates"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (false);