import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { Link } from "react-router-dom"
import { routes } from "@/use/routes"
import {
  Search,
  Star,
  Repeat,
  CalendarIcon,
  HelpCircle,
  Users,
  Award,
  BookOpen,
  ShoppingCart,
  Plus,
  BellIcon,
  User,
  BarChart2,
  BoxIcon as InBox,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useApi } from "@/use/api"
import { useAuth } from "@/use/auth"

type ActionItem = {
  icon: React.ElementType
  label: string
  description: string
  link?: string
  onClick?: () => void
  color: string
  isPrivate?: boolean
}

type ActionMenuProps = {
  variant: "quick" | "full"
  actions?: ActionItem[]
  currentPath?: string
}

const allActions: ActionItem[] = [
  // Acciones públicas
  { icon: Search, label: "Buscar", description: "Colecciones o Usuarios", link: routes.search, color: "blue" },
  {
    icon: Star,
    label: "Colecciones Destacadas",
    description: "Explorar lo mejor",
    link: `${routes.collections}?filter=featured`,
    color: "yellow",
  },
  {
    icon: Repeat,
    label: "Cambios Recientes",
    description: "Intercambios activos",
    link: routes.exchanges,
    color: "green",
  },
  {
    icon: CalendarIcon,
    label: "Eventos Activos",
    description: "No te los pierdas",
    link: routes.events,
    color: "purple",
  },
  { icon: HelpCircle, label: "Cómo Funciona", description: "Guía de la plataforma", link: routes.help, color: "teal" },
  { icon: Users, label: "Comunidad", description: "Explora y conecta", link: routes.community, color: "indigo" },
  {
    icon: Award,
    label: "Rankings Globales",
    description: "Los mejores coleccionistas",
    link: `${routes.community}/rankings`,
    color: "red",
  },
  { icon: BookOpen, label: "Blog", description: "Noticias y artículos", link: routes.blog, color: "pink" },
  {
    icon: Trophy,
    label: "Retos y Logros",
    description: "Desafíos públicos",
    link: `${routes.community}/challenges`,
    color: "orange",
  },
  {
    icon: ShoppingCart,
    label: "Mercado",
    description: "Compra álbumes y cromos",
    link: routes.tradeMarket,
    color: "emerald",
  },

  // Acciones privadas
  {
    icon: Plus,
    label: "Nueva Colección",
    description: "Añadir a tu catálogo",
    link: routes.newCollection,
    color: "green",
    isPrivate: true,
  },
  {
    icon: Repeat,
    label: "Nuevo Intercambio",
    description: "Inicia un cambio",
    link: routes.newExchange,
    color: "blue",
    isPrivate: true,
  },
  {
    icon: Trophy,
    label: "Mis Retos Activos",
    description: "Ver progreso",
    link: routes.myChallenges,
    color: "yellow",
    isPrivate: true,
  },
  {
    icon: Star,
    label: "Reclamar Recompensas",
    description: "Logros pendientes",
    link: routes.myRewards,
    color: "purple",
    isPrivate: true,
  },
  {
    icon: BellIcon,
    label: "Notificaciones",
    description: "Actualizaciones recientes",
    onClick: () => { },
    color: "red",
    isPrivate: true,
  },
  {
    icon: User,
    label: "Mi Perfil",
    description: "Gestionar cuenta",
    link: routes.myProfile,
    color: "indigo",
    isPrivate: true,
  },
  {
    icon: BarChart2,
    label: "Mis Estadísticas",
    description: "Resumen global",
    link: `${routes.myProfile}/stats`,
    color: "teal",
    isPrivate: true,
  },
  {
    icon: InBox,
    label: "Solicitudes Pendientes",
    description: "Revisar y responder",
    link: routes.myRequests,
    color: "orange",
    isPrivate: true,
  },
  {
    icon: Sparkles,
    label: "Explorar Novedades",
    description: "Usuarios y colecciones",
    link: routes.explore,
    color: "pink",
    isPrivate: true,
  },
]

export const ActionMenu: React.FC<ActionMenuProps> = ({ variant, actions, currentPath }) => {
  const { user } = useAuth()
  const { data: unreadNotifications } = (useApi<number>("unreadNotificationsCount") || [])[0] ?? 3

  const isLoggedIn = !!user
  const filteredActions = allActions
    .filter((action) => (isLoggedIn || !action.isPrivate) && (!currentPath || action.link !== currentPath))
    .slice(0, variant === "quick" ? 4 : 5)

  if (variant === "quick") {
    return (
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredActions.map((action) => (
              <Card key={action.label} className="p-2 hover:shadow-md transition-shadow cursor-pointer group">
                <Link
                  to={action.link || "#"}
                  className={`flex p-4 bg-${action.color}-100 flex-col items-center text-center`}
                >
                  <div
                    className={`mb-1 p-3 bg-${action.color}-50 rounded-full group-hover:bg-${action.color}-100 transition-colors`}
                  >
                    <action.icon className="w-6 h-6 text-${action.color}-600" />
                  </div>
                  <h3 className="font-medium mb-1">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-3 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {filteredActions.map((action) => (
            <Link key={action.label} to={action.link || "#"} onClick={action.onClick}>
              <Button
                variant="ghost"
                className={`flex-1 md:flex-none min-w-[160px] bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 h-auto py-3`}
              >
                <action.icon className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-${action.color}-600">{action.description}</div>
                </div>
                {action.label === "Notificaciones" && (unreadNotifications > 0) && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

