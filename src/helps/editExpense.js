function editExpenses(expenses, payload) {
  const newExpense = expenses.map((expense) => (
    expense.id === payload.id ? payload : expense));
  return newExpense;
}

export default editExpenses;
