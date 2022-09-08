// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { sumId, sumAmount, subtractAmount, cauculeAmount } from '../../helps';
import { ADD_EXPENSE } from '../actions';
import { REQUEST_SUCCESS } from '../actions/requestCurrencys';
import {
  DELET_EXPENSE,
  EDIT_EXPENSE,
  EDIT_MODE,
  // deletExpense,
  // editExpense
} from '../actions/deleteOrEditExpense';
import deletExpenses from '../../helps/deletExpense';
import editExpenses from '../../helps/editExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  amount: '0.00',
  expenseToEdit: {},
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      currencies: (Object.keys(action.payload).filter((coin) => coin !== 'USDT')),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      idToEdit: sumId(state.idToEdit, 1),
      amount: sumAmount(action.payload, state.amount),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: editExpenses(state.expenses, action.payload),
      amount: cauculeAmount(editExpenses(state.expenses, action.payload)),
      editor: false,
    };
  case EDIT_MODE:
    return {
      ...state,
      expenseToEdit: action.payload,
      editor: true,
    };
  case DELET_EXPENSE:
    return {
      ...state,
      expenses: deletExpenses(state.expenses, action.payload),
      amount: subtractAmount(action.payload, state.amount),
    };
  default:
    return { ...state };
  }
}

export default walletReducer;
