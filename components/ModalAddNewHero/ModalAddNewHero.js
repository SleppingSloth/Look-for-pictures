import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.min.css";
import clazz from "./ModalAddNewHero.module.css";

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

const ModalAddNewHero = ({ token }) => {
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function addNewHero(heroData) {
    await fetch("http://localhost:5000/hero", {
      method: "POST",
      body: JSON.stringify(heroData),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      return response.json();
    });
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new hero
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data of the new hero</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
            onSubmit={(data) => {
              addNewHero(data);
            }}
          >
            <Form className={clazz.form_wrapper}>
              <MyTextInput lable="Name:" name="name" />
              <MyTextInput lable="Description:" name="description" />
              <MyTextInput lable="Img:" name="img" />
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Add new Hero
                </Button>
              </Modal.Footer>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddNewHero;
