import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function EmailConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (token_hash && type === 'email') {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email',
          });

          if (error) {
            setStatus('error');
            setMessage(error.message);
          } else {
            setStatus('success');
            setMessage('Your email has been confirmed! You can now sign in.');
            toast.success('Email confirmed successfully!');
          }
        } catch (err) {
          setStatus('error');
          setMessage('An unexpected error occurred.');
        }
      } else {
        // No token - show pending confirmation message
        setStatus('pending');
        setMessage('Please check your email to confirm your account.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Logo variant="dark" size="md" className="mx-auto" />
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-card p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Verifying Email</h2>
              <p className="text-muted-foreground">Please wait while we confirm your email...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Email Confirmed!</h2>
              <p className="text-muted-foreground mb-6">{message}</p>
              <Button onClick={() => navigate('/auth')} className="bg-accent hover:bg-accent/90">
                Sign In
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Verification Failed</h2>
              <p className="text-muted-foreground mb-6">{message}</p>
              <div className="space-y-3">
                <Button onClick={() => navigate('/auth')} className="w-full bg-accent hover:bg-accent/90">
                  Try Again
                </Button>
                <Button variant="ghost" onClick={() => navigate('/')} className="w-full">
                  <ArrowLeft size={16} className="mr-2" /> Back Home
                </Button>
              </div>
            </>
          )}

          {status === 'pending' && (
            <>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a confirmation link to your email address. Please click the link to verify your account.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or try signing up again.
                </p>
              </div>
              <Button variant="ghost" onClick={() => navigate('/auth')} className="w-full">
                <ArrowLeft size={16} className="mr-2" /> Back to Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
