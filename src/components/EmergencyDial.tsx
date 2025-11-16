import { Phone } from 'lucide-react';

const emergencyNumbers = [
  { name: 'Police', number: '112', color: 'from-blue-500 to-blue-600' },
  { name: 'Women Helpline', number: '1091', color: 'from-pink-500 to-pink-600' },
  { name: 'Ambulance', number: '108', color: 'from-red-500 to-red-600' },
  { name: 'Child Helpline', number: '1098', color: 'from-purple-500 to-purple-600' },
];

export default function EmergencyDial() {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <Phone className="w-6 h-6" />
        Quick Emergency Dial
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {emergencyNumbers.map((emergency) => (
          <button
            key={emergency.number}
            onClick={() => handleCall(emergency.number)}
            className={`p-6 bg-gradient-to-br ${emergency.color} rounded-xl shadow-lg
              hover:shadow-2xl transform hover:scale-105 transition-all duration-300
              border border-white/10`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-white font-semibold text-lg">{emergency.name}</p>
                <p className="text-white/90 text-2xl font-bold mt-1">{emergency.number}</p>
              </div>
              <Phone className="w-8 h-8 text-white" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
