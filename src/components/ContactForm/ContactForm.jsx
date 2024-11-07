import { Field, Form, Formik, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { apiAddContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    nameUser: Yup.string()
      .min(3, "Слишком короткое имя!")
      .max(50, "Слишком длинное имя!")
      .required("Обязательно"),
    numberUser: Yup.string()
      .min(3, "Слишком короткий номер!")
      .max(50, "Слишком длинный номер!")
      .required("Обязательно"),
  });

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const contact = {
      name: values.nameUser,
      number: values.numberUser,
      id: nanoid(),
    };

    dispatch(apiAddContact(contact));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ nameUser: "", numberUser: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>
          Имя:
          <Field type="text" name="nameUser" id={nameFieldId} />
          <ErrorMessage name="nameUser" component="div" className={css.error} />
        </label>
        <label htmlFor={numberFieldId}>
          Номер:
          <Field type="tel" name="numberUser" id={numberFieldId} />
          <ErrorMessage
            name="numberUser"
            component="div"
            className={css.error}
          />
        </label>
        <button type="submit">Добавить контакт</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
