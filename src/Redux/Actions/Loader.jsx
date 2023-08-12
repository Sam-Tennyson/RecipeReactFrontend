import { GET_TEST_API_DATA, START_LOADER, STOP_LOADER } from "./ActionType"

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