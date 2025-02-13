import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Grid, Columns, LayoutGrid, Plus, Minus, BookOpen, ArrowLeft, ArrowRight, Save, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

// Simulated data for all teams
const allTeams = [
  "Real Madrid",
  "Barcelona",
  "Atlético de Madrid",
  "Sevilla",
  "Valencia",
  "Real Sociedad",
  "Athletic Club",
  "Real Betis",
  "Villarreal",
  "Osasuna",
  "Rayo Vallecano",
  "Celta de Vigo",
];

// Generate stickers for all teams
const generateStickers = () => {
  let allStickers = [];
  let currentNumber = 1;

  for (const team of allTeams) {
    const teamStickers = Array.from({ length: 24 }, (_, i) => ({
      id: currentNumber + i,
      number: currentNumber + i,
      name: `${team} ${i + 1}`,
      type: i < 20 ? "regular" : "special",
      owned: Math.random() > 0.5,
      repeated: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    }));
    allStickers.push({
      title: team,
      stickers: teamStickers,
    });
    currentNumber += 24;
  }
  return allStickers;
};

const stickerGroups = generateStickers();

type LayoutType = "scroll" | "grid" | "album";

export const StickerGrid = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>(isMobile ? "grid" : "scroll");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changes, setChanges] = useState<Record<number, { owned: boolean, repeated: number }>>({});
  const itemsPerPage = layout === "album" ? 12 : isMobile ? 12 : 24;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleStickerClick = (stickerId: number, action: "add" | "remove") => {
    setHasUnsavedChanges(true);
    setChanges(prev => {
      const current = prev[stickerId] || { owned: true, repeated: 0 };
      return {
        ...prev,
        [stickerId]: {
          owned: action === "add",
          repeated: action === "add" ? current.repeated + 1 : Math.max(0, current.repeated - 1)
        }
      };
    });

    toast({
      title: action === "add" ? "Cromo añadido" : "Cromo eliminado",
      description: `Se ha ${action === "add" ? "añadido" : "eliminado"} el cromo #${stickerId}`,
      duration: 2000,
    });
  };

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios
    toast({
      title: "Cambios guardados",
      description: "Todos los cambios han sido guardados correctamente",
      duration: 3000,
    });
    setHasUnsavedChanges(false);
  };

  const filteredStickers = stickerGroups.flatMap(group => 
    group.stickers.filter(sticker => {
      const stickChange = changes[sticker.id];
      const isOwned = stickChange ? stickChange.owned : sticker.owned;
      const repeated = stickChange ? stickChange.repeated : sticker.repeated;

      if (filter === "missing") return !isOwned;
      if (filter === "repeated") return repeated > 0;
      return true;
    })
  );

  const totalPages = Math.ceil(filteredStickers.length / itemsPerPage);
  const currentStickers = filteredStickers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSuggestions = () => {
    const missing = filteredStickers.filter(s => !s.owned).length;
    const availableTrades = Math.floor(Math.random() * 10); // Simulado
    
    return [
      missing <= 5 && missing > 0 ? `¡Estás cerca! Solo te faltan ${missing} cromos para completar la colección` : null,
      availableTrades > 0 ? `${availableTrades} usuarios tienen cromos que necesitas` : null,
      hasUnsavedChanges ? "No olvides guardar tus cambios" : null,
    ].filter(Boolean);
  };

  const StickerCard = ({ sticker }: { sticker: typeof currentStickers[0] }) => {
    const stickChange = changes[sticker.id];
    const isOwned = stickChange ? stickChange.owned : sticker.owned;
    const repeated = stickChange ? stickChange.repeated : sticker.repeated;

    return (
      <div
        className={cn(
          "relative rounded-lg border-2 transition-all duration-300",
          isOwned
            ? "border-green-500 bg-green-50 hover:shadow-lg hover:scale-[1.02]"
            : "border-red-200 bg-red-50 hover:shadow-lg hover:scale-[1.02]",
          stickChange && "ring-2 ring-blue-400"
        )}
        style={{
          aspectRatio: layout === "album" ? "2/3" : "1",
        }}
      >
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-between">
          <div className="text-center w-full">
            <div className="text-xl md:text-2xl font-bold mb-1">#{sticker.number}</div>
            <div className="text-xs md:text-sm font-medium">{sticker.name}</div>
            {repeated > 0 && (
              <div className="mt-2 text-xs md:text-sm text-blue-600 font-semibold animate-pulse">
                {repeated} repetidos
              </div>
            )}
          </div>
          
          <div className={cn(
            "flex gap-2 mt-2",
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"
          )}>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-100 hover:bg-green-200 h-8 w-8 p-0"
              onClick={() => handleStickerClick(sticker.id, "add")}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-100 hover:bg-red-200 h-8 w-8 p-0"
              onClick={() => handleStickerClick(sticker.id, "remove")}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {sticker.type === "special" && (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <span className="animate-spin-slow inline-block">✨</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={layout === "scroll" ? "default" : "outline"}
            onClick={() => setLayout("scroll")}
            className="group"
          >
            <Columns className="h-4 w-4 group-hover:animate-pulse" />
          </Button>
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            onClick={() => setLayout("grid")}
            className="group"
          >
            <Grid className="h-4 w-4 group-hover:animate-pulse" />
          </Button>
          <Button
            variant={layout === "album" ? "default" : "outline"}
            onClick={() => setLayout("album")}
            className="group"
          >
            <BookOpen className="h-4 w-4 group-hover:animate-pulse" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={filter === "all" ? "bg-green-50" : ""}
            onClick={() => setFilter("all")}
          >
            Todas
          </Button>
          <Button
            variant="outline"
            className={filter === "missing" ? "bg-red-50" : ""}
            onClick={() => setFilter("missing")}
          >
            Faltan
          </Button>
          <Button
            variant="outline"
            className={filter === "repeated" ? "bg-blue-50" : ""}
            onClick={() => setFilter("repeated")}
          >
            Repetidas
          </Button>
        </div>

        {hasUnsavedChanges && (
          <Button 
            onClick={handleSaveChanges}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar cambios
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {getSuggestions().map((suggestion, index) => (
          <Alert key={index} className="bg-blue-50 text-blue-800 animate-fade-in">
            <AlertDescription className="flex items-center gap-2">
              {suggestion}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {layout === "scroll" && (
        <div className="space-y-8">
          {stickerGroups.map((group, index) => (
            <Card key={index} className="p-6 animate-fade-in relative group">
              <h3 className="text-xl font-bold mb-4 text-green-800">{group.title}</h3>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const scrollArea = document.getElementById(`scroll-${index}`);
                    if (scrollArea) scrollArea.scrollLeft -= 200;
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const scrollArea = document.getElementById(`scroll-${index}`);
                    if (scrollArea) scrollArea.scrollLeft += 200;
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <ScrollArea className="w-full whitespace-nowrap px-10" id={`scroll-${index}`}>
                  <div className="flex space-x-4">
                    {group.stickers.map((sticker) => (
                      <div key={sticker.id} className="w-[130px] md:w-[150px] group">
                        <StickerCard sticker={sticker} />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </Card>
          ))}
        </div>
      )}

      {layout === "grid" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
            {currentStickers.map((sticker) => (
              <div key={sticker.id} className="group">
                <StickerCard sticker={sticker} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber = i + 1;
                  if (currentPage > 3 && totalPages > 5) {
                    pageNumber = currentPage - 2 + i;
                    if (pageNumber > totalPages) pageNumber = totalPages - (4 - i);
                  }
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <span className="px-2">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}

      {layout === "album" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-3 gap-4 aspect-[3/4] bg-green-50 p-6 rounded-lg shadow-inner">
            {currentStickers.map((sticker) => (
              <div key={sticker.id} className="group">
                <StickerCard sticker={sticker} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber = i + 1;
                  if (currentPage > 3 && totalPages > 5) {
                    pageNumber = currentPage - 2 + i;
                    if (pageNumber > totalPages) pageNumber = totalPages - (4 - i);
                  }
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <span className="px-2">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};
