
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AdminNavClientProps {
  navLinks: NavLink[];
}

export function AdminNavClient({ navLinks }: AdminNavClientProps) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
        const Icon = link.icon;
        return (
          <Button 
            key={link.href} 
            variant={isActive ? "secondary" : "ghost"} 
            asChild 
            size="sm"
            className={cn(isActive && "font-semibold")}
          >
            <Link href={link.href}>
              <Icon className="mr-2 h-4 w-4" /> {link.label}
            </Link>
          </Button>
        );
      })}
    </>
  );
}
