import { Link } from "react-router-dom";
import { IGig } from "../../types";
import { AiOutlineHome } from "react-icons/ai";

type Props = {
  gig: IGig | undefined;
};

const BreadCrumb = ({ gig }: Props) => {
  return (
    <div>
      <p className="flex gap-3 items-center text-gray-500">
        <Link to={"/"}>
          <AiOutlineHome />
        </Link>
        <span> /</span>
        <Link to={`search?category=${gig?.category}`} className="hover:underline">
          {gig?.category}
        </Link>
      </p>
    </div>
  );
};

export default BreadCrumb;
