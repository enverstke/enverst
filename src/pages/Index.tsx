import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { LandingPage } from '@/components/landing/LandingPage';

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && profile) {
      // Redirect based on role
      switch (profile.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'client':
          navigate('/client');
          break;
        case 'epc':
          navigate('/epc');
          break;
        case 'financier':
          navigate('/financier');
          break;
        default:
          break;
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="spinner border-accent" />
      </div>
    );
  }

  return <LandingPage />;
};

export default Index;
