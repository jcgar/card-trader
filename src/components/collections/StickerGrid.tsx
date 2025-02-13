
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Grid, Columns, LayoutGrid, Plus, Minus, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [layout, setLayout] = useState<LayoutType>("scroll");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = layout === "album" ? 12 : 24;

  const handleStickerClick = (stickerId: number, action: "add" | "remove") => {
    // Here we would update the sticker state
    console.log(`${action} sticker ${stickerId}`);
  };

  const filteredStickers = stickerGroups.flatMap(group => 
    group.stickers.filter(sticker => {
      if (filter === "missing") return !sticker.owned;
      if (filter === "repeated") return sticker.repeated > 0;
      return true;
    })
  );

  const totalPages = Math.ceil(filteredStickers.length / itemsPerPage);
  const currentStickers = filteredStickers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StickerCard = ({ sticker }: { sticker: typeof currentStickers[0] }) => (
    <div
      className={cn(
        "relative group rounded-lg border-2 transition-all duration-300 hover:scale-105",
        sticker.owned
          ? "border-green-500 bg-green-50"
          : "border-red-200 bg-red-50"
      )}
      style={{
        aspectRatio: layout === "album" ? "2/3" : "1",
      }}
    >
      <div className="absolute inset-0 p-4 flex flex-col items-center justify-between">
        <div className="text-center w-full">
          <div className="text-2xl font-bold mb-2">#{sticker.number}</div>
          <div className="text-sm truncate">{sticker.name}</div>
          {sticker.repeated > 0 && (
            <div className="mt-2 text-sm text-blue-600 font-semibold">
              {sticker.repeated} repetidos
            </div>
          )}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            className="bg-green-100 hover:bg-green-200"
            onClick={() => handleStickerClick(sticker.id, "add")}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-red-100 hover:bg-red-200"
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
      </div>

      {layout === "scroll" && (
        <div className="space-y-8">
          {stickerGroups.map((group, index) => (
            <Card key={index} className="p-6 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-green-800">{group.title}</h3>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-4">
                  {group.stickers.map((sticker) => (
                    <div key={sticker.id} className="w-[150px]">
                      <StickerCard sticker={sticker} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Card>
          ))}
        </div>
      )}

      {layout === "grid" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentStickers.map((sticker) => (
              <StickerCard key={sticker.id} sticker={sticker} />
            ))}
          </div>
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
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
              <StickerCard key={sticker.id} sticker={sticker} />
            ))}
          </div>
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
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
