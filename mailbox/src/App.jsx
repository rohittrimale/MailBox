import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/Pages/Signin";
import { Signup } from "./components/Pages/Signup";
import ForgetPassword from "./components/Pages/ForgetPassword";
import Home from "./components/Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
