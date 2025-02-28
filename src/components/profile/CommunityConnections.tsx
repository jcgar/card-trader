import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { t } from "@/use/i18n"

export function CommunityConnections() {
  // Mock data for demonstration
  const followers = [
    { id: 1, name: "Alice", avatar: "/avatars/alice.jpg" },
    { id: 2, name: "Bob", avatar: "/avatars/bob.jpg" },
    { id: 3, name: "Charlie", avatar: "/avatars/charlie.jpg" },
  ]

  const following = [
    { id: 4, name: "David", avatar: "/avatars/david.jpg" },
    { id: 5, name: "Eve", avatar: "/avatars/eve.jpg" },
  ]

  const blockedUsers = [{ id: 6, name: "Mallory", avatar: "/avatars/mallory.jpg" }]

  const pendingInvitations = [
    { id: 7, name: "Frank", avatar: "/avatars/frank.jpg" },
    { id: 8, name: "Grace", avatar: "/avatars/grace.jpg" },
  ]

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-2">{t("profile.followersAndFollowing")}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">{t("profile.followers")}</h4>
            <div className="flex space-x-2">
              {followers.map((follower) => (
                <Avatar key={follower.id}>
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                  <AvatarFallback>{follower.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">{t("profile.following")}</h4>
            <div className="flex space-x-2">
              {following.map((followed) => (
                <Avatar key={followed.id}>
                  <AvatarImage src={followed.avatar} alt={followed.name} />
                  <AvatarFallback>{followed.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.blockedUsers")}</h3>
        <div className="space-y-2">
          {blockedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
              <Button variant="outline" size="sm">
                {t("profile.unblock")}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">{t("profile.pendingInvitations")}</h3>
        <div className="space-y-2">
          {pendingInvitations.map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={invitation.avatar} alt={invitation.name} />
                  <AvatarFallback>{invitation.name[0]}</AvatarFallback>
                </Avatar>
                <span>{invitation.name}</span>
              </div>
              <div className="space-x-2">
                <Button variant="default" size="sm">
                  {t("profile.accept")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("profile.decline")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

