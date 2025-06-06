export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} Jayant Studio. All rights reserved.</p>
        <p className="text-sm mt-1">Crafted with &hearts; for timeless memories.</p>
      </div>
    </footer>
  );
}
