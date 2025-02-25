import { NavigationBar } from "@/components/NavigationBar"
import { FilterSidebar } from "@/components/collections/FilterSidebar"
import { CollectionsByCategory } from "@/components/collections/CollectionsByCategory"
import { SuggestedCollections } from "@/components/collections/SuggestedCollections"
import { CollectionStats } from "@/components/collections/CollectionStats"

const NewCollection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h2 className="text-2xl font-bold">Colecciones sugeridas</h2>
            <SuggestedCollections />

            <h2 className="text-2xl font-bold mt-12">Explorar por categoría</h2>
            <CollectionsByCategory />

            <div className="mt-12">
              <CollectionStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NewCollection

