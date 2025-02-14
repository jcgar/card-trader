
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, BookOpen, BarChart2, Settings } from "lucide-react";
import { routes } from "@/use/routes";
import { NavigationBar } from "@/components/NavigationBar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navItems = [
    {
      href: routes.admin.users,
      label: "Usuarios",
      icon: Users,
    },
    {
      href: routes.admin.collections,
      label: "Colecciones",
      icon: BookOpen,
    },
    {
      href: routes.admin.stats,
      label: "Estadísticas",
      icon: BarChart2,
    },
    {
      href: routes.admin.settings,
      label: "Ajustes",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="flex pt-16">
        <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white border-r">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-green-50 text-green-700"
                      : "hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </div>
  );
};
