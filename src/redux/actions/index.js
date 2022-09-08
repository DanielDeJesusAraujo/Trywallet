// Coloque aqui suas actions//
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export function addUserEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function addExpense(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}
