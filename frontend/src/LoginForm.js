import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

const LoginForm = props => {
  const { values, touched, errors, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field type="text" name="username" placeholder="username" />
      <Field type="password" name="password" placeholder="password" />
      <button type="submit">Submit</button>
    </Form>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  validate: () => {},
  handleSubmit: async (values, { resetForm }) => {
    await axios
      .post('/login/', {
        username: values.username,
        password: values.password
      })
      // if login was successful, reroute, else don't
      // .then(response => (response.status === 200 ? [> reroute <] : null))
      .catch(err => {
        console.log('error:' + err);
      });
    resetForm();
  }
})(LoginForm);

const LoginFormWithRouter = withRouter(FormikLoginForm);

LoginForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default FormikLoginForm;
