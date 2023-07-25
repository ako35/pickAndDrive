import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "../../../store";
import { useDispatch } from "react-redux";
import { services } from "../../../services";
import { utils } from "../../../utils";
import { useFormik } from "formik";

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const data = await services.user.login(values);
      services.encryptedLocalStorage.setItem("token", data.token);

      dispatch(loginSuccess());
      utils.functions.swalToast('You have successfully logged in', 'success');
    } catch (error) {
      dispatch(loginFailure());
      utils.functions.swalToast(error.response.data.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: utils.initialValues.loginFormInitialValues,
    validationSchema: utils.validations.loginFormValidationSchema,
    onSubmit,
  })
  return (
    <Form noValidate onSubmit={() => {formik.handleSubmit }}>
      <Button type="submit">LOGIN</Button>
      <p>OR</p>
      <Button type="submit">REGISTER</Button>
    </Form>
  )
}

export default LoginPage