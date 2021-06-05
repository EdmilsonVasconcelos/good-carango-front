import React from 'react';
import { render, screen } from '@testing-library/react';

import TokenContext from '../../contexts/token';
import FormAddCar from '../../components/FormAddCar';

describe('Component FormAddCar', () => {
  it('render title with text Adicionar carro', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddCar />
      </TokenContext.Provider>
    );

    expect(screen.getByText('Adicionar carro')).toBeInTheDocument();
  });

  it('render placeholder placeholder', () => {
    const token = 'TOKEN';
    const change = jest.fn();

    render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddCar />
      </TokenContext.Provider>
    );

    expect(screen.queryByPlaceholderText('modelo'));
    expect(screen.queryByPlaceholderText('ano'));
    expect(screen.queryByPlaceholderText('valor'));
  });

  it('write inputs for add car', async () => {
    const token = 'TOKEN';
    const change = jest.fn();

    const { getByTestId } = render(
      <TokenContext.Provider value={(token, change)}>
        <FormAddCar />
      </TokenContext.Provider>
    );

    const nameBrand = 'Peugeot';
    const inputNode = getByTestId('brand-input').querySelector('input');

    fireEvent.change(inputNode, { target: { value: nameBrand } });

    expect(inputNode).toHaveValue(nameBrand);
  });
});
