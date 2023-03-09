import React from "react";

interface Props {
  type?: string;
  name?: string;
  value?: string;
  handleChange?: () => void;
  labelText?: string;
  formClass?: string;
}

const FormRow: React.FC<Props> = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  formClass,
}) => {
  return (
    <div className="grid">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={formClass || "form-input"}
      />
    </div>
  );
};

export default FormRow;
