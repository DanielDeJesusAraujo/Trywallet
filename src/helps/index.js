import { addUserEmail } from '../redux/actions';

export const alimentacao = 'Alimentação';

export function sumId(prevState, num = 0) {
  let increment = num;
  increment += prevState;
  return increment;
}

export function sumAmount(prevState, num = 0) {
  const { exchangeRates, currency, value } = prevState;
  if (exchangeRates[currency]) {
    const { ask } = exchangeRates[currency];
    return ((value * ask) + Number(num)).toFixed(2);
  }
}

export function cauculeAmount(expenses) {
  let amount = 0;
  expenses.forEach((expense) => {
    if (expense.exchangeRates) {
      const { exchangeRates, currency, value } = expense;
      if (exchangeRates[currency]) {
        const { ask } = exchangeRates[currency];
        amount += (value * ask);
      }
    }
  });
  return amount.toFixed(2);
}

export function subtractAmount(prevState, amount) {
  const { exchangeRates, currency, value } = prevState;
  const { ask } = exchangeRates[currency];
  return ((Number(amount) - (value * ask)).toFixed(2)).replace('-', '');
}

export const handleSubmitLogin = ({
  email,
  event,
  dispatch,
  history,
}) => {
  event.preventDefault();
  dispatch(addUserEmail(email));
  history.push('/carteira');
};
