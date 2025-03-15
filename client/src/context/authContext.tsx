import { JSX, createContext, useContext, useEffect, useState } from "react";
import { IFormUser, ILoginUser, IUser } from "../types";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ContextType = {
  user: IUser | null;
  isLoading: boolean;
  register: (user: IFormUser) => void;
  login: (user: ILoginUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<ContextType>({
  user: null,
  isLoading: true,
  register: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  //her sayfa yenilendiğinde
  useEffect(() => {
    //eğer token yoksa çalışmasın
    const token = localStorage.getItem("token") || document.cookie;
    if (!token) return setIsLoading(false);

    setIsLoading(true);

    api
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        toast.info("Oturumunuzun süresi doldu. Tekrar giriş yapın");
      })
      .finally(() => setIsLoading(false));
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
        toast.error(err.response?.data?.message);
      });
  };

  //giriş yap
  const login = (user: ILoginUser) => {
    setIsLoading(true);
    api
      .post("/auth/login", user)
      .then((res) => {
        //kullanıcı state'ini güncelle
        setUser(res.data.user);

        //token 'i lokel kaydet
        localStorage.setItem("token", res.data.token);

        toast.success("Giriş yapıldı");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  //çıkış yap
  const logout = () => {
    api
      .post("/auth/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("token");
        toast.info("Oturumunuz kapatıldı");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//contexte aboneliğimizi kolaylaştıracak hook

export const useAuth = () => {
  return useContext(AuthContext);
};
