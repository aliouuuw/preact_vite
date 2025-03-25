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

import { LoginPage } from './pages/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { AdminUsers } from './pages/admin/Users'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { useAuth } from '@/contexts/auth-context'
import Header from '@/components/Header'

// Create a root route
const rootRoute = createRootRoute({
  component: () => {
    const { user, loading, logout } = useAuth();
    
    return (
      <div className="min-h-screen bg-background antialiased">
        <Header loading={loading} user={user} logout={logout} />   
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