import { GET_TEST_API_DATA, HEADER_ROUTE, SIDE_BAR_ROUTE, START_LOADER, STOP_LOADER } from "./ActionType"

export const stopLoader = () => {
    return {
        type: STOP_LOADER
    }
}

export const startLoader = () => {
    return {
        type: START_LOADER
    }
}

export const getTestApiData = () => {
    return {
        type: GET_TEST_API_DATA
    }
}

export const setSideBarRoute = (payload) => {
    return {
        type: SIDE_BAR_ROUTE,
        payload
    }
}

export const setHeaderRoute = (payload) => {
    return {
        type: HEADER_ROUTE,
        payload
    }
}