import { SET_CATEGORY, SET_RECIPES } from "../Actions/ActionType";

const initialState = {
    recipe_data: null,
    category: null
}

const RecipeReducer = (state=initialState,action) => {
    switch(action.type){
       case SET_RECIPES:
           return {
               ...state,
               recipe_data: action.payload
           }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        default:
            return state;
    }
   }

export default RecipeReducer