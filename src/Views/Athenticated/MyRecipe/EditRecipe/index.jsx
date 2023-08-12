
// libs
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

// components
import CommonUploadButton from '../../../../Components/Atoms/CommonUploadButton';
import CommonHeader from '../../../../Components/Atoms/CommonHeader';
import ReactSelect from '../../../../Components/Atoms/ReactSelect';
import TextField from '../../../../Components/Atoms/TextField';

// actions
import { editRecipe, getRecipeById } from '../../../../Redux/Actions/Recipe';

// utils and constants
import { ERROR_MESSAGE, LABELS, STRINGS } from '../../../../Shared/Constants';
import { ROUTE_CONSTANTS } from '../../../../Shared/Routes';
import { useQuery } from '../../../../Shared/Utilities';
import Snackbar from '../../../../Shared/Snackbar';

const MAX_DESCRIPTION_LENGTH = 500

const validationSchema = Yup.object({
	title: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	description: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED).max(MAX_DESCRIPTION_LENGTH, `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters`),	
	ingredient: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	direction: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
	category: Yup.object().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const EditRecipe = () => {
	const dispatch = useDispatch();
	const query = useQuery();
	const navigate = useNavigate();

	const recipeCategoryRed = useSelector((state) => state.recipe.category)

	const [categoryOption, setCategoryOption] = useState([])
	const [recipeData, setRecipeData] = useState(null)
	const [imageData, setImageData] = useState(null)

	const fetchRecipeData = () => {
		dispatch(getRecipeById({
			id: query.get('id'),
			success: (data) => {
				setImageData(data?.image)
				setRecipeData(data);
			}
		}))
	}

	const handleSubmit = (values) => {
		let formData = {
			title: values.title,
			description: values.description,
			ingredients: values.ingredient,
			directions: values.direction,
			image: values.image,
			category: values.category.value,
		}
		console.log(formData);

		dispatch(editRecipe({
			id: query.get('id'),
			formData: formData,
			success: (data) => {
				let Msg = data || "Success"
				Snackbar.success(Msg)
				navigate({
					pathname: ROUTE_CONSTANTS.MY_RECIPE
				})
			},
			fail: (msg) => {
				let errMsg = msg || ERROR_MESSAGE?.SOMETHING_WENT_WRONG
				Snackbar.error(errMsg)
			}
		}))
	}

	useEffect(() => {
		if (recipeCategoryRed && recipeCategoryRed.length > 0) {
			let options = recipeCategoryRed.map((item) => ({ label: item.name, value: item._id }))
			setCategoryOption(options)
		}
	}, [recipeCategoryRed])

	useEffect(() => {
		fetchRecipeData()
	}, [])

	return (
		<>
			<CommonHeader
				title={"Edit recipe : )"}
				handleBack={() => navigate({
					pathname: ROUTE_CONSTANTS.MY_RECIPE
				})}
			/>

			<div className="card addCommonBox p-4">
				<div className="mainBox">
					<div className="row">
						<div className='col-12'>
							{recipeData &&
								<Formik
									initialValues={{
										title: recipeData?.title,
										description: recipeData?.description,
										ingredient: recipeData?.ingredients,
										direction: recipeData?.directions,
										image: recipeData?.image,
										category: categoryOption.find((item) => item?.value?.toString() === recipeData?.category?.toString()),
									}}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}
									enableReinitialize={true}
								>
									{({ setFieldValue, values, errors }) => (
										<Form>
											<div className="form-group col-12 mb-3">
												<label className="form-label mb-0"> {STRINGS.TITLE} </label>
												<TextField name={"title"} type={"text"} />
											</div>
											<div className="form-group col-12  mb-3">
												<label className="form-label mb-0"> {STRINGS.DESCRPTION} </label>
												<Field as={"textarea"} rows={"5"} className={"form-control border-radius-form"} name={"description"} type={"text"} />
												<ErrorMessage name='description' component={"div"} className='field-required-error' />
											</div>
											<div className="form-group col-12  mb-3">
												<label className="form-label mb-0"> {STRINGS.INGREDIENT} </label>
												<TextField name={"ingredient"} type={"text"} />
											</div>
											<div className="form-group col-12  mb-3">
												<label className="form-label mb-0"> {STRINGS.DIRECTION} </label>
												<TextField name={"direction"} type={"text"} />
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
													{
														({ field }) => {
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
													{LABELS.UPDATE}
												</button>
											</div>
											{/* </div> */}
										</Form>
									)}
								</Formik>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EditRecipe