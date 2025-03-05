import Input from "../../components/input";

const Register: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto">
      <form className="grid md:grid-cols-2 md:gap-10 md:pt-24 ">
        <div className="">
          <h1 className="text-xl md:text-2xl lg:text-3xl text-gray-500 font-bold mb-5">Yeni Hesap OLuştur</h1>

          <Input label="isim" name="username" required={true} />
          <Input label="Email" name="email" required={true} type="email" />
          <Input label="Fotograf" name="photo" required={true} type="file" />
          <Input label="Ülke" name="country" required={true} />
          <Input label="Şifre" name="password" required={true} />
        </div>
      </form>
    </div>
  );
};

export default Register;
