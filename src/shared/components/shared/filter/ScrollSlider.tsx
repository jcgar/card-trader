import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface ScrollSliderProps<T> {
  items: T[];
  itemsPerRow: number;
  renderItem: (item: T, idx: number) => ReactNode;
  onLoadMore?: () => void;
  activeIndex?: number;
  offsetIndex?: number;
  onBlockChange?: (index: number) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  handleArrows?: (direction: "prev" | "next") => void;
}

export function ScrollSlider<T>({
  items = [],
  itemsPerRow,
  renderItem,
  onLoadMore,
  activeIndex = 0,
  offsetIndex = 0,
  onBlockChange,
  hasPrevPage,
  hasNextPage,
  handleArrows,
}: ScrollSliderProps<T>) {


  const move = (direction: "prev" | "next") => {
    const swiper = swiperRef.current;
    if (!swiper) return;


    if (direction === "prev") {
      if (swiper.isBeginning) {
        setTimeout(() => {
          handleArrows && handleArrows(direction)
          swiper.slideTo(items.length / itemsPerRow)
        }, 1)
      } else {
        swiper.slidePrev();
      }
    }

    if (direction === "next") {
      if (swiper.isEnd) {
        setTimeout(() => {

          handleArrows && handleArrows(direction)
          swiper.slideTo(0)
        }, 1)

      } else {
        swiper.slideNext();
      }
    }
  }
  const swiperRef = useRef<SwiperClass | null>(null);
  const handleHold = (direction: "prev" | "next") => {
    move(direction)
    const interval = setInterval(() => {
      if (!holdInterval) return;
      move(direction)
    }, 200);

    return interval;
  };

  // useEffect(() => {
  //   if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex * itemsPerRow) {
  //     swiperRef.current.slideTo(activeIndex * itemsPerRow);
  //   }
  // }, [itemsPerRow]);

  const [holdInterval, setHoldInterval] = useState<NodeJS.Timeout | null>(null);

  // console.log('SCroll Slider', { activeIndex, offsetIndex })
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: false, // para un dot por pagina
        }}
        slidesPerView={itemsPerRow}
        slidesPerGroup={itemsPerRow}
        spaceBetween={16}
        grabCursor
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onReachEnd={() => {
          if (onLoadMore) onLoadMore();
        }}
        onSlideChange={(swiper) => {
          const blockIndex = Math.floor(swiper.activeIndex / itemsPerRow);
          if (onBlockChange) onBlockChange(blockIndex);
        }}>

        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            {renderItem(item, idx + offsetIndex)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botón anterior */}
      <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
        hidden={swiperRef.current?.isBeginning && !hasPrevPage}
        onMouseDown={() => setHoldInterval(handleHold("prev"))}
        onMouseUp={() => { if (holdInterval) clearInterval(holdInterval) }}
        onMouseLeave={() => { if (holdInterval) clearInterval(holdInterval) }}>
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botón siguiente */}
      <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
        hidden={swiperRef.current?.isEnd && !hasNextPage}
        onMouseDown={() => setHoldInterval(handleHold("next"))}
        onMouseUp={() => { if (holdInterval) clearInterval(holdInterval) }}
        onMouseLeave={() => { if (holdInterval) clearInterval(holdInterval) }}>
        <ChevronRight className="w-6 h-6" />
      </button>

    </div>
  );
}
