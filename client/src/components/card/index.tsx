import { Link } from "react-router-dom";
import { IGig } from "../../types";
import { FaStar } from "react-icons/fa";
import Rating from "../rating";

type Props = {
  item: IGig;
};
const Card = ({ item }: Props) => {
  return (
    <Link to={`/detail/${item._id}`} className="p-2 rounded-md cursor-pointer flex flex-col gap-5 group">
      <img src={item.coverImage} className="h-full w-full object-cover max-h-[200px] rounded-md " alt="" />

      <div className="flex gap-2 items-center ">
        <img src={item.user.photo} className="size-8 rounded-full" />
        <p>
          <span className="font-semibold">{item.user.username}</span>
          <span className="text-gray-500"> tarafından oluşturuldu</span>
        </p>
      </div>
      <h2 className="group-hover:underline line-clamp-3">{item.title}</h2>

      <Rating rating={4.5} reviews={"1k+"} designs="font-semibold text-xl" />

      <p className="font-semibold">
        <span> From ₺{item.package_price.toLocaleString()} </span>
        <span className="text-gray-500 font-normal">'den başlayan Fiyatlarla</span>
      </p>
    </Link>
  );
};

export default Card;
