import { motion } from 'framer-motion';
import { Cloud, Thermometer, Wind, Umbrella, Sun, Droplets } from 'lucide-react';
import CircularProgress from '../ui/CircularProgress';
import GlassCard from '../ui/GlassCard';
import type { WeatherData } from '../../analysis/types';

interface Props { weather: WeatherData }

export default function WeatherPanel({ weather }: Props) {
  const cards = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${weather.temperature}°C`,
      sub: weather.temperature > 32 ? 'Hot conditions' : 'Moderate',
      color: '#FF6B35',
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      sub: weather.humidity > 70 ? 'High — aids swing' : 'Normal',
      color: '#00BFFF',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      sub: weather.windSpeed > 20 ? 'Strong crosswind' : 'Light breeze',
      color: '#8B5CF6',
    },
    {
      icon: Umbrella,
      label: 'Rain Probability',
      value: `${weather.rainProbability}%`,
      sub: weather.rainProbability > 35 ? 'Interruptions likely' : 'Clear play',
      color: weather.rainProbability > 35 ? '#FF4444' : '#39FF14',
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: `${weather.uvIndex}/11`,
      sub: weather.uvIndex > 7 ? 'Very High' : weather.uvIndex > 5 ? 'High' : 'Moderate',
      color: '#FFB800',
    },
    {
      icon: Cloud,
      label: 'Condition',
      value: weather.condition,
      sub: 'Current sky',
      color: '#00BFFF',
    },
  ];

  const impactColor =
    weather.impactScore > 65 ? '#FF4444' : weather.impactScore > 40 ? '#FFB800' : '#39FF14';

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center">
          <Cloud size={16} className="text-[#39FF14]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Weather Intelligence</h3>
          <p className="text-xs text-white/40">Live conditions + pitch impact assessment</p>
        </div>
      </div>

      {/* Weather cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <GlassCard key={card.label} className="p-4" accentColor={card.color} delay={i * 0.06}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${card.color}12`, border: `1px solid ${card.color}20` }}
              >
                <Icon size={15} style={{ color: card.color }} />
              </div>
              <p className="text-xs text-white/40 mb-0.5">{card.label}</p>
              <p className="text-base font-black text-white">{card.value}</p>
              <p className="text-xs mt-0.5" style={{ color: card.color }}>
                {card.sub}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Impact score */}
      <GlassCard className="p-5" accentColor={impactColor}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-white mb-1">Weather Impact on Pitch</p>
            <p className="text-xs text-white/40 mb-3">
              Composite score measuring how current weather conditions affect pitch behavior
            </p>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #39FF14, ${impactColor})`,
                  boxShadow: `0 0 10px ${impactColor}60`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${weather.impactScore}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-white/25">0 — Minimal</span>
              <span className="text-xs text-white/25">100 — Extreme</span>
            </div>
          </div>
          <div className="ml-6 shrink-0">
            <CircularProgress
              value={weather.impactScore}
              size={80}
              strokeWidth={6}
              color={impactColor}
            />
            <p className="text-xs text-white/40 text-center mt-1">Impact</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
