import { IInput } from "../../types";

const Input = ({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  min,
  max,
  disabled = false,
  multiple,
}: IInput) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          required={required}
          name={name}
          disabled={disabled}
          id={name}
          className="input-field min-h-[100px]max-h-[200px]"
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          name={name}
          required={required}
          min={min}
          max={max}
          multiple={multiple}
          disabled={disabled}
          className="input-field "
        />
      )}
    </div>
  );
};

export default Input;
