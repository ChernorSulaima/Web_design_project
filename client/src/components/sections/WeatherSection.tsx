/* AgriLink Sierra – Weather Dashboard Section
   Modern weather cards with animated icons, farming activity recommendations
*/
import { useEffect, useRef } from "react";
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Cloud,
  Zap,
} from "lucide-react";

const weatherData = {
  location: "Freetown, Western Area",
  date: new Date().toLocaleDateString("en-SL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  condition: "Partly Cloudy",
  conditionIcon: "⛅",
  temperature: 28,
  feelsLike: 31,
  humidity: 78,
  rainfall: 12,
  windSpeed: 14,
  uvIndex: 7,
  visibility: 8,
  farmingActivity:
    "Good day for weeding and applying fertilizer. Avoid irrigation — humidity is high. Ideal for transplanting seedlings.",
};

const weekForecast = [
  { day: "Mon", icon: "☀️", high: 30, low: 22, rain: 5 },
  { day: "Tue", icon: "⛅", high: 28, low: 21, rain: 20 },
  { day: "Wed", icon: "🌧️", high: 25, low: 20, rain: 75 },
  { day: "Thu", icon: "🌦️", high: 27, low: 21, rain: 40 },
  { day: "Fri", icon: "☀️", high: 31, low: 23, rain: 5 },
  { day: "Sat", icon: "⛅", high: 29, low: 22, rain: 15 },
  { day: "Sun", icon: "🌤️", high: 30, low: 22, rain: 10 },
];

const districts = [
  { name: "Freetown", temp: 28, condition: "⛅", rain: 12 },
  { name: "Bo", temp: 30, condition: "☀️", rain: 0 },
  { name: "Kenema", temp: 29, condition: "🌦️", rain: 35 },
  { name: "Makeni", temp: 31, condition: "☀️", rain: 0 },
  { name: "Koidu", temp: 27, condition: "🌧️", rain: 60 },
  { name: "Moyamba", temp: 28, condition: "⛅", rain: 20 },
];

function UVBar({ value }: { value: number }) {
  const color =
    value <= 2
      ? "#4CAF50"
      : value <= 5
        ? "#FFC107"
        : value <= 7
          ? "#FF9800"
          : "#f44336";
  const label =
    value <= 2
      ? "Low"
      : value <= 5
        ? "Moderate"
        : value <= 7
          ? "High"
          : "Very High";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${(value / 11) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e =>
          e.target.classList.toggle("visible", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll(".reveal").forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function WeatherSection() {
  const ref = useReveal();

  return (
    <section
      id="weather"
      className="py-20 md:py-28 relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/weather-bg-nQegxfHQTSEEwYYY2YdZ47.webp)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B4332]/92 via-[#1B4332]/85 to-[#0d2b1e]/90" />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC107] text-sm font-semibold mb-4">
            Weather Dashboard
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Real-Time Weather for
            <br />
            <span className="text-[#4CAF50]">Smarter Farming Decisions</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Hyperlocal weather data across all 14 Sierra Leone districts,
            updated every hour to guide your daily farming activities.
          </p>
        </div>

        {/* Main weather card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Current conditions */}
          <div
            className="lg:col-span-2 reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="agri-glass-dark rounded-3xl p-6 md:p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-white/60 text-sm mb-1">
                    📍 {weatherData.location}
                  </div>
                  <div className="text-white/50 text-xs">
                    {weatherData.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-6xl mb-1">
                    {weatherData.conditionIcon}
                  </div>
                  <div className="text-white/70 text-sm">
                    {weatherData.condition}
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <div className="text-8xl font-extrabold text-white leading-none">
                  {weatherData.temperature}°
                </div>
                <div className="mb-3">
                  <div className="text-white/60 text-sm">
                    Feels like {weatherData.feelsLike}°C
                  </div>
                  <div className="text-[#4CAF50] font-semibold">
                    Sierra Leone
                  </div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: Droplets,
                    label: "Humidity",
                    value: `${weatherData.humidity}%`,
                    color: "text-blue-300",
                  },
                  {
                    icon: CloudRain,
                    label: "Rainfall",
                    value: `${weatherData.rainfall}mm`,
                    color: "text-cyan-300",
                  },
                  {
                    icon: Wind,
                    label: "Wind",
                    value: `${weatherData.windSpeed} km/h`,
                    color: "text-gray-300",
                  },
                  {
                    icon: Sun,
                    label: "UV Index",
                    value: `${weatherData.uvIndex}/11`,
                    color: "text-yellow-300",
                  },
                ].map(metric => (
                  <div
                    key={metric.label}
                    className="bg-white/5 rounded-2xl p-3 text-center"
                  >
                    <metric.icon
                      size={20}
                      className={`${metric.color} mx-auto mb-1`}
                    />
                    <div className="text-white font-bold text-lg">
                      {metric.value}
                    </div>
                    <div className="text-white/50 text-xs">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Farming activity */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="agri-glass-dark rounded-3xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FFC107] flex items-center justify-center">
                  <Zap size={16} className="text-[#1B4332]" />
                </div>
                <h3 className="text-white font-bold">Today's Farm Activity</h3>
              </div>

              <div className="flex-1 bg-white/5 rounded-2xl p-4 mb-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  {weatherData.farmingActivity}
                </p>
              </div>

              {/* UV bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>UV Index</span>
                  <span>{weatherData.uvIndex}/11</span>
                </div>
                <UVBar value={weatherData.uvIndex} />
              </div>

              {/* Quick tips */}
              <div className="space-y-2">
                {[
                  { icon: "✅", text: "Good for field work" },
                  {
                    icon: "⚠️",
                    text: "High humidity — watch for fungal diseases",
                  },
                  { icon: "💧", text: "Skip irrigation today" },
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-white/70"
                  >
                    <span>{tip.icon}</span>
                    <span>{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7-day forecast */}
        <div className="reveal mb-8" style={{ transitionDelay: "0.3s" }}>
          <div className="agri-glass-dark rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4">7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-2">
              {weekForecast.map(day => (
                <div key={day.day} className="text-center">
                  <div className="text-white/60 text-xs mb-2">{day.day}</div>
                  <div className="text-2xl mb-2">{day.icon}</div>
                  <div className="text-white font-bold text-sm">
                    {day.high}°
                  </div>
                  <div className="text-white/50 text-xs">{day.low}°</div>
                  <div className="text-blue-300 text-xs mt-1">{day.rain}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District weather */}
        <div className="reveal" style={{ transitionDelay: "0.4s" }}>
          <h3 className="text-white font-bold mb-4">
            Weather Across Districts
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {districts.map(d => (
              <div
                key={d.name}
                className="agri-glass rounded-2xl p-4 text-center"
              >
                <div className="text-white/70 text-xs mb-1">{d.name}</div>
                <div className="text-2xl mb-1">{d.condition}</div>
                <div className="text-white font-bold">{d.temp}°C</div>
                <div className="text-blue-300 text-xs">{d.rain}% rain</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
