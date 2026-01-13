import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientLayout } from '@/components/client/ClientLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClientProfile } from '@/hooks/useClientProfile';
import { useEnergyRequests } from '@/hooks/useEnergyRequests';
import { 
  FileText, Plus, Search, Filter, ChevronRight, 
  Clock, CheckCircle2, Bell, XCircle, AlertCircle 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ClientRequests() {
  const navigate = useNavigate();
  const { clientProfile, isLoading: profileLoading } = useClientProfile();
  const { requests, isLoading } = useEnergyRequests(clientProfile?.id);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = 
      request.installation_location?.toLowerCase().includes(search.toLowerCase()) ||
      request.system_type?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string | null) => {
    const config: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
      draft: { label: 'Draft', className: 'bg-muted text-muted-foreground', icon: <Clock size={14} /> },
      active: { label: 'Active', className: 'bg-blue-100 text-blue-700', icon: <CheckCircle2 size={14} /> },
      pending_bids: { label: 'Pending Bids', className: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} /> },
      under_review: { label: 'Under Review', className: 'bg-purple-100 text-purple-700', icon: <AlertCircle size={14} /> },
      bids_received: { label: 'Bids Received', className: 'bg-green-100 text-green-700', icon: <Bell size={14} /> },
      pending_financing: { label: 'Pending Financing', className: 'bg-orange-100 text-orange-700', icon: <Clock size={14} /> },
      awaiting_decision: { label: 'Awaiting Decision', className: 'bg-amber-100 text-amber-700', icon: <AlertCircle size={14} /> },
      closed: { label: 'Completed', className: 'bg-green-100 text-green-700', icon: <CheckCircle2 size={14} /> },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700', icon: <XCircle size={14} /> },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700', icon: <XCircle size={14} /> },
    };
    return config[status || 'draft'] || config.draft;
  };

  if (!profileLoading && !clientProfile) {
    return (
      <ClientLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-display font-bold mb-2">Complete Your Profile First</h2>
          <p className="text-muted-foreground mb-6">
            You need to complete your client profile before creating energy requests.
          </p>
          <Button onClick={() => navigate('/client/profile')} className="bg-accent hover:bg-accent/90">
            Complete Profile
          </Button>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">My Requests</h1>
          <p className="text-muted-foreground">Manage your solar energy requests</p>
        </div>
        <Button 
          onClick={() => navigate('/client/requests/new')} 
          className="bg-accent hover:bg-accent/90"
        >
          <Plus size={18} className="mr-2" /> New Request
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter size={18} className="mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending_bids">Pending Bids</SelectItem>
            <SelectItem value="bids_received">Bids Received</SelectItem>
            <SelectItem value="closed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      ) : filteredRequests.length > 0 ? (
        <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
          {filteredRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            return (
              <div
                key={request.id}
                className="p-4 lg:p-6 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/client/requests/${request.id}`)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold truncate">
                        {request.system_type === 'grid_tie' ? 'Grid-Tie' : 'Hybrid'} System
                        {request.calculated_system_size && ` - ${request.calculated_system_size} kWp`}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium shrink-0 ${statusConfig.className}`}>
                        {statusConfig.icon} {statusConfig.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{request.installation_location || 'Location not specified'}</span>
                      <span>•</span>
                      <span>{request.payment_method === 'requires_financing' ? 'Financing Required' : 'Self-Financing'}</span>
                      <span>•</span>
                      <span>{new Date(request.created_at || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 shadow-card text-center border border-border">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-display font-semibold mb-2">
            {search || statusFilter !== 'all' ? 'No Matching Requests' : 'No Requests Yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {search || statusFilter !== 'all' 
              ? 'Try adjusting your filters.'
              : 'Start your solar journey by creating your first energy request.'}
          </p>
          {!search && statusFilter === 'all' && (
            <Button 
              className="bg-accent hover:bg-accent/90"
              onClick={() => navigate('/client/requests/new')}
            >
              <Plus size={18} className="mr-2" /> Create Request
            </Button>
          )}
        </div>
      )}
    </ClientLayout>
  );
}
