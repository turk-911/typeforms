import { Edit3, Code, BarChart } from "lucide-react"

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
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs">
              <div className="bg-white rounded-full p-4 shadow-md mb-4">
                <step.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

