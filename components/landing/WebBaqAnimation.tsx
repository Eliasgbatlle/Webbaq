"use client";

import { motion } from "framer-motion";

const text = "WebBAQ";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export function WebBaqAnimation() {
  return (
    <motion.div
      className="flex justify-center items-center h-full w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.div
          key={index}
          variants={letterVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-display text-white"
          style={{
            position: 'relative',
            textShadow: '0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3)',
          }}
          animate={{
            y: [0, -5, 0, 5, 0],
            x: [0, 2, -2, 2, 0],
            rotate: [0, 1, -1, 1, 0],
          }}
          transition={{
            duration: 8 + index * 0.5, // Different duration for each letter
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1.5, // Start floating after entrance
          }}
        >
          {char}
        </motion.div>
      ))}
    </motion.div>
  );
}