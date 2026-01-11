import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Home, FileText, Bell, User, LogOut, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function EPCDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6"><Logo variant="light" size="sm" /></div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/epc" className="sidebar-nav-item active"><Home size={20} /> Dashboard</Link>
          <Link to="/epc/marketplace" className="sidebar-nav-item"><Search size={20} /> Marketplace</Link>
          <Link to="/epc/bids" className="sidebar-nav-item"><FileText size={20} /> My Bids</Link>
          <Link to="/epc/notifications" className="sidebar-nav-item"><Bell size={20} /> Notifications</Link>
          <Link to="/epc/profile" className="sidebar-nav-item"><User size={20} /> Profile</Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border"><button onClick={handleSignOut} className="sidebar-nav-item w-full text-left"><LogOut size={20} /> Sign Out</button></div>
      </aside>
      <main className="flex-1 p-8">
        <div className="mb-8"><h1 className="text-3xl font-display font-bold">Welcome, {profile?.full_name || 'EPC'}</h1><p className="text-muted-foreground">Find and bid on solar projects</p></div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card"><div className="stat-icon"><Search size={24} /></div><div className="stat-value">0</div><div className="stat-label">Available Projects</div></div>
          <div className="stat-card"><div className="stat-icon"><FileText size={24} /></div><div className="stat-value">0</div><div className="stat-label">Active Bids</div></div>
          <div className="stat-card"><div className="stat-icon"><Home size={24} /></div><div className="stat-value">0</div><div className="stat-label">Won Projects</div></div>
        </div>
        <div className="bg-card rounded-xl p-8 shadow-card text-center"><Search size={48} className="mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-display font-semibold mb-2">Complete Your Profile</h3><p className="text-muted-foreground mb-4">Complete your EPC profile to access the project marketplace.</p><Button className="bg-accent hover:bg-accent/90">Complete Profile</Button></div>
      </main>
    </div>
  );
}
