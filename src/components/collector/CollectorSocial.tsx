
import { Card } from "@/components/ui/card";
import { Users, ThumbsUp } from "lucide-react";
import type { CollectorProfile } from "@/app/types";
import { Progress } from "@/components/ui/progress";

interface CollectorSocialProps {
  profile: CollectorProfile;
}

export const CollectorSocial = ({ profile }: CollectorSocialProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-semibold">Social</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {profile.socialStats.followers}
            </div>
            <div className="text-sm text-purple-600">Seguidores</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {profile.socialStats.following}
            </div>
            <div className="text-sm text-blue-600">Siguiendo</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-green-500" />
              Reputación
            </span>
            <span className="font-medium">{profile.socialStats.reputation}/5.0</span>
          </div>
          <Progress 
            value={profile.socialStats.reputation * 20} 
            className="h-2"
          />
        </div>
      </div>
    </Card>
  );
};
