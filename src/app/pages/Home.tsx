import { useAuth } from "@/contexts/auth-context";
import { Button } from "../../components/ui/button";
import { useRouter } from "@tanstack/react-router";
export function HomePage() {
  const {user, logout} = useAuth();
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Bun + React 19</h1>
      <p className="text-lg text-muted-foreground mb-6">A fully functional template with TanStack Router</p>
      <div className="flex justify-center">
        <Button variant="ghost" size="lg" onClick={() => {
          if (user) {
            logout();
          } else {
            router.navigate({to: "/login", search: {unauthorized: true}});
          }
        }}>
            {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
} 