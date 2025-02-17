import { Sticker } from "@/app/types";
import { cn } from "@/lib/utils";
import { Plus, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

export default function StickerCard({ sticker, onClick }: { sticker: Sticker, onClick: any }) {
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-between">
        <div className="text-center w-full">
          <div className="text-xl md:text-2xl font-bold mb-1">#{sticker.number}</div>
          <div className="text-xs md:text-sm font-medium">{sticker.name}</div>
          {sticker.repeated > 0 && (
            <div className="mt-2 text-xs md:text-sm text-blue-600 font-semibold">
              {sticker.repeated} repetidos
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

      {
        sticker.type === "special" && (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>
        )
      }
    </div>);
};