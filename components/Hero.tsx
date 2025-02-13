import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Create. Embed. Collect.
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            {" "}
            Simplify Forms.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Effortlessly build and integrate smart forms into your projects—no coding required.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>
      </div>
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 animate-float">
          {/* <img
            src="/placeholder.svg?height=300&width=600"
            alt="Form Builder Demo"
            className="w-full h-auto rounded-md"
          /> */}
        </div>
      </div>
    </section>
  )
}

