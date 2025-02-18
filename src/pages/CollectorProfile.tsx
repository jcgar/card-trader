
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { CollectorHeader } from "@/components/collector/CollectorHeader";
import { CollectorStats } from "@/components/collector/CollectorStats";
import { CollectorAchievements } from "@/components/collector/CollectorAchievements";
import { CollectorCollections } from "@/components/collector/CollectorCollections";
import { CollectorActivity } from "@/components/collector/CollectorActivity";
import { CollectorSocial } from "@/components/collector/CollectorSocial";
import { CollectorTrades } from "@/components/collector/CollectorTrades";
import type { Collection, Collector } from "@/app/types";
import { useApi } from "@/use/api";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { generateCollectorProPath } from "@/use/routes";

const Collector = () => {
  const { id } = useParams();

  const { data: collections } = useApi<Collection>('collections', { page: 1, pageSize: 10, fullQuery: false })
  const { data: collectors, loading } = useApi<Collector>('collectors', { page: 1, pageSize: 10, fullQuery: false })
  const profile = collectors[0]

  if (loading || !profile) {
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
          <div className="text-center mb-8">
            <Link to={generateCollectorProPath(profile.id)}>
              <Button
                variant="outline"
                className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
              >
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Ver en el Hall of Fame
              </Button>
            </Link>
          </div>

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
              <CollectorTrades profile={profile} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collector;
