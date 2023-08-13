// libs
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// componenets
import CommonHeader from '../../../../Components/Atoms/CommonHeader'

// utils
import { useQuery } from '../../../../Shared/Utilities';

// actions
import { addRecipeComment, getRecipeComment } from '../../../../Redux/Actions/Recipe';

// styles
import "./style.scss"
import { ERROR_MESSAGE, RESPONSE } from '../../../../Shared/Constants';
import Snackbar from '../../../../Shared/Snackbar';
import CommentsListing from './CommentsListing';

const CONSTANTS_STRINGS = {
    PLACEHOLDER: {
        SHARE_VIEW: "Add your comment here..."
    },
    COMMENT: "Comment",
    ADD_COMMENT: "Add Comment",
    PLEASE_LOGIN: "Please login to add you thoughts"
}

const RecipeComment = () => {
    const dispatch = useDispatch();
    const query = useQuery();
	const token = useSelector((state) => state.auth.token);
    const profileReducer = useSelector((state) => state.auth.user_data);

    const [commentText, setCommentText] = useState({data: "", error: null})
    const [commentData, setCommentData] = useState({data: [], totalCount: 0})

    const fetchRecipeComment = () => {
        dispatch(getRecipeComment({
            id: query.get('id'),
            success: (data) => {
                setCommentData({data:data?.data})
            },
        }))
    }

    const handleAddComment = () => {
        if (!commentText?.data) {
            setCommentText({error: ERROR_MESSAGE.FIELD_REQUIRED})
            return;
        }
        console.log(commentText?.data);
        let formData = {
            text: commentText?.data,
            user_id: profileReducer?._id,
            recipe_id: query.get('id'),
        }
        dispatch(addRecipeComment({
            formData: formData,
            success: (data) => {
                let msg = RESPONSE.RECIPE_COMMENT_ADDEE_SUCCESS;
                Snackbar.success(msg);            
                setCommentText({data: "", error: null})
                fetchRecipeComment()
            },
            fail: (err) => {
                let errMsg = err || ERROR_MESSAGE.SOMETHING_WENT_WRONG;
                Snackbar.error(errMsg);
            }
        }))
    }

    useEffect(() => {
        fetchRecipeComment()
    }, [])

    return (
        <>
            <CommonHeader
                title={"Comments"}
                hideButton={true}
            />

            <div className="row my-3">
                <div className=" p-3">
                    <div className="form-group col-12 mb-3">
                        <textarea rows={"5"}
                            name ={"text-area-data"}
                            value={commentText?.data}
                            onChange={(e) => setCommentText({data: e.target.value, error: null})}
                            className={" text-area-custom border-radius-form"} type={"text"} 
                            placeholder={!token ? CONSTANTS_STRINGS.PLEASE_LOGIN :CONSTANTS_STRINGS.PLACEHOLDER.SHARE_VIEW} 
                            disabled={!token}
                        />
                        {commentText?.error ? (<div className='field-required-error'>{commentText?.error}</div>):null}
                    </div>
                    <div className="form-group d-flex justify-content-end">
                        {token ? (
                            <button className='btn btn-success'
                                onClick={handleAddComment}
                            >{CONSTANTS_STRINGS.ADD_COMMENT}</button>
                        ): (
                            null
                        )}
                    </div>
                </div>
            </div>

            {commentData?.data?.length ? (
                <CommentsListing 
                    data={commentData?.data}
                />
            ): null}
        </>
    )
}

export default (RecipeComment)