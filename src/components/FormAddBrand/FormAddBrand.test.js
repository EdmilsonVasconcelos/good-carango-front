import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import TokenContext from '../../contexts/token';
import FormAddBrand from '../../components/FormAddBrand';

describe('Component FormAddBrand', () => {
  it('render title with text Adicionar marca', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddBrand />
      </TokenContext.Provider>
    );

    expect(screen.getByText('Adicionar marca')).toBeInTheDocument();
  });

  it('render placeholder with text Marca', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddBrand />
      </TokenContext.Provider>
    );

    expect(screen.queryByPlaceholderText('Marca'));
  });

  it('render button with text Adicionar', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddBrand />
      </TokenContext.Provider>
    );

    expect(screen.getByText('Adicionar')).toBeInTheDocument();
  });

  it('write Brand', async () => {
    const token = 'TOKEN';
    const change = jest.fn();

    const { getByTestId } = render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddBrand />
      </TokenContext.Provider>
    );

    const nameBrand = 'Peugeot';
    const inputNode = getByTestId('brand-input').querySelector('input');

    fireEvent.change(inputNode, { target: { value: nameBrand } });

    expect(inputNode).toHaveValue(nameBrand);
  });
});
