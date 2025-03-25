import { 
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createBrowserHistory,
  createRouter,
  useNavigate
} from '@tanstack/react-router'
import { createRootRoute, createRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getSession, logout } from '@/lib/auth'
import { useState, useEffect } from 'react'
import Link from '@/components/ui/link'
import { LoginPage } from './pages/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminUsers } from './pages/admin/Users'
import { Button } from '@/components/ui/button'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { useAuth } from '@/context/auth-context'

// Create a root route
const rootRoute = createRootRoute({
  component: () => {
    const { user, loading, logout } = useAuth();
    
    return (
      <div className="min-h-screen bg-background antialiased">
        <header className="border-b">
          <div className="container mx-auto py-4 px-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Your App</Link>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-primary hover:text-primary/80">Home</Link>
              <Link to="/about" className="text-primary hover:text-primary/80">About</Link>
              
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-4">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="text-primary hover:text-primary/80">Admin</Link>
                    )}
                    <Button variant="ghost" onClick={logout}>Logout</Button>
                  </div>
                ) : (
                  <Link to="/login" className="text-primary hover:text-primary/80">Login</Link>
                )
              )}
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto py-8 px-4">
          <Outlet />
        </main>
        
        {/* {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />} */}
      </div>
    )
  },
})

// Define your routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

// Create additional routes
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: (search) => {
    return {
      unauthorized: search.unauthorized === 'true'
    }
  },
  component: LoginPage,
})

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
})

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: AdminUsers,
})


// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  loginRoute,
  adminDashboardRoute,
  adminUsersRoute,
])

// Create the router
const isServer = typeof window === 'undefined'
const history = isServer 
  ? createMemoryHistory() 
  : createBrowserHistory()

export const router = createRouter({ 
  routeTree,
  history,
})

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}