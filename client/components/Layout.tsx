import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Video, 
  Layers, 
  Users, 
  Settings, 
  Plus,
  LogOut
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/editor');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Video className="h-6 w-6" />
              VideoForge
            </Link>
            
            {!isEditor && (
              <nav className="hidden md:flex items-center gap-4 text-sm">
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link 
                  to="/projects" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
                <Link 
                  to="/templates" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Templates
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isEditor && (
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            )}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Organization</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className={isEditor ? "h-[calc(100vh-3.5rem)]" : ""}>
        {children}
      </main>
    </div>
  );
}
