import { useState, useEffect } from 'react';
import { UserPlus, Trash2, Users } from 'lucide-react';
import { supabase, EmergencyContact } from '../lib/supabase';

interface EmergencyContactsProps {
  onContactsChange: (contacts: Array<{ name: string; phone: string }>) => void;
}

export default function EmergencyContacts({ onContactsChange }: EmergencyContactsProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    onContactsChange(contacts.map(c => ({ name: c.name, phone: c.phone })));
  }, [contacts, onContactsChange]);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('emergency_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setContacts(data);
    }
  };

  const addContact = async () => {
    if (!newContact.name || !newContact.phone) {
      alert('Please fill in name and phone number');
      return;
    }

    const { error } = await supabase
      .from('emergency_contacts')
      .insert([newContact]);

    if (!error) {
      setNewContact({ name: '', phone: '', relationship: '' });
      setIsAdding(false);
      fetchContacts();
    } else {
      alert('Error adding contact. Please try again.');
    }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchContacts();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6" />
        Emergency Contacts
      </h2>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-900/50 border border-pink-500/20 rounded-xl p-4 flex items-center justify-between
              hover:border-pink-500/40 transition-all duration-300"
          >
            <div className="flex-1">
              <h3 className="text-white font-semibold">{contact.name}</h3>
              <p className="text-gray-400 text-sm">{contact.phone}</p>
              {contact.relationship && (
                <p className="text-pink-400 text-xs mt-1">{contact.relationship}</p>
              )}
            </div>

            <button
              onClick={() => deleteContact(contact.id)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {isAdding ? (
          <div className="bg-gray-900/50 border border-pink-500 rounded-xl p-6 space-y-4">
            <input
              type="text"
              placeholder="Name *"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
                text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none
                transition-all duration-300"
            />

            <input
              type="tel"
              placeholder="Phone Number (with country code: +91...) *"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
                text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none
                transition-all duration-300"
            />

            <input
              type="text"
              placeholder="Relationship (e.g., Mother, Sister, Friend)"
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg
                text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none
                transition-all duration-300"
            />

            <div className="flex gap-3">
              <button
                onClick={addContact}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600
                  hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg
                  transition-all duration-300"
              >
                Save Contact
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                  transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600
              hover:to-rose-700 text-white font-semibold py-4 px-6 rounded-xl
              shadow-lg hover:shadow-pink-500/50 transform hover:scale-105
              transition-all duration-300 flex items-center justify-center gap-3"
          >
            <UserPlus className="w-5 h-5" />
            Add Emergency Contact
          </button>
        )}
      </div>
    </div>
  );
}
