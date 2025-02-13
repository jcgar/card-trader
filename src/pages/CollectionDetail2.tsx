import { NavigationBar } from "@/components/NavigationBar";
import { CollectionOverview } from "@/components/collections/CollectionOverview";
import { StickerGrid } from "@/components/collections/StickerGrid";
import { CollectionActions } from "@/components/collections/CollectionActions";
import { CollectionStats } from "@/components/collections/CollectionStats";
import { CollectionSocial } from "@/components/collections/CollectionSocial";
import { CollectionFilters } from "@/components/collections/CollectionFilters";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CollectionDetail2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/dashboard/colecciones")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a colecciones
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CollectionOverview />
            <CollectionFilters />
            <StickerGrid />
          </div>
          
          <div className="space-y-8">
            <CollectionStats />
            <CollectionActions />
            <CollectionSocial />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectionDetail2;
