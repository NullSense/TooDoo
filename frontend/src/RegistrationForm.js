import React from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router';
import * as yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

// define the validation schema for the input fields
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('enter a valid email')
    .required(),
  username: yup
    .string()
    .min(4, 'username must be at least 6 characters') //temp: 4 -> 6
    .max(16, 'username must be at most 16 characters')
    .required(),
  password: yup
    .string()
    .min(4, 'password must be at least 8 characters') //temp: 4 -> 6
    .max(32, 'password is too long')
    .required(),
  passwordConf: yup.string().oneOf([yup.ref('password'), null], 'passwords must match')
});

/**
 * RegistrationForm built from Formik
 */
const RegistrationForm = props => {
  RegistrationForm.propTypes = {
    history: PropTypes.object
  };

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const { history } = props;
    history.push('/login');
    // await axios // make api call to authenticate
    //   .post('/login/', {
    //     username: values.username,
    //     password: values.password
    //   })
    //   .then(response => response.status === 200 && history.push('/')) // if response successfull, reroute
    //   .catch(err => {
    //     setStatus('username and/or password were incorrect');
    //     setSubmitting(false);
    //   });
  };

  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ errors, touched, status, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <label>
            <Field type="email" name="email" placeholder="email" />
            {touched.email && errors.email}
          </label>
          <label>
            <Field type="text" name="username" placeholder="username" />
            {touched.username && errors.username}
          </label>
          <label>
            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password}
          </label>
          <label>
            <Field type="password" name="passwordConf" placeholder="repeat password" />
            {touched.passwordConf && errors.passwordConf}
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <p>{status}</p>
        </Form>
      )}
    />
  );
};

const LoginFormWithRouter = withRouter(RegistrationForm); // bound react router, to access history
export default LoginFormWithRouter;
