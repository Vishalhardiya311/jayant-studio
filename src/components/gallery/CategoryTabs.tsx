"use client";

import type { Category } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryTabs({ categories, selectedCategoryId, onSelectCategory }: CategoryTabsProps) {
  const handleValueChange = (value: string) => {
    onSelectCategory(value === 'all' ? null : value);
  };

  return (
    <Tabs 
      value={selectedCategoryId === null ? 'all' : selectedCategoryId} 
      onValueChange={handleValueChange}
      className="mb-8 flex justify-center"
    >
      <TabsList className="bg-card shadow-md">
        <TabsTrigger value="all" className="text-base px-4 py-2">All</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id} className="text-base px-4 py-2">
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
