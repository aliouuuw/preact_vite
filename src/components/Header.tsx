import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

function Header({loading, user, logout}: {loading: boolean, user: any, logout: () => void}) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">Your App</Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary">Home</Link>
          <Link to="/about" className="text-foreground hover:text-primary">About</Link>
          
          {!loading && (
            user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-foreground hover:text-primary">Admin</Link>
                )}
                <Button variant="ghost" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Link to="/login" search={{ unauthorized: true }} className="text-primary">Login</Link>
            )
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-foreground hover:text-primary"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
        </nav>
      </div>
    </header>
  )
}

export default Header
