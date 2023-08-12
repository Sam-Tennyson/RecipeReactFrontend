import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE, GET_CATEGORY, GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPE_COMMENT, GET_USER_RECIPE_DATA, RECIPE_UPLOAD_IMAGE, SET_CATEGORY, SET_RECIPES } from "./ActionType"

export const getRecipe = (payload) => {

    return {
        type: GET_RECIPES,
        payload
    }
}

export const setRecipe = (payload) => {
    return {
        type: SET_RECIPES,
        payload
    }
}

export const addRecipe = (payload) => {
    return {
        type: ADD_RECIPE,
        payload
    }
}

export const editRecipe = (payload) => {
    return {
        type: EDIT_RECIPE,
        payload
    }
}

export const deleteRecipe = (payload) => {
    return {
        type: DELETE_RECIPE,
        payload
    }
}

export const getCategory = (payload) => {
    return {
        type: GET_CATEGORY,
        payload
    }
}

export const setCategory = (payload) => {
    return {
        type: SET_CATEGORY,
        payload
    }
}

export const getRecipeById = (payload) => {

    return {
        type: GET_RECIPE_BY_ID,
        payload
    }
}

export const getUserRecipeData = (payload) => {
    return {
        type: GET_USER_RECIPE_DATA,
        payload
    }
}

export const getRecipeComment = (payload) => {
    return {
        type: GET_RECIPE_COMMENT,
        payload
    }
}

export const recipeImageUpload = (payload) => {
    return {
        type: RECIPE_UPLOAD_IMAGE,
        payload
    }
}