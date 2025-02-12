
import { Card } from "../ui/card";
import { Activity, Users, Award, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const initialActivities = [
  {
    id: 1,
    type: "achievement",
    user: "John Doe",
    action: "earned the Master Collector badge",
    time: "2 minutes ago",
    icon: Award,
  },
  {
    id: 2,
    type: "trade",
    user: "Emma Wilson",
    action: "completed a trade with Sarah Chen",
    time: "5 minutes ago",
    icon: RefreshCcw,
  },
  {
    id: 3,
    type: "newUser",
    user: "Michael Brown",
    action: "joined the community",
    time: "10 minutes ago",
    icon: Users,
  },
];

export const LiveActivity = () => {
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        id: Date.now(),
        type: "trade",
        user: "Random User",
        action: "made a new trade",
        time: "just now",
        icon: RefreshCcw,
      };
      setActivities(prev => [newActivity, ...prev.slice(0, -1)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-playfair font-bold text-green-800">Live Activity</h2>
          <Activity className="w-6 h-6 text-green-600 animate-pulse" />
        </div>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="p-4 flex items-center gap-4 animate-fade-in hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <activity.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
