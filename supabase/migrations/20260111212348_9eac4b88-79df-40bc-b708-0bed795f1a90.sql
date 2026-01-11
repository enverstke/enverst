-- Create enum types for the platform
CREATE TYPE public.user_role AS ENUM ('admin', 'client', 'epc', 'financier');
CREATE TYPE public.entity_type AS ENUM ('individual', 'company');
CREATE TYPE public.system_type AS ENUM ('grid_tie', 'hybrid');
CREATE TYPE public.payment_method AS ENUM ('self_financing', 'requires_financing');
CREATE TYPE public.financing_type AS ENUM ('loan', 'lease', 'ppa');
CREATE TYPE public.request_status AS ENUM ('draft', 'active', 'pending_bids', 'under_review', 'bids_received', 'pending_financing', 'awaiting_decision', 'closed', 'cancelled', 'inactive');
CREATE TYPE public.bid_status AS ENUM ('submitted', 'pending_financier', 'financier_declined', 'pending_buyer', 'buyer_declined', 'accepted', 'restructured', 'withdrawn');
CREATE TYPE public.financing_status AS ENUM ('under_review', 'approved', 'declined', 'pending_buyer', 'buyer_declined', 'restructured', 'accepted', 'withdrawn');
CREATE TYPE public.deal_status AS ENUM ('closed', 'in_progress', 'completed', 'archived');
CREATE TYPE public.notification_type AS ENUM ('bid_received', 'bid_accepted', 'bid_declined', 'financing_approved', 'financing_declined', 'deal_closed', 'profile_reminder', 'system');

-- Profiles table for all users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'client',
    full_name TEXT,
    email TEXT,
    phone TEXT,
    entity_type entity_type,
    is_profile_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (for admin role checking)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role user_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Client profiles (extends profiles for clients)
CREATE TABLE public.client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    -- Individual fields
    personal_id_details TEXT,
    residential_address TEXT,
    energy_usage_location TEXT,
    -- Company fields  
    company_name TEXT,
    company_registration TEXT,
    business_address TEXT,
    sector TEXT,
    company_profile TEXT,
    kra_pin TEXT,
    representative_name TEXT,
    representative_email TEXT,
    representative_phone TEXT,
    -- Supporting documents (JSON array of URLs)
    supporting_documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EPC profiles
CREATE TABLE public.epc_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    company_registration TEXT,
    years_in_operation INTEGER,
    business_address TEXT,
    sector TEXT,
    company_profile TEXT,
    kra_pin TEXT,
    epra_certification TEXT,
    service_regions TEXT[],
    system_types TEXT[],
    installation_capacity TEXT,
    maintenance_services BOOLEAN DEFAULT FALSE,
    warranty_terms TEXT,
    self_financing_capable BOOLEAN DEFAULT FALSE,
    supporting_documents JSONB DEFAULT '[]'::jsonb,
    engineers_cvs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financier profiles
CREATE TABLE public.financier_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    institution_name TEXT NOT NULL,
    institution_type TEXT,
    years_in_operation INTEGER,
    capital_base TEXT,
    business_address TEXT,
    kra_pin TEXT,
    interest_rate_range TEXT,
    loan_amount_range TEXT,
    repayment_periods TEXT,
    down_payment_requirements TEXT,
    geographic_regions TEXT[],
    sectors_financed TEXT[],
    preferred_project_types TEXT[],
    financing_types financing_type[],
    supporting_documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Energy requests from clients
CREATE TABLE public.energy_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_profile_id UUID REFERENCES public.client_profiles(id) ON DELETE CASCADE NOT NULL,
    status request_status DEFAULT 'draft',
    -- Request details
    setup_type TEXT, -- residential or commercial
    current_power_consumption DECIMAL,
    energy_usage_pattern TEXT,
    installation_location TEXT,
    system_type system_type,
    hours_of_operation TEXT,
    has_diesel_generator BOOLEAN DEFAULT FALSE,
    generator_details TEXT,
    roof_or_ground TEXT,
    roof_material TEXT,
    roof_area DECIMAL,
    roof_drawings_url TEXT,
    ground_nature TEXT,
    distance_from_roof DECIMAL,
    hours_of_autonomy DECIMAL,
    days_of_backup DECIMAL,
    payment_method payment_method,
    project_timeline TEXT,
    additional_notes TEXT,
    supporting_documents JSONB DEFAULT '[]'::jsonb,
    -- Calculated fields
    calculated_system_size DECIMAL,
    calculated_kwh DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EPC Bids
