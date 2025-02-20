
import { useEffect, useState } from "react";
import { Bell, MessageSquare, Star, Gift, X, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { showToast } from "@/use/ui";

const initialNotifications = [
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
  const [activeNotifications, setActiveNotifications] = useState(initialNotifications);
  const [isVisible, setIsVisible] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const removeNotification = (id: number) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

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

      if (isVisible) {
        showToast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 3000,
        });

        setActiveNotifications(prev => [newNotification, ...prev.slice(0, -1)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-40 w-80">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-green-800">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                {activeNotifications.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={togglePanel}
              >
                {isPanelOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setIsVisible(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        {isPanelOpen && (
          <div className="space-y-3 p-4 max-h-[400px] overflow-y-auto">
            {activeNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <notification.icon className="w-5 h-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 p-0"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
