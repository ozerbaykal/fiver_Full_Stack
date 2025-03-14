import { FaStar } from "react-icons/fa";
import { IGig } from "../../types";
import "@splidejs/react-splide/css";

type Props = {
  gig: IGig;
};

const GigInfo = ({ gig }: Props) => {
  return (
    <div className="flex-1  flex flex-col gap-5">
      <h1 className="font-bold text-xl md:text-2xl">{gig.title}</h1>

      <div className="flex gap-3 items-center">
        <img src={gig.user.photo} alt="" className="size-12 rounded-full" />
        <div>
          <h4 className="font-bold"> {gig.user.username}</h4>
          <div className="flex items-center gap-1">
            <FaStar />
            <span className="font-semibold">4.5</span>
            <span className="text-gray-500 underline">(50 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigInfo;