CREATE TABLE public.epc_bids (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    energy_request_id UUID REFERENCES public.energy_requests(id) ON DELETE CASCADE NOT NULL,
    epc_profile_id UUID REFERENCES public.epc_profiles(id) ON DELETE CASCADE NOT NULL,
    status bid_status DEFAULT 'submitted',
    -- Proposal details
    proposed_solution TEXT,
    equipment_specifications TEXT,
    system_configuration TEXT,
    bill_of_quantities JSONB,
    panel_specs TEXT,
    inverter_specs TEXT,
    battery_specs TEXT,
    installation_timeline TEXT,
    -- Performance assumptions
    expected_annual_generation DECIMAL,
    performance_ratio DECIMAL,
    system_losses DECIMAL,
    tilt_orientation TEXT,
    battery_usable_capacity DECIMAL,
    autonomy_hours DECIMAL,
    -- Commercial
    total_capex DECIMAL,
    capex_per_kwp DECIMAL,
    equipment_cost DECIMAL,
    installation_cost DECIMAL,
    other_costs DECIMAL,
    payment_milestones JSONB,
    price_validity_days INTEGER,
    contingency_included BOOLEAN DEFAULT FALSE,
    contingency_percentage DECIMAL,
    -- Warranty & O&M
    equipment_warranty TEXT,
    workmanship_warranty TEXT,
    om_scope TEXT,
    -- For financed projects
    om_cost_annual DECIMAL,
    uptime_assumptions TEXT,
    response_time TEXT,
    spare_parts_strategy TEXT,
    panel_degradation_rate DECIMAL,
    inverter_replacement_year INTEGER,
    battery_replacement_year INTEGER,
    -- Decline reason if declined
    decline_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financier proposals
CREATE TABLE public.financier_proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    epc_bid_id UUID REFERENCES public.epc_bids(id) ON DELETE CASCADE NOT NULL,
    financier_profile_id UUID REFERENCES public.financier_profiles(id) ON DELETE CASCADE NOT NULL,
    status financing_status DEFAULT 'under_review',
    -- Financing terms
    financing_type financing_type,
    approved_amount DECIMAL,
    interest_rate DECIMAL,
    lease_fee DECIMAL,
    deposit_amount DECIMAL,
    grace_period_months INTEGER,
    term_duration_months INTEGER,
    escalation_percentage DECIMAL,
    buyout_option TEXT,
    lcoe DECIMAL,
    solar_tariff DECIMAL,
    savings_on_kwh DECIMAL,
    monthly_installment DECIMAL,
    additional_fees JSONB,
    collateral_requirements TEXT,
    -- Credit & Risk
    min_dscr DECIMAL,
    fx_treatment TEXT,
    security_package TEXT,
    required_insurance TEXT,
    -- Process
    conditions_precedent TEXT,
    approval_timeline_days INTEGER,
    offer_validity_days INTEGER,
    default_terms TEXT,
    cash_flow_forecast JSONB,
    -- Decline reason if declined
    decline_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Closed deals
CREATE TABLE public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    energy_request_id UUID REFERENCES public.energy_requests(id) ON DELETE CASCADE NOT NULL,
    epc_bid_id UUID REFERENCES public.epc_bids(id) ON DELETE CASCADE NOT NULL,
    financier_proposal_id UUID REFERENCES public.financier_proposals(id),
    status deal_status DEFAULT 'closed',
    admin_notes TEXT,
    external_finalization_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type TEXT,
    related_entity_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epc_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financier_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.epc_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financier_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function for admin check
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Helper function to get user's profile role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Client profiles policies
CREATE POLICY "Clients can manage own client profile" ON public.client_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.id = client_profiles.profile_id 
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "EPCs can view client profiles for their requests" ON public.client_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'epc'
    );

CREATE POLICY "Financiers can view client profiles" ON public.client_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'financier'
    );

CREATE POLICY "Admins can view all client profiles" ON public.client_profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- EPC profiles policies
CREATE POLICY "EPCs can manage own epc profile" ON public.epc_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.id = epc_profiles.profile_id 
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can view EPC profiles" ON public.epc_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'client'
    );

CREATE POLICY "Financiers can view EPC profiles" ON public.epc_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'financier'
    );

CREATE POLICY "Admins can view all EPC profiles" ON public.epc_profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Financier profiles policies
CREATE POLICY "Financiers can manage own financier profile" ON public.financier_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p 
            WHERE p.id = financier_profiles.profile_id 
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can view financier profiles" ON public.financier_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'client'
    );

