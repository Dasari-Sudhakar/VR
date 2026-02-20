import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import PageWrapper from '../components/common/PageWrapper';
import LoadingScreen from '../components/common/LoadingScreen';

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/tours')
      .then((res) => setTours(res.data.tours))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen message="Loading available tours..." />;

  return (
    <PageWrapper>
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-8">
        <h1 className="text-4xl font-bold">Immersive Virtual Reality Tour Platform</h1>
        <p className="mt-2 text-slate-300">Explore photoreal 360° environments with VR headset and browser support.</p>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        {tours.map((tour) => (
          <article key={tour._id} className="glass rounded-2xl p-4">
            <h2 className="text-xl font-semibold">{tour.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{tour.description}</p>
            <Link to={`/tour/${tour._id}`} className="mt-4 inline-block rounded-lg bg-cyan-500 px-3 py-2 text-slate-900">
              Start Tour
            </Link>
          </article>
        ))}
      </div>
    </PageWrapper>
  );
};

export default HomePage;
