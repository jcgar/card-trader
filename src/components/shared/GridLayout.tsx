import React from "react"

interface GridLayoutProps<T> {
  items: T[]
  columns: number
  renderItem: (item: T) => React.ReactNode
}

export function GridLayout<T>({ items, columns, renderItem }: GridLayoutProps<T>) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  )
}

