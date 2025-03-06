import { useState } from "react";
import Input from "../../components/input";
import Toggle from "../../components/input/toogle";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [isSeller, setIsSeller] = useState(false);
  return (
    <div className="max-w-[900px] mx-auto">
      <form className="grid md:grid-cols-2 md:gap-10 md:pt-24 ">
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
