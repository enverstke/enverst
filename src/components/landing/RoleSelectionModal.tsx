import { useNavigate } from 'react-router-dom';
import { Users, Building2, Wallet, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RoleSelectionModalProps {
  open: boolean;
  onClose: () => void;
}

const roles = [
  {
    id: 'client',
    title: 'Client / Buyer',
    description: 'I want to install solar panels for my home or business',
    icon: Users,
    color: 'accent',
    bgColor: 'bg-accent/10',
    hoverBg: 'hover:bg-accent hover:text-accent-foreground',
  },
  {
    id: 'epc',
    title: 'EPC Contractor',
    description: 'I provide solar installation and EPC services',
    icon: Building2,
    color: 'accent-gold',
    bgColor: 'bg-accent-gold/10',
    hoverBg: 'hover:bg-accent-gold hover:text-foreground',
  },
  {
    id: 'financier',
    title: 'Financier',
    description: 'I provide financing for solar projects',
    icon: Wallet,
    color: 'accent-blue',
    bgColor: 'bg-accent-blue/10',
    hoverBg: 'hover:bg-accent-blue hover:text-accent-blue-foreground',
  },
];

export function RoleSelectionModal({ open, onClose }: RoleSelectionModalProps) {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    onClose();
    navigate(`/auth?role=${role}`);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Who are you?</DialogTitle>
          <DialogDescription>
            Select your role to get started with the right experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border border-border transition-all duration-200 group ${role.hoverBg}`}
            >
              <div className={`w-12 h-12 rounded-lg ${role.bgColor} flex items-center justify-center group-hover:bg-inherit transition-colors`}>
                <role.icon size={24} className={`text-${role.color} group-hover:text-inherit`} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{role.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-inherit/80">
                  {role.description}
                </p>
              </div>
              <ArrowRight size={20} className="text-muted-foreground group-hover:text-inherit opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
