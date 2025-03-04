import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register/inded";
import Login from "./pages/login";
import Header from "./components/header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
