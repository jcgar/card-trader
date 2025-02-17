import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  Columns,
  BookOpen,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Camera,
  Upload,
  Save,
  Search,
  Star,
  Filter,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [layout, setLayout] = useState<LayoutType>(isMobile ? "grid" : "album");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changes, setChanges] = useState<Record<number, { owned: boolean, repeated: number }>>({});
  const [selectedSticker, setSelectedSticker] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (isMobile) {
        setCurrentPage(p => Math.min(totalPages, p + 1));
        if ("vibrate" in navigator) {
          navigator.vibrate(50);
        }
      }
    },
    onSwipedRight: (eventData) => {
      if (isMobile) {
        setCurrentPage(p => Math.max(1, p - 1));
        if ("vibrate" in navigator) {
          navigator.vibrate(50);
        }
      }
    },
  });

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

  const handleStickerClick = (sticker: any) => {
    setSelectedSticker(sticker);
    setIsEditing(true);
  };

  const handleQuickAction = (stickerId: number, action: "add" | "remove") => {
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

    const audio = new Audio('/assets/click.mp3');
    audio.play();

    toast({
      title: action === "add" ? "Cromo añadido" : "Cromo eliminado",
      description: `Se ha ${action === "add" ? "añadido" : "eliminado"} el cromo #${stickerId}`,
    });

    const pageStickers = getCurrentPageStickers();
    const isPageComplete = pageStickers.every(s => s.owned || changes[s.id]?.owned);
    if (isPageComplete) {
      toast({
        title: "¡Página completada!",
        description: "Has completado todos los cromos de esta página",
      });
      if (albumRef.current) {
        albumRef.current.classList.add('animate-shine');
        setTimeout(() => {
          if (albumRef.current) {
            albumRef.current.classList.remove('animate-shine');
          }
        }, 1000);
      }
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: "Cambios guardados",
      description: "Todos los cambios han sido guardados correctamente",
    });
    setHasUnsavedChanges(false);
  };

  const handleBulkEdit = (stickers: number[]) => {
    setHasUnsavedChanges(true);
    const newChanges = { ...changes };
    stickers.forEach(id => {
      newChanges[id] = { owned: true, repeated: 0 };
    });
    setChanges(newChanges);

    toast({
      title: "Cromos añadidos en masa",
      description: `Se han añadido ${stickers.length} cromos a tu colección`,
    });
  };

  const itemsPerPage = layout === "album" ? 12 : 24;
  const totalPages = Math.ceil(stickerGroups.length * 24 / itemsPerPage);

  const getCurrentPageStickers = () => {
    const allStickers = stickerGroups.flatMap(g => g.stickers);
    return allStickers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  const StickerCard = ({ sticker }: { sticker: any }) => {
    const stickChange = changes[sticker.id];
    const isOwned = stickChange ? stickChange.owned : sticker.owned;
    const repeated = stickChange ? stickChange.repeated : sticker.repeated;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          "relative rounded-lg border-2 transition-all duration-300 cursor-pointer group",
          isOwned
            ? "border-green-500 bg-green-50"
            : "border-red-200 bg-red-50",
          stickChange && "ring-2 ring-blue-400"
        )}
        style={{
          aspectRatio: layout === "album" ? "2/3" : "1",
        }}
        onClick={() => handleStickerClick(sticker)}
      >
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-between">
          <div className="text-center w-full">
            <div className="text-xl md:text-2xl font-bold mb-1">#{sticker.number}</div>
            <div className="text-xs md:text-sm font-medium">{sticker.name}</div>
            {repeated > 0 && (
              <div className="mt-2 text-xs md:text-sm text-blue-600 font-semibold">
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
              onClick={(e) => {
                e.stopPropagation();
                handleStickerClick(sticker);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {sticker.type === "special" && (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-6" {...handlers}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={layout === "scroll" ? "default" : "outline"}
            onClick={() => setLayout("scroll")}
          >
            <Columns className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            onClick={() => setLayout("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "album" ? "default" : "outline"}
            onClick={() => setLayout("album")}
          >
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Cromo #{selectedSticker?.number}</DialogTitle>
              <DialogDescription>
                Actualiza el estado y la cantidad de este cromo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction(selectedSticker?.id, "remove")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold">
                  {changes[selectedSticker?.id]?.repeated || 0}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handleQuickAction(selectedSticker?.id, "add")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {isMobile && (
                <Button className="w-full" onClick={() => setIsEditing(false)}>
                  <Camera className="h-4 w-4 mr-2" />
                  Escanear con cámara
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilter("all")}>
            Todas
          </Button>
          <Button variant="outline" onClick={() => setFilter("missing")}>
            Faltan
          </Button>
          <Button variant="outline" onClick={() => setFilter("repeated")}>
            Repetidas
          </Button>
        </div>

        {hasUnsavedChanges && (
          <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar cambios
          </Button>
        )}
      </div>

      <div ref={albumRef} className="relative">
        <AnimatePresence mode="wait">
          {layout === "album" && (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="grid grid-cols-3 gap-4 bg-green-50 p-6 rounded-lg shadow-inner"
            >
              {getCurrentPageStickers().map((sticker) => (
                <StickerCard key={sticker.id} sticker={sticker} />
              ))}
            </motion.div>
          )}

          {layout === "grid" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
            >
              {getCurrentPageStickers().map((sticker) => (
                <StickerCard key={sticker.id} sticker={sticker} />
              ))}
            </motion.div>
          )}

          {layout === "scroll" && (
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4">
                {getCurrentPageStickers().map((sticker) => (
                  <div key={sticker.id} className="w-[150px] flex-shrink-0">
                    <StickerCard sticker={sticker} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="py-2">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
