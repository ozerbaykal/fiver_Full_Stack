import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Loader from "../loader/loader";

const Protected = () => {
  //kullanıcı verilerini al
  const { user, isLoading } = useAuth();

  //Kullanıcı verisi yüklenene  kadar loader bas
  if (isLoading) return <Loader designs="my-20" />;

  //kullanıcı hesabı satıcı değilse anasayfaya yönlendir
  if (!user?.isSeller) return <Navigate to="/" replace />;

  //kullanıcı hesabı satıcıysa sayfayı göster
  return <Outlet />;
};

export default Protected;
