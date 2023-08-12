// libs
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

// components
import CommonUploadButton from '../../../Components/Atoms/CommonUploadButton'
import CommonHeader from '../../../Components/Atoms/CommonHeader'
import ReactSelect from '../../../Components/Atoms/ReactSelect'
import TextField from '../../../Components/Atoms/TextField'

// utils and constants
import { ERROR_MESSAGE, LABELS, RESPONSE, STRINGS } from '../../../Shared/Constants'
import { ROUTE_CONSTANTS } from '../../../Shared/Routes'
import Snackbar from '../../../Shared/Snackbar'

// actions
import { addRecipe, recipeImageUpload } from '../../../Redux/Actions/Recipe'

// styles
import "./style.scss"

const MAX_DESCRIPTION_LENGTH = 500

const CONSTANTS_STRINGS = {
	PLACEHOLDER: {
		TITLE: "Enter title",
		DESCRPTION: "Enter description",
		INGREDIENT: "Enter ingredient",
		DIRECTION: "Enter direction",
	}
}

const initialValues = {
	title: "",
	description: "",
	ingredient: "",
	direction: "",
	image_data: "",
	category: "",
}

const validationSchema = Yup.object({
	title: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	description: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED).max(MAX_DESCRIPTION_LENGTH, `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`),
	ingredient: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	direction: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	category: Yup.object().required(ERROR_MESSAGE.FIELD_REQUIRED),
	image_data: Yup.string().required(ERROR_MESSAGE.FIELD_REQUIRED)
});


const AddRecipe = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formikref = useRef(null);

	const recipeCategoryRed = useSelector((state) => state.recipe.category)

	const [categoryOption, setCategoryOption] = useState([])
	const [imageData, setImageData] = useState(null)

	// Add Recipe api call
	const handleSubmit = (values) => {
		let formData = {
			title: values.title,
			description: values.description,
			ingredients: values.ingredient,
			directions: values.direction,
			image: imageData,
			category: values.category.value,
		}
		if (!imageData) {
			formikref.current?.setErrors("image_data", ERROR_MESSAGE.FIELD_REQUIRED)
			return;
		}
		dispatch(addRecipe({
			formData: formData,
			success: () => {
				let msg = RESPONSE.RECIPE_SUCCESS
				Snackbar.success(msg);
				navigate({
					pathname: ROUTE_CONSTANTS.MY_RECIPE
				})
			},
			fail: (errMsg) => {
				let err = errMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG;
				Snackbar.error(err);
			},
		}))
	}

	// Generate Image url
	const getImageURL = (data) => {
		const formData = new FormData()
		formData.append("file", data[0])
		dispatch(recipeImageUpload({
			formData: formData,
			success: (data) => {
				console.log(data);
				setImageData(data?.image_url)
			},
			fail: (errMsg) => {
				let err = errMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG;
				Snackbar.error(err);
			},
		}))
	}

	useEffect(() => {
		if (recipeCategoryRed && recipeCategoryRed.length > 0) {
			let options = recipeCategoryRed.map((item) => ({ label: item.name, value: item._id }))
			setCategoryOption(options)
		}
	}, [recipeCategoryRed])

	return (
		<>
			<CommonHeader
				title={"Add your new recipe : )"}
				handleBack={() => navigate({
					pathname: ROUTE_CONSTANTS.DASHBOARD
				})}
			/>
			<div className="card addCommonBox p-4">
				<div className="mainBox">
					<div className="row">
						<div className='col-12'>
							<h3 className="heading_title">{STRINGS?.ADD_RECIPE} </h3>
							<Formik
								innerRef={(e) => formikref.current = e}
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{({ setFieldValue }) => (
									<Form>
										<div className="form-group col-12 mb-3">
											<label className="form-label mb-0"> {STRINGS.TITLE} </label>
											<TextField placeholder={CONSTANTS_STRINGS.PLACEHOLDER.TITLE} name={"title"} type={"text"} />
										</div>
										<div className="form-group col-12  mb-3">
											<label className="form-label mb-0"> {STRINGS.DESCRPTION} </label>
											<Field as={"textarea"} rows={5} className={"form-control border-radius-form"}
												placeholder={CONSTANTS_STRINGS.PLACEHOLDER.DESCRPTION} name={"description"} type={"text"} />
											<ErrorMessage name='description' component={"div"} className='field-required-error' />
										</div>
										<div className="form-group col-12  mb-3">
											<label className="form-label mb-0"> {STRINGS.INGREDIENT} </label>
											<TextField placeholder={CONSTANTS_STRINGS.PLACEHOLDER.INGREDIENT} name={"ingredient"} type={"text"} />
										</div>
										<div className="form-group col-12  mb-3">
											<label className="form-label mb-0"> {STRINGS.DIRECTION} </label>
											<TextField placeholder={CONSTANTS_STRINGS.PLACEHOLDER.DIRECTION} name={"direction"} type={"text"} />
										</div>
										<div className="form-group col-12  mb-3">
											<CommonUploadButton
												imageUrl={imageData}
												id={'image_data'}
												name={'image_data'}
												handleDelete={() => {
													setImageData(null)
													setFieldValue("image_data", null)
												}}
												handleView={() => window.open(imageData, '_blank')}
												onChange={(e) => {
													let selectedFile = e.target.files;
													if (selectedFile?.length) {
														setFieldValue("image_data", selectedFile?.[0])
														getImageURL(selectedFile)
													}
												}}
											/>
											<ErrorMessage name='image_data' component={"div"} className='field-required-error' />
										</div>
										<div className="form-group col-12  mb-3">
											<label className="form-label mb-0"> {STRINGS.CATEGORY} </label>
											<Field name="category">
												{({ field }) => {
													return (
														<>
															<ReactSelect
																{...field}
																isSearchable={true}
																className={`react-select-container `}
																options={categoryOption}
																placeholder={"Select category"}
																onChange={(e) => {
																	setFieldValue("category", e);
																	console.log(e)
																}}
															/>
															<ErrorMessage name="category" component={"div"} className='field-required-error'></ErrorMessage>
														</>
													)
												}
												}
											</Field>
										</div>
										<div className="d-flex justify-content-start align-items-center mb-2">
											<button className="btn btn-secondary" type="submit">
												{LABELS?.ADD}
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddRecipe