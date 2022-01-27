import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Password = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  onKeyDown,
}) => {
  let [touched, setTouched] = useState(false);
  let validationClassName = "";
  let invalidMessage = "";
  if (value) {
    validationClassName = "is-valid";
  } else if (touched && required && !disabled) {
    validationClassName = "is-invalid";
    invalidMessage = `${name || label || "Field ini"} wajib diisi`;
  }
  // console.log({
  //   required,
  //   touched,
  //   disabled,
  //   validationClassName,
  //   invalidMessage,
  // });

  const [passwordVisible, setPasswordvisible] = useState(false);

  return (
    <div className="py-2">
      {typeof label === "string" || typeof label === "object" ? (
        <label className={`text-sm ${disabled ? "text-gray-400" : ""}`}>
          {label}{" "}
          {label && !required && (
            <span className="text-gray-300">(opsional)</span>
          )}
        </label>
      ) : null}
      <div className="mt-1 relative">
        <input
          type={passwordVisible ? "text" : "password"}
          disabled={!!disabled}
          required={!!required}
          placeholder={placeholder || ""}
          // ##########################################
          value={value || ""}
          onChange={onChange || ((e) => {})}
          onKeyDown={onKeyDown}
          // ##########################################
          onBlur={(e) => {
            setTouched(true);
          }}
          className={`form-control border border-blue-400 block px-3 w-full rounded-md text-sm outline-none bg-white py-2 ${validationClassName}`}
        />
        <div className="invalid-feedback text-sm pt-1">
          {invalidMessage ? invalidMessage : `${label} tidak valid!`}
        </div>
        <a
          href="#"
          onClick={(e) => {
            if (e) e.preventDefault();
            setPasswordvisible(!passwordVisible);
          }}
          className="absolute top-0 bottom-0 right-0 px-3 hover:opacity-50 text-gray-500 text-sm"
          style={{
            paddingTop: 9,
            paddingBottom: 9,
          }}
        >
          {passwordVisible ? (
            <FontAwesomeIcon icon="eye-slash" />
          ) : (
            <FontAwesomeIcon icon="eye" />
          )}
        </a>
      </div>
    </div>
  );
};

export const PasswordProps = ({ onUpdate, placeholder }) => {
  return (
    <div className="pt-1 pb-32">
      <Password
        label="Placeholder"
        value={placeholder || ""}
        onChange={(e) => {
          if (e) e.preventDefault();
          if (onUpdate) {
            onUpdate({
              placeholder: e.target.value,
            });
          }
        }}
      />
    </div>
  );
};
