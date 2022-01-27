// import { motion } from "framer-motion";
// import { CustomScrollbar } from "./CustomScrollbar";
import { ClientOnly } from "remix-utils";

export const DetailRightBar = ({ show, onClose, children, width, padding }) => {
  return (
    <ClientOnly fallback={<div></div>}>
      <div>
        {/* <motion.div
          initial="closed"
          animate={show ? "open" : "closed"}
          variants={{
            open: { opacity: 0.3, display: "block" },
            closed: { opacity: 0, display: "none" },
          }}
          className="fixed top-0 right-0 bottom-0 bg-gray-800 w-full z-20 overflow-y-auto shadow-xl"
          onClick={onClose}
        ></motion.div>
        <motion.div
          initial="closed"
          animate={show ? "open" : "closed"}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "100%" },
          }}
          transition={{ type: "tween" }}
          className={
            "fixed top-0 right-0 bottom-0 bg-white z-40 overflow-y-auto shadow-xl " +
            (width || "w-full md:w-1/3") +
            " " +
            (padding || "px-4 md:px-8 py-6")
          }
        >
          <CustomScrollbar
            style={{
              height: "100%",
              width: "100%",
            }}
            autoHide
          >
            {children}
          </CustomScrollbar>
        </motion.div> */}
      </div>
    </ClientOnly>
  );
};
