export const registerTourSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('tour:join', ({ tourId }) => {
      socket.join(tourId);
      const count = io.sockets.adapter.rooms.get(tourId)?.size || 0;
      io.to(tourId).emit('tour:presence', { tourId, activeUsers: count });
    });

    socket.on('tour:leave', ({ tourId }) => {
      socket.leave(tourId);
      const count = io.sockets.adapter.rooms.get(tourId)?.size || 0;
      io.to(tourId).emit('tour:presence', { tourId, activeUsers: count });
    });
  });
};
