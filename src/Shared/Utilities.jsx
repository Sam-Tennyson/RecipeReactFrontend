import { useLocation } from "react-router-dom"

export const errorSnackbar = {
    variant: "error",
    autoHideDuration: "2000",
    anchorOrigin: {horizontal: "right", vertical: "bottom"}
}

export const successSnackbar = {
    variant: "success",
    autoHideDuration: "2000",
    anchorOrigin: {horizontal: "right", vertical: "bottom"}
}

export const useQuery = () => {
    const location = useLocation();
    let query = null
    if(location.pathname && location.pathname.split('?')[1]) {
		query = new URLSearchParams('?'+location.pathname.split('?')[1]);
	}
	if(!query) {
		query = new URLSearchParams(location.search);
	}
    return query    
}