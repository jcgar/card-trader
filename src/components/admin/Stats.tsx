
import { Card } from "@/components/ui/card";
import { Users, BookOpen, RefreshCw, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ene", usuarios: 400, colecciones: 240 },
  { name: "Feb", usuarios: 300, colecciones: 139 },
  { name: "Mar", usuarios: 200, colecciones: 980 },
  { name: "Abr", usuarios: 278, colecciones: 390 },
  { name: "May", usuarios: 189, colecciones: 480 },
  { name: "Jun", usuarios: 239, colecciones: 380 },
];

export const Stats = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Estadísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Usuarios Totales</p>
              <p className="text-2xl font-semibold">12,345</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-full">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Colecciones</p>
              <p className="text-2xl font-semibold">456</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-yellow-50 rounded-full">
              <RefreshCw className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Intercambios</p>
              <p className="text-2xl font-semibold">7,890</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-50 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Crecimiento</p>
              <p className="text-2xl font-semibold">+24%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Tendencias</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="colecciones"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

