import { IoSearch } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="bg-f-green max-md:m-[-20px] h-[40vh] px-6 py-6 md:px-12 md:py-10 md:rounded flex flex-col justify-center items-center text-white ">
      <div className="max-w-[600px]">
        <h1 className="text-4xl md:text-center md:text-5xl font-light">
          Profosyonel iş gücünüzü <span className="font-serif">freelancer'larla</span> ölçeklendirin
        </h1>
        <form className="bg-white rounded-md w-full flex gap-5 mt-10">
          <input
            placeholder="hizmet ara"
            type="text"
            className="flex-1 p-2 rounded-md text-black outline-none"
          />
          <button className=" bg-f-green m-1 p-2 rounded-md hover:bg-opacity-70 transition">
            <IoSearch />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
