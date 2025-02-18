
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import type { Collector } from "@/app/types";
import { Trophy, MessageSquare, Swords, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApi } from "@/use/api";

const CollectorProProfile = () => {
  const { id } = useParams();
  const { data: collectors, loading } = useApi<Collector>('collectors', { page: 1, pageSize: 10, fullQuery: false })
  const profile = collectors[0]

  if (loading || !profile) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-[#1a0f00] text-white">
      <NavigationBar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundImage: 'url(/lovable-uploads/8c89b96d-9e4c-4dda-b85b-5ee04e255703.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 p-8 md:p-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair text-yellow-300 drop-shadow-lg">
                HALL OF FAME
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 font-playfair">
                DIGITAL CARD COLLECTOR
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-center"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 border-8 border-yellow-600/30 rounded-full transform -rotate-6" />
                  <div className="absolute inset-0 border-8 border-yellow-600/30 rounded-full transform rotate-6" />
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-yellow-600 object-cover relative z-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold font-playfair">{profile.name}</h2>
                <p className="text-yellow-300 text-xl">"{profile.motto}"</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-yellow-900/50 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span>Rank #{profile.rank.global} Global</span>
                  </div>
                  <div className="bg-yellow-900/50 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Medal className="w-5 h-5 text-yellow-400" />
                    <span>#{profile.rank.categoryRank} en {profile.rank.category}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              <div className="bg-yellow-900/30 p-6 rounded-lg text-center">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{profile.stats.completedCollections}</h3>
                <p className="text-yellow-100">Colecciones Completas</p>
              </div>
              <div className="bg-yellow-900/30 p-6 rounded-lg text-center">
                <Swords className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{profile.stats.exchanges}</h3>
                <p className="text-yellow-100">Intercambios Exitosos</p>
              </div>
              <div className="bg-yellow-900/30 p-6 rounded-lg text-center">
                <MessageSquare className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{profile.stats.reputation}</h3>
                <p className="text-yellow-100">Reputación</p>
              </div>
            </motion.div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-yellow-900/30 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-300">Logros Destacados</h3>
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 text-yellow-100">
                      <div className="p-2 bg-yellow-600/20 rounded-full">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span>{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-yellow-900/30 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-yellow-300">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-yellow-100">Cromos totales</span>
                    <span className="text-yellow-300">{profile.stats.totalCards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-100">Colecciones completadas</span>
                    <span className="text-yellow-300">{profile.stats.completedCollections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-100">Tasa de éxito</span>
                    <span className="text-yellow-300">{profile.stats.successRate}%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-playfair"
              >
                Retar a duelo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorProProfile;
