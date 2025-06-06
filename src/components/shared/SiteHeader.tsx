
"use client";

import Link from 'next/link';
import { Camera, Menu, X, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Gallery" },
    { href: "/#contact", label: "Contact" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="bg-primary text-primary-foreground border-b border-primary/80 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/90 transition-colors">
          <Camera className="h-8 w-8 md:h-9 md:w-9" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Jayant Studio</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-lg text-primary-foreground hover:text-primary-foreground/80 transition-colors",
                    pathname === link.href && "font-semibold underline underline-offset-4"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </nav>

        {/* Mobile Navigation --- Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-primary text-primary-foreground p-0 border-l-primary-foreground/30">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-primary-foreground/30">
                   <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/90 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <Camera className="h-7 w-7" />
                    <h2 className="text-2xl font-headline font-semibold">Jayant Studio</h2>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-grow p-4">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "block text-lg text-primary-foreground hover:text-primary-foreground/80 transition-colors py-2",
                              pathname === link.href && "font-semibold underline underline-offset-4"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t border-primary-foreground/30 text-center text-sm text-primary-foreground/70">
                  &copy; {new Date().getFullYear()} Jayant Studio
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
