
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, Heart, Grid, Archive } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Collection } from "@/app/types";
import { ScrollableCards } from "@/components/cards/ScrollableCards";
import CollectionCard from "../cards/CollectionCard";
import { Link } from "react-router-dom";
import { generateCollectionPath } from "@/use/routes";

interface CategorySliderProps {
  title: string;
  itemsPerPage: number;
  collections: Collection[];
}

export const CategorySlider = ({ title, itemsPerPage, collections }: CategorySliderProps) => {

  // Calculate total stats for the category
  const categoryStats = {
    totalCollectors: collections.reduce((sum, col) => sum + col.activeUsers, 0),
    totalLikes: collections.reduce((sum, col) => sum + col.likes, 0),
  };

  const renderCollection = (collection: Collection) => (
    <Link to={generateCollectionPath(collection.id)}>
      <Card
        key={collection.id}
        className="w-[280px] overflow-hidden group/card hover:shadow-lg transition-shadow duration-200"
      > <CollectionCard collection={collection} />
      </Card>
    </Link>
  )

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
    <div className="relative group space-y-4">

      <ScrollableCards
        items={collections}
        renderItem={renderCollection}
        title={renderTitle}
        itemsPerPage={itemsPerPage}
        onLoadMore={handleLoadMore}
        className="py-4"
      />

    </div>

  );
};
