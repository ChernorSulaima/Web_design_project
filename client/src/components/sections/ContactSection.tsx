/* AgriLink Sierra – Contact Section with form validation and Framer Motion */
import { useState } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const districts = [
  "Western Area Urban",
  "Western Area Rural",
  "Bo",
  "Bombali",
  "Bonthe",
  "Falaba",
  "Kailahun",
  "Kambia",
  "Karene",
  "Kenema",
  "Koinadugu",
  "Kono",
  "Moyamba",
  "Port Loko",
  "Pujehun",
  "Tonkolili",
];

const farmTypes = [
  "Rice Farming",
  "Cassava Farming",
  "Vegetable Farming",
  "Cocoa/Coffee",
  "Palm Oil",
  "Livestock",
  "Mixed Farming",
  "Other",
];

interface FormData {
  name: string;
  district: string;
  phone: string;
  farmType: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  district?: string;
  phone?: string;
  farmType?: string;
  email?: string;
  message?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    district: "",
    phone: "",
    farmType: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.district) newErrors.district = "Please select your district";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^(\+232|0)[0-9]{8}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid Sierra Leone phone number";
    if (!form.farmType) newErrors.farmType = "Please select your farm type";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[#F8FFF8] overflow-hidden"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-3">
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Get in touch with our team
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Register your farm, request harvest coordination, or contact us
            about wholesale buying partnerships. Our district leads will respond
            directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-[#1B4332] to-[#2E7D32] rounded-3xl p-6 text-white shadow-md">
              <h3 className="font-bold text-lg mb-6">Get In Touch</h3>
              {[
                { icon: Phone, label: "Phone", value: "+232 76 123 456" },
                { icon: Mail, label: "Email", value: "hello@agrilink.sl" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "15 Wilberforce Street, Freetown, Sierra Leone",
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-[#FFC107]" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                    <div className="text-white text-sm font-medium">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
              <h4 className="font-bold text-[#1B4332] mb-3 text-sm">
                Office Hours
              </h4>
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium">8am – 6pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9am – 2pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100 flex flex-col items-center justify-center text-center h-full min-h-64">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-[#2E7D32]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B4332] mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Thank you, <strong>{form.name}</strong>! We've received your
                  message and will contact you within 24 hours on{" "}
                  <strong>{form.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      district: "",
                      phone: "",
                      farmType: "",
                      email: "",
                      message: "",
                    });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#2E7D32] text-white font-semibold text-sm hover:bg-[#1B4332] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-green-100"
              >
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => handleChange("name", e.target.value)}
                      placeholder="e.g. Aminata Koroma"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  {/* District */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      District *
                    </label>
                    <select
                      value={form.district}
                      onChange={e => handleChange("district", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors ${errors.district ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                    >
                      <option value="">Select district...</option>
                      {districts.map(d => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.district}
                      </p>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => handleChange("phone", e.target.value)}
                      placeholder="+232 76 123 456"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  {/* Farm type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Farm Type *
                    </label>
                    <select
                      value={form.farmType}
                      onChange={e => handleChange("farmType", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors ${errors.farmType ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                    >
                      <option value="">Select farm type...</option>
                      {farmTypes.map(t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.farmType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.farmType}
                      </p>
                    )}
                  </div>
                </div>
                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => handleChange("message", e.target.value)}
                    placeholder="Tell us about your farm, what help you need, or any questions you have..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-colors resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#2E7D32]"}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B4332] text-white font-bold text-base transition-all duration-200 btn-active shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
