import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ variant = 'dark', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 36, text: 'text-3xl' },
  };

  const colors = {
    light: {
      icon: 'text-accent',
      text: 'text-primary-foreground',
    },
    dark: {
      icon: 'text-accent',
      text: 'text-primary',
    },
  };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`relative ${colors[variant].icon}`}>
        <Zap size={sizes[size].icon} className="fill-current transition-transform group-hover:scale-110" />
        <div className="absolute inset-0 blur-sm opacity-50">
          <Zap size={sizes[size].icon} className="fill-current" />
        </div>
      </div>
      {showText && (
        <span className={`font-display font-bold ${sizes[size].text} ${colors[variant].text} tracking-tight`}>
          enverst
        </span>
      )}
    </Link>
  );
}
