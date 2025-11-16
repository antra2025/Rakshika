import { useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface SOSButtonProps {
  onEmergency: (latitude: number, longitude: number) => void;
}

export default function SOSButton({ onEmergency }: SOSButtonProps) {
  const [isActivated, setIsActivated] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAlertSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);

    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 800;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.2);
    }, 300);

    setTimeout(() => {
      const oscillator3 = audioContext.createOscillator();
      const gainNode3 = audioContext.createGain();
      oscillator3.connect(gainNode3);
      gainNode3.connect(audioContext.destination);
      oscillator3.frequency.value = 1000;
      oscillator3.type = 'sine';
      gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator3.start(audioContext.currentTime);
      oscillator3.stop(audioContext.currentTime + 0.2);
    }, 600);
  };

  const handleSOSClick = () => {
    setIsActivated(true);
    playAlertSound();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onEmergency(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }

    setTimeout(() => setIsActivated(false), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8">
      <button
        onClick={handleSOSClick}
        className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-pink-500 to-rose-600
          hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105
          shadow-2xl ${isActivated ? 'animate-pulse' : ''}`}
        style={{
          boxShadow: isActivated
            ? '0 0 60px rgba(236, 72, 153, 0.8), 0 0 100px rgba(236, 72, 153, 0.5)'
            : '0 0 30px rgba(236, 72, 153, 0.5)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-pink-400 opacity-20 animate-ping"
          style={{ animationDuration: '2s' }}
        ></div>

        <div className="relative flex flex-col items-center justify-center h-full">
          <AlertCircle className="w-16 sm:w-20 h-16 sm:h-20 text-white mb-2" strokeWidth={2.5} />
          <span className="text-3xl sm:text-4xl font-bold text-white tracking-wider">SOS</span>
          <span className="text-xs sm:text-sm text-white mt-1">Emergency</span>
        </div>
      </button>

      <p className="mt-4 sm:mt-6 text-center text-gray-300 text-xs sm:text-sm max-w-xs">
        Press to send emergency alert with your location to saved contacts
      </p>
    </div>
  );
}
