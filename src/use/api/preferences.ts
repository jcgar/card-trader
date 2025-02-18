import { CollectorSettings } from "@/app/types";

export const preferences: CollectorSettings[] = [
  {
    blockedUsers: ["user123", "user456", "user789"],
    preferences: {
      theme: "dark",
      cardStyle: "modern",
      albumMode: true,
      notificationSettings: {
        email: true,
        push: false,
        inApp: true,
        doNotDisturb: {
          enabled: true,
          startTime: "22:00",
          endTime: "07:00",
        },
      },
    },
    privacySettings: {
      profileVisibility: "friends",
      tradeRequests: "friends",
      showLocation: false,
      showActivity: true,
    },
  }
];
