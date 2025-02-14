
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Heart } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Collection } from "@/app/types";

interface CategorySliderProps {
  title: string;
  collections: Collection[];
}

export const CategorySlider = ({ title, collections }: CategorySliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    
    const scrollAmount = direction === "left" ? -400 : 400;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Check initial scroll state
      handleScroll();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative group py-8" ref={containerRef}>
      <h2 className="text-xl font-semibold mb-4 px-4">{title}</h2>
      
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <ScrollArea className="w-full">
        <div 
          className={cn(
            "flex gap-4 px-4 transition-opacity duration-500",
            !isInView && "opacity-0",
            isInView && "opacity-100"
          )}
        >
          {collections.map((collection) => (
            <Card 
              key={collection.id} 
              className="flex-shrink-0 w-[300px] overflow-hidden group/card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative aspect-[16/9]">
                {isInView && (
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover/card:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-white font-semibold text-lg">{collection.name}</h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {collection.activeUsers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {collection.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="opacity-0" />
      </ScrollArea>
      
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
