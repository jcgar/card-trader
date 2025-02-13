
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Filter, Search, Plus, Minus, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CollectionFilters = () => {
  const [filterType, setFilterType] = useState("all");
  const [numberInput, setNumberInput] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const handleNumberInput = (value: string) => {
    setNumberInput(value);
    const numbers = value
      .split(",")
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));
    setSelectedNumbers(numbers);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="search">Buscar por número</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              className="pl-9"
              placeholder="Ej: 1, 2, 3, 4..."
              value={numberInput}
              onChange={(e) => handleNumberInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className={filterType === "all" ? "bg-green-50" : ""}
            onClick={() => setFilterType("all")}
          >
            Todas
          </Button>
          <Button
            variant="outline"
            className={filterType === "missing" ? "bg-red-50" : ""}
            onClick={() => setFilterType("missing")}
          >
            Faltan
          </Button>
          <Button
            variant="outline"
            className={filterType === "repeated" ? "bg-blue-50" : ""}
            onClick={() => setFilterType("repeated")}
          >
            Repetidas
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Añadir selección
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Minus className="mr-2 h-4 w-4" />
              Quitar selección
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reiniciar filtros
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedNumbers.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            Números seleccionados: {selectedNumbers.join(", ")}
          </p>
        </div>
      )}
    </Card>
  );
};
