import { JSX, createContext, useContext, useEffect, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ContextType = {
  user: IUser | null;
  register: (user: IFormUser) => void;
  login: (user: ILoginUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  //her sayfa yenilendiğinde
  useEffect(() => {
    api
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  //kaydol
  const register = (user: IFormUser) => {
    api
      .post("/auth/register", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.info("Hesabınız Oluşturuldu.Giriş yapabilirsiniz");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Üzgünüz bir hata oluştu");
        console.log(err);
      });
  };

  //giriş yap
  const login = (user: ILoginUser) => {
    api
      .post("/auth/login", user)
      .then((res) => {
        //kullanıcı state'ini güncelle
        setUser(res.data.user);

        //token 'i lokel kaydet
        localStorage.setItem("token", res.data.token);

        toast.info("Giriş yapıldı");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Üzgünüz bir hata oluştu");
        console.log(err);
      });
  };

  //çıkış yap
  const logout = () => {};

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
};

//contexte aboneliğimizi kolaylaştıracak hook

export const useAuth = () => {
  return useContext(AuthContext);
};
