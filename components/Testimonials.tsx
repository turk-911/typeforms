import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    company: "TechCorp",
    content:
      "This form builder has revolutionized our lead generation process. It's so easy to use and the analytics are incredibly helpful.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Alex Chen",
    role: "Product Designer",
    company: "DesignHub",
    content:
      "The customization options are fantastic. I can create forms that perfectly match our brand identity in minutes.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    company: "InnovateCo",
    content:
      "As a non-technical founder, this tool has been a game-changer. I can create complex forms without any coding knowledge.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

