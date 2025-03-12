import { ICategory } from "../../types";

type Props = {
  label: string;
  options: ICategory[];
  name: string;
};
const Select = ({ label, options, name }: Props) => {
  return (
    <div>
      <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <select required name={name} id={name} className="input-field">
        {options.map((option, key) => (
          <option key={key} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
