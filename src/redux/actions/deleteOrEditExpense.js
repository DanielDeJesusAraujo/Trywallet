export const DELET_EXPENSE = 'DELET_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_MODE = 'EDIT_MODE';

export const deletExpense = (payload) => ({
  type: DELET_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const editModeChange = (payload) => ({
  type: EDIT_MODE,
  payload,
});
