import { useState } from 'react';
import { Shield } from 'lucide-react';
import Navigation from './components/Navigation';
import SOSButton from './components/SOSButton';
import EmergencyDial from './components/EmergencyDial';
import LocationSharingSettings from './components/LocationSharingSettings';
import SafetyTips from './components/SafetyTips';
import CommunitySupport from './components/CommunitySupport';
import EmergencyContacts from './components/EmergencyContacts';
import { supabase } from './lib/supabase';

function App() {
  const [emergencyContacts, setEmergencyContacts] = useState<Array<{ name: string; phone: string }>>([]);

  const handleEmergency = async (latitude: number, longitude: number) => {
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `🚨 EMERGENCY ALERT 🚨\n\nI need immediate help!\n\nMy current location:\n${locationUrl}\n\nSent from Rakshika - Women Safety App`;

    await supabase.from('emergency_alerts').insert([
      {
        latitude,
        longitude,
        message: 'SOS Emergency Alert',
      },
    ]);

    if (emergencyContacts.length > 0) {
      emergencyContacts.forEach((contact) => {
        const whatsappUrl = `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      });
    } else {
      alert(`Emergency Alert Activated!\n\nYour location:\n${locationUrl}\n\nPlease add emergency contacts to send automated alerts.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)]"></div>

      <div className="relative">
        <header className="border-b border-pink-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full
                  flex items-center justify-center shadow-lg shadow-pink-500/50">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400
                    bg-clip-text text-transparent">
                    Rakshika
                  </h1>
                  <p className="text-pink-300 text-xs sm:text-sm">रक्षिका</p>
                </div>
              </div>

              <div className="hidden sm:block">
                <p className="text-gray-400 text-sm">Your Guardian Angel for Women's Safety</p>
              </div>
            </div>
          </div>

          <Navigation />
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Stay Safe, Stay Connected
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Your personal safety companion, always by your side
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="lg:col-span-1 flex justify-center">
              <SOSButton onEmergency={handleEmergency} />
            </div>

            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div id="emergency-dial">
                <EmergencyDial />
              </div>
              <div id="location-sharing">
                <LocationSharingSettings contacts={emergencyContacts} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div id="safety-tips">
              <SafetyTips />
            </div>
            <div id="community-support">
              <CommunitySupport />
            </div>
          </div>

          <div className="max-w-3xl mx-auto" id="emergency-contacts">
            <EmergencyContacts onContactsChange={setEmergencyContacts} />
          </div>

          <footer className="mt-12 sm:mt-16 pt-8 border-t border-pink-500/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                In case of emergency, always call local authorities first
              </p>
              <p className="text-pink-400 text-xs">
                Made with ❤️ for women's safety
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
