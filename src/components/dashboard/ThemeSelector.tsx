
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Moon, Sun, Palette } from "lucide-react";
import { useState } from "react";

const themes = [
  { id: "light", name: "Clásico", icon: Sun },
  { id: "dark", name: "Oscuro", icon: Moon },
  { id: "sports", name: "Deportes", icon: Palette },
];

export const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Tema Visual</h3>
      <div className="grid grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant={selectedTheme === theme.id ? "default" : "outline"}
            className={`flex flex-col items-center p-4 h-auto ${
              selectedTheme === theme.id
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-200"
            }`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <theme.icon className="w-6 h-6 mb-2" />
            <span className="text-sm">{theme.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
