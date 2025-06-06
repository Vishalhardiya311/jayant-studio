
import React from 'react';
import CategoryForm from "@/components/admin/CategoryForm";
import CategoryList from "@/components/admin/CategoryList";
import { getCategories } from "@/lib/data";

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

export default async function ManageCategoriesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  React.use(searchParams); // Explicitly consume/resolve the searchParams Thenable

  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-headline mb-2">Manage Categories</h2>
        <p className="text-muted-foreground">
          Create new categories or view existing ones. Categories help organize your photos in the public gallery.
        </p>
      </div>
      <CategoryForm />
      <CategoryList categories={categories} />
    </div>
  );
}
