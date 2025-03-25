import { Link } from '@/components/ui/link';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold mb-6">About</h1>
      <div className="space-y-2 text-lg">
        <p className="text-muted-foreground">
          This is a lightweight Bun + React template with TanStack Router.
        </p>
        <p className="text-muted-foreground">
          Built with Bun, React, TailwindCSS, and Shadcn UI components.
        </p>
      </div>
    </div>
  );
} 