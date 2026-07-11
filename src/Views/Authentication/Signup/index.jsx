import React, { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

import { signup } from "../../../Redux/Actions/Auth";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";
import {
  ERROR_MESSAGE,
  STRINGS,
  RESPONSE,
  LABELS,
  PLACEHOLDER,
} from "../../../Shared/Constants";
import { errorSnackbar, successSnackbar } from "../../../Shared/Utilities";
import LeftSectionImage from "../LeftSectionImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const validationSchema = Yup.object({
  user_name: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  email: Yup.string()
    .trim()
    .required(ERROR_MESSAGE.FIELD_REQUIRED)
    .email(ERROR_MESSAGE.VALID_EMAIL),
  password: Yup.string().trim().required(ERROR_MESSAGE.FIELD_REQUIRED),
  phone: Yup.string()
    .trim()
    .required(ERROR_MESSAGE.FIELD_REQUIRED)
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (val) => {
    const formData = {
      email: val.email,
      password: val.password,
      name: val.user_name,
      phone: val.phone,
    };

    dispatch(
      signup({
        formData,
        success: () => {
          enqueueSnackbar(RESPONSE.SUCCESS_LOGIN, successSnackbar);
          navigate(ROUTE_CONSTANTS.LOGIN);
        },
        fail: (errMsg) => {
          enqueueSnackbar(
            errMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
            errorSnackbar
          );
        },
      })
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-4">
      <Row className="shadow rounded p-4 w-100" style={{ maxWidth: "900px" }}>
        <Col md={12}>
          <h3 className="mb-3">{STRINGS.SIGNUP}</h3>
          <p>
            Already have an account?{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-danger"
              onClick={() => navigate(ROUTE_CONSTANTS.LOGIN)}
            >
              {STRINGS.LOGIN}
            </span>
          </p>

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
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <FormikForm>
                <Form.Group className="mb-3">
                  <Form.Label>{STRINGS.FIRSTNAME}</Form.Label>
                  <Form.Control
                    name="user_name"
                    type="text"
                    placeholder={PLACEHOLDER.NAME}
                    value={values.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.user_name && !!errors.user_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{STRINGS.EMAIL}</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder={PLACEHOLDER.EMAIL}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{STRINGS.PASSWORD}</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={PLACEHOLDER.PASSWORD}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Check
                    type="checkbox"
                    label={STRINGS.SHOW_PASSWORD}
                    onChange={() => setShowPassword((prev) => !prev)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{STRINGS.PHONE}</Form.Label>
                  <Form.Control
                    name="phone"
                    type="text"
                    placeholder={PLACEHOLDER.PHONE}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="danger">
                    {LABELS.SUBMIT}
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
