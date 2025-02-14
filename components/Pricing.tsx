import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Up to 5 forms", "100 responses per month", "Basic analytics", "Email support"],
  },
  {
    name: "Pro",
    price: "$29",
    features: [
      "Unlimited forms",
      "10,000 responses per month",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited everything",
      "Dedicated account manager",
      "Custom integrations",
      "SLA",
      "On-premise deployment option",
    ],
  },
]

export default function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Choose the Right Plan for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-cyan-400 mb-6">{plan.price}</p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  index === 1
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "border border-gray-500 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {index === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}