// libs
import React, {useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// components
import ConfirmationModal from '../../../Components/Atoms/ConfirmationModal';
import CommonRecipeCard from '../../../Components/Atoms/CommonRecipeCard';
import ReactPagination from '../../../Components/Atoms/ReactPaginate';
import CommonHeader from '../../../Components/Atoms/CommonHeader';

// actions
import { deleteRecipe, getUserRecipeData } from '../../../Redux/Actions/Recipe';

// constants
import { ERROR_MESSAGE, LABELS, STRING_NUMBER } from '../../../Shared/Constants';
import { errorSnackbar } from '../../../Shared/Utilities'
import Snackbar from '../../../Shared/Snackbar';

// routes
import { ROUTE_CONSTANTS } from '../../../Shared/Routes';

const MyRecipe = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const limitRef = useRef(STRING_NUMBER.TWELVE)
	const skipRef = useRef(STRING_NUMBER.ZERO)
	const rowPerPageRef = useRef(STRING_NUMBER.TWELVE)
	const currentPageRef = useRef(STRING_NUMBER.ZERO)

	const [recipeData, setRecipeData] = useState({data: [], count: 0})
	const [currentData, setCurrentData] = useState(null)
	const [deleteModal, setDeleteModal] = useState(false)

	const resetModal = () => {
		setCurrentData(null)
		setDeleteModal(false)
	}

	const openDelete = (data) => {
		setCurrentData(data)
		setDeleteModal(true)
	}

	const fetchUserRecipe = () => {
		dispatch(getUserRecipeData({
			limit: limitRef.current,
			skip: skipRef.current,
			category: {category: []},
			success: (data) => {
				console.log(data);
				setRecipeData({data: data?.data, count: data?.totalCount})
			},
			fail: (msg) =>{
				let errMsg = msg || ERROR_MESSAGE?.SOMETHING_WENT_WRONG
				Snackbar.error(errMsg, errorSnackbar)
			}
		}))
	}

	const handlePageClick = ({selected}) => {
		skipRef.current =  rowPerPageRef.current*selected
		fetchUserRecipe()
	}

	const handleClick = (data) => {
		navigate({
		  pathname: ROUTE_CONSTANTS.RECIPE_DETAIL,
		  search: `?id=${data._id}&action_back=${ROUTE_CONSTANTS.MY_RECIPE}`
		})
	}
	
	const handleDelete = () => {
		dispatch(deleteRecipe({
			id: currentData._id,
			success: (data) => {
				let Msg = data || "Success"
				Snackbar.success(Msg)
				fetchUserRecipe()
				resetModal()
			},
			fail: (msg) =>{
				let errMsg = msg || ERROR_MESSAGE?.SOMETHING_WENT_WRONG
				Snackbar.error(errMsg)
				resetModal()
			}
		}))
	}

	const handleEdit = (data) => {
		navigate({
			pathname: ROUTE_CONSTANTS.EDIT_RECIPE,
			search: `?id=${data._id}`
		  })
	}
	
	useEffect(() => {
		fetchUserRecipe()
	}, [])
  
	return (
		<>
			<ConfirmationModal 
				openModal={deleteModal}
				closeModal={resetModal}
				buttonText={LABELS.DELETE}
				handleAction={handleDelete}
				desc={"Are you sure you want to delete this recipe ?"}
			/>

			<CommonHeader 
				title ={"My Recipe"}
				handleBack = {()=> navigate({
					pathname: ROUTE_CONSTANTS.DASHBOARD
				})}
			/>
    		<div className="row my-3">
				{recipeData.data?.map((recipe, index) => (
					<div className='my-2 col-sm-6 col-md-6 col-lg-4' key={recipe?._id}>
					<CommonRecipeCard
						isMyRecipe = {true}
						data={recipe}
						handleClick={() => handleClick(recipe)}
						handleDelete={() => openDelete(recipe)}
						handleEdit={() => handleEdit(recipe)}
					/>
					</div>
				))}
				{recipeData.count ? (
					<ReactPagination 
						rowsPerPage={rowPerPageRef.current}
						activePage={currentPageRef.current}
						totalCount={recipeData.count}
						onPageChange={handlePageClick}
					/>
				) : (
					<div className='text-center'>
						<div className="error">
							No recipe is added by you
						</div>
						<span className='mt-3 link-class' onClick={() => {
							navigate({
								pathname: ROUTE_CONSTANTS.ADD_RECIPE
							})
						}}>Please add you recipe</span>
					</div>
				)} 
			</div>
		</>
	)
}

export default MyRecipe