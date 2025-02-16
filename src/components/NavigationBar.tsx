import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { routes } from "@/use/routes";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogin = (type: 'user' | 'admin') => {
    setIsLoggedIn(true);
    setIsAdmin(type === 'admin');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to={routes.home} className="font-playfair text-xl font-bold text-green-700">
              Card Trader
            </Link>
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to={routes.collections} className="px-4 py-2 text-green-700">
                      Colecciones
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.community} className="px-4 py-2 text-green-700">
                      Comunidad
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.blog} className="px-4 py-2 text-green-700">
                      Blog
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.help} className="px-4 py-2 text-green-700">
                      Ayuda
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button 
                      variant="ghost" 
                      className="px-4 py-2 text-green-700"
                      onClick={() => navigate(routes.search)}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!isMobile && (
              <>
                {!isLoggedIn ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-green-700">Iniciar sesión</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Iniciar sesión</DialogTitle>
                        <DialogDescription>
                          Elige un tipo de acceso para probar la aplicación
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        <Button onClick={() => handleLogin('user')}>
                          Entrar como Usuario
                        </Button>
                        <Button onClick={() => handleLogin('admin')} variant="outline">
                          Entrar como Administrador
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-green-700">
                        <User className="w-4 h-4 mr-2" />
                        {isAdmin ? 'Admin' : 'Usuario'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(routes.dashboard)}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(routes.myCollections)}>
                        Mis colecciones
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem onClick={() => navigate(routes.admin.users)} className="text-red-600">
                          Admin Panel
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Cerrar sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-green-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link to={routes.collections} className="text-green-700 py-2">Colecciones</Link>
              <Link to={routes.community} className="text-green-700 py-2">Comunidad</Link>
              <Link to={routes.blog} className="text-green-700 py-2">Blog</Link>
              <Link to={routes.help} className="text-green-700 py-2">Ayuda</Link>
              <Link to={routes.search} className="text-green-700 py-2">Buscar</Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                {!isLoggedIn ? (
                  <>
                    <Button onClick={() => handleLogin('user')}>
                      Entrar como Usuario
                    </Button>
                    <Button variant="outline" onClick={() => handleLogin('admin')}>
                      Entrar como Admin
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to={routes.dashboard} className="text-green-700 py-2">Dashboard</Link>
                    <Link to={routes.myCollections} className="text-green-700 py-2">Mis colecciones</Link>
                    {isAdmin && (
                      <Button variant="destructive" onClick={() => navigate(routes.admin.users)}>Admin Panel</Button>
                    )}
                    <Button variant="outline" onClick={handleLogout}>
                      Cerrar sesión
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
