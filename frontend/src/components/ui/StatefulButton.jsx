import { useState } from "react";
import { motion } from "framer-motion";
import { FiLoader, FiCheck } from "react-icons/fi";

export const StatefulButton = ({ onClick, children, className = "" }) => {
  const [state, setState] = useState("idle");

  const handleClick = async (e) => {
    if (state === "loading") {
      console.log("StatefulButton: Already loading, ignoring click");
      return;
    }
    
    console.log("StatefulButton: Setting state to loading");
    setState("loading");
    
    try {
      console.log("StatefulButton: Calling onClick handler...");
      const result = await onClick?.(e);
      console.log("StatefulButton: ✅ onClick completed successfully", result);
      setState("success");
      setTimeout(() => {
        console.log("StatefulButton: Resetting to idle");
        setState("idle");
      }, 1200);
    } catch (error) {
      console.error("StatefulButton: ❌ onClick failed", error);
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center rounded-lg px-4 py-2 text-white font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 ring-1 ring-pink-300/40 shadow-[0_8px_22px_rgba(236,72,153,0.35),0_6px_18px_rgba(34,211,238,0.25)] hover:shadow-[0_12px_30px_rgba(236,72,153,0.45),0_10px_24px_rgba(34,211,238,0.35)] transition-all disabled:opacity-70 ${className}`}
      disabled={state === "loading"}
      type="button"
    >
      <span className={`${state !== "idle" ? "opacity-0" : "opacity-100"} transition-opacity`}>{children}</span>
      {state === "loading" && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inline-flex items-center gap-2"
        >
          <FiLoader className="animate-spin" />
          <span>Adding...</span>
        </motion.span>
      )}
      {state === "success" && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inline-flex items-center gap-2"
        >
          <FiCheck />
          <span>Added</span>
        </motion.span>
      )}
    </button>
  );
};


