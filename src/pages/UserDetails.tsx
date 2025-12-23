import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { ArrowLeft, Pencil, Building2, MapPin, Globe, Phone, Mail } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api'; // Use your real API client
import { UserTableSkeleton } from '@/components/users/UserTableSkeleton';

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();

  // 1. Fetch real user data from MongoDB
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => api.getUser(id!),
    enabled: !!id, // Only fetch if ID exists
  });

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <Layout>
        <div className="page-container">
          <UserTableSkeleton />
        </div>
      </Layout>
    );
  }

  // 3. Handle Error or Missing User
  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="page-header mb-0">
              <h1 className="page-title text-3xl font-bold">{user.name}</h1>
              <p className="page-description text-lg">{user.email}</p>
            </div>
            <Button asChild className="shadow-sm">
              <Link to={`/users/${user._id}/edit`}> {/* Fix: Use user._id */}
                <Pencil className="mr-2 h-4 w-4" />
                Edit User
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="card-elevated p-6 animate-slide-up bg-card border rounded-xl">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{user.phone}</p>
                </div>
              </div>
              {user.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="text-sm font-medium">{user.website}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company */}
          <div className="card-elevated p-6 animate-slide-up bg-card border rounded-xl" style={{ animationDelay: '50ms' }}>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Company
            </h2>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Organization</p>
                <p className="text-sm font-medium">{user.company}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="card-elevated p-6 animate-slide-up bg-card border rounded-xl" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Address & Location
            </h2>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Full Address</p>
                <p className="text-sm font-medium">
                  {user.address.street}
                  {user.address.suite && <>, {user.address.suite}</>}
                </p>
                <p className="text-sm font-medium">
                  {user.address.city}, {user.address.zipcode}
                </p>
                
                {/* Visual touch: Show Geo Coordinates if they exist */}
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2">
                   <div>
                     <p className="text-[10px] text-muted-foreground uppercase">Lat</p>
                     <p className="text-xs font-mono">{user.address.geo?.lat}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-muted-foreground uppercase">Lng</p>
                     <p className="text-xs font-mono">{user.address.geo?.lng}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}