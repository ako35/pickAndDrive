import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../../../store";
import { useDispatch } from "react-redux";
import { services } from "../../../services";
import { utils } from "../../../utils";
import { useFormik } from "formik";
import { CustomForm, PasswordInput } from "../../../components";
import { constants } from "../../../constants";
import './style.scss'

const { routes } = constants;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const data = await services.user.login(values);
      services.encryptedLocalStorage.setItem("pickanddrivetoken", data.token);

      const responseUser = await services.user.getUser();
      dispatch(loginSuccess(responseUser));
      
      utils.functions.swalToast("You have successfully logged in", "success");
      navigate(routes.home);
    } catch (error) {
      dispatch(loginFailure());
      utils.functions.swalToast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: utils.initialValues.loginFormInitialValues,
    validationSchema: utils.validations.loginFormValidationSchema,
    onSubmit,
  });
  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="login-form">
      <CustomForm
        formik={formik}
        name="email"
        label="Email address"
        placeholder="Enter email"
        type="email"
      />
      <PasswordInput
        formik={formik}
        name="password"
        label="Password"
        placeholder="Enter password"
      />
      <Button
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && (
          <Spinner
            animation="border"
            size="sm"
          />
        )}{" "}
        LOGIN
      </Button>
      <p>OR</p>
      <Button onClick={() => navigate(routes.register)} disabled={loading}>REGISTER</Button>
    </Form>
  );
};

export default LoginPage;
