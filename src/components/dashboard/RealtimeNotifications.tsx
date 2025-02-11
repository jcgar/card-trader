
import { useEffect, useState } from "react";
import { Bell, MessageSquare, Star, Gift } from "lucide-react";
import { useToast } from "../ui/use-toast";

const notifications = [
  {
    id: 1,
    title: "New Trade Request",
    message: "3 users want to trade with you",
    icon: MessageSquare,
    type: "trade",
  },
  {
    id: 2,
    title: "Achievement Unlocked",
    message: "You've earned the 'Collection Master' badge",
    icon: Star,
    type: "achievement",
  },
  {
    id: 3,
    title: "Special Offer",
    message: "Limited edition cards available now",
    icon: Gift,
    type: "offer",
  },
];

export const RealtimeNotifications = () => {
  const { toast } = useToast();
  const [activeNotifications, setActiveNotifications] = useState(notifications);

  useEffect(() => {
    // Simulate receiving new notifications
    const interval = setInterval(() => {
      const types = ["trade", "achievement", "offer"];
      const type = types[Math.floor(Math.random() * types.length)];
      const newNotification = {
        id: Date.now(),
        title: `New ${type}`,
        message: `You have a new ${type} notification`,
        icon: type === "trade" ? MessageSquare : type === "achievement" ? Star : Gift,
        type,
      };

      toast({
        title: newNotification.title,
        description: newNotification.message,
        duration: 3000,
      });

      setActiveNotifications(prev => [newNotification, ...prev.slice(0, -1)]);
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="fixed top-20 right-4 z-40 w-80">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-green-800 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
            {activeNotifications.length} new
          </span>
        </div>
        <div className="space-y-3">
          {activeNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <notification.icon className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-gray-600 text-sm">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
