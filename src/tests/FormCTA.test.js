import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormCTA } from '../components/FormCTA';

describe('FormCTA', () => {
  test('CT01-01: Nome vazio deve mostrar mensagem de erro', async () => {
    render(<FormCTA />);

    // Simular o preenchimento do formulário com um nome vazio
    const nomeInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nomeInput, { target: { value: '' } });

    // Simular o envio do formulário
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Verificar se a mensagem de erro é exibida
    const errorMessage = await screen.findByText(/o campo nome é obrigatório\./i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('CT01-02: Nome preenchido não deve mostrar mensagem de erro', async () => {
    render(<FormCTA />);

    // Simular o preenchimento do formulário com um nome válido
    const nomeInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nomeInput, { target: { value: 'João' } });

    // Simular o envio do formulário
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Verificar se a mensagem de erro não é exibida
    const errorMessage = screen.queryByText(/o campo nome é obrigatório\./i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});