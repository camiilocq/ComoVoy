import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const routing = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  </Router>
);
export default routing;
