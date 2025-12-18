import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Droplet,
  Heart,
  Shield,
  Users,
} from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "Who is eligible to donate blood?",
    answer:
      "Generally, donors must be 18 years or older, weigh at least 50 kg (110 lbs), and be in good general health. Specific local guidelines and recent travel history may apply. We encourage all potential donors to check the guidelines on our eligibility page.",
  },
  {
    id: 2,
    question: "How often can I donate blood?",
    answer:
      "A healthy adult can typically donate whole blood every 8 to 12 weeks. This interval allows your body sufficient time to replenish the red blood cells and iron lost during the donation process.",
  },
  {
    id: 3,
    question: "Is the donation process safe?",
    answer:
      "Absolutely. The donation process is extremely safe. All materials used are sterile, single-use, and disposed of immediately after donation. Our staff is highly trained to ensure a comfortable and secure experience.",
  },
  {
    id: 4,
    question: "How long does a typical blood donation take?",
    answer:
      "The actual donation of blood takes only about 8 to 10 minutes. However, the entire process, including registration, a mini-physical, and post-donation rest/refreshments, takes approximately 45 minutes to one hour.",
  },
  {
    id: 5,
    question: "What happens to the blood after I donate?",
    answer:
      "Donated blood is tested for infectious diseases and then processed into various components (red cells, plasma, platelets). These components are then distributed to hospitals to save lives in emergencies, surgeries, and treatments for chronic illnesses.",
  },
];

// Reusable Accordion Item Component
const AccordionItem = ({ question, answer, isOpen, toggle }) => {
  const iconColor = isOpen ? "text-white" : "text-red-500";
  const bgClass = isOpen
    ? "bg-red-600 text-white"
    : "bg-white text-gray-900 border-red-200 hover:bg-red-50";

  return (
    <div className="mb-4 border border-red-400/50 rounded-xl shadow-lg transition duration-300">
      {/* Question Header */}
      <button
        className={`w-full flex justify-between items-center p-5 font-semibold text-left rounded-xl ${bgClass}`}
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          <Droplet className={`w-5 h-5 transition duration-300 ${iconColor}`} />
          <span>{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white" />
        ) : (
          <ChevronDown className="w-5 h-5 text-red-600" />
        )}
      </button>

      {/* Answer Content  */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 p-5 pt-0" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <p className="pt-3 text-gray-700 border-t border-red-100">{answer}</p>
      </div>
    </div>
  );
};

// Main FAQ Component
const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-8 md:py-12 bg-red-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="w-10 h-10 mx-auto text-red-600 mb-3 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="text-red-600">Common Questions</span> Answered
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We believe clarity is key. Find quick answers to the most frequent
            queries about donating blood.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div>
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                {...item}
                isOpen={openId === item.id}
                toggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
