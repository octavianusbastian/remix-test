import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewModal = (props) => {
  const handleClickModalMask = (e) => {
    if (e) e.preventDefault();
    if (props.closeOnBackdrop && props.onClose) {
      props.onClose();
    }
  };

  const handleClickModalContent = (e) => {
    if (e) e.stopPropagation();
  };

  const handleEscapeKeydown = (e) => {
    if (e.keyCode == 27) {
      handleClickModalMask();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKeydown, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {props.visible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
            }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
            className="z-50 modal-mask fixed top-0 left-0 bottom-0 right-0 h-screen w-screen block overflow-y-scroll bg-blur"
            onClick={handleClickModalMask}
          ></motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {props.visible ? (
          <motion.div
            initial={{ opacity: 0, y: "-2%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "2%" }}
            transition={{
              duration: 0.15,
            }}
            className="z-50 fixed top-0 left-0 bottom-0 right-0 h-screen w-screen block overflow-y-scroll bg-blur"
            onClick={handleClickModalMask}
          >
            <div
              className={
                "mx-auto bg-white rounded-lg mt-8 md:mt-20 mb-8 overflow-hidden shadow-lg w-11/12 " +
                (!props.size
                  ? "sm:w-4/12"
                  : props.size === "sm"
                  ? "sm:w-3/12"
                  : props.size === "md"
                  ? "sm:w-5/12"
                  : props.size === "lg"
                  ? "sm:w-9/12"
                  : props.size === "xl"
                  ? "sm:w-10/12"
                  : "w-4/12")
              }
            >
              <div className="modal-content" onClick={handleClickModalContent}>
                {props.children}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default NewModal;

export const FormModal = ({
  visible,
  onClose,
  onNext,
  NextLabel,
  onSubmit,
  customTitle,
  title,
  children,
  size,
  submitLabel,
  closeLabel,
  onBack,
  onCustom,
  customButton,
  submitDisabled,
  pageLoading,
  hideSubmitButton,
  hideCloseButton,
}) => (
  <NewModal
    visible={visible}
    onClose={onClose}
    size={size}
    closeOnBackdrop={true}
  >
    <WithForm onSubmit={onSubmit} className="relative">
      {customTitle ? (
        customTitle
      ) : title ? (
        <div className="modal-header  flex text-md md:text-2xl font-bold py-5 px-6 border-b border-gray-300">
          <h4 style={{ margin: 0, padding: 0 }}>{title}</h4>
          {onClose ? (
            <a
              href="#"
              onClick={onClose}
              className="absolute top-0 right-0 mt-5 mr-6"
            >
              <FontAwesomeIcon
                icon="times-circle"
                size="xl"
                className="text-red-300 transition duration-300 hover:text-red-800"
              />
            </a>
          ) : null}
        </div>
      ) : null}
      <div className={"modal-body py-4 px-6"}>{children}</div>

      {onSubmit ? (
        <div className="modal-footer bg-gray-100 py-4 mt-4 px-4 md:px-6 flex justify-end text-right">
          {!hideCloseButton && closeLabel ? (
            <button
              type="button"
              onClick={onBack ? onBack : onClose}
              className="btn btn-danger w-20 md:w-32 btn-flat mr-3 md:mr-5"
            >
              {closeLabel ? (
                closeLabel
              ) : (
                <span>
                  <FontAwesomeIcon icon="times-circle" />
                  &nbsp;Batalkan
                </span>
              )}
            </button>
          ) : null}
          {customButton ? (
            <button
              type="button"
              onClick={onCustom}
              className="btn btn-primary w-20 md:w-32 btn-flat mr-3 md:mr-8"
            >
              {customButton ? (
                customButton
              ) : (
                <span>
                  <FontAwesomeIcon icon="times-circle" />
                  &nbsp;Batalkan
                </span>
              )}
            </button>
          ) : null}
          {!hideSubmitButton && onSubmit ? (
            <button
              disabled={pageLoading || submitDisabled}
              type="submit"
              className="btn btn-primary w-24 md:w-32 px-2"
            >
              {pageLoading ? (
                <span>Menyimpan...</span>
              ) : submitLabel ? (
                submitLabel
              ) : (
                <span>
                  <FontAwesomeIcon icon="check-circle" />
                  &nbsp;Submit
                </span>
              )}
            </button>
          ) : null}

          {onNext ? (
            <button
              type="button"
              className="btn btn-primary w-20 md:w-32 ml-3"
              onClick={onNext}
            >
              {NextLabel ? (
                NextLabel
              ) : (
                <span>
                  <FontAwesomeIcon icon="arrow-circle-right" />
                  &nbsp; Selanjutnya
                </span>
              )}
            </button>
          ) : null}
        </div>
      ) : null}
    </WithForm>
  </NewModal>
);

export const CustomModalTitle = ({ themeColor, icon, title }) => (
  <div
    className={
      "modal-header text-2xl font-thin pt-4 pb-20 -mb-4 px-6 border-white border-2 rounded-t-lg"
    }
    style={{
      background: `url(/manager/images/headers/${themeColor || "primary"}.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
    }}
  >
    <h4 className="text-white m-0 p-0">
      {icon ? <span>{icon} </span> : ""}
      {title}
    </h4>
  </div>
);

const WithForm = ({ onSubmit, children, ...props }) => {
  // console.log("WithForm", !!onSubmit);
  if (!onSubmit) return <div {...props}>{children}</div>;
  return (
    <form {...props} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
