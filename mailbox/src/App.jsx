import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/Pages/Signin";
import { Signup } from "./components/Pages/Signup";
import ForgetPassword from "./components/Pages/ForgetPassword";
import Home from "./components/Pages/Home";
import SentMail from "./components/Pages/SentMail";
import IndexMail from "./components/Pages/IndexMail";
import MessageMail from "./components/Pages/MessageMail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<Home />}>
          <Route path="inbox" element={<IndexMail />} />
          <Route path="trash" element={<MessageMail />} />
          <Route path="sentMail" element={<SentMail />} />
          <Route path="/inbox/:messageId" element={<MessageMail />} />
          <Route path="/sent/:messageId" element={<MessageMail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
