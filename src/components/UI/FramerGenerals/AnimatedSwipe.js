import React from "react";
import { motion } from "framer-motion";
const AnimatedSwipe = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0" }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {props.children}
    </motion.div>
  );
};
export default AnimatedSwipe;
