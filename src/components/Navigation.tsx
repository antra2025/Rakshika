import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { label: 'Emergency Dial', id: 'emergency-dial' },
    { label: 'Location Sharing', id: 'location-sharing' },
    { label: 'Safety Tips', id: 'safety-tips' },
    { label: 'Community Support', id: 'community-support' },
    { label: 'Emergency Contacts', id: 'emergency-contacts' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-gradient-to-br from-pink-500 to-rose-600
          rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav className={`fixed lg:static right-0 top-0 h-screen lg:h-auto bg-gradient-to-br from-gray-900 to-black
        border-l lg:border-l-0 border-pink-500/20 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        w-72 lg:w-auto lg:flex lg:gap-8 lg:border-none lg:bg-transparent`}>

        <div className="pt-20 lg:pt-0 px-6 lg:px-0 space-y-4 lg:space-y-0 lg:flex lg:gap-8 lg:items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full lg:w-auto text-left lg:text-center py-3 lg:py-0 px-4 lg:px-0
                text-gray-300 hover:text-pink-400 transition-colors duration-300
                border-l-2 lg:border-l-0 border-transparent lg:border-b-2
                hover:border-pink-500 font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
