"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

export default function Testimonials() {
  return <HeroParallax testimonials={testimonials} />;
}

export const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager, Aceternity UI",
    testimonial:
      "The no-code form builder is a game changer! It has saved us countless hours while providing seamless integration with our workflow.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Founder, Moonbeam",
    testimonial:
      "I've tried many form builders, but this one stands out. It's intuitive, flexible, and delivers real-time insights effortlessly.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Johnson",
    role: "CEO, Renderwork Studio",
    testimonial:
      "We switched to this platform for our data collection, and it's been fantastic. The customization options are top-notch!",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily White",
    role: "Marketing Lead, SmartBridge",
    testimonial:
      "The ease of use and automation capabilities are outstanding. It has helped us streamline our marketing efforts significantly.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "David Brown",
    role: "CTO, Algochurn",
    testimonial:
      "Integrating this with our existing systems was seamless. The API support and analytics dashboard are a huge plus!",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Sophia Wilson",
    role: "Designer, Pixel Perfect",
    testimonial:
      "Beautiful UI, easy to use, and powerful features. This tool is perfect for teams that want to move fast.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    name: "Daniel Lee",
    role: "Software Engineer, Tailwind Master Kit",
    testimonial:
      "As a developer, I appreciate the well-documented API and the ability to customize every aspect of the form experience.",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    name: "Olivia Martinez",
    role: "Founder, Creme Digital",
    testimonial:
      "We use this form builder daily, and it's been an absolute joy. The insights we get from the responses are invaluable.",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    name: "William Anderson",
    role: "Growth Manager, Invoker Labs",
    testimonial:
      "I love the speed and performance. Forms load instantly, and the user experience is smooth and intuitive.",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Emma Scott",
    role: "Operations Lead, E Free Invoice",
    testimonial:
      "This platform has transformed how we handle data collection. Highly recommend it for any business.",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];