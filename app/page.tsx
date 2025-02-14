import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import Footer from "@/components/Footer"
export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

