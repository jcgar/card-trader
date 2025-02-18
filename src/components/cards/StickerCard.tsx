
import { Sticker } from "@/app/types";
import { cn } from "@/lib/utils";
import { Plus, Star, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

interface StickerCardProps {
  sticker: Sticker;
  onClick: (sticker: Sticker) => void;
  isSelected?: boolean;
  changes?: {
    owned: boolean;
    repeated: number;
    favorite?: boolean;
  };
}

export const StickerCard = ({
  sticker,
  onClick,
  isSelected,
  changes
}: StickerCardProps) => {
  const isMobile = useIsMobile();
  const isOwned = changes ? changes.owned : sticker.owned;
  const repeated = changes ? changes.repeated : sticker.repeated;
  const isFavorite = changes?.favorite;

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 transition-all duration-300 cursor-pointer group",
        isOwned
          ? "border-green-500 bg-green-50"
          : "border-red-200 bg-red-50",
        isSelected && "ring-2 ring-blue-400",
        "hover:shadow-md"
      )}
      style={{
        aspectRatio: "2/3",
      }}
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
              onClick(sticker);
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

      {isFavorite && (
        <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
      )}
    </div>
  );
}
