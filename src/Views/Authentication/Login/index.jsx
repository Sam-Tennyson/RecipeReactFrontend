import React, { useState } from "react";
import { Form, Formik } from "formik";
import TextField from "../../../Components/Atoms/TextField";
import LeftSectionImage from "../LeftSectionImage";
import * as Yup from "yup";
import { ERROR_MESSAGE, LABELS, PLACEHOLDER, RESPONSE, STRINGS } from "../../../Shared/Constants";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Actions/Auth";
import { useSnackbar } from "notistack";
import { successSnackbar, errorSnackbar } from "../../../Shared/Utilities"
import Snackbar from "../../../Shared/Snackbar";

const CONSTANTS_STRINGS = {
	PLACEHOLDER: {
		EMAIL: "Enter email",
		PASSWORD: "Enter password",
	}
}

const validationSchema = Yup.object({
	email: Yup.string()
		.trim()
		.required(ERROR_MESSAGE.FIELD_REQUIRED)
		.email(ERROR_MESSAGE.VALID_EMAIL),
	password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
});

const Login = () => {

	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (val) => {
		console.log(val);

		let formData = {
			email: val.email,
			password: val.password,
		};

		dispatch(
			login({
				formData: formData,
				success: () => {
					let msg = RESPONSE.RECIPE_ADDEE_SUCCESS;
					Snackbar.success(msg);
				},
				fail: (errMsg) => {
					let err = errMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG;
					Snackbar.error(err);
				},
			})
		);
	};

	return (
		<>
			<div className=" commonBox d-flex justify-content-center align-items-center">
				<div className="mainBox w-100">
					<div className="row my-2">
						<div className="col-lg-6 col-md-6 col-sm-6 my-2 ">
							<LeftSectionImage />
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 p-0">
							<h3 className="heading_title">{STRINGS?.LOGIN} </h3>

							<Formik
								initialValues={{
									email: "",
									password: ""
								}}
								validationSchema={validationSchema}
								onSubmit={handleSubmit}
							>
								{({ values, errors }) => (
									<Form>
										<div className="row">

											<div className="form-group mb-3">
												<label className="form-label mb-0"> {STRINGS?.EMAIL} </label>
												<TextField name={"email"} type={"text"} placeholder={CONSTANTS_STRINGS.PLACEHOLDER.EMAIL}/>
											</div>

											<div className="col-12 my-2">
												<label className="form-label">{STRINGS.PASSWORD} </label>
												<TextField
													name={"password"}
													type={!showPassword ? "password" : "text"}
													placeholder={CONSTANTS_STRINGS.PLACEHOLDER.PASSWORD}				/>
											</div>

											<div className="col-12 my-2 ">
												<input className="form-check-input" type="checkbox" onClick={() => setShowPassword((prev) => !prev)} />
												<label className="form-check-label mx-2">
													{" "}
													{STRINGS.SHOW_PASSWORD}{" "}
												</label>
											</div>
											<p className="">Don't have an account ? <span className='link-class' onClick={() => {
												navigate(ROUTE_CONSTANTS?.SIGNUP)
											}}>{STRINGS?.SIGNUP}</span> </p>
											<div className="d-flex justify-content-start align-items-center mb-2">
												<button className="btn btn-secondary" type="submit">
													{LABELS?.SUBMIT}
												</button>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// export default useSnackbar(Login);

export default (Login);
