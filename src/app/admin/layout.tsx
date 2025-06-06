import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Image as ImageIcon, Layers } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
      <header className="bg-card border-b p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-headline text-primary">Admin Panel</h1>
          <nav className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin/categories">
                <Layers className="mr-2 h-4 w-4" /> Categories
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin/photos">
                <ImageIcon className="mr-2 h-4 w-4" /> Photos
              </Link>
            </Button>
             <Button variant="outline" asChild>
              <Link href="/">
                View Site
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 bg-muted/30 rounded-lg mt-4">
        {children}
      </main>
    </div>
  );
}
