import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRequireAuth } from "@/context/auth-context";
import { useAuth } from "@/context/auth-context";
export function AdminDashboard() {
  const { loading, authorized } = useRequireAuth('admin');
  const { user } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!authorized) {
    return null; // useRequireAuth will handle the redirect
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage your users</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total users: 42</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Manage your content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total posts: 18</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your application</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Last updated: Today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
