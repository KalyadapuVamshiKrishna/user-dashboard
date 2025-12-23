import { Sun, Moon, ShieldCheck, Command } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-6 w-6 text-white" />
            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none tracking-tight text-foreground">
              USER<span className="text-indigo-600">HUB</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Management Portal
            </span>
          </div>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="relative h-10 w-10 rounded-full border-muted-foreground/20 hover:bg-muted"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}