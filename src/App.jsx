import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ApplicationDashboard from './components/ApplicationDashboard';

export default function App() {
  // Simple routing: 'landing' or 'app'
  const [route, setRoute] = useState('landing');

  return (
    <div className="min-h-screen relative font-sans text-gray-800">
      {route === 'landing' ? (
        <LandingPage onStart={() => setRoute('app')} />
      ) : (
        <ApplicationDashboard onGoHome={() => setRoute('landing')} />
      )}
    </div>
  );
}
