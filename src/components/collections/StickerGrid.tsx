
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
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { StickerCard } from "../cards/StickerCard";
import { Sticker } from "@/app/types";

type LayoutType = "scroll" | "grid" | "album";
type FilterType = "all" | "missing" | "repeated" | "special" | "favorites";

export const StickerGrid = () => {
  const isMobile = useIsMobile();
  const [layout, setLayout] = useState<LayoutType>(isMobile ? "grid" : "album");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changes, setChanges] = useState<Record<number, { owned: boolean; repeated: number; favorite?: boolean }>>({});
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [selectedBulkStickers, setSelectedBulkStickers] = useState<number[]>([]);
  const albumRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile) {
        nextPage();
        vibrate();
      }
    },
    onSwipedRight: () => {
      if (isMobile) {
        previousPage();
        vibrate();
      }
    },
  });

  const vibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

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

  const handleStickerClick = (sticker: Sticker) => {
    if (isBulkEditing) {
      toggleBulkSelection(sticker.id);
    } else {
      setSelectedSticker(sticker);
      setIsEditing(true);
    }
  };

  const toggleBulkSelection = (stickerId: number) => {
    setSelectedBulkStickers(prev => 
      prev.includes(stickerId) 
        ? prev.filter(id => id !== stickerId)
        : [...prev, stickerId]
    );
  };

  const handleQuickAction = (stickerId: number, action: "add" | "remove" | "favorite") => {
    setHasUnsavedChanges(true);
    setChanges(prev => {
      const current = prev[stickerId] || { owned: true, repeated: 0 };
      
      if (action === "favorite") {
        return {
          ...prev,
          [stickerId]: {
            ...current,
            favorite: !current.favorite
          }
        };
      }

      return {
        ...prev,
        [stickerId]: {
          ...current,
          owned: action === "add",
          repeated: action === "add" ? current.repeated + 1 : Math.max(0, current.repeated - 1)
        }
      };
    });

    playSound();
    showToast(action, stickerId);
    checkPageCompletion();
  };

  const playSound = () => {
    const audio = new Audio('/assets/click.mp3');
    audio.play();
  };

  const showToast = (action: string, stickerId: number) => {
    const messages = {
      add: "Cromo añadido",
      remove: "Cromo eliminado",
      favorite: "Añadido a favoritos"
    };

    toast({
      title: messages[action],
      description: `Cromo #${stickerId} ${action === 'add' ? 'añadido a' : 'eliminado de'} tu colección`,
    });
  };

  const checkPageCompletion = () => {
    const pageStickers = getCurrentPageStickers();
    const isPageComplete = pageStickers.every(s => s.owned || changes[s.id]?.owned);
    
    if (isPageComplete) {
      toast({
        title: "¡Página completada! 🎉",
        description: "Has completado todos los cromos de esta página",
      });
      
      if (albumRef.current) {
        albumRef.current.classList.add('animate-shine');
        setTimeout(() => {
          albumRef.current?.classList.remove('animate-shine');
        }, 1000);
      }
    }
  };

  const handleBulkEdit = () => {
    setHasUnsavedChanges(true);
    const newChanges = { ...changes };
    selectedBulkStickers.forEach(id => {
      newChanges[id] = { owned: true, repeated: 0 };
    });
    setChanges(newChanges);

    toast({
      title: "Edición masiva completada",
      description: `Se han actualizado ${selectedBulkStickers.length} cromos`,
    });

    setIsBulkEditing(false);
    setSelectedBulkStickers([]);
  };

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar en el backend
    toast({
      title: "Cambios guardados",
      description: "Todos los cambios han sido guardados correctamente",
    });
    setHasUnsavedChanges(false);
  };

  const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const previousPage = () => setCurrentPage(p => Math.max(1, p - 1));

  const itemsPerPage = layout === "album" ? 12 : 24;
  const totalPages = Math.ceil(stickerGroups.length * 24 / itemsPerPage);

  const getCurrentPageStickers = () => {
    let stickers = stickerGroups.flatMap(g => g.stickers);

    // Aplicar filtros
    stickers = stickers.filter(sticker => {
      const change = changes[sticker.id];
      const isOwned = change ? change.owned : sticker.owned;
      const repeated = change ? change.repeated : sticker.repeated;
      const isFavorite = change?.favorite;

      switch (filterType) {
        case "missing":
          return !isOwned;
        case "repeated":
          return repeated > 0;
        case "special":
          return sticker.type === "special";
        case "favorites":
          return isFavorite;
        default:
          return true;
      }
    });

    // Aplicar búsqueda
    if (searchTerm) {
      stickers = stickers.filter(sticker => 
        sticker.number.toString().includes(searchTerm) ||
        sticker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return stickers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  return (
    <div className="space-y-6" {...handlers}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={layout === "scroll" ? "default" : "outline"}
            onClick={() => setLayout("scroll")}
            className="tooltip"
            data-tip="Vista scroll"
          >
            <Columns className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            onClick={() => setLayout("grid")}
            className="tooltip"
            data-tip="Vista grid"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={layout === "album" ? "default" : "outline"}
            onClick={() => setLayout("album")}
            className="tooltip"
            data-tip="Vista álbum"
          >
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por número o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setFilterType("all")}
            className={cn(filterType === "all" && "bg-primary text-primary-foreground")}
          >
            Todas
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("missing")}
            className={cn(filterType === "missing" && "bg-primary text-primary-foreground")}
          >
            Faltan
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("repeated")}
            className={cn(filterType === "repeated" && "bg-primary text-primary-foreground")}
          >
            Repetidas
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterType("special")}
            className={cn(filterType === "special" && "bg-primary text-primary-foreground")}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Especiales
          </Button>
        </div>

        <div className="flex gap-2">
          {!isBulkEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsBulkEditing(true)}
              className="text-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Edición masiva
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                onClick={handleBulkEdit}
                disabled={selectedBulkStickers.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Aplicar ({selectedBulkStickers.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsBulkEditing(false);
                  setSelectedBulkStickers([]);
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </div>

        {hasUnsavedChanges && (
          <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar cambios
          </Button>
        )}
      </div>

      {/* Modal de edición */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Editar Cromo #{selectedSticker?.number}
              {selectedSticker?.type === "special" && (
                <Star className="inline-block ml-2 h-4 w-4 text-yellow-500" />
              )}
            </DialogTitle>
            <DialogDescription>
              Actualiza el estado y la cantidad de este cromo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "remove")}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold">
                  {selectedSticker && (changes[selectedSticker.id]?.repeated || 0)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "add")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => selectedSticker && handleQuickAction(selectedSticker.id, "favorite")}
              >
                <Heart className={cn(
                  "h-4 w-4 mr-2",
                  selectedSticker && changes[selectedSticker.id]?.favorite && "fill-red-500 text-red-500"
                )} />
                Favorito
              </Button>
              
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
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

      <div ref={albumRef} className="relative">
        <AnimatePresence mode="wait">
          {layout === "album" && (
            <motion.div
              key={`album-${currentPage}`}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              className="grid grid-cols-3 md:grid-cols-4 gap-4 bg-green-50 p-6 rounded-lg shadow-inner"
            >
              {getCurrentPageStickers().map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  sticker={sticker}
                  onClick={handleStickerClick}
                  isSelected={isBulkEditing && selectedBulkStickers.includes(sticker.id)}
                  changes={changes[sticker.id]}
                />
              ))}
            </motion.div>
          )}

          {layout === "grid" && (
            <motion.div
              key={`grid-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4"
            >
              {getCurrentPageStickers().map((sticker) => (
                <StickerCard
                  key={sticker.id}
                  sticker={sticker}
                  onClick={handleStickerClick}
                  isSelected={isBulkEditing && selectedBulkStickers.includes(sticker.id)}
                  changes={changes[sticker.id]}
                />
              ))}
            </motion.div>
          )}

          {layout === "scroll" && (
            <ScrollArea className="w-full h-[500px] rounded-lg border">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {getCurrentPageStickers().map((sticker) => (
                  <StickerCard
                    key={sticker.id}
                    sticker={sticker}
                    onClick={handleStickerClick}
                    isSelected={isBulkEditing && selectedBulkStickers.includes(sticker.id)}
                    changes={changes[sticker.id]}
                  />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="py-2">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
