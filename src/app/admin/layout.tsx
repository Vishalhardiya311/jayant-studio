
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
        <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-2">
          <h1 className="text-2xl font-headline text-primary text-center md:text-left">Admin Panel</h1>
          <nav className="flex flex-wrap gap-2 justify-center md:justify-end">
            <Button variant="ghost" asChild size="sm">
              <Link href="/admin">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="/admin/categories">
                <Layers className="mr-2 h-4 w-4" /> Categories
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="/admin/photos">
                <ImageIcon className="mr-2 h-4 w-4" /> Photos
              </Link>
            </Button>
             <Button variant="outline" asChild size="sm">
              <Link href="/">
                View Site
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 bg-muted/30 rounded-lg mt-4">
        {children}
      </main>
    </div>
  );
}
