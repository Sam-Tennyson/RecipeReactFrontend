import { ROUTE_CONSTANTS } from "../Shared/Routes";
import AboutUs from "../Views/Authentication/AboutUs";
import Dashboard from "../Views/Authentication/Dashboard";
import RecipeDetail from "../Views/Authentication/RecipeDetail";

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <Dashboard />,
        title: "Dashboard"  
    },
    {
        path: ROUTE_CONSTANTS.RECIPE_DETAIL,
        element: <RecipeDetail />,
        title: "Recipe Detail"  
    },
    {
        path: ROUTE_CONSTANTS.ABOUT_US,
        element: <AboutUs />,
        title: "About Us"  
    }
]

