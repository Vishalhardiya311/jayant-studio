
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAdmin } from '../login/actions'; 
import { AdminNavClient } from './admin-nav-client'; 

export default async function AdminLayout({ // Made this function async
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies(); // Access cookie store
  const sessionCookie = cookieStore.get('admin_session_active'); // Get specific cookie

  if (!sessionCookie || sessionCookie.value !== 'true') {
    redirect('/admin/login');
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard", iconName: "LayoutDashboard" as const },
    { href: "/admin/categories", label: "Categories", iconName: "Layers" as const },
    { href: "/admin/photos", label: "Photos", iconName: "ImageIcon" as const },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
      <header className="bg-card border-b p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-2">
          <h1 className="text-2xl font-headline text-primary text-center md:text-left">Admin Panel</h1>
          <nav className="flex flex-wrap gap-2 justify-center md:justify-end items-center">
            <AdminNavClient navLinks={navLinks} />
            <Button variant="outline" asChild size="sm">
              <Link href="/">
                <Eye className="mr-2 h-4 w-4" /> View Site
              </Link>
            </Button>
            <form action={logoutAdmin}>
              <Button variant="destructive" type="submit" size="sm">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 bg-muted/30 rounded-lg mt-4">
        {children}
      </main>
    </div>
  );
}
