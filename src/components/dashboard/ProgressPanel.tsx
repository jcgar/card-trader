
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Award, Star, Trophy } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Collection Master",
    progress: 75,
    total: 100,
    description: "Complete 100 collections",
    icon: Trophy,
  },
  {
    id: 2,
    title: "Trading Expert",
    progress: 45,
    total: 50,
    description: "Make 50 successful trades",
    icon: Star,
  },
  {
    id: 3,
    title: "Community Legend",
    progress: 80,
    total: 100,
    description: "Help 100 community members",
    icon: Award,
  },
];

export const ProgressPanel = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold mb-8 text-center text-green-800">
          Your Progress
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <achievement.icon className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Progress
                  value={(achievement.progress / achievement.total) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">
                    {achievement.progress}/{achievement.total}
                  </span>
                  <span className="text-gray-500">
                    {Math.round((achievement.progress / achievement.total) * 100)}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
