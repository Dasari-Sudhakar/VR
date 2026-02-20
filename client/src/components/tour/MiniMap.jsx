const MiniMap = ({ scenes, activeSceneId, onSelectScene }) => (
  <aside className="glass rounded-2xl p-4">
    <h3 className="mb-3 text-sm font-semibold text-cyan-300">Mini Map</h3>
    <div className="space-y-2">
      {scenes.map((scene) => (
        <button
          key={scene._id}
          onClick={() => onSelectScene(scene._id)}
          className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
            scene._id === activeSceneId ? 'bg-cyan-500 text-slate-900' : 'glass'
          }`}
        >
          {scene.name}
        </button>
      ))}
    </div>
  </aside>
);

export default MiniMap;
