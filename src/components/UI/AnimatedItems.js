import React from "react";
import { motion } from "framer-motion";
export default function AnimatedItems(props) {
  return (
    <motion.div
      key={props.id}
      initial={{ transform: "scale(0)" }}
      animate={{ transform: "scale(1)" }}
      exit={{ transform: "scale(0)" }}
      transition={{ duration: 0.3 }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
}
