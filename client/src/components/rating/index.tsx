import { FaStar } from "react-icons/fa";

type Props = {
  rating: number;
  reviews: string;
  designs?: string;
};
const Rating = ({ rating, reviews, designs }: Props) => {
  return (
    <div className={`flex items-center gap-1 ${designs}`}>
      <FaStar />
      <span className="font-semibold">{rating}</span>
      <span className="text-gray-500 font-normal underline">{reviews}</span>
    </div>
  );
};

export default Rating;
