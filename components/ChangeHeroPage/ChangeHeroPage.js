import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";

import clazz from "./ChangeHeroPage.module.css";
import HeroPage from "../HeroPage/HeroPage";

const MyTextInput = ({ lable, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className={clazz.title}>
        {lable}
      </label>
      <Field {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const ChangeHeroPage = ({ token }) => {
  const navigate = useNavigate();
  const { comicId } = useParams();

  async function updateHero(data) {

    const heroData = await fetch(`http://localhost:5000/hero/${comicId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      return response.json();
    });

    fetch(`http://localhost:5000/hero/`, {
      method: "PUT",
      body: JSON.stringify({...heroData, name: data.name, img: data.img, description: data.description}),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      return response.json();
    });
    navigate("/")

  }

  async function deleteHero() {
    fetch(`http://localhost:5000/hero/${comicId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      return response.json();
    });
    navigate("/")
  }

  return (
    <div>
      <HeroPage token={token} />
      <Formik
        initialValues={{ name: "", description: "", img: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Required field")
            .min(5, "Min length 5 char"),
          description: Yup.string()
            .required("Required field")
            .min(5, "Min length 5 char"),
          img: Yup.string().required("Required field"),
        })}
        onSubmit={(data) => updateHero(data)}
      >
        <Form className={clazz.from_wrapper}>
          <MyTextInput name="name" value="fdfd" lable="Name:" />
          <MyTextInput name="description" value="fdfd" lable="Description:" />
          <MyTextInput name="img" value="fdfd" lable="Img:" />
          <button
            type="submit"
            className={clazz.submit}
          >
            Update data
          </button>
        </Form>
      </Formik>
      <button
        type="submit"
        className={clazz.submit}
        style={{ width: "98%" }}
        onClick={deleteHero}
      >
        Delete hero
      </button>
    </div>
  );
};

export default ChangeHeroPage;
