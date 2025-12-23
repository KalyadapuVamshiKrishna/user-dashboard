import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { UserForm } from '@/components/users/UserForm';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function CreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: 'Success', description: 'User created successfully' });
      navigate('/');
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Failed to create user', 
        variant: 'destructive' 
      });
    }
  });

  return (
    <Layout>
      <UserForm 
        onSubmit={(data) => mutation.mutate(data)} 
        isLoading={mutation.isPending} 
      />
    </Layout>
  );
}