"use client"

import { Button } from "./ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu"
import { Search, Menu, X, User, Globe } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { routes } from "@/use/routes"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuthFlow } from "@/components/auth/AuthFlow"
import { getCurrentLanguage, setLanguage, t } from "@/use/i18n"
import { useAuth } from "@/use/auth"

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const currentLanguage = getCurrentLanguage()
  const { user, login, logout } = useAuth()

  const handleLogin = async (userData) => {
    await login(userData)
  }

  const handleLogout = async () => {
    await logout()
    navigate(routes.home)
  }

  const toggleLanguage = () => {
    const newLang = currentLanguage === "es" ? "en" : "es"
    setLanguage(newLang)
    window.location.reload() // Reload to apply new language
  }

  const renderAuthButton = () => {
    if (!user) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-green-700">
              {t("nav.login")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AuthFlow onClose={() => { }} isMobile={isMobile} onLogin={handleLogin} />
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-green-700">
            <User className="w-4 h-4 mr-2" />
            {user.collector.username}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("nav.dashboard")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(routes.dashboard)}>{t("dashboard.home")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(routes.myCollections)}>
            {t("dashboard.collections")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(routes.myExchanges)}>{t("dashboard.exchanges")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(routes.myProfile)}>{t("dashboard.settings")}</DropdownMenuItem>
          {user.isAdmin && (
            <DropdownMenuItem onClick={() => navigate(routes.admin)} className="text-red-600">
              Admin Panel
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>{t("auth.logout")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

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
                      {t("nav.collections")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.community} className="px-4 py-2 text-green-700">
                      {t("nav.community")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.blog} className="px-4 py-2 text-green-700">
                      {t("nav.blog")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to={routes.help} className="px-4 py-2 text-green-700">
                      {t("nav.help")}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      className="px-4 py-2 text-green-700"
                      onClick={() => navigate(routes.search)}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {t("nav.search")}
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!isMobile && (
              <>
                <Button variant="ghost" onClick={toggleLanguage} className="text-green-700">
                  <Globe className="w-4 h-4 mr-2" />
                  {currentLanguage.toUpperCase()}
                </Button>
                {renderAuthButton()}
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
              <Link to={routes.collections} className="text-green-700 py-2">
                {t("nav.collections")}
              </Link>
              <Link to={routes.community} className="text-green-700 py-2">
                {t("nav.community")}
              </Link>
              <Link to={routes.blog} className="text-green-700 py-2">
                {t("nav.blog")}
              </Link>
              <Link to={routes.help} className="text-green-700 py-2">
                {t("nav.help")}
              </Link>
              <Link to={routes.search} className="text-green-700 py-2">
                {t("nav.search")}
              </Link>
              <Button variant="outline" onClick={toggleLanguage} className="text-green-700">
                <Globe className="w-4 h-4 mr-2" />
                {t("nav.language")}: {currentLanguage.toUpperCase()}
              </Button>
              <div className="flex flex-col gap-2 pt-4 border-t">
                {!user ? (
                  <AuthFlow onClose={() => setIsMenuOpen(false)} isMobile={true} onLogin={handleLogin} />
                ) : (
                  <>
                    <Link to={routes.dashboard} className="text-green-700 py-2">
                      {t("dashboard.home")}
                    </Link>
                    <Link to={routes.collections} className="text-green-700 py-2">
                      {t("dashboard.collections")}
                    </Link>
                    <Link to={routes.myExchanges} className="text-green-700 py-2">
                      {t("dashboard.exchanges")}
                    </Link>
                    <Link to={routes.myProfile} className="text-green-700 py-2">
                      {t("dashboard.settings")}
                    </Link>
                    {user.isAdmin && (
                      <Button variant="destructive" onClick={() => navigate(routes.admin)}>
                        Admin Panel
                      </Button>
                    )}
                    <Button variant="outline" onClick={handleLogout}>
                      {t("auth.logout")}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

