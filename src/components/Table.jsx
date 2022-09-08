import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RowExpense from './RowExpense';
import '../styles/table.css';

class Table extends Component {
  constructor() {
    super();

    this.state = {
      headCategoryInfos: [
        'Descrição',
        'Tag',
        'Método de pagamento',
        'Valor',
        'Moeda',
        'Câmbio utilizado',
        'Valor convertido',
        'Moeda de conversão',
        'Editar/Excluir',
      ],
    };
  }

  render() {
    const { headCategoryInfos } = this.state;
    const { expenses } = this.props;
    return (
      <section className="main-table">
        <table>
          <thead className="header-table">
            {headCategoryInfos.map((head) => (
              <th key={ head }>{ head }</th>
            ))}
          </thead>
          <tbody className="tbody-table">
            {expenses.length > 0 && (
              expenses.map((expanse) => (
                <tr key={ expanse.id }>
                  <RowExpense expense={ expanse } />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
