
import { Instagram } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://www.instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-7 w-7" />
          </a>
          {/* Add other social media icons here if needed */}
        </div>
        <p className="mb-2">Phone: <a href="tel:+919827314661" className="hover:text-primary transition-colors">+91 9827314661</a></p>
        <p>&copy; {currentYear} Jayant Studio. All rights reserved.</p>
        <p className="text-sm mt-1">Crafted with &hearts; for timeless memories.</p>
      </div>
    </footer>
  );
}
