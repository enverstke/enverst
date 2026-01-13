import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { ClientLayout } from '@/components/client/ClientLayout';
import { Button } from '@/components/ui/button';
import { useClientProfile } from '@/hooks/useClientProfile';
import { useEnergyRequests } from '@/hooks/useEnergyRequests';
import { FileText, Bell, Home, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function ClientDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { clientProfile, isLoading: profileLoading } = useClientProfile();
  const { requests, isLoading: requestsLoading } = useEnergyRequests(clientProfile?.id);

  const activeRequests = requests.filter(r => !['closed', 'cancelled', 'inactive'].includes(r.status || ''));
  const pendingBids = requests.filter(r => r.status === 'bids_received' || r.status === 'pending_bids');
  const completedProjects = requests.filter(r => r.status === 'closed');

  const isLoading = profileLoading || requestsLoading;

  const getStatusBadge = (status: string | null) => {
    const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      draft: { label: 'Draft', className: 'bg-muted text-muted-foreground', icon: <Clock size={14} /> },
      active: { label: 'Active', className: 'bg-blue-100 text-blue-700', icon: <CheckCircle2 size={14} /> },
      pending_bids: { label: 'Pending Bids', className: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} /> },
      bids_received: { label: 'Bids Received', className: 'bg-green-100 text-green-700', icon: <Bell size={14} /> },
      closed: { label: 'Completed', className: 'bg-green-100 text-green-700', icon: <CheckCircle2 size={14} /> },
    };
    const config = statusConfig[status || 'draft'] || statusConfig.draft;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.icon} {config.label}
      </span>
    );
  };

  return (
    <ClientLayout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">
            Welcome, {profile?.full_name || 'Client'}
          </h1>
          <p className="text-muted-foreground">Manage your solar energy requests</p>
        </div>
        <Button 
          onClick={() => navigate('/client/requests/new')} 
          className="bg-accent hover:bg-accent/90"
        >
          <Plus size={18} className="mr-2" /> New Request
        </Button>
      </div>

      {/* Profile Completion Alert */}
      {!profileLoading && !clientProfile && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-amber-900">Complete Your Profile</h3>
            <p className="text-amber-700 text-sm mb-2">
              Please complete your profile to start creating energy requests.
            </p>
            <Button size="sm" onClick={() => navigate('/client/profile')}>
              Complete Profile
            </Button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <FileText size={24} className="text-accent" />
            </div>
            <div>
              <div className="text-3xl font-bold">{isLoading ? '-' : activeRequests.length}</div>
              <div className="text-sm text-muted-foreground">Active Requests</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Bell size={24} className="text-blue-600" />
            </div>
            <div>
              <div className="text-3xl font-bold">{isLoading ? '-' : pendingBids.length}</div>
              <div className="text-sm text-muted-foreground">Pending Bids</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Home size={24} className="text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold">{isLoading ? '-' : completedProjects.length}</div>
              <div className="text-sm text-muted-foreground">Completed Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      {requests.length > 0 ? (
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-display font-semibold">Recent Requests</h2>
          </div>
          <div className="divide-y divide-border">
            {requests.slice(0, 5).map((request) => (
              <div
                key={request.id}
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/client/requests/${request.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {request.system_type === 'grid_tie' ? 'Grid-Tie' : 'Hybrid'} System
                      {request.calculated_system_size && ` - ${request.calculated_system_size} kWp`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request.installation_location || 'Location not specified'}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(request.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {requests.length > 5 && (
            <div className="p-4 text-center border-t border-border">
              <Button variant="ghost" onClick={() => navigate('/client/requests')}>
                View All Requests
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 shadow-card text-center border border-border">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-display font-semibold mb-2">No Requests Yet</h3>
          <p className="text-muted-foreground mb-4">
            Start your solar journey by creating your first energy request.
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90"
            onClick={() => navigate('/client/requests/new')}
            disabled={!clientProfile}
          >
            <Plus size={18} className="mr-2" /> Create Request
          </Button>
        </div>
      )}
    </ClientLayout>
  );
}
