import { FormEvent, useContext, useState } from "react";
import Input from "../../components/input";
import Toggle from "../../components/input/toogle";
import { Link } from "react-router-dom";
import { IFormUser } from "../../types";
import { AuthContext } from "../../context/authContext";

const Register: React.FC = () => {
  const { register } = useContext(AuthContext);
  const [isSeller, setIsSeller] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //bir formdata örneği oluştur
    const formData = new FormData(e.target as HTMLFormElement);
    //bütün imputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData.entries());

    //satıcı hesabı bilgisini nesne içerisine kaydet
    (newUser as unknown as IFormUser).isSeller = isSeller;

    //api 'a kaydolma isteği at
    register(newUser as unknown as IFormUser);
  };
  return (
    <div className="max-w-[900px] mx-auto">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 md:gap-10 md:pt-24 ">
        <div className="">
          <h1 className="title">Yeni Hesap OLuştur</h1>

          <Input label="isim" name="username" required={true} />
          <Input label="Email" name="email" required={true} type="email" />
          <Input label="Fotograf" name="photo" required={true} type="file" />
          <Input label="Ülke" name="country" required={true} />
          <Input label="Şifre" name="password" required={true} />
        </div>

        <div>
          <h1 className="title">Satıcı Olmak İstiyorum</h1>
          <Toggle setIsSeller={setIsSeller} />
          <Input label="Telefon" type="number" name="phone" disabled={!isSeller} required={isSeller} />
          <Input label="Açıklama" type="textarea" name="phone" disabled={!isSeller} required={isSeller} />
          <button type="submit" className="btn">
            Kayıt Ol
          </button>
          <p className="mt-5 text-gray-500">
            Hesabınız Var mı?
            <Link
              className="ms-3 text-blue-600  hover:text-blue-800 hover:scale-110 transition "
              to={"/login"}
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
