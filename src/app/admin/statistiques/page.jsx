'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', candidatures: 120 },
  { name: 'Feb', candidatures: 200 },
  { name: 'Mar', candidatures: 150 },
  { name: 'Apr', candidatures: 300 },
  { name: 'May', candidatures: 250 },
];

export default function StatistiquesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Statistiques de la plateforme</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600">Offres publiées</p>
          <p className="text-2xl font-semibold text-indigo-600">245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600">Candidats</p>
          <p className="text-2xl font-semibold text-indigo-600">1,290</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600">Candidatures reçues</p>
          <p className="text-2xl font-semibold text-indigo-600">3,410</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600">Recruteurs actifs</p>
          <p className="text-2xl font-semibold text-indigo-600">18</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Évolution des candidatures (par mois)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="candidatures"
              stroke="#6366f1"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
