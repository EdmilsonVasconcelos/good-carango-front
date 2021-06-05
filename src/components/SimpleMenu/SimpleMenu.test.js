import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import SimpleMenu from './';
import { Router } from 'react-router-dom';

describe('Navegação do menu simples', () => {
  it('Quando o item do menu Entrar é clicado, deve redirecionar para a página de login', async () => {
    const history = createMemoryHistory();
    history.push('/add-user');

    render(
      <Router history={history}>
        <SimpleMenu />
      </Router>
    );

    const link = screen.getByRole('link', {
      name: /entrar/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/');
  });
  it('Quando o item do menu Criar Usuário é clicado, deve redirecionar para a página de criação de usuário', async () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Router history={history}>
        <SimpleMenu />
      </Router>
    );

    const link = screen.getByRole('link', {
      name: /criar usuário/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/add-user');
  });
  it('Quando o item do menu Veículos é clicado, deve redirecionar para a página de listagem de veículos', async () => {
    const history = createMemoryHistory();
    history.push('/');

    render(
      <Router history={history}>
        <SimpleMenu />
      </Router>
    );

    const link = screen.getByRole('link', {
      name: /veículos/i,
    });

    userEvent.click(link);

    expect(history.location.pathname).toBe('/list-cars');
  });
});
