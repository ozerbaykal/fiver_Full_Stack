import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link to={"/login"} className="transition hover:text-green-500 p-2 ">
        Giriş Yap
      </Link>
      <Link
        to={"/register"}
        className="transition hover:bg-green-500 hover:text-white p-2 border border-green-500 rounded-md "
      >
        Kaydol
      </Link>
    </>
  );
};

export default Links;
