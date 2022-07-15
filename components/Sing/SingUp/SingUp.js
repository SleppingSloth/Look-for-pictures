import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";

const MyCustomFild = ({ lable, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        {lable}
        <Field
          {...props}
          {...field}
          className="form-control"
          style={{ marginTop: "5px" }}
        />
        {meta.touched && meta.error ? (
          <div className="form-text text-muted">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

const SingUp = ({ setUser }) => {
  const navigate = useNavigate();

  async function onSingIn(personData) {
    await fetch("http://localhost:5000/user", {
      method: "POST",
      body: JSON.stringify(personData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });

    const {token, roles} = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify(personData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });

    const role = roles[0];
    setUser({token, role})
  }


  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email is incorrect")
          .required("Required field"),
        password: Yup.string()
          .min(8, "Password must be longer")
          .required("Required field"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords do not match")
          .min(8, "Password must be longer")
          .required("Required field"),
      })}
      onSubmit={(data) => {
        onSingIn(data)
        navigate("/");
      }}
    >
      <Form className="form-group bg-light" style={{ padding: "20px" }}>
        <MyCustomFild lable="Email:" type="email" name="email" />
        <MyCustomFild lable="Password:" name="password" />
        <MyCustomFild lable="Confirmation password:" name="confirmPassword" />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Sing up
        </button>
      </Form>
    </Formik>
  );
};

export default SingUp;
