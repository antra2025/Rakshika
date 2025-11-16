import { useState, useEffect } from 'react';
import { MapPin, Copy, StopCircle, Share2 } from 'lucide-react';

interface LocationSharingSettingsProps {
  contacts: Array<{ name: string; phone: string }>;
}

export default function LocationSharingSettings({ contacts }: LocationSharingSettingsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [duration, setDuration] = useState(30);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [shareLink, setShareLink] = useState('');
  const [trustedContacts, setTrustedContacts] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSharing && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsSharing(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSharing, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSharing = () => {
    if (!duration || duration <= 0) {
      alert('Please enter a valid duration');
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          const link = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          setShareLink(link);
          setIsSharing(true);
          setTimeRemaining(duration * 60);

          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const message = `📍 Location Sharing Started\n\nI'm sharing my live location for the next ${duration} minutes.\n\nView my location:\n${locationUrl}\n\nSent from Rakshika - Women Safety App`;

          if (contacts.length > 0 || trustedContacts) {
            const allContacts = [...contacts];

            if (trustedContacts) {
              trustedContacts.split(',').forEach((contact) => {
                const cleanContact = contact.trim();
                if (cleanContact) {
                  allContacts.push({ name: 'Contact', phone: cleanContact });
                }
              });
            }

            allContacts.forEach((contact) => {
              const phone = contact.phone.replace(/[^0-9+]/g, '');
              if (phone) {
                const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  const stopSharing = () => {
    setIsSharing(false);
    setTimeRemaining(0);
    setCurrentLocation(null);
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Location Sharing Settings
      </h2>

      <div className="space-y-6">
        <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-6">
          <label className="block text-white font-semibold mb-3">
            Trusted Contacts (comma-separated emails or phone numbers)
          </label>
          <textarea
            value={trustedContacts}
            onChange={(e) => setTrustedContacts(e.target.value)}
            placeholder="antramishra209@gmail.com, +91XXXXXXXXXX"
            disabled={isSharing}
            className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
              text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-6">
            <label className="block text-white font-semibold mb-3">
              Sharing Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="480"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={isSharing}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
                text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-6 flex flex-col justify-end">
            <p className="text-gray-300 text-sm mb-2">Status:</p>
            <p className={`text-lg font-bold ${isSharing ? 'text-green-400' : 'text-gray-400'}`}>
              {isSharing ? '🟢 Live Sharing' : '⚪ Stopped'}
            </p>
          </div>
        </div>

        {isSharing && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Time Remaining:</p>
              <p className="text-2xl font-bold text-pink-400">{formatTime(timeRemaining)}</p>
            </div>

            <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Coordinates:</p>
              <p className="text-sm font-mono text-white">
                {currentLocation ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}` : 'N/A'}
              </p>
            </div>

            <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-4 flex flex-col justify-end">
              <button
                onClick={stopSharing}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold
                  py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <StopCircle className="w-4 h-4" />
                Stop Sharing
              </button>
            </div>
          </div>
        )}

        {!isSharing && (
          <button
            onClick={startSharing}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600
              hover:to-rose-700 text-white font-semibold py-4 px-6 rounded-xl
              shadow-lg hover:shadow-pink-500/50 transform hover:scale-105
              transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Share2 className="w-5 h-5" />
            Start Location Sharing
          </button>
        )}

        {shareLink && (
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30
            rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Share Link</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
                  text-white text-sm focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg
                  transition-all duration-300 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p className="font-semibold text-gray-300">How it works:</p>
              <ul className="space-y-1 ml-2">
                <li>• Your location will be tracked in real-time for the specified duration</li>
                <li>• Share the link with trusted contacts to view your current location</li>
                <li>• Sharing automatically stops after time expires or stop manually anytime</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
