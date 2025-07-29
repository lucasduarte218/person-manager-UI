import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public pages
import Login from "./pages/Login";
import PublicDashboard from "./pages/PublicDashboard";
import PublicPersonNew from "./pages/PublicPersonNew";
import PublicPersonEdit from "./pages/PublicPersonEdit";

// Protected pages
import Dashboard from "./pages/Dashboard";
import PersonNew from "./pages/PersonNew";
import PersonEdit from "./pages/PersonEdit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/public" element={<PublicDashboard />} />
            <Route path="/public/person/new" element={<PublicPersonNew />} />
            <Route path="/public/person/edit/:id" element={<PublicPersonEdit />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/person/new"
              element={
                <ProtectedRoute>
                  <PersonNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/person/edit/:id"
              element={
                <ProtectedRoute>
                  <PersonEdit />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
