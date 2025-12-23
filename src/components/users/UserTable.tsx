import { Eye, Pencil, Trash2, Users, MapPin, Building2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '@/lib/api'; 
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

export function UserTable({ users, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-full p-6 mb-4">
          <Users className="h-10 w-10 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold">No users found</h3>
        <p className="text-muted-foreground mt-2 max-w-xs">Start by adding a new member to your management portal.</p>
        <Button asChild className="mt-6 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
          <Link to="/users/new">Add First User</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 border-none">
              <TableHead className="font-bold text-xs uppercase tracking-wider py-4 pl-6">Member Information</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Company</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider py-4">Location</TableHead>
              <TableHead className="text-right font-bold text-xs uppercase tracking-wider py-4 pr-6">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="group border-b border-border/40 transition-all hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10">
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-4">
                    {/* Consistent Gradient Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground text-sm">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                    <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                    {user.company}
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                    {user.address?.city || 'N/A'}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-1 opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-100/5">
                      <Link to={`/users/${user._id}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-100/5">
                      <Link to={`/users/${user._id}/edit`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <DeleteButton user={user} onDelete={onDelete} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- MOBILE CARD VIEW --- */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="bg-card border border-border/50 rounded-2xl p-5 shadow-sm space-y-5 relative overflow-hidden group">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground text-base truncate">{user.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/40">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Company</span>
                <span className="text-xs font-medium truncate">{user.company}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Location</span>
                <span className="text-xs font-medium truncate">{user.address?.city}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
               <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="h-9 rounded-xl px-4 border-indigo-100 dark:border-indigo-900">
                  <Link to={`/users/${user._id}`}>View Profile</Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="h-9 rounded-xl px-4 border-indigo-100 dark:border-indigo-900">
                  <Link to={`/users/${user._id}/edit`}>Edit</Link>
                </Button>
               </div>
               <DeleteButton user={user} onDelete={onDelete} isMobile />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeleteButton({ user, onDelete, isMobile = false }: { user: User, onDelete: (id: string) => void, isMobile?: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className={`h-9 w-9 rounded-xl ${isMobile ? 'text-destructive/70' : 'text-muted-foreground hover:text-destructive hover:bg-destructive/10'}`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Confirm Removal</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to remove <span className="text-foreground font-semibold">{user.name}</span>? This action is permanent.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="rounded-2xl border-indigo-50">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => onDelete(user._id)} 
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}