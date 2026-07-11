import { HEADER_ROUTE, SIDE_BAR_ROUTE, START_LOADER, STOP_LOADER } from "../Actions/ActionType";

const initialState = {
    loading: false,
    side_bar_route: null,
    header_route: null,
}

const Loader = (state = initialState, action) => {
    switch (action.type) {

        case START_LOADER:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADER:
            return {
                ...state,
                loading: false
            }
        case SIDE_BAR_ROUTE:
            return {
                ...state,
                side_bar_route: action.payload
            }
        case HEADER_ROUTE:
            return {
                ...state,
                header_route: action.payload
            }
        default:
            return state;
    }
}

export default Loader 