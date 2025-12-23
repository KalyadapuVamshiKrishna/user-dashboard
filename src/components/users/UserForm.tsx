import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '@/lib/api'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface UserFormProps {
  user?: User;
  onSubmit: (data: any) => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
}

export function UserForm({ user, onSubmit, isEditing = false, isLoading = false }: UserFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize state with nested backend data or empty strings
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    website: user?.website || '',
    street: user?.address?.street || '',
    suite: user?.address?.suite || '',
    city: user?.address?.city || '',
    zipcode: user?.address?.zipcode || '',
    lat: user?.address?.geo?.lat || '',
    lng: user?.address?.geo?.lng || '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the highlighted fields.',
        variant: 'destructive',
      });
      return;
    }

    // Mapping Flat UI State to Nested Backend Schema
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      website: formData.website,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat || "0.0",
          lng: formData.lng || "0.0"
        }
      }
    };

    onSubmit(payload);
  };

  return (
    <div className="page-container max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4 -ml-2 text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>

        <div className="page-header">
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Edit User Profile' : 'Create New User'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditing ? 'Update existing user information.' : 'Add a new member to the system.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section: Personal Info */}
          <div className="card-elevated p-6 space-y-4 bg-card border rounded-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Personal Details</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'border-destructive' : ''} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? 'border-destructive' : ''} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="example.com" />
              </div>
            </div>
          </div>

          {/* Section: Company Info */}
          <div className="card-elevated p-6 space-y-4 bg-card border rounded-xl">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Work Details</h2>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input id="company" name="company" value={formData.company} onChange={handleChange} />
            </div>
          </div>

          {/* Section: Full Address */}
          <div className="card-elevated p-6 space-y-4 bg-card border rounded-xl md:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Location Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input id="street" name="street" value={formData.street} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suite">Suite/Apt</Label>
                <Input id="suite" name="suite" value={formData.suite} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input id="lat" name="lat" value={formData.lat} onChange={handleChange} placeholder="0.0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input id="lng" name="lng" value={formData.lng} onChange={handleChange} placeholder="0.0000" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t pt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/')}>Cancel</Button>
          <Button type="submit" disabled={isLoading} className="px-8 shadow-md bg-indigo-600 text-white hover:bg-indigo-700">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Update Profile' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
}