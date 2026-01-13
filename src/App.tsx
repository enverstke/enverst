import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import EmailConfirmation from "./pages/EmailConfirmation";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ClientDashboard from "./pages/client/Dashboard";
import ClientRequests from "./pages/client/Requests";
import ClientNotifications from "./pages/client/Notifications";
import ClientProfile from "./pages/client/Profile";
import NewRequest from "./pages/client/NewRequest";
import EPCDashboard from "./pages/epc/Dashboard";
import FinancierDashboard from "./pages/financier/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/requests" element={<ClientRequests />} />
            <Route path="/client/requests/new" element={<NewRequest />} />
            <Route path="/client/notifications" element={<ClientNotifications />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/epc/*" element={<EPCDashboard />} />
            <Route path="/financier/*" element={<FinancierDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;