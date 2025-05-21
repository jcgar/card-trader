import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Link } from "@/shared/use/navigate"
import { routes } from "@/shared/use/routes"
import { useAuth } from "@/shared/use/auth"

export const UserSummary = () => {
  const { user } = useAuth()
  if (!user) return null
  const collector = user.collector

  return (
    <div className="flex items-center space-x-4 mb-4 p-4 bg-white rounded-lg shadow">
      <Avatar>
        <AvatarImage src={collector.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{user.name}</h3>
        <Progress value={collector.stats.successRate} className="h-2 mt-1" />
        <p className="text-sm text-gray-500 mt-1">Nivel {collector.level}</p>
      </div>
      <Link to={routes.myProfile} className="text-sm text-blue-600 hover:underline">
        Ver perfil
      </Link>
    </div>
  )
}

