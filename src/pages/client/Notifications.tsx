import { ClientLayout } from '@/components/client/ClientLayout';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { 
  Bell, CheckCircle2, FileText, DollarSign, 
  AlertCircle, Settings, Check, BellOff 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ClientNotifications() {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      bid_received: <FileText size={20} className="text-blue-600" />,
      bid_accepted: <CheckCircle2 size={20} className="text-green-600" />,
      bid_declined: <AlertCircle size={20} className="text-red-600" />,
      financing_approved: <DollarSign size={20} className="text-green-600" />,
      financing_declined: <AlertCircle size={20} className="text-red-600" />,
      deal_closed: <CheckCircle2 size={20} className="text-green-600" />,
      profile_reminder: <Settings size={20} className="text-amber-600" />,
      system: <Bell size={20} className="text-muted-foreground" />,
    };
    return icons[type] || icons.system;
  };

  const getNotificationBg = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-muted/30';
    
    const bgs: Record<string, string> = {
      bid_received: 'bg-blue-50',
      bid_accepted: 'bg-green-50',
      financing_approved: 'bg-green-50',
      deal_closed: 'bg-green-50',
      bid_declined: 'bg-red-50',
      financing_declined: 'bg-red-50',
      profile_reminder: 'bg-amber-50',
    };
    return bgs[type] || 'bg-card';
  };

  return (
    <ClientLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            <Check size={16} className="mr-2" /> Mark all as read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl p-4 border border-border transition-colors cursor-pointer ${getNotificationBg(notification.type, !!notification.is_read)}`}
              onClick={() => {
                if (!notification.is_read) {
                  markAsRead.mutate(notification.id);
                }
              }}
            >
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold ${notification.is_read ? 'text-muted-foreground' : ''}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.created_at || ''), { addSuffix: true })}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${notification.is_read ? 'text-muted-foreground' : ''}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.is_read && (
                  <div className="shrink-0 w-2 h-2 rounded-full bg-accent mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-8 shadow-card text-center border border-border">
          <BellOff size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-display font-semibold mb-2">No Notifications</h3>
          <p className="text-muted-foreground">
            You're all caught up! We'll notify you when something important happens.
          </p>
        </div>
      )}
    </ClientLayout>
  );
}
