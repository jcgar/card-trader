
import { NavigationBar } from "@/components/NavigationBar";
import { FilterSidebar } from "@/components/collections/FilterSidebar";
import { FeaturedCollections } from "@/components/collections/FeaturedCollections";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { Pagination } from "@/components/ui/pagination";

const PublicCollections = () => {
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
