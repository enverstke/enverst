import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/Logo';
import { Home, Users, FileText, Bell, Settings, LogOut, Building2, Wallet, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6"><Logo variant="light" size="sm" /></div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/admin" className="sidebar-nav-item active"><Home size={20} /> Overview</Link>
          <Link to="/admin/clients" className="sidebar-nav-item"><Users size={20} /> Clients</Link>
          <Link to="/admin/epcs" className="sidebar-nav-item"><Building2 size={20} /> EPCs</Link>
          <Link to="/admin/financiers" className="sidebar-nav-item"><Wallet size={20} /> Financiers</Link>
          <Link to="/admin/requests" className="sidebar-nav-item"><FileText size={20} /> Requests</Link>
          <Link to="/admin/deals" className="sidebar-nav-item"><CheckCircle size={20} /> Deals</Link>
          <Link to="/admin/notifications" className="sidebar-nav-item"><Bell size={20} /> Notifications</Link>
          <Link to="/admin/settings" className="sidebar-nav-item"><Settings size={20} /> Settings</Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border"><button onClick={handleSignOut} className="sidebar-nav-item w-full text-left"><LogOut size={20} /> Sign Out</button></div>
      </aside>
      <main className="flex-1 p-8">
        <div className="mb-8"><h1 className="text-3xl font-display font-bold">Admin Dashboard</h1><p className="text-muted-foreground">Platform overview and management</p></div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card"><div className="stat-icon"><Users size={24} /></div><div className="stat-value">0</div><div className="stat-label">Total Clients</div></div>
          <div className="stat-card"><div className="stat-icon"><Building2 size={24} /></div><div className="stat-value">0</div><div className="stat-label">Total EPCs</div></div>
          <div className="stat-card"><div className="stat-icon"><Wallet size={24} /></div><div className="stat-value">0</div><div className="stat-label">Total Financiers</div></div>
          <div className="stat-card"><div className="stat-icon"><CheckCircle size={24} /></div><div className="stat-value">0</div><div className="stat-label">Closed Deals</div></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card"><h3 className="text-lg font-display font-semibold mb-4">Recent Activity</h3><p className="text-muted-foreground text-sm">No recent activity</p></div>
          <div className="bg-card rounded-xl p-6 shadow-card"><h3 className="text-lg font-display font-semibold mb-4">Pending Actions</h3><p className="text-muted-foreground text-sm">No pending actions</p></div>
        </div>
      </main>
    </div>
  );
}
