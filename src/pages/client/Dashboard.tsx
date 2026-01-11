import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Home, FileText, Bell, User, LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6"><Logo variant="light" size="sm" /></div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/client" className="sidebar-nav-item active"><Home size={20} /> Dashboard</Link>
          <Link to="/client/requests" className="sidebar-nav-item"><FileText size={20} /> My Requests</Link>
          <Link to="/client/notifications" className="sidebar-nav-item"><Bell size={20} /> Notifications</Link>
          <Link to="/client/profile" className="sidebar-nav-item"><User size={20} /> Profile</Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button onClick={handleSignOut} className="sidebar-nav-item w-full text-left"><LogOut size={20} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Welcome, {profile?.full_name || 'Client'}</h1>
            <p className="text-muted-foreground">Manage your solar energy requests</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90"><Plus size={18} className="mr-2" /> New Request</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card"><div className="stat-icon"><FileText size={24} /></div><div className="stat-value">0</div><div className="stat-label">Active Requests</div></div>
          <div className="stat-card"><div className="stat-icon"><Bell size={24} /></div><div className="stat-value">0</div><div className="stat-label">Pending Bids</div></div>
          <div className="stat-card"><div className="stat-icon"><Home size={24} /></div><div className="stat-value">0</div><div className="stat-label">Completed Projects</div></div>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-card text-center">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-display font-semibold mb-2">No Requests Yet</h3>
          <p className="text-muted-foreground mb-4">Start your solar journey by creating your first energy request.</p>
          <Button className="bg-accent hover:bg-accent/90"><Plus size={18} className="mr-2" /> Create Request</Button>
        </div>
      </main>
    </div>
  );
}
