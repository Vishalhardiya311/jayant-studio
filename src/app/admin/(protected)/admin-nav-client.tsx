
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Layers, Image as ImageIconLucide, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Map of icon names to actual Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard: LayoutDashboard,
  Layers: Layers,
  ImageIcon: ImageIconLucide, // Key "ImageIcon" maps to the aliased Image component
};

interface NavLinkData {
  href: string;
  label: string;
  iconName: keyof typeof iconMap; // Use keyof for type safety
}

interface AdminNavClientProps {
  navLinks: NavLinkData[];
}

export function AdminNavClient({ navLinks }: AdminNavClientProps) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
        const IconComponent = iconMap[link.iconName]; // Get the component from the map
        
        if (!IconComponent) {
          // Optionally handle cases where iconName might not be in the map
          console.warn(`Icon not found for name: ${link.iconName}`);
          return null; 
        }

        return (
          <Button 
            key={link.href} 
            variant={isActive ? "secondary" : "ghost"} 
            asChild 
            size="sm"
            className={cn(isActive && "font-semibold")}
          >
            <Link href={link.href}>
              <IconComponent className="mr-2 h-4 w-4" /> {link.label}
            </Link>
          </Button>
        );
      })}
    </>
  );
}
