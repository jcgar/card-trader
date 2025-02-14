
import { NavigationBar } from "@/components/NavigationBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Archive, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SearchResult = {
  id: number;
  name?: string;
  title?: string;
  collections?: number;
  followers?: number;
  users?: number;
  completed?: string;
  views?: number;
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions] = useState([
    "Pokemon", "Yu-Gi-Oh!", "Magic", "Dragon Ball",
    "Liga Santander", "NBA", "World Cup"
  ]);

  const mockResults: Record<string, SearchResult[]> = {
    users: [
      { id: 1, name: "Juan García", collections: 23, followers: 156 },
      { id: 2, name: "María López", collections: 15, followers: 89 },
    ],
    collections: [
      { id: 1, name: "Pokemon TCG 2024", users: 1234, completed: "85%" },
      { id: 2, name: "Liga 2023-24", users: 987, completed: "92%" },
    ],
    help: [
      { id: 1, title: "¿Cómo empezar una colección?", views: 1234 },
      { id: 2, title: "Guía de intercambios", views: 987 },
    ]
  };

  const allResults: SearchResult[] = [
    ...mockResults.users,
    ...mockResults.collections,
    ...mockResults.help
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white pt-16">
      <NavigationBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar colecciones, usuarios o ayuda..."
              className="pl-10 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 p-2 border z-10">
                {suggestions
                  .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => setSearchTerm(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
              </div>
            )}
          </div>

          <Tabs defaultValue="all">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">Todo</TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="collections" className="gap-2">
                <Archive className="w-4 h-4" />
                Colecciones
              </TabsTrigger>
              <TabsTrigger value="help" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                Ayuda
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {allResults.map((result) => (
                  <Card key={result.id} className="p-4">
                    <h3 className="font-semibold">{result.name || result.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {result.collections
                        ? `${result.collections} colecciones`
                        : result.users
                        ? `${result.users} usuarios`
                        : `${result.views} visualizaciones`}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6 mt-6">
              <div className="grid gap-4">
                {mockResults.users.map(user => (
                  <Card key={user.id} className="p-4">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">
                      {user.collections} colecciones · {user.followers} seguidores
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="collections" className="space-y-6 mt-6">
              <div className="grid gap-4">
                {mockResults.collections.map(collection => (
                  <Card key={collection.id} className="p-4">
                    <h3 className="font-semibold">{collection.name}</h3>
                    <p className="text-sm text-gray-600">
                      {collection.users} usuarios · {collection.completed} completada
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="help" className="space-y-6 mt-6">
              <div className="grid gap-4">
                {mockResults.help.map(article => (
                  <Card key={article.id} className="p-4">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.views} visualizaciones</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
