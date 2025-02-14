import { Layers, Palette, BarChart3, Webhook } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Drag-and-Drop Builder",
    description: "Create forms effortlessly with our intuitive drag-and-drop interface.",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description: "Personalize your forms with a wide range of customizable themes and styles.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful real-time analytics dashboard.",
  },
  {
    icon: Webhook,
    title: "API & Webhooks for Developers",
    description: "Integrate seamlessly with your existing tools using our robust API and webhooks.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Powerful Features for Seamless Form Creation
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-indigo-500/50"
            >
              <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}