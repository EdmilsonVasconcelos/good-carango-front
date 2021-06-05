import React from 'react';
import { render, screen } from '@testing-library/react';

import TokenContext from '../../contexts/token';
import AlertMessage from '.';

describe('Component AlertMessage', () => {
  it('render title', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <AlertMessage severityClass="success" message="sucesso ao cadastrar" />
      </TokenContext.Provider>
    );

    expect(screen.getByTestId('alert-message').textContent).toBe(
      'sucesso ao cadastrar'
    );
  });
});
