
import { Card } from "../ui/card";
import { Trophy, RefreshCw, Star, User, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

interface Activity {
  id: number;
  type: 'achievement' | 'trade' | 'collection' | 'social';
  user: string;
  avatar: string;
  action: string;
  timestamp: string;
  icon: typeof Trophy | typeof RefreshCw | typeof Star | typeof MessageSquare;
  color: string;
}

const initialActivities: Activity[] = [
  {
    id: 1,
    type: 'achievement',
    user: 'María G.',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    action: 'desbloqueó el logro "Coleccionista Experto"',
    timestamp: 'Hace 5 minutos',
    icon: Trophy,
    color: 'text-yellow-500',
  },
  {
    id: 2,
    type: 'trade',
    user: 'Carlos R.',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    action: 'completó un intercambio con Ana L.',
    timestamp: 'Hace 10 minutos',
    icon: RefreshCw,
    color: 'text-blue-500',
  },
  {
    id: 3,
    type: 'collection',
    user: 'Laura M.',
    avatar: 'https://i.pravatar.cc/150?u=laura',
    action: 'completó la colección "Mundial 2022"',
    timestamp: 'Hace 15 minutos',
    icon: Star,
    color: 'text-purple-500',
  },
];

export const ActivityFeed = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [highlightedActivity, setHighlightedActivity] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        type: 'social',
        user: 'Nuevo Usuario',
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        action: 'se unió a la comunidad',
        timestamp: 'Ahora mismo',
        icon: User,
        color: 'text-green-500',
      };

      setActivities(prev => [newActivity, ...prev.slice(0, -1)]);
      setHighlightedActivity(newActivity.id);
      setTimeout(() => setHighlightedActivity(null), 3000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-green-800">
            Actividad de la Comunidad
          </h2>
          <p className="text-green-600">Mantente al día con lo que sucede en la comunidad</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={`
                transform transition-all duration-500
                hover:scale-102 hover:shadow-md
                ${highlightedActivity === activity.id ? 'animate-pulse ring-2 ring-green-400' : ''}
              `}
            >
              <div className="p-4 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className={`
                    absolute -bottom-1 -right-1 p-1 rounded-full bg-white
                    ${highlightedActivity === activity.id ? 'animate-bounce' : ''}
                  `}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-gray-800">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>

                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
