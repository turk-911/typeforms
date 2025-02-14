"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

export const HeroParallax = ({
  testimonials,
}: {
  testimonials: {
    name: string;
    role: string;
    testimonial: string;
    avatar: string;
  }[];
}) => {
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);
  const thirdRow = testimonials.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((testimonial) => (
            <TestimonialCard
              testimonial={testimonial}
              translate={translateX}
              key={testimonial.name}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((testimonial) => (
            <TestimonialCard
              testimonial={testimonial}
              translate={translateXReverse}
              key={testimonial.name}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((testimonial) => (
            <TestimonialCard
              testimonial={testimonial}
              translate={translateX}
              key={testimonial.name}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold text-white">
        What Our <br /> Users Say
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200">
        See how our seamless, no-code form builder has transformed data collection
        for users worldwide. Effortless integration, real-time insights, and
        beautiful customizable forms. 🚀
      </p>
    </div>
  );
};

export const TestimonialCard = ({
  testimonial,
  translate,
}: {
  testimonial: {
    name: string;
    role: string;
    testimonial: string;
    avatar: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/testimonial h-52 w-[30rem] bg-white/85 p-6 rounded-lg shadow-lg relative flex-shrink-0"
    >
      <div className="flex items-center space-x-4">
        <Image
          src={testimonial.avatar}
          height={60}
          width={60}
          className="rounded-full object-cover"
          alt={testimonial.name}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700 text-sm">{testimonial.testimonial}</p>
    </motion.div>
  );
};