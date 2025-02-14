
import { NavigationBar } from "@/components/NavigationBar";
import { FilterSidebar } from "@/components/collections/FilterSidebar";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { Pagination } from "@/components/ui/pagination";
import { FeaturedCollections } from "@/components/collections/FeaturedCollections";
import { CategorySlider } from "@/components/collections/CategorySlider";
import { collections } from "@/use/api/collections";

const PublicCollections = () => {
  // Group collections by category
  const collectionsByCategory = collections.reduce((acc, collection) => {
    if (!acc[collection.category]) {
      acc[collection.category] = [];
    }
    acc[collection.category].push(collection);
    return acc;
  }, {} as Record<string, typeof collections>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>
          
          <div className="lg:col-span-3 space-y-12">
            <FeaturedCollections />
            <FeaturedCategories />
            
            <div className="space-y-4">
              {Object.entries(collectionsByCategory).map(([category, categoryCollections]) => (
                <CategorySlider 
                  key={category} 
                  title={category} 
                  collections={categoryCollections}
                />
              ))}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Todas las colecciones</h2>
              <CollectionGrid />
              <div className="mt-8 flex justify-center">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicCollections;
