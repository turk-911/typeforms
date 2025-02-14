import { Edit3, Code, BarChart } from "lucide-react";

const steps = [
  {
    icon: Edit3,
    title: "Create a form",
    description: "Design your form using our intuitive drag-and-drop builder.",
  },
  {
    icon: Code,
    title: "Embed it anywhere",
    description: "Easily integrate your form into any website or application.",
  },
  {
    icon: BarChart,
    title: "Track responses",
    description: "Monitor and analyze responses in real-time from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs">
              {/* Step Icon */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-md transition-all duration-300 hover:shadow-indigo-500/50">
                <step.icon className="w-8 h-8 text-indigo-400" />
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                Step {index + 1}: {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}