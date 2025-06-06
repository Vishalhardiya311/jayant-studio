import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers, Image as ImageIcon, PlusCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline">Welcome to the Admin Dashboard</h2>
      <p className="text-muted-foreground">
        Manage your wedding photography portfolio with ease. Add new categories, upload stunning photos, and keep your website fresh.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              Manage Categories
            </CardTitle>
            <CardDescription>
              Create, view, and organize your photo categories like Pre-Wedding, Reception, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/categories">
                <PlusCircle className="mr-2 h-4 w-4" /> Go to Categories
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-primary" />
              Manage Photos
            </CardTitle>
            <CardDescription>
              Upload new photos, assign them to categories, and manage your existing gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/photos">
                <PlusCircle className="mr-2 h-4 w-4" /> Go to Photos
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for future stats or quick actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Statistics about your gallery will be shown here in the future (e.g., total photos, number of categories).</p>
        </CardContent>
      </Card>

    </div>
  );
}
