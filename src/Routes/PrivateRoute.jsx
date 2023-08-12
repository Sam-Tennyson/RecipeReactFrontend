import { ROUTE_CONSTANTS } from "../Shared/Routes";
import AddRecipe from "../Views/Athenticated/AddRecipe";
import MyRecipe from "../Views/Athenticated/MyRecipe";
import EditRecipe from "../Views/Athenticated/MyRecipe/EditRecipe";

export const PrivateRoute = [
    {
        path: ROUTE_CONSTANTS.ADD_RECIPE,
        element: <AddRecipe />,
        title: "Add Recipe"  
    },
    {
        path: ROUTE_CONSTANTS.MY_RECIPE,
        element: <MyRecipe />,
        title: "My Recipe"  
    },
    {
        path: ROUTE_CONSTANTS.EDIT_RECIPE,
        element: <EditRecipe />,
        title: "Edit Recipe"  
    },
]