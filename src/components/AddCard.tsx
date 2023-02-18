import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserData } from "../App";
import Card from "../interfaces/Card";
import { addCard } from "../services/CardService";
import { sucessMsg } from "../services/feedbacks";

interface AddCardProps {}

const AddCard: FunctionComponent<AddCardProps> = () => {
  let navigate = useNavigate();
  let { userId } = useContext(UserData);
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      img: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2).max(12),
      description: yup.string().required().min(1),
      address: yup.string().required().min(2),
      phone: yup
        .string()
        .required()
        .min(10, "phone must be exactly 10 characters")
        .max(10, "phone must be exactly 10 characters"),
      img: yup
        .string()
        .required("image is a required field")
        .url("image must be a valid URL"),
    }),
    onSubmit(values: Card) {
      addCard(values, userId)
        .then(() => {
          navigate("/mycards");
          sucessMsg("Card added successfully!");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <h1 className="text-center my-4">Create New Bussiness Card</h1>
      <div className="container col-10 col-lg-8 col-xl-4">
        <form onSubmit={formik.handleSubmit}>
          {/* name input */}
          <div className="form-floating mb-3">
            <input
              name="name"
              type="text"
              className={
                formik.touched.name
                  ? formik.errors.name
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Name</label>

            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          {/* description input */}
          <div className="form-floating mb-3">
            <input
              name="description"
              type="text"
              className={
                formik.touched.description
                  ? formik.errors.description
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business description</label>

            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          {/* address input */}
          <div className="form-floating mb-3">
            <input
              name="address"
              type="text"
              className={
                formik.touched.address
                  ? formik.errors.address
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Address</label>

            {formik.touched.address && formik.errors.address && (
              <p className="text-danger">{formik.errors.address}</p>
            )}
          </div>
          {/* phone input */}
          <div className="form-floating mb-3">
            <input
              name="phone"
              type="text"
              className={
                formik.touched.phone
                  ? formik.errors.phone
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Phone</label>

            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>
          {/* img input */}
          <div className="form-floating mb-3">
            <input
              name="img"
              type="text"
              className={
                formik.touched.img
                  ? formik.errors.img
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              id="floatingInput"
              placeholder="Image"
              value={formik.values.img}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Image</label>

            {formik.touched.img && formik.errors.img && (
              <p className="text-danger">{formik.errors.img}</p>
            )}
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-100 btn mt-3 btn-biz text-start d-flex align-items-center"
            style={{ paddingRight: "9.7rem" }}
            disabled={!formik.dirty || !formik.isValid}
          >
            <div className="login-arrow d-flex">
              <i className="fa-solid fa-circle-chevron-right me-1"></i>
              <p className="login-text">Add Card</p>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
