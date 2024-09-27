import { motion } from "framer-motion";

const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, animate: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
