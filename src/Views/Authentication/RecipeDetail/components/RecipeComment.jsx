// libs
import React, { useEffect }  from 'react'
import { useDispatch } from 'react-redux'

// componenets
import CommonHeader from '../../../../Components/Atoms/CommonHeader'

// utils
import { useQuery } from '../../../../Shared/Utilities';

// actions
import { getRecipeComment } from '../../../../Redux/Actions/Recipe';

const RecipeComment = () => {
    const dispatch = useDispatch();
    const query = useQuery();

    const fetchRecipeComment = () => {
        dispatch(getRecipeComment({
            id: query.get('id'),
            success: (data) =>  {
                console.log(data);
            },
        }))
    }

    useEffect(() => {
        fetchRecipeComment()
    }, [])

    return (
    <>
        <CommonHeader
            title = {"Comments"}
            hideButton={true}
        />
    </>
  )
}

export default RecipeComment