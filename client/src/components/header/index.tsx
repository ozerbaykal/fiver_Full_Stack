import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import User from "../user";
import Links from "../Links";

const Header = () => {
  const user = true;
  return (
    <header className=" p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to={"/"}>
          <img src="/fiverr.png" alt="fiver logo" className="w-[100px] " />
        </Link>

        <form className="flex-1 flex border rounded overflow-hidden max-w-[500px]">
          <input placeholder="ara.." type="text" className="w-full h-full px-3 outline-none" />
          <button className="bg-black p-2 text-xl text-white max-sm:hidden">
            <IoSearch />
          </button>
        </form>

        <div className="flex items-center relative  group">{user ? <User /> : <Links />}</div>
      </div>
    </header>
  );
};

export default Header;
