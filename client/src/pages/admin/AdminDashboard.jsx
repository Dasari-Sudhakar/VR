import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../../api/client';
import PageWrapper from '../../components/common/PageWrapper';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  const fetchData = async () => {
    const [{ data: toursData }, { data: analyticsData }] = await Promise.all([
      apiClient.get('/tours'),
      apiClient.get('/analytics/tours')
    ]);
    setTours(toursData.tours);
    setAnalytics(analyticsData.analytics);
  };

  useEffect(() => {
    fetchData().catch(() => toast.error('Failed to load dashboard'));
  }, []);

  return (
    <PageWrapper>
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {analytics.map((item) => (
          <div key={item._id} className="glass rounded-2xl p-4">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm">Views: {item.views}</p>
            <p className="text-sm">Avg. Time: {Math.round(item.avgDuration || 0)}s</p>
          </div>
        ))}
      </section>
      <section className="glass rounded-2xl p-4">
        <h2 className="mb-3 text-xl">Tour Management</h2>
        <ul className="space-y-2">
          {tours.map((tour) => (
            <li key={tour._id} className="flex items-center justify-between rounded-xl border border-white/10 p-3">
              <span>{tour.title}</span>
              <span className="text-xs text-slate-400">{tour.scenes.length} scenes</span>
            </li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  );
};

export default AdminDashboard;
