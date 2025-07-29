import { ReactNode } from 'react';
import { Button } from './ui/button';
import { LogOut, Users, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">PersonManager</h1>
            </div>

            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <nav className="hidden md:flex items-center space-x-2">
                  <Button
                    variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Lista de Pessoas</span>
                  </Button>
                  <Button
                    variant={location.pathname === '/person/new' ? 'default' : 'ghost'}
                    onClick={() => navigate('/person/new')}
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Nova Pessoa</span>
                  </Button>
                </nav>

                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Olá, </span>
                    <span className="font-medium text-foreground">{user?.username}</span>
                    <span className="text-xs text-muted-foreground ml-2">({user?.role})</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};