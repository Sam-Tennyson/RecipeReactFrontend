import { ROUTE_CONSTANTS } from "../Shared/Routes";
import Login from "../Views/Authentication/Login";
import Signup from "../Views/Authentication/Signup";

export const AuthRoutes = [
    {
        path: ROUTE_CONSTANTS.LOGIN,
        element: <Login />,
        title: "Login"  
    },
    {
        path: ROUTE_CONSTANTS.SIGNUP,
        element: <Signup />,
        title: "Signup"  
    },
]