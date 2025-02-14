
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import { CollectorHeader } from "@/components/collector/CollectorHeader";
// import { CollectorStats } from "@/components/collector/CollectorStats";
// import { CollectorAchievements } from "@/components/collector/CollectorAchievements";
// import { CollectorCollections } from "@/components/collector/CollectorCollections";
// import { CollectorActivity } from "@/components/collector/CollectorActivity";
// import { CollectorSocial } from "@/components/collector/CollectorSocial";
// import { CollectorTestimonials } from "@/components/collector/CollectorTestimonials";
// import { CollectorTrades } from "@/components/collector/CollectorTrades";
import type { CollectorProfile } from "@/app/types";
import { CollectorAchievements } from "@/components/collector/CollectorAchievements";
import { CollectorActivity } from "@/components/collector/CollectorActivity";
import { CollectorCollections } from "@/components/collector/CollectorCollections";
import { CollectorSocial } from "@/components/collector/CollectorSocial";
import { CollectorStats } from "@/components/collector/CollectorStats";
import { CollectorTestimonials } from "@/components/collector/CollectorTestimonials";
import { CollectorTrades } from "@/components/collector/CollectorTrades";
import { api } from "@/use/api";

const CollectorProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<CollectorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [collections, setCollections] = useState([])
  useEffect(() => {
    const fetchCollections = async () => {
      const data = await api("collections")
      setCollections(data.slice(0, 4)) // Mostrar solo las 4 primeras colecciones
    }
    fetchCollections()
  }, [])

  useEffect(() => {
    // Simulated API call
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Mock data - replace with actual API call
        const mockProfile: CollectorProfile = {
          id: "1",
          username: "cardmaster",
          name: "Alex Thompson",
          avatar: "https://i.pravatar.cc/300?u=alex",
          coverImage: "https://images.unsplash.com/photo-1615715616181-6ba22b04bec9",
          title: "Maestro del Intercambio",
          level: 15,
          motto: "Coleccionando momentos, un cromo a la vez",
          rank: {
            global: 5,
            category: "Anime",
            categoryRank: 2,
          },
          stats: {
            totalCards: 500,
            completedCards: 325,
            collections: 12,
            completedCollections: 8,
            trades: 150,
            successRate: 98,
          },
          achievements: [],
          badges: [],
          recentActivity: [],
          testimonials: [],
          socialStats: {
            followers: 234,
            following: 156,
            completionRate: 85,
            reputation: 4.9,
          },
        };
        setProfile(mockProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <NavigationBar />

      <main className="pt-16">
        <CollectorHeader profile={profile} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CollectorStats profile={profile} />
              <CollectorCollections collections={collections} />
              <CollectorActivity profile={profile} />
              <CollectorTrades profile={profile} />
            </div>

            <div className="space-y-8">
              <CollectorAchievements profile={profile} />
              <CollectorSocial profile={profile} />
              <CollectorTestimonials profile={profile} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectorProfile;
