import { useFormik } from "formik";
import { FunctionComponent, useContext, useState } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { checkUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import { errMsg, sucessMsg } from "../services/feedbacks";
interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  let navigate = useNavigate();
  let [showPass, setShowPass] = useState<boolean>(false);
  let { setIsLoggedIn, setUserId } = useContext(UserData);
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit(values: User) {
      checkUser(values)
        .then((res) => {
          if (res.data.length) {
            res.data[0].isAdmin ? navigate("/mycards") : navigate("/allcards");
            sucessMsg(`Welcome ${res.data[0].name}!`);
            sessionStorage.setItem(
              "userData",
              JSON.stringify({
                isLoggedIn: true,
                isAdmin: res.data[0].isAdmin,
                userId: res.data[0].id,
              })
            );
            setIsLoggedIn(true);
            setUserId(res.data[0].id);
          } else {
            errMsg("ooops... wrong email or password");
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h1 className="text-center my-4">SIGN IN</h1>
      <div className="container col-10 col-lg-8 col-xl-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            {/* email input */}
            <input
              name="email"
              type="email"
              className={
                formik.touched.email && formik.errors.email
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Email address</label>

            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          {/* password input */}
          <div className="form-floating mb-3">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className={
                formik.touched.password && formik.errors.password
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <i
              className="fa-solid fa-eye"
              onClick={() => setShowPass(!showPass)}
            ></i>
            <label htmlFor="floatingInput">Password</label>

            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
            {/* submit button */}
            <button
              type="submit"
              className="w-100 btn mt-3 btn-biz text-start d-flex align-items-center"
              disabled={!formik.dirty || !formik.isValid}
            >
              <div className="login-arrow d-flex">
                <i className="fa-solid fa-circle-chevron-right me-1"></i>
                <p className="login-text">LOGIN</p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
