import { motion } from "framer-motion";

const loaderVariants = {
  start: {
    rotate: 0,
  },
  end: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const Loader = () => {
  return (
    <div>
      <motion.svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        variants={loaderVariants}
        initial="start"
        animate="end"
      >
        <motion.text x="25" y="70" fill="#409cfe" fontSize="40">
          G
          <motion.animateMotion path="M 30 70 C 60 40, 130 40, 160 70">
            <motion.tspan x="45" y="70" fill="#f687ff" fontSize="40">
              -Learner
            </motion.tspan>
          </motion.animateMotion>
        </motion.text>
      </motion.svg>
    </div>
  );
};

export default Loader;
