import { 
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createBrowserHistory,
  createRouter
} from '@tanstack/react-router'
import { createRootRoute, createRoute } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// Import your pages
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import Link from '@/components/ui/link'

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background antialiased">
      <div className="container mx-auto py-8">
        <nav className="mb-8 flex justify-center space-x-6">
          <Link to="/" className="text-primary hover:text-primary/80 font-medium">Home</Link>
          <Link to="/about" className="text-primary hover:text-primary/80 font-medium">About</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
      {/* {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />} */}
    </div>
  ),
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

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
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