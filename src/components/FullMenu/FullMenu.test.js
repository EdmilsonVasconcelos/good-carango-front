import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import FullMenu from './';

import TokenContext from '../../contexts/token';
import { render } from '../../utils/tests/customRender';

let history;

beforeEach(() => {
  history = createMemoryHistory();
});

describe('Navegação do menu', () => {
  it('Quando o item do menu Veículos é clicado, deve redirecionar para a página de listagem de veículos', async () => {
    history.push('/');

    render(
      <TokenContext.Provider value={{ token: '', setToken: jest.fn() }}>
        <Router history={history}>
          <FullMenu />
        </Router>
      </TokenContext.Provider>
    );

    const link = screen.getByRole('link', {
      name: /veículos/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/list-cars');
  });
  it('Quando o item do menu Marcas é clicado, deve redirecionar para a página de listagem de marcas', async () => {
    history.push('/');

    render(
      <TokenContext.Provider value={{ token: '', setToken: jest.fn() }}>
        <Router history={history}>
          <FullMenu />
        </Router>
      </TokenContext.Provider>
    );

    const link = screen.getByRole('link', {
      name: /Marcas/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/list-brands');
  });
  it('Quando o item do menu Usuários é clicado, deve redirecionar para a página de listagem de usuários', async () => {
    history.push('/');
    render();
    render(
      <TokenContext.Provider value={{ token: '', setToken: jest.fn() }}>
        <Router history={history}>
          <FullMenu />
        </Router>
      </TokenContext.Provider>,
      {}
    );

    const link = screen.getByRole('link', {
      name: /usuários/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/list-users');
  });
  it('Quando o item do menu Veículos é clicado, deve redirecionar para a página de dashboard', async () => {
    history.push('/');

    render(
      <TokenContext.Provider value={{ token: '', setToken: jest.fn() }}>
        <Router history={history}>
          <FullMenu />
        </Router>
      </TokenContext.Provider>
    );

    const link = screen.getByRole('link', {
      name: /dashboard/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/dashboard');
  });
  it('Quando o item do menu Sair é clicado, deve redirecionar para a página de login', async () => {
    history.push('/add-user');

    render(
      <TokenContext.Provider value={{ token: '', setToken: jest.fn() }}>
        <Router history={history}>
          <FullMenu />
        </Router>
      </TokenContext.Provider>
    );

    const exitButton = screen.getByRole('button', {
      name: /sair/i,
    });

    userEvent.click(exitButton);

    expect(history.location.pathname).toBe('/');
  });
});
