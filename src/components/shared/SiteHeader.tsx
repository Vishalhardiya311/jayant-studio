import Link from 'next/link';
import { Camera } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Camera className="h-8 w-8" />
          <h1 className="text-3xl font-headline font-semibold">Jayant Studio</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="text-lg text-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-lg text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            </li>
            {/* Add more navigation items here if needed, e.g., About, Contact */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
