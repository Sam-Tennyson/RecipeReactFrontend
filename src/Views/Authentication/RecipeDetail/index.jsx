// libs
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

// components
import CommonHeader from '../../../Components/Atoms/CommonHeader';
import ReadMore from '../../../Components/Atoms/ReadMore';
import RecipeComment from './components/RecipeComment';

// utils
import { useQuery } from '../../../Shared/Utilities';

// actions
import { getRecipeById } from '../../../Redux/Actions/Recipe';

// styles
import "./style.scss"

const RecipeDetail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const query = useQuery();

    const recipeCategoryRed = useSelector((state) => state.recipe.category)
    const token = useSelector((state) => state.auth.token);
    const [recipeData, setRecipeData] = useState(null)

    const fetchRecipeData = () => {
        dispatch(getRecipeById({
            id: query.get('id'),
            success: (data) => {
                setRecipeData(data);
            }
        }))
    }

    useEffect(() => {
        fetchRecipeData()
    }, [])

    return (
    <>
        <CommonHeader
            title = {recipeData?.title}
            handleBack = {()=> navigate({
                pathname: query.get("action_back")
            })}
        />
        <div className="row">
            <div className="col-md-12 mb-3">
                <div className="recipe-card d-flex justify-content-around align-items-center">
                    <div className='card-header'>Created At</div>
                    <div className="card-body">
                        &nbsp; {moment(recipeData?.creted_at).format("LL")}
                    </div>
                </div>
            </div>

            {recipeData?.image ? (
                <div className="col-12 mb-3">
                    <div className='card21'>
                        <div className="card-body detail-recipe">
                            <em>
                                <img src={recipeData?.image} alt="iamge_Data"  />
                            </em>
                        </div>
                    </div>
                </div>
            ): null}

            <div className=" col-12 mb-3">
                <div className='card '>
                    <div className='card-header'>Description</div>
                    <div className="card-body">
                        <ReadMore 
							content={recipeData?.description}
                            count_ref={800}
						/>
                    </div>
                </div>
            </div>

            <div className=" col-md-6 mb-3">
                <div className='card'>
                    <div className='card-header'>Ingredients</div>
                    <div className="card-body">
                        {recipeData?.ingredients}
                    </div>
                </div>
            </div>
            <div className=" col-md-6 mb-3">
                <div className='card'>
                    <div className='card-header'>Directions</div>
                    <div className="card-body">
                        {recipeData?.directions}
                    </div>
                </div>
            </div>
            {recipeData?.category ? (
                <>
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                {recipeCategoryRed?.find((item) => item?._id === recipeData?.category)?.name}
                            </div>
                        </div>
                    </div>
                </>
            ): null}
        </div>

        <RecipeComment />
    </>
  )
}

export default RecipeDetail