const LoadingScreen = ({ message = 'Loading immersive tour...' }) => (
  <div className="flex h-[70vh] items-center justify-center">
    <div className="glass rounded-2xl px-6 py-5 text-center">
      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      <p>{message}</p>
    </div>
  </div>
);

export default LoadingScreen;
