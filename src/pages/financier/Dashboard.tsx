import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Home, FileText, Bell, User, LogOut, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function FinancierDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6"><Logo variant="light" size="sm" /></div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/financier" className="sidebar-nav-item active"><Home size={20} /> Dashboard</Link>
          <Link to="/financier/projects" className="sidebar-nav-item"><Wallet size={20} /> Projects</Link>
          <Link to="/financier/proposals" className="sidebar-nav-item"><FileText size={20} /> My Proposals</Link>
          <Link to="/financier/notifications" className="sidebar-nav-item"><Bell size={20} /> Notifications</Link>
          <Link to="/financier/profile" className="sidebar-nav-item"><User size={20} /> Profile</Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border"><button onClick={handleSignOut} className="sidebar-nav-item w-full text-left"><LogOut size={20} /> Sign Out</button></div>
      </aside>
      <main className="flex-1 p-8">
        <div className="mb-8"><h1 className="text-3xl font-display font-bold">Welcome, {profile?.full_name || 'Financier'}</h1><p className="text-muted-foreground">Finance solar energy projects</p></div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="stat-card"><div className="stat-icon"><Wallet size={24} /></div><div className="stat-value">0</div><div className="stat-label">Available Projects</div></div>
          <div className="stat-card"><div className="stat-icon"><FileText size={24} /></div><div className="stat-value">0</div><div className="stat-label">Active Proposals</div></div>
          <div className="stat-card"><div className="stat-icon"><Home size={24} /></div><div className="stat-value">0</div><div className="stat-label">Funded Projects</div></div>
        </div>
        <div className="bg-card rounded-xl p-8 shadow-card text-center"><Wallet size={48} className="mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-display font-semibold mb-2">Complete Your Profile</h3><p className="text-muted-foreground mb-4">Complete your financier profile to access project opportunities.</p><Button className="bg-accent hover:bg-accent/90">Complete Profile</Button></div>
      </main>
    </div>
  );
}
