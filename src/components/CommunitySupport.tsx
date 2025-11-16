import { Heart, MessageCircle, Shield, Users as UsersIcon } from 'lucide-react';

export default function CommunitySupport() {
  const supportResources = [
    {
      title: 'National Commission for Women',
      description: '24/7 helpline for women in distress',
      contact: '7827170170',
      icon: Shield,
    },
    {
      title: 'Women Helpline (Domestic Abuse)',
      description: 'Support for domestic violence victims',
      contact: '181',
      icon: Heart,
    },
    {
      title: 'Police Women & Senior Citizens',
      description: 'Dedicated helpline for women and elderly',
      contact: '1091 / 1291',
      icon: UsersIcon,
    },
    {
      title: 'Mental Health Support',
      description: 'NIMHANS Mental Health Helpline',
      contact: '08046110007',
      icon: MessageCircle,
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6" />
        Community Support
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-pink-500/20
                rounded-xl p-6 hover:border-pink-500/40 transition-all duration-300
                hover:shadow-lg hover:shadow-pink-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600
                  rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{resource.description}</p>

                  <a
                    href={`tel:${resource.contact}`}
                    className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300
                      font-semibold text-lg transition-all duration-300"
                  >
                    📞 {resource.contact}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/30
        rounded-xl p-6">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-pink-400" />
          Remember
        </h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-pink-400 mt-1">•</span>
            <span>You are not alone. Help is always available.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400 mt-1">•</span>
            <span>All helplines are confidential and free of charge.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400 mt-1">•</span>
            <span>Trust your instincts and reach out when you feel unsafe.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
