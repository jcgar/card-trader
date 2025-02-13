
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const stickerGroups = [
  {
    title: "Real Madrid",
    stickers: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      name: `Jugador ${i + 1}`,
      type: "regular",
      owned: Math.random() > 0.5,
      repeated: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    })),
  },
  {
    title: "Barcelona",
    stickers: Array.from({ length: 12 }, (_, i) => ({
      id: i + 13,
      number: i + 13,
      name: `Jugador ${i + 13}`,
      type: "regular",
      owned: Math.random() > 0.5,
      repeated: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    })),
  },
  // ... más equipos
];

export const StickerGrid = () => {
  return (
    <div className="space-y-8">
      {stickerGroups.map((group, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-bold mb-4 text-green-800">{group.title}</h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4">
              {group.stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className={`inline-block w-[150px] p-4 rounded-lg border-2 transition-all 
                    ${
                      sticker.owned
                        ? "border-green-500 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">#{sticker.number}</div>
                    <div className="text-sm truncate">{sticker.name}</div>
                    {sticker.repeated > 0 && (
                      <div className="mt-2 text-sm text-blue-600">
                        {sticker.repeated} repetidos
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      ))}
    </div>
  );
};
