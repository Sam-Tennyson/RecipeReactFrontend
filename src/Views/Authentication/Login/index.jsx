import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import TextField from "../../../Components/Atoms/TextField";
import LeftSectionImage from "../LeftSectionImage";
import { login } from "../../../Redux/Actions/Auth";
import { successSnackbar, errorSnackbar } from "../../../Shared/Utilities";
import Snackbar from "../../../Shared/Snackbar";
import {
  ERROR_MESSAGE,
  LABELS,
  PLACEHOLDER,
  RESPONSE,
  STRINGS,
} from "../../../Shared/Constants";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";

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
    const formData = {
      email: val.email,
      password: val.password,
    };

    dispatch(
      login({
        formData: formData,
        success: () => {
          Snackbar.success(RESPONSE.RECIPE_ADDEE_SUCCESS);
        },
        fail: (errMsg) => {
          Snackbar.error(errMsg || ERROR_MESSAGE.SOMETHING_WENT_WRONG);
        },
      })
    );
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light w-100"
    >
      <Row className="w-100 py-4">
        <Col md={10} lg={8} xl={6} className="mx-auto">
          <Card className="shadow-lg border-0 rounded-4">
            <Row className="g-0">
              <Col md={12} className="p-4">
                <h3 className="mb-4 text-center">{STRINGS.LOGIN}</h3>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors }) => (
                    <Form>
                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>
                          {STRINGS.EMAIL}
                        </BootstrapForm.Label>
                        <TextField
                          name="email"
                          type="email"
                          placeholder={PLACEHOLDER.EMAIL}
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label>
                          {STRINGS.PASSWORD}
                        </BootstrapForm.Label>
                        <TextField
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={PLACEHOLDER.PASSWORD}
                        />
                      </BootstrapForm.Group>

                      <BootstrapForm.Check
                        type="checkbox"
                        label={STRINGS.SHOW_PASSWORD}
                        onChange={() => setShowPassword((prev) => !prev)}
                        className="mb-3"
                      />

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">
                          {STRINGS.DONT_HAVE_ACCOUNT}{" "}
                          <span
                            className="text-danger fw-semibold link-offset-2 link-underline-opacity-25-hover"
                            role="button"
                            onClick={() => navigate(ROUTE_CONSTANTS.SIGNUP)}
                          >
                            {STRINGS.SIGNUP}
                          </span>
                        </span>
                      </div>

                      <Button variant="danger" type="submit" className="w-100">
                        {LABELS.SUBMIT}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
