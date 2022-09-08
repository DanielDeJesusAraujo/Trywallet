function deletExpenses(expenses, payload) {
  const newExpense = expenses.filter((expense) => expense.id !== payload.id);
  return newExpense;
}

export default deletExpenses;