CREATE POLICY "EPCs can view financier profiles" ON public.financier_profiles
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'epc'
    );

CREATE POLICY "Admins can view all financier profiles" ON public.financier_profiles
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Energy requests policies
CREATE POLICY "Clients can manage own requests" ON public.energy_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.client_profiles cp
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE cp.id = energy_requests.client_profile_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "EPCs can view active requests" ON public.energy_requests
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'epc' 
        AND status IN ('active', 'pending_bids', 'under_review', 'bids_received', 'pending_financing', 'awaiting_decision')
    );

CREATE POLICY "Financiers can view requests pending financing" ON public.energy_requests
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'financier'
        AND payment_method = 'requires_financing'
    );

CREATE POLICY "Admins can view all requests" ON public.energy_requests
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all requests" ON public.energy_requests
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- EPC bids policies
CREATE POLICY "EPCs can manage own bids" ON public.epc_bids
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.epc_profiles ep
            JOIN public.profiles p ON p.id = ep.profile_id
            WHERE ep.id = epc_bids.epc_profile_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can view bids on their requests" ON public.epc_bids
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.energy_requests er
            JOIN public.client_profiles cp ON cp.id = er.client_profile_id
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE er.id = epc_bids.energy_request_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can update bids on their requests" ON public.epc_bids
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.energy_requests er
            JOIN public.client_profiles cp ON cp.id = er.client_profile_id
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE er.id = epc_bids.energy_request_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Financiers can view bids requiring financing" ON public.epc_bids
    FOR SELECT USING (
        public.get_user_role(auth.uid()) = 'financier'
        AND EXISTS (
            SELECT 1 FROM public.energy_requests er
            WHERE er.id = epc_bids.energy_request_id
            AND er.payment_method = 'requires_financing'
        )
    );

CREATE POLICY "Admins can view all bids" ON public.epc_bids
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all bids" ON public.epc_bids
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Financier proposals policies
CREATE POLICY "Financiers can manage own proposals" ON public.financier_proposals
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.financier_profiles fp
            JOIN public.profiles p ON p.id = fp.profile_id
            WHERE fp.id = financier_proposals.financier_profile_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can view proposals on their requests" ON public.financier_proposals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.epc_bids eb
            JOIN public.energy_requests er ON er.id = eb.energy_request_id
            JOIN public.client_profiles cp ON cp.id = er.client_profile_id
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE eb.id = financier_proposals.epc_bid_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Clients can update proposals on their requests" ON public.financier_proposals
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.epc_bids eb
            JOIN public.energy_requests er ON er.id = eb.energy_request_id
            JOIN public.client_profiles cp ON cp.id = er.client_profile_id
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE eb.id = financier_proposals.epc_bid_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "EPCs can view proposals on their bids" ON public.financier_proposals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.epc_bids eb
            JOIN public.epc_profiles ep ON ep.id = eb.epc_profile_id
            JOIN public.profiles p ON p.id = ep.profile_id
            WHERE eb.id = financier_proposals.epc_bid_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all proposals" ON public.financier_proposals
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all proposals" ON public.financier_proposals
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Deals policies
CREATE POLICY "Admins can manage all deals" ON public.deals
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view their deals" ON public.deals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.energy_requests er
            JOIN public.client_profiles cp ON cp.id = er.client_profile_id
            JOIN public.profiles p ON p.id = cp.profile_id
            WHERE er.id = deals.energy_request_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "EPCs can view their deals" ON public.deals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.epc_bids eb
            JOIN public.epc_profiles ep ON ep.id = eb.epc_profile_id
            JOIN public.profiles p ON p.id = ep.profile_id
            WHERE eb.id = deals.epc_bid_id
            AND p.user_id = auth.uid()
        )
    );

CREATE POLICY "Financiers can view their deals" ON public.deals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.financier_proposals fp_p
            JOIN public.financier_profiles fp ON fp.id = fp_p.financier_profile_id
            JOIN public.profiles p ON p.id = fp.profile_id
            WHERE fp_p.id = deals.financier_proposal_id
            AND p.user_id = auth.uid()
        )
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all notifications" ON public.notifications
    FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON public.client_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_epc_profiles_updated_at BEFORE UPDATE ON public.epc_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_financier_profiles_updated_at BEFORE UPDATE ON public.financier_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_energy_requests_updated_at BEFORE UPDATE ON public.energy_requests
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_epc_bids_updated_at BEFORE UPDATE ON public.epc_bids
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_financier_proposals_updated_at BEFORE UPDATE ON public.financier_proposals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
        COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'client')
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;