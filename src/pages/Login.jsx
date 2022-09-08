import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@mui/material';
import validateEmail from '../helps/emailValidation';
import validationPassword from '../helps/passwordValidation';
import { handleSubmitLogin } from '../helps';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      buttonIsDisable: true,
    };
  }

  handleClick = (event) => {
    const { email } = this.state;
    const { dispatch, props: { history } } = this.props;
    handleSubmitLogin({ email, event, dispatch, history });
  };

  checkButton = () => {
    const { email, password } = this.state;
    const isDisable = !(validateEmail(email) && validationPassword(password));
    this.setState({ buttonIsDisable: isDisable });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    }, () => this.checkButton());
  };

  render() {
    const { buttonIsDisable } = this.state;
    return (
      <div className="main-login">
        <form className="form-login">
          <div className="logo-div-login">
            {' '}
          </div>
          <TextField
            onChange={ this.handleChange }
            data-testid="email-input"
            type="email"
            name="email"
            id="email-input"
            label="Email"
            size="small"
            color="info"
          />
          <TextField
            data-testid="password-input"
            onChange={ this.handleChange }
            id="password-input"
            label="Senha"
            type="password"
            name="password"
            autoComplete="current-password"
            size="small"
          />
          <Button
            variant="contained"
            onClick={ this.handleClick }
            disabled={ buttonIsDisable }
            type="submit"
            id="button-submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect()(Login);
