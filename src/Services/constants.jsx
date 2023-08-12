export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_BASE_URL = BASE_URL

export const API = {
  TEST: `/test/`,
  LOGIN: `/auth/login/`,
  SIGN_UP: `/auth/signup`,
  CAUSE_LIST: `/api/causeList`,
  UPLOAD:  `/upload`,
  RECIPE:   `/recipe/get-recipe`,
  ADD_RECIPE: `/recipe/add-recipe`,
  UPDATE_RECIPE: `/recipe/update-recipe`,
  CATEGORY_LIST: `/category/fetch`,
  GET_RECIPE_COMMENT: `/recipe-comment/make-comment`,
  UPLOAD_MEDIA: `/media/upload/`
}