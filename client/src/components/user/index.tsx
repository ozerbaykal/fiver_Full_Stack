import { Link } from "react-router-dom";
import { IUser } from "../../types";

type Props = {
  user: IUser;
};

const User = ({ user }: Props) => {
  return (
    <>
      <img src={user.photo} alt="" className="size-[40px] rounded-full object-cover bg-blue-400" />
      <span>{user.username}</span>

      <div className="w-[140px] bg-gray-200 flex-col text-[14px] absolute  top-10 left-0 transition duration-500 rounded-md text-center hidden group-hover:flex   ">
        <Link to={"/my-gigs"} className="px-5 py-2  hover:bg-gray-100">
          Hizmetler
        </Link>
        <Link to={"/add-gig"} className="px-5 py-2  hover:bg-gray-100 text-nowrap">
          Hizmet Ekle
        </Link>
        <Link to={"/"} className="px-5 py-2  hover:bg-gray-100 text-nowrap">
          Siparişler
        </Link>
        <Link to={"/"} className="px-5 py-2  hover:bg-gray-100 text-nowrap">
          Messajlar
        </Link>
        <button
          className="px-5 py-2  hover:bg-gray-100 text-nowrap"
          onClick={() => {
            alert("çıkış yapılıyor");
          }}
        >
          Çıkış yap
        </button>
      </div>
    </>
  );
};

export default User;
