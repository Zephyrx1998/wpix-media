-- Add DELETE policy for leads table (only admins can delete)
CREATE POLICY "Only admins can delete leads" 
ON public.leads 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add policies for user_roles table to prevent unauthorized modifications
-- No one can insert roles via client (must be done by database admin)
CREATE POLICY "No public role insertion" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (false);

-- No one can update roles via client
CREATE POLICY "No public role updates" 
ON public.user_roles 
FOR UPDATE 
USING (false);

-- No one can delete roles via client
CREATE POLICY "No public role deletion" 
ON public.user_roles 
FOR DELETE 
USING (false);