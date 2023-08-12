import React, { useState } from 'react'
import { Form, Formik, validateYupSchema } from 'formik'
import TextField from '../../../Components/Atoms/TextField'
import LeftSectionImage from '../LeftSectionImage'
import { useNavigate } from 'react-router-dom'
import { ROUTE_CONSTANTS } from '../../../Shared/Routes'
import { ERROR_MESSAGE, LABELS, PLACEHOLDER, RESPONSE, STRINGS } from '../../../Shared/Constants'
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { signup } from '../../../Redux/Actions/Auth'
import { errorSnackbar, successSnackbar } from '../../../Shared/Utilities'
import { useSnackbar } from 'notistack'

const validationSchema = Yup.object({
  user_name: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  email: Yup.string()
    .trim()
    .required(ERROR_MESSAGE.FIELD_REQUIRED)
    .email(ERROR_MESSAGE.VALID_EMAIL),
  password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  phone: Yup.string().trim()
    .required(ERROR_MESSAGE.FIELD_REQUIRED)
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

const CONSTANTS_STRINGS = {
	PLACEHOLDER: {
		EMAIL: "Enter email",
		PASSWORD: "Enter password",
    USERNAME: "Enter username",
    PHONE: "Enter phone number"
	}
}

const Signup = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (val) => {
    console.log(val);

    let formData = {
      email: val.email,
      password: val.password,
      name: val.user_name,
      phone: val.phone
    };

    dispatch(
      signup({
        formData: formData,
        success: () => {
          let msg = RESPONSE.SUCCESS_LOGIN;
          enqueueSnackbar(msg, successSnackbar);
          navigate(ROUTE_CONSTANTS?.LOGIN)
        },
        fail: (errMsg) => {
          let err = errMsg ? errMsg : ERROR_MESSAGE.SOMETHING_WENT_WRONG;
          enqueueSnackbar(err, errorSnackbar);
        },
      })
    );
  };

  return (
    <>
      <div className="mt-4 commonBox d-flex justify-content-center align-items-center">
        <div className='mainBox my-4 p-4 w-100'>
            <div className="row my-2">
              <div className="col-md-6 my-2 ">
                <LeftSectionImage />
              </div>
              <div className="col-md-6 ">
                <h3 className="heading_title">{STRINGS?.SIGNUP}</h3>
                  <p className="">Having an account ? <span className='link-class' onClick={()=> {
                    navigate(ROUTE_CONSTANTS?.LOGIN)
                  }}>{STRINGS?.LOGIN}</span> </p>
                <Formik
                  initialValues={{
                    user_name: "",
                    email: "",
                    password: "",
                    phone: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors }) => (
              <Form>
                <div className="row">
                  <div className="col-12 my-2">
                    <div className="form-group mb-3">

                      <label className="form-label mb-0"> {STRINGS?.FIRSTNAME} </label>
                      <TextField
                        name={"user_name"}
                        type={"text"}
                        placeholder={CONSTANTS_STRINGS.PLACEHOLDER.USERNAME}
                      />
                    </div>
                    
                    <div className="form-group mb-3">

                      <label className="form-label mb-0"> {STRINGS?.EMAIL} </label>
                      <TextField
                        name={"email"}
                        type={"text"}
                        placeholder={CONSTANTS_STRINGS.PLACEHOLDER.EMAIL}
                      />
                    </div>
                    <div className="col-12 my-2 border-radius-form">
                        <label className="form-label">{STRINGS.PASSWORD} </label>
                        <TextField
                          name={"password"}
                          type={!showPassword ? "password": "text" }
                          placeholder={PLACEHOLDER.PASSWORD}
                        />
                      </div>
                      <div className="col-12 my-2 ">
                        <input className="form-check-input" type="checkbox" onClick={() => setShowPassword((prev) => !prev)} />
                        <label className="form-check-label mx-2">
                          {" "}
                          {STRINGS.SHOW_PASSWORD}{" "}
                        </label>
                      </div>
                      <div className="form-group mb-3">

                    <label className="form-label mb-0"> {STRINGS?.PHONE} </label>
                      <TextField
                        name={"phone"}
                        type={"text"}
                        placeholder={CONSTANTS_STRINGS.PLACEHOLDER.PHONE}
                      />
                    </div>
                    <div className="d-flex justify-content-start align-items-center mb-2">

                      <button className='btn btn-secondary' type='submit' >
                        {LABELS?.SUBMIT}
                      </button>

                    </div>
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
  )
}

export default Signup