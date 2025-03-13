import { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = (e.currentTarget[0] as HTMLInputElement).value;
    navigate(`/search/?query=${text}`);
  };
  return (
    <form onSubmit={handleSubmit} className="flex-1 flex border rounded overflow-hidden max-w-[500px]">
      <input
        placeholder="ara.."
        type="text"
        className="w-full h-full px-3 outline-none "
        defaultValue={params.get("query") || undefined}
      />
      <button className="bg-black p-2 text-xl text-white max-sm:hidden">
        <IoSearch />
      </button>
    </form>
  );
};

export default Form;
