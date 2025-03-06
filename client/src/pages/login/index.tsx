import React, { useContext } from "react";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/authContext";
import { ILoginUser } from "../../types";

const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user = Object.fromEntries(formData.entries());

    login(user as unknown as ILoginUser);
  };
  return (
    <div className="max-w-[500px] pt-24 mx-auto  sm:min-w-[400px] max-sm:w-full">
      <h1 className="title mb-10">Hesabanıza Giriş Yapın</h1>
      <form onSubmit={handleSubmit}>
        <Input label="username" name="username" required />
        <Input label="password" name="password" required />
        <button className="btn">Giriş Yap</button>
      </form>
      <p className="mt-5 text-gray-500">
        Hesabınız Yok mu ?
        <Link to={"/register"} className="text-blue-400 ms-2 hover:text-blue-800 ">
          Kaydol
        </Link>
      </p>
    </div>
  );
};

export default Login;
