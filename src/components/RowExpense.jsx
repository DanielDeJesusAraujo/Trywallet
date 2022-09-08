import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { deletExpense, editModeChange } from '../redux/actions/deleteOrEditExpense';

class RowExpense extends React.Component {
  format = (element) => Number(element).toFixed(2);

  handleClick = (expense, order) => {
    const { dispatch } = this.props;
    dispatch(order === 'delet' ? deletExpense(expense) : editModeChange(expense));
  };

  render() {
    const editOrDelet = 'Editar/Excluir';
    const { expense } = this.props;
    const { description, tag, method, value, currency, exchangeRates } = expense;
    const line = [
      description,
      tag,
      method,
      value,
      currency,
      'ask',
      'conversão',
      'conversionCurrency',
      editOrDelet,
    ];

    return (
      line.map((key) => (
        <td key={ key }>
          {key === description && key}
          {key === tag && key}
          {key === method && key}
          {key === value && this.format(key)}
          {key === currency && exchangeRates[currency].name}
          {key === 'ask' && this.format(exchangeRates[currency].ask)}
          {key === 'conversão' && (
            this.format(Number(value) * Number(exchangeRates[currency].ask)))}
          {key === 'conversionCurrency' && 'Real'}
          {key === editOrDelet && (
            <IconButton
              aria-label="edit"
              onClick={ () => this.handleClick(expense, 'edit') }
              data-testid="edit-btn"
              type="button"
              size="small"
              color="default"
            >
              <EditIcon />
            </IconButton>
          )}
          {key === editOrDelet && (
            <IconButton
              onClick={ () => this.handleClick(expense, 'delet') }
              data-testid="delete-btn"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </td>
      ))
    );
  }
}

RowExpense.propTypes = {
  expense: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(RowExpense);
