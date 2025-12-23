import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { UserForm } from '@/components/users/UserForm';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { UserTableSkeleton } from '@/components/users/UserTableSkeleton';

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => api.getUser(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => api.updateUser(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: 'Update Successful', description: 'User profile has been updated.' });
      navigate('/');
    },
    onError: (err: any) => {
      toast({ 
        title: 'Update Failed', 
        description: err.response?.data?.message || 'Server error', 
        variant: 'destructive' 
      });
    }
  });

  if (isLoading) return <Layout><UserTableSkeleton /></Layout>;
  if (isError || !user) return <Navigate to="/" replace />;

  return (
    <Layout>
     
      <UserForm 
        key={user._id} 
        user={user} 
        isEditing 
        onSubmit={(data) => mutation.mutate(data)} 
        isLoading={mutation.isPending} 
      />
    </Layout>
  );
}