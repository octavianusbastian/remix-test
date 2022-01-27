import React, { useState } from "react";
import { ShortText } from "./ShortText";
import TextAreaAutoSize from "react-autosize-textarea";

export const LongText = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  onBlur,
  maxRows,
  disableValidation,
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
      <div className="mt-1">
        <TextAreaAutoSize
          disabled={!!disabled}
          required={!!required}
          placeholder={placeholder || ""}
          // ##########################################
          value={value || ""}
          onChange={onChange || ((e) => {})}
          // ##########################################
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) {
              onBlur(e);
            }
          }}
          className={`form-control border border-blue-400 block px-3 w-full rounded-md text-sm outline-none bg-white py-2 ${validationClassName}`}
          rows={2}
          maxRows={maxRows || 4}
          style={{
            minHeight: 40,
          }}
        />
        {!disableValidation ? (
          <div className="invalid-feedback text-sm pt-1">
            {invalidMessage ? invalidMessage : `${label} tidak valid!`}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const LongTextProps = ({ onUpdate, placeholder }) => {
  return (
    <div className="pt-1 pb-32">
      <ShortText
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
