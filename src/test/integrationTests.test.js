import React from 'react';
import { getByAltText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../tests/helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';
import { mockData } from '../../cypress/mocks/data';

describe('1 - test functionality login page', () => {
  it('there must be an email input element', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByLabelText('Email:');

    expect(emailInput).toBeInTheDocument();
  });

  it('there must be an password input element', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByLabelText('Senha:');

    expect(passwordInput).toBeInTheDocument();
  });

  it('should be possible to type in the imputs', async () => {
    // RENDER
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    // GET ELEMENTS
    const emailInput = await screen.findByLabelText('Email:');
    const passwordInput = await screen.findByLabelText('Senha:');

    // INTERACT WITH THE ELEMENTS
    const email = 'useremail@gmail.com';
    const password = '123456';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    // TEST THE ELEMENTS
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
  });

  it('must switch to the "/wallet" route by clicking "Enter".', async () => {
    // RENDER
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    // GET ELEMENTS
    const emailInput = await screen.findByLabelText('Email:');
    const passwordInput = await screen.findByLabelText('Senha:');
    const email = 'useremail@gmail.com';
    const password = '123456';

    // INTERACT WITH THE ELEMENTS
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    const buttonSubmit = screen.getByText('Entrar');
    userEvent.click(buttonSubmit);

    // TEST THE ELEMENTS
    const rout = history.location.pathname;
    expect(rout).toBe('/carteira');
  });
});

describe('2 - tests the functioning of the "Header" component', () => {
  it('the username must be in the header', () => {
    // RENDER
    const MockUserEmail = 'user@gmail.com';
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: { user: { email: MockUserEmail } },
    });

    // GET ELEMENTS
    const userEmail = screen.getByText(MockUserEmail);

    // INTERACT WITH THE ELEMENTS

    // TEST THE ELEMENTS
    expect(userEmail).toBeInTheDocument();
  });
});

describe('3 - tests the functioning of the "Header" component', () => {
  it(
    'the "Despesa" field must be on the screen and it must be possible to edit',
    async () => {
      const mockState = {
        user: { email: 'user@gmail.com' },
        wallet: {
          currencies: [],
          expenses: [],
          editor: false,
          idToEdit: 0,
          amount: 0,
        },
      };

      window.fetch = jest.fn().mockReturnValue({
        json: jest.fn().mockReturnValue(mockData),
      });

      // RENDER
      renderWithRouterAndRedux(
        <App />,
        {
          initialEntries: ['/carteira'],
          initialState: mockState,
        },
      );

      // GET ELEMENTS
      const inputExpense = screen.getByLabelText('Despesa:');
      const inputDescription = screen.getByLabelText('Descrição:');
      const addButton = screen.getByText(/adicionar/i);

      // INTERACT WITH THE ELEMENTS
      const MockExpense = '39';
      const MockDescription = '39 doletas';

      userEvent.type(inputExpense, MockExpense);
      userEvent.type(inputDescription, MockDescription);
      userEvent.click(addButton);

      // TEST
      const expextedValue = 39;
      expect(inputExpense).toHaveValue(expextedValue);
      expect(inputDescription).toHaveValue(MockDescription);

      await waitFor(() => {
        expect(screen.getByLabelText('Despesa:')).toHaveValue(null);
        expect(screen.getByLabelText('Descrição:')).toHaveValue('');
      });
    },
  );
});

describe('4 - test the functioning of "RowExpense" componemt', () => {
  it('must add a new expense by clicking on "Adicionar despasa"', async () => {
    // RENDER
    window.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockData),
    });
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    // GET ELEMENTS
    const expenseInput = screen.getByLabelText('Despesa:');
    const descriptionInput = screen.getByLabelText('Descrição:');
    const submitButton = screen.getByText('Adicionar despesa');

    // INTERACT WITH THE ELEMENTS
    userEvent.type(expenseInput, '11');
    userEvent.type(descriptionInput, 'onze dólares');
    userEvent.click(submitButton);

    // TEST
    const buttonEditar = await screen.findAllByRole('button', { name: 'Editar' });
    const buttonDelet = await screen.findByRole('button', { name: 'Excluir' });
    expect(buttonDelet).toBeInTheDocument();
    expect(buttonEditar[0]).toBeInTheDocument();
    history.push('/');
  });

  it('must remove the expense by clicking on "Deletar"', async () => {
    window.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockData),
    });
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );

    // GET ELEMENTS
    const expenseInput = screen.getByLabelText('Despesa:');
    const descriptionInput = screen.getByLabelText('Descrição:');
    const submitButton = screen.getByText('Adicionar despesa');

    // INTERACT WITH THE ELEMENTS
    userEvent.type(expenseInput, '11');
    userEvent.type(descriptionInput, 'onze dólares');
    userEvent.click(submitButton);

    const buttonDelet = await screen.findByRole('button', { name: 'Excluir' });
    // test

    userEvent.click(buttonDelet);
    const descriptionFirstExpense = screen.queryByText('onze dólares');
    expect(descriptionFirstExpense).toBeNull();
    history.push('/');
  });

  it('must put in edit mode by clicking on "Edit"', async () => {
    window.fetch = jest.fn().mockReturnValue({
      json: jest.fn().mockReturnValue(mockData),
    });
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: ['/carteira'] },
    );
    // GET ELEMENTS
    const expenseInput = screen.getByLabelText('Despesa:');
    const descriptionInput = screen.getByLabelText('Descrição:');
    const submitButton = screen.getByText('Adicionar despesa');

    // INTERACT WITH THE ELEMENTS
    userEvent.type(expenseInput, '11');
    userEvent.type(descriptionInput, 'onze dólares');
    userEvent.click(submitButton);

    const editButton = await screen.findByTestId('edit-btn');
    userEvent.click(editButton);
    const expenseInputEdit = screen.getByLabelText('Despesa:');
    const descriptionInputEdit = screen.getByLabelText('Descrição:');
    const confirmEditButton = screen.getByRole('button', { name: 'Editar despesa' });

    // INTERACT WITH THE ELEMENTS
    userEvent.clear(expenseInputEdit);
    userEvent.type(expenseInputEdit, '22');
    userEvent.type(descriptionInputEdit, 'vinte e dois dólares');
    userEvent.click(confirmEditButton);
    const expenseEdited = await screen.findByText('22.00');
    const amount = screen.getByTestId('total-field');

    expect(expenseEdited).toBeInTheDocument();
    expect(amount.textContent).toBe('104.57');
    expect(confirmEditButton).toBeInTheDocument();

    const buttonDelet = await screen.findByRole('button', { name: 'Excluir' });

    userEvent.click(buttonDelet);
    const amountZiro = screen.getByTestId('total-field');
    expect(amountZiro.textContent).toBe('0.00');
    console.log(store.getState());
    expect(store.getState().wallet.idToEdit).toBe(1);
  });
});
