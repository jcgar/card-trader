
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Heart, Menu, ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="font-playfair text-xl font-bold text-green-700">
              Card Trader
            </a>
            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-green-700">Collections</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px]">
                        <div className="flex items-center gap-2 text-green-700">
                          <Star className="w-4 h-4" />
                          <span>Popular Collections</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-700">
                          <Heart className="w-4 h-4" />
                          <span>Recommendations</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-700">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Live Exchange</span>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="px-4 py-2 text-green-700">
                      Events
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="px-4 py-2 text-green-700">
                      Blog
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!isMobile && (
              <>
                <Button variant="ghost" className="text-green-700">Sign In</Button>
                <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
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
              <a href="#" className="text-green-700 py-2">Collections</a>
              <a href="#" className="text-green-700 py-2">Events</a>
              <a href="#" className="text-green-700 py-2">Blog</a>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" className="text-green-700 w-full">Sign In</Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">Get Started</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
