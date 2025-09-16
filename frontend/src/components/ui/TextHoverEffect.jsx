import { motion } from "framer-motion";

export const TextHoverEffect = ({ text = "TASKS" }) => {
  const letters = String(text).split("");
  return (
    <div className="relative inline-flex select-none">
      {letters.map((ch, idx) => (
        <motion.span
          key={idx}
          initial={{ y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="mx-0.5 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500 hover:from-fuchsia-500 hover:to-cyan-400"
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
};


