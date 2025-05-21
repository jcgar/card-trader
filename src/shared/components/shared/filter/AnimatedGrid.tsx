import { motion } from "framer-motion";

interface AnimatedGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerRow?: number;
}

export function AnimatedGrid<T>({ items, renderItem, itemsPerRow = 4 }: AnimatedGridProps<T>) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${itemsPerRow} gap-4`}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.02 }}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </div>
  );
}
