import { useState } from 'react';
import { MapPin, Share2 } from 'lucide-react';

interface LocationSharingProps {
  contacts: Array<{ name: string; phone: string }>;
}

export default function LocationSharing({ contacts }: LocationSharingProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const shareLocation = () => {
    setIsSharing(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const message = `🚨 EMERGENCY ALERT 🚨\n\nI need help! This is my current location:\n${locationUrl}\n\nSent from Rakshika - Women Safety App`;

          if (contacts.length > 0) {
            contacts.forEach((contact) => {
              const whatsappUrl = `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            });
          } else {
            if (navigator.share) {
              navigator.share({
                title: 'Emergency Location',
                text: message,
              });
            } else {
              alert(`Your location:\n${locationUrl}\n\nPlease add emergency contacts to send automated alerts.`);
            }
          }

          setIsSharing(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
          setIsSharing(false);
        }
      );
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6" />
        Real-Time Location Sharing
      </h2>

      <div className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-6">
        <p className="text-gray-300 mb-4">
          Share your live location instantly with your emergency contacts via WhatsApp
        </p>

        {currentLocation && (
          <div className="mb-4 p-3 bg-pink-500/10 rounded-lg border border-pink-500/30">
            <p className="text-sm text-pink-300">
              📍 Last Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
            </p>
          </div>
        )}

        <button
          onClick={shareLocation}
          disabled={isSharing}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600
            hover:to-rose-700 text-white font-semibold py-4 px-6 rounded-xl
            shadow-lg hover:shadow-pink-500/50 transform hover:scale-105
            transition-all duration-300 flex items-center justify-center gap-3
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Share2 className="w-5 h-5" />
          {isSharing ? 'Getting Location...' : 'Share My Location Now'}
        </button>

        {contacts.length === 0 && (
          <p className="mt-4 text-sm text-yellow-400 text-center">
            ⚠️ Add emergency contacts below to enable automatic alerts
          </p>
        )}
      </div>
    </div>
  );
}
