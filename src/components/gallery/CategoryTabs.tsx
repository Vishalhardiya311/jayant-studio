
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
      className="mb-8 w-full" // Removed flex justify-center
    >
      <div className="w-full overflow-x-auto pb-2 no-scrollbar">
        <TabsList className="bg-card shadow-md w-full justify-center"> {/* Removed mx-auto, added w-full and justify-center */}
          <TabsTrigger value="all" className="text-base px-4 py-2 whitespace-nowrap">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-base px-4 py-2 whitespace-nowrap">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}

// Helper class to hide scrollbar if needed, add to globals.css if you want to use it
// .no-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// .no-scrollbar {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }
