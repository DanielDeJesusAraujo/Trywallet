import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import requestingCurrency from '../redux/actions/requestCurrencys';
import { addExpense } from '../redux/actions';
import requestExchangeRate from '../helps/requestExchangeRate';
import { alimentacao } from '../helps';
import { editExpense } from '../redux/actions/deleteOrEditExpense';
import '../styles/walletForm.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      paymentMethod: [
        'Dinheiro',
        'Cartão de crédito',
        'Cartão de débito',
      ],
      expenseCategory: [
        alimentacao,
        'Lazer',
        'Trabalho',
        'Transporte',
        'Saúde',
      ],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestingCurrency());
  }

  componentDidUpdate(prevProps) {
    const { expenseToEdit: currentExpense } = this.props;
    const { expenseToEdit: prevExpense } = prevProps;
    if (prevProps !== this.props && currentExpense !== prevExpense) {
      const {
        id,
        value,
        description,
        currency,
        method,
        tag,
      } = currentExpense;
      this.setState({
        id,
        value,
        description,
        currency,
        method,
        tag,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  };

  resetStateInputs = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id: idEdit, dispatch, editMode } = this.props;
    const exchange = await requestExchangeRate();
    this.setState({
      exchangeRates: exchange,
    }, () => {
      const {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      } = this.state;

      const payloadAdd = {
        id: idEdit, value, description, currency, method, tag, exchangeRates };
      const payloadEdit = {
        id, value, description, currency, method, tag, exchangeRates };
      dispatch(editMode ? editExpense(payloadEdit) : addExpense(payloadAdd));
    });
    this.resetStateInputs();
  };

  render() {
    const {
      paymentMethod,
      expenseCategory,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies, editMode } = this.props;
    return (
      <form className="main-walletform" onSubmit={ this.handleSubmit }>
        <TextField
          data-testid="value-input"
          onChange={ this.handleChange }
          name="value"
          id="outlined-number"
          label="Despesa:"
          type="number"
          value={ value }
          InputLabelProps={ {
            shrink: true,
          } }
          size="small"
        />
        <TextField
          data-testid="description-input"
          onChange={ this.handleChange }
          name="description"
          value={ description }
          id="outlined-textarea" // pode remover
          label="Descrição:"
          placeholder="Placeholder"
          multiline
          size="small"
        />
        <FormControl style={ { width: '100px' } }>
          <InputLabel id="currency">Moeda:</InputLabel>
          <Select
            labelId="currency"
            id="currency"
            value={ currency }
            name="currency"
            label="Age"
            onChange={ this.handleChange }
            size="small"
          >
            {
              currencies.map((coin) => (
                <MenuItem
                  key={ coin }
                  value={ coin }
                >
                  { coin }
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="payment">Método</InputLabel>
          <Select
            data-testid="method-input"
            labelId="payment"
            value={ method }
            label="Age"
            name="method"
            onChange={ this.handleChange }
            size="small"
          >
            {
              paymentMethod.map((payment) => (
                <MenuItem
                  key={ payment }
                  value={ payment }
                >
                  {payment}
                </MenuItem>))
            }
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="expenseCategory">Categoria:</InputLabel>
          <Select
            data-testid="tag-input"
            onChange={ this.handleChange }
            labelId="expenseCategory"
            value={ tag }
            name="tag"
            label="Age"
            size="small"
          >
            {
              expenseCategory.map((category) => (
                <MenuItem
                  key={ category }
                  value={ category }
                >
                  { category }
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
        >
          {
            editMode ? 'Editar despesa' : 'Adicionar despesa'
          }
        </Button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.expenseToEdit,
  editMode: state.wallet.editor,
  currencies: state.wallet.currencies,
  id: state.wallet.idToEdit,
});
WalletForm.propTypes = {
  expenseToEdit: PropTypes.shape().isRequired,
  editMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
