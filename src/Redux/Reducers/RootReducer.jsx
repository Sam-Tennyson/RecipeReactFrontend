import { combineReducers } from 'redux';
import Auth from './Auth';
import Loader from './Loader';
import RecipeReducer from './Recipe';

const appReducer = combineReducers({
  auth: Auth,
  loading: Loader,
  recipe: RecipeReducer,
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;