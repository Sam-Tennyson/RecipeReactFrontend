// libs
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'

// components
import CommonRecipeCard from "../../../Components/Atoms/CommonRecipeCard"
import ReactPagination from '../../../Components/Atoms/ReactPaginate'
import CommonSearch from '../../../Components/Atoms/CommonSearch'

// actions
import { getRecipe } from '../../../Redux/Actions/Recipe'

// utils
import { ERROR_MESSAGE, STRING_NUMBER } from '../../../Shared/Constants'
import { errorSnackbar } from "../../../Shared/Utilities"
import { ROUTE_CONSTANTS } from "../../../Shared/Routes"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const oneTimeCall = useRef(false)
	const rowPerPageRef = useRef(STRING_NUMBER?.TWELVE)
	const currentPageRef = useRef(STRING_NUMBER?.ZERO)
	const limitRef = useRef(STRING_NUMBER?.TWELVE)
	const skipRef = useRef(STRING_NUMBER?.ZERO)

	const recipeDataRed = useSelector((state) => state?.recipe?.recipe_data?.recipeData)
	const recipeDataRedCount = useSelector((state) => state?.recipe?.recipe_data?.totalCount)

	const [categoryData, setCategoryData] = useState([])
	const [search, setSearch] = useState("")

	const getRecipeData = () => {
		dispatch(getRecipe({
			searchKey: search,
			category: { category: categoryData },
			limit: limitRef.current,
			skip: skipRef.current,
			fail: (msg) => {
				let errMsg = msg || ERROR_MESSAGE?.SOMETHING_WENT_WRONG
				enqueueSnackbar(errMsg, errorSnackbar)
			}
		}))
	}

	const handlePageClick = ({ selected }) => {
		skipRef.current = rowPerPageRef.current * selected
		getRecipeData()
	}

	const handleClick = (data) => {
		navigate({
			pathname: ROUTE_CONSTANTS.RECIPE_DETAIL,
			search: `?id=${data._id}&action_back=${ROUTE_CONSTANTS.DASHBOARD}`
		})
	}

	useEffect(() => {
		if (oneTimeCall.current){
			let time_rec = setTimeout(() =>{
				getRecipeData()
			}, 500)	
			return () => clearTimeout(time_rec)
		}
	}, [search])

	useEffect(() => {
		if (categoryData&& oneTimeCall.current) {
			getRecipeData()
		}
	}, [categoryData])

	useEffect(() => {
		oneTimeCall.current = true
		getRecipeData()
	}, [])

	return (
		<>
			<CommonSearch
				setSearch={setSearch}
				search={search}
				categoryData={categoryData}
				setCategoryData={setCategoryData}
			/>
			<div className="row my-3">
				{recipeDataRed?.map((recipe, index) => (
					<div className='my-2 col-sm-6 col-md-4 col-lg-3' key={recipe?._id}>
						<CommonRecipeCard
							data={recipe}
							handleClick={() => handleClick(recipe)}
						/>
					</div>
				))}

				{recipeDataRedCount ? (
					<ReactPagination
						rowsPerPage={rowPerPageRef.current}
						activePage={currentPageRef.current}
						totalCount={recipeDataRedCount}
						onPageChange={handlePageClick}
					/>
				) : (<div className="error text-center">{ERROR_MESSAGE.NO_DATA_FOUND}</div>)}

			</div>
		</>
	)
}

export default Dashboard