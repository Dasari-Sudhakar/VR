import { useState } from 'react';

const steps = [
  'Drag your mouse or swipe to rotate around the room.',
  'Click glowing hotspots to open information or move to another room.',
  'Use VR Mode button to enter immersive headset experience.',
  'Use screenshot button to capture memories.'
];

const OnboardingTutorial = () => {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="glass fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl p-4">
      <h4 className="mb-2 font-semibold">Quick Tour Guide</h4>
      <ul className="mb-3 list-disc space-y-1 pl-4 text-sm">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <button className="rounded-lg bg-cyan-500 px-3 py-2 text-sm text-slate-950" onClick={() => setOpen(false)}>
        Got it
      </button>
    </div>
  );
};

export default OnboardingTutorial;
