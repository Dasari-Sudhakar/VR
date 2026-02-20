import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useTourSocket = (tourId, onPresenceUpdate) => {
  useEffect(() => {
    if (!tourId) return undefined;
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.emit('tour:join', { tourId });
    socket.on('tour:presence', onPresenceUpdate);

    return () => {
      socket.emit('tour:leave', { tourId });
      socket.disconnect();
    };
  }, [tourId, onPresenceUpdate]);
};

export default useTourSocket;
