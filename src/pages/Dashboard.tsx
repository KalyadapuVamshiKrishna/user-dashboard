import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { UserTable } from '@/components/users/UserTable';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {  User } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UserTableSkeleton } from '@/components/users/UserTableSkeleton';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: api.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: 'Success', description: 'User deleted successfully.' });
    },
  });

  if (error) return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage your organization's users and their profile details.</p>
          </div>
          <Button asChild size="lg" className="shadow-md bg-indigo-600 text-white hover:bg-indigo-700">
            <Link to="/users/new">
              <Plus className="mr-2 h-5 w-5 " /> Add New User
            </Link>
          </Button>
        </div>

        {/* Content Area */}
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <UserTable users={users} onDelete={(id) => deleteMutation.mutate(id)} />
          )}
        </div>
      </div>
    </Layout>
  );
}
