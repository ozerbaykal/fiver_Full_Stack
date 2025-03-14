import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { IGigDetail } from "../../types";
import { GiRecycle } from "react-icons/gi";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { BsArrowDown } from "react-icons/bs";

type Props = {
  data: IGigDetail;
};

const PackageInfo = ({ data }: Props) => {
  return (
    <div className="h-fit flex flex-col gap-8 border shadow rounded-md mb-20 p-5 md:mt-20 md:sticky top-20 ">
      <div className="flex justify-between font-semibold">
        <h2 className="text-xl">{data.package_title}</h2>
        <p className="text-lg">{data.package_price.toLocaleString()}₺</p>
      </div>
      <p className="text-gray-600">{data.package_description}</p>

      <div className="flex gap-10 font-semibold text-sm text-nowrap">
        <p className="flex items-center gap-2 ">
          <FaRegClock className="text-lg" />
          {data.package_duration} günde teslimat
        </p>
        <p className="flex items-center gap-2 ">
          <GiRecycle className="text-lg" />
          {data.package_revisions} revizyon hakkı
        </p>
      </div>

      <ul>
        {data.package_features.map((i, key) => (
          <li key={key} className="flex items-center gap-2">
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-500">{i}</span>
          </li>
        ))}
      </ul>
      <button className="flex items-center gap-1 bg-black p-2 text-white rounded-md hover:bg-zinc-700 transition ">
        <span className="flex-1 font-semibold ">Devam Et</span>
        <FaArrowRight />
      </button>
      <button className="flex items-center justify-center border gap-1  p-2  rounded-md hover:bg-zinc-200 transition ">
        <span className=" font-semibold ">İletişime Geç</span>
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default PackageInfo;
