/* AgriLink Sierra – Interactive Farm Planner Section
   Calendar showing planting, harvest, fertilizer, irrigation, vaccination reminders
*/
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Leaf,
  Droplets,
  Syringe,
  Scissors,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type EventType =
  | "planting"
  | "harvest"
  | "fertilizer"
  | "irrigation"
  | "vaccination";

interface FarmEvent {
  day: number;
  month: number;
  type: EventType;
  label: string;
  crop?: string;
}

const eventColors: Record<
  EventType,
  { bg: string; text: string; icon: React.ElementType; label: string }
> = {
  planting: {
    bg: "bg-green-500",
    text: "text-green-700",
    icon: Leaf,
    label: "Planting",
  },
  harvest: {
    bg: "bg-amber-500",
    text: "text-amber-700",
    icon: Scissors,
    label: "Harvest",
  },
  fertilizer: {
    bg: "bg-purple-500",
    text: "text-purple-700",
    icon: Droplets,
    label: "Fertilizer",
  },
  irrigation: {
    bg: "bg-blue-500",
    text: "text-blue-700",
    icon: Droplets,
    label: "Irrigation",
  },
  vaccination: {
    bg: "bg-red-500",
    text: "text-red-700",
    icon: Syringe,
    label: "Vaccination",
  },
};

const farmEvents: FarmEvent[] = [
  {
    day: 3,
    month: 0,
    type: "planting",
    label: "Plant Rice seedlings",
    crop: "Rice",
  },
  {
    day: 8,
    month: 0,
    type: "fertilizer",
    label: "Apply NPK to Maize",
    crop: "Maize",
  },
  { day: 15, month: 0, type: "irrigation", label: "Irrigate Tomato field" },
  { day: 20, month: 0, type: "vaccination", label: "Cattle FMD vaccination" },
  {
    day: 25,
    month: 0,
    type: "harvest",
    label: "Harvest Cassava",
    crop: "Cassava",
  },
  {
    day: 5,
    month: 1,
    type: "planting",
    label: "Plant Groundnuts",
    crop: "Groundnuts",
  },
  {
    day: 12,
    month: 1,
    type: "fertilizer",
    label: "Top-dress Rice with Urea",
    crop: "Rice",
  },
  { day: 18, month: 1, type: "irrigation", label: "Irrigate Rice paddies" },
  { day: 22, month: 1, type: "harvest", label: "Harvest Maize", crop: "Maize" },
  {
    day: 28,
    month: 1,
    type: "vaccination",
    label: "Poultry Newcastle vaccine",
  },
  {
    day: 7,
    month: 2,
    type: "planting",
    label: "Plant Cassava cuttings",
    crop: "Cassava",
  },
  { day: 14, month: 2, type: "fertilizer", label: "Apply compost to Tomatoes" },
  {
    day: 21,
    month: 2,
    type: "harvest",
    label: "Harvest Groundnuts",
    crop: "Groundnuts",
  },
  {
    day: 10,
    month: 3,
    type: "planting",
    label: "Plant Maize (2nd season)",
    crop: "Maize",
  },
  { day: 17, month: 3, type: "vaccination", label: "Goat PPR vaccination" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export default function PlannerSection() {
  const ref = useReveal();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthEvents = farmEvents.filter(e => e.month === currentMonth % 12);

  const getEventsForDay = (day: number) =>
    monthEvents.filter(e => e.day === day);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else setCurrentMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else setCurrentMonth(m => m + 1);
    setSelectedDay(null);
  };

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <section id="planner" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            Farm Planner
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Plan Every Season
            <br />
            <span className="text-[#2E7D32]">Never Miss a Task</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Your interactive farming calendar with planting dates, harvest
            schedules, fertilizer applications, and livestock vaccination
            reminders.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div
            className="lg:col-span-2 reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden">
              {/* Calendar header */}
              <div className="bg-gradient-to-r from-[#1B4332] to-[#2E7D32] p-5 flex items-center justify-between">
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="text-white font-bold text-lg">
                  {months[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-green-50">
                {days.map(d => (
                  <div
                    key={d}
                    className="py-2 text-center text-xs font-semibold text-gray-400"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="h-14 border-b border-r border-gray-50"
                  />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                  day => {
                    const events = getEventsForDay(day);
                    const isToday =
                      day === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();
                    const isSelected = day === selectedDay;
                    return (
                      <button
                        key={day}
                        onClick={() =>
                          setSelectedDay(day === selectedDay ? null : day)
                        }
                        className={`h-14 border-b border-r border-gray-50 p-1 text-left hover:bg-green-50 transition-colors relative ${
                          isSelected
                            ? "bg-green-50 ring-2 ring-inset ring-[#2E7D32]"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                            isToday
                              ? "bg-[#2E7D32] text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {day}
                        </span>
                        <div className="flex flex-wrap gap-0.5 mt-0.5">
                          {events.slice(0, 2).map((e, ei) => (
                            <span
                              key={ei}
                              className={`w-2 h-2 rounded-full ${eventColors[e.type].bg}`}
                            />
                          ))}
                          {events.length > 2 && (
                            <span className="text-[8px] text-gray-400">
                              +{events.length - 2}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 reveal" style={{ transitionDelay: "0.2s" }}>
            {/* Legend */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
              <h4 className="font-bold text-[#1B4332] text-sm mb-3">
                Event Types
              </h4>
              <div className="space-y-2">
                {Object.entries(eventColors).map(([type, config]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${config.bg}`} />
                    <span className="text-sm text-gray-600">
                      {config.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected day events */}
            {selectedDay && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
                <h4 className="font-bold text-[#1B4332] text-sm mb-3">
                  {months[currentMonth]} {selectedDay}
                </h4>
                {selectedEvents.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvents.map((e, i) => {
                      const config = eventColors[e.type];
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-2 p-2 rounded-xl bg-gray-50`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${config.bg} mt-1.5 flex-shrink-0`}
                          />
                          <div>
                            <div className="text-xs font-semibold text-[#1B4332]">
                              {e.label}
                            </div>
                            {e.crop && (
                              <div className="text-xs text-gray-400">
                                {e.crop}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">
                    No tasks scheduled for this day.
                  </p>
                )}
              </div>
            )}

            {/* Upcoming events */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
              <h4 className="font-bold text-[#1B4332] text-sm mb-3">
                Upcoming in {months[currentMonth]}
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {monthEvents
                  .sort((a, b) => a.day - b.day)
                  .map((e, i) => {
                    const config = eventColors[e.type];
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${config.bg} mt-1.5 flex-shrink-0`}
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-gray-500">
                            Day {e.day}:{" "}
                          </span>
                          <span className="text-gray-700">{e.label}</span>
                        </div>
                      </div>
                    );
                  })}
                {monthEvents.length === 0 && (
                  <p className="text-xs text-gray-400">No events this month.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
