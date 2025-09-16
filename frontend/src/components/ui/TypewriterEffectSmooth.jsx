import { motion } from "framer-motion";

export const TypewriterEffectSmooth = ({ words = [], className = "" }) => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 20 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap items-center justify-center ${className}`}
    >
      {words.map((w, idx) => (
        <motion.span key={idx} variants={child} className={`mx-1 ${w.className || ""}`}>
          {w.text}
        </motion.span>
      ))}
    </motion.div>
  );
};


