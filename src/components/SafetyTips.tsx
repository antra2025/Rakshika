import { useEffect, useState } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { supabase, SafetyTip } from '../lib/supabase';

export default function SafetyTips() {
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from('safety_tips')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setTips(data);
    }
  };

  useEffect(() => {
    if (tips.length > 0) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [tips.length]);

  if (tips.length === 0) return null;

  const currentTip = tips[currentTipIndex];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6" />
        Daily Safety Tips
      </h2>

      <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/30 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-pink-300 mb-2">
              {currentTip?.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {currentTip?.content}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-pink-400 uppercase tracking-wider">
                {currentTip?.category}
              </span>
              <div className="flex gap-1">
                {tips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTipIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTipIndex ? 'bg-pink-400 w-6' : 'bg-pink-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tips.slice(0, 4).map((tip, index) => (
          <button
            key={tip.id}
            onClick={() => setCurrentTipIndex(index)}
            className={`p-3 rounded-lg border transition-all duration-300 text-left ${
              index === currentTipIndex
                ? 'bg-pink-500/20 border-pink-500'
                : 'bg-gray-900/30 border-gray-700 hover:border-pink-500/50'
            }`}
          >
            <p className="text-xs text-gray-300 truncate">{tip.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
