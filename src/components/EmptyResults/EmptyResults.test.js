import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import TokenContext from '../../contexts/token';
import EmptyResults from '.';

describe('Component EmptyResults', () => {
  it('render title and button', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <BrowserRouter>
          <EmptyResults linkRedirect="/add-brand" text="empty" />
        </BrowserRouter>
      </TokenContext.Provider>
    );

    expect(screen.getByText('empty')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });
});
