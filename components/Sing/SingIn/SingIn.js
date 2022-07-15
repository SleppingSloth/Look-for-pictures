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

const SingIn = ({ setUser }) => {
  const navigate = useNavigate();

  async function onSingIn(personData) {
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
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email is incorrect")
          .required("Required field"),
        password: Yup.string()
          .min(5, "Min length of password 5 char")
          .required("Required field"),
      })}
      onSubmit={(data) => {
        onSingIn(data);
        navigate("/");
      }}
    >
      <Form className="form-group bg-light" style={{ padding: "20px" }}>
        <MyCustomFild lable="Email:" type="email" name="email" />
        <MyCustomFild lable="Password:" name="password" />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
        >
          Sing in
        </button>
      </Form>
    </Formik>
  );
};

export default SingIn;
