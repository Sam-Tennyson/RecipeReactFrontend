import { all, put, takeLatest } from "redux-saga/effects";
import { ADD_RECIPE, ADD_RECIPE_COMMENT, DELETE_RECIPE, DELETE_RECIPE_COMMENT, EDIT_RECIPE, EDIT_RECIPE_COMMENT, GET_CATEGORY, GET_RECIPES, GET_RECIPE_BY_ID, GET_RECIPE_COMMENT, GET_USER_RECIPE_DATA, RECIPE_UPLOAD_IMAGE } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { API } from "../../Services/constants";
import { deleteRequest, getRequest, postRequestNoAuth, postRequest, putRequest } from "../../Shared/Axios";
import { STATUS_CODE } from "../../Shared/Constants"
import { setCategory, setRecipe } from "../Actions/Recipe";

function* getRecipeRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequestNoAuth({
            API: API.RECIPE+`?limit=${payload.limit}&skip=${payload.skip}&searchKey=${payload?.searchKey}`,
            DATA: payload?.category,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            yield put(setRecipe(data?.data))
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* getUserRecipeRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.RECIPE+`?limit=${payload.limit}&skip=${payload.skip}`,
            DATA: payload?.category
        })

        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* addRecipeRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.ADD_RECIPE,
            DATA: payload?.formData
        })
        console.log(data)

        if (status === STATUS_CODE.SUCCESS_200 || status === STATUS_CODE.SUCCESS_201) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error?.response);
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.error);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* editRecipeRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield putRequest({
            API: API?.UPDATE_RECIPE+`/${payload?.id}`,
            DATA: payload?.formData
        })
        console.log(data)

        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* deleteRecipeRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield deleteRequest({
            API: API?.RECIPE+`/${payload.id}`,
            DATA: payload?.formData
        })
        console.log(data)

        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* getCategoryRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API?.CATEGORY_LIST,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            yield put(setCategory(data?.data))
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* getRecipeByIdRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API.RECIPE+`/${payload?.id}`,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success && data?.length) {
                payload?.success(data[0]);
            }
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* getRecipeCommentRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API.GET_RECIPE_COMMENT+`/${payload?.id}`,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* recipeUploadImageRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.UPLOAD_MEDIA,
            DATA: payload?.formData,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* addRecipeCommentRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.GET_RECIPE_COMMENT,
            DATA: payload?.formData,
        })
        debugger;
        if (status === STATUS_CODE?.SUCCESS_201) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* editRecipeCommentRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield putRequest({
            API: API.GET_RECIPE_COMMENT,
            DATA: payload?.formData,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* deleteRecipeCommentRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield deleteRequest({
            API: API.GET_RECIPE_COMMENT,
            DATA: payload?.formData,
        })
        if (status === STATUS_CODE?.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* recipeSaga() {
    yield all([
        takeLatest(ADD_RECIPE_COMMENT, addRecipeCommentRequest),
        takeLatest(EDIT_RECIPE_COMMENT, editRecipeCommentRequest),
        takeLatest(DELETE_RECIPE_COMMENT, deleteRecipeCommentRequest),
        takeLatest(RECIPE_UPLOAD_IMAGE, recipeUploadImageRequest),
        takeLatest(GET_RECIPE_COMMENT, getRecipeCommentRequest),
        takeLatest(GET_USER_RECIPE_DATA, getUserRecipeRequest),
        takeLatest(GET_RECIPE_BY_ID, getRecipeByIdRequest),
        takeLatest(GET_CATEGORY, getCategoryRequest),
        takeLatest(GET_RECIPES, getRecipeRequest),  
        takeLatest(ADD_RECIPE, addRecipeRequest),  
        takeLatest(EDIT_RECIPE, editRecipeRequest),  
        takeLatest(DELETE_RECIPE, deleteRecipeRequest),  
    ]);
}

export default recipeSaga;