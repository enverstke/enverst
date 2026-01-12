import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type UserRole = Database['public']['Enums']['user_role'];

const roleLabels: Record<string, string> = {
  client: 'Client',
  epc: 'EPC Contractor',
  financier: 'Financier',
};

const heroImage =
  'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1400&q=80';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'client';
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '' });
  const { signIn, signUp, signInWithGoogle, user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile) {
      navigate(`/${profile.role === 'client' ? 'client' : profile.role}`);
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const { error } = isLogin
      ? await signIn(formData.email, formData.password)
      : await signUp(formData.email, formData.password, role, formData.fullName);

    if (error) {
      toast.error(error.message);
    } else if (!isLogin) {
      toast.success('Account created! You can now sign in.');
      setIsLogin(true);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Logo variant="dark" size="md" />
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft size={16} className="mr-2" /> Back home
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual panel */}
          <div className="hidden lg:block lg:col-span-6 relative overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `linear-gradient(140deg, rgba(16,24,40,0.9) 0%, rgba(32,185,129,0.4) 100%), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative z-10 p-10 flex flex-col h-full justify-between">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                  <Sparkles size={14} /> AI-Ready Console
                </span>
                <h1 className="text-4xl font-display font-bold mt-6 leading-tight">
                  Secure, verified access to Enverst projects and financing.
                </h1>
                <p className="text-primary-foreground/80 mt-4 max-w-xl">
                  One workspace for clients, EPCs, and financiers. Authenticate once, collaborate everywhere.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Shield size={16} /> Security
                  </div>
                  <p className="text-sm text-primary-foreground/80 mt-2">SOC2-ready patterns, SSO, audited trails.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2 size={16} /> Verification
                  </div>
                  <p className="text-sm text-primary-foreground/80 mt-2">KYC/KYB checks and vetted counterparties.</p>
                </div>
              </div>
              <p className="text-xs text-primary-foreground/60">© 2024 Enverst. All rights reserved.</p>
            </div>
          </div>

          {/* Auth form */}
          <div className="lg:col-span-6">
            <div className="bg-card rounded-3xl border border-border shadow-card p-6 sm:p-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </p>
                  <h2 className="text-3xl font-display font-bold">
                    {isLogin ? 'Sign in' : `Join as ${roleLabels[role]}`}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                  {roleLabels[role]}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                {!isLogin && (
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative mt-1">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="pl-10"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                  {loading ? <span className="spinner" /> : isLogin ? 'Sign in' : 'Create account'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button onClick={() => setIsLogin(!isLogin)} className="text-accent hover:underline ml-1 font-medium">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
