import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '../api/client';
import LoadingScreen from '../components/common/LoadingScreen';
import PageWrapper from '../components/common/PageWrapper';
import MiniMap from '../components/tour/MiniMap';
import OnboardingTutorial from '../components/tour/OnboardingTutorial';
import TourCanvas from '../components/tour/TourCanvas';

const TourPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [activeSceneId, setActiveSceneId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/tours/${tourId}`)
      .then((res) => {
        setTour(res.data.tour);
        setActiveSceneId(res.data.tour.scenes[0]?._id);
      })
      .finally(() => setLoading(false));
  }, [tourId]);

  const activeScene = useMemo(
    () => tour?.scenes.find((scene) => scene._id === activeSceneId) || tour?.scenes[0],
    [tour, activeSceneId]
  );

  const onHotspotClick = (hotspot) => {
    if (hotspot.targetSceneId) {
      setActiveSceneId(hotspot.targetSceneId);
      return;
    }
    toast(hotspot.content || 'Interactive hotspot');
  };

  const captureScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${tour?.title || 'tour'}-capture.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (loading || !activeScene) return <LoadingScreen message="Preparing virtual environment..." />;

  return (
    <PageWrapper>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{tour.title}</h1>
          <p className="text-sm text-slate-300">{tour.description}</p>
        </div>
        <button className="glass rounded-xl px-3 py-2" onClick={captureScreenshot}>
          Capture Screenshot
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <TourCanvas scene={activeScene} onHotspotClick={onHotspotClick} />
        <MiniMap scenes={tour.scenes} activeSceneId={activeScene._id} onSelectScene={setActiveSceneId} />
      </div>
      <audio src={tour.ambientAudioUrl} autoPlay loop className="hidden" />
      <OnboardingTutorial />
    </PageWrapper>
  );
};

export default TourPage;
