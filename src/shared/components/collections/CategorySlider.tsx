import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Heart, Grid, Archive } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Collection, Rarity } from "@/shared/app/types";
import { ScrollableCards } from "@/shared/components/cards/ScrollableCards";
import CollectionCard from "../cards/CollectionCard";
import { Link } from "@/shared/use/navigate";
import { generateCollectionPath } from "@/shared/use/routes";
import FeaturedCollectionsCard from "../cards/FeaturedCollectionsCard";

interface CategorySliderProps {
  title: string;
  itemsPerPage: number;
  collections: Collection[];
  onCollectionClick: (collectionId: string) => void;
}

export const CategorySlider = ({ title, itemsPerPage, collections, onCollectionClick }: CategorySliderProps) => {
  // Calculate total stats for the category
  const categoryStats = {
    totalCollectors: collections.reduce((sum, col) => sum + col.activeUsers, 0),
    totalLikes: collections.reduce((sum, col) => sum + col.likes, 0),
  };

  function getTypeByPopularity(value) {
    const thresholds = [
      { max: 25, type: Rarity.Common },
      { max: 50, type: Rarity.Rare },
      { max: 75, type: Rarity.Epic },
      { max: 100, type: Rarity.Legendary }
    ];

    const level = thresholds.find(t => value <= t.max);
    return level ? level.type : Rarity.Common;
  }

  const renderItem = (collection: Collection) => {
    const type = getTypeByPopularity(collection.popularity)
    return (
      <Link to={generateCollectionPath(collection.id)} onClick={onCollectionClick}>
        <CollectionCard collection={collection} type={type} />
      </Link>
    )
  }

  // const renderCollection = (collection: Collection) => (
  //   <Card
  //     key={collection.id}
  //     onClick={() => onCollectionClick(collection.id)}
  //     className="w-[280px] overflow-hidden group/card hover:shadow-lg transition-shadow duration-200"
  //   >
  //     {" "}
  //     <CollectionsCard collection={collection} />
  //   </Card>

  // )

  const renderTitle = (
    <>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
        <span className="flex items-center gap-1">
          <Archive className="h-4 w-4" />
          {collections.length} colecciones
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {categoryStats.totalCollectors} coleccionistas
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          {categoryStats.totalLikes} likes
        </span>
      </div>
    </>
  )

  const handleLoadMore = () => {
    console.log("Load more collections");
    // Implement load more logic here
  };

  return (
    <div className="relative space-y-4">

      <ScrollableCards
        items={collections}
        renderItem={renderItem}
        title={renderTitle}
        itemsPerPage={itemsPerPage}
        onLoadMore={handleLoadMore}
        className="py-4"
      />

    </div>

  );
};

