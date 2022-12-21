import React from "react";
import { motion } from "framer-motion";
export default function AnimatedChartTile(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={props.className}
    >
      {props.children}
    </motion.div>
  );
}
