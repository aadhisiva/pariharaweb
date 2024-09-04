import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAuth } from "../components/customComponenets/useAuth"   
import SidebarWIthHeader from "../partials/Sidebar";
import { useEffect } from "react";

export const PrivateAuthRoute = () => {
    const [{ isLoggedIn }] = UseAuth();
    const location = useLocation();

    useEffect(() => {
        document.querySelector("html").style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        document.querySelector("html").style.scrollBehavior = "";
    }, [location.pathname]); // triggered on route change

    return isLoggedIn ?
        <SidebarWIthHeader>
            <Outlet />
        </SidebarWIthHeader> : <Navigate to={'/login'} replace />
};