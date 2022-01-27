import { Scrollbar } from "react-scrollbars-custom";
import { useState } from "react";

export const CustomScrollbar = ({ autoHide, children, ...props }) => {
  const [inUse, setInUse] = useState();
  const style = {
    style: autoHide && {
      // marginTop: -10,
      // marginBottom: -10,
      // display: inUse ? null : "none",
      opacity: inUse ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
      width: 7,
    },
  };
  // console.log({ style, inUse });

  return (
    <Scrollbar
      trackXProps={style}
      trackYProps={style}
      onMouseEnter={autoHide && (() => setInUse(true))}
      onMouseLeave={autoHide && (() => setInUse(false))}
      // compensateScrollbarsWidth={false}
      disableTracksWidthCompensation
      {...props}
    >
      {children}
    </Scrollbar>
  );
};
