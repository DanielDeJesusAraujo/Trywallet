import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends Component {
  render() {
    const { email, amount } = this.props;
    return (
      <div className="main-header">
        <div className="container-logo">
          <div className="logo-header">
            {' '}
          </div>
          <h1>Trybe Wallet</h1>
        </div>
        <p
          data-testid="email-field"
          className="field-email-Header"
        >
          {email}
        </p>
        <section
          className="field-amount-Header"
          style={ { display: 'flex' } }
        >
          <p data-testid="total-field">
            R$:
            {' '}
            { amount }
          </p>
          <p
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  amount: state.wallet.amount,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
