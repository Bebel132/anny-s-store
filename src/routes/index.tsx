import { Navigate, Route, Routes } from "react-router";
import pagesMap from "./pagesMap";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";

const Navigation: React.FC = () => (
    <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path={pagesMap.login} element={<Login />} />
        <Route path={pagesMap.signin} element={<Signin />} />
        <Route path={pagesMap.home} element={<Home />} />
        <Route path={pagesMap.cart} element={<Cart />} />
        <Route path={pagesMap.profile} element={<Profile />} />
    </Routes>
)

export default Navigation