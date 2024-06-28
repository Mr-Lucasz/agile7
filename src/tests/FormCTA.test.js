import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormCTA } from '../components/FormCTA';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { waitFor } from '@testing-library/react';

// Mock the URL_BACKEND import
jest.mock('../config', () => ({
    URL_BACKEND: 'https://backend7-rho.vercel.app/api/form',
}));

describe('FormCTA Component', () => {
  test('CT01-01: Nome vazio', () => {
    render(<FormCTA />);
    fireEvent.click(screen.getByLabelText(/enviar/i));
    expect(screen.getByText('O campo Nome é obrigatório.')).toBeInTheDocument();
  });

  test('CT01-02: Nome preenchido', () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    expect(screen.queryByText('O campo Nome é obrigatório.')).not.toBeInTheDocument();
  });

  test('CT02-01: Email vazio', async () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.input(screen.getByLabelText(/telefone/i), { target: { value: '123456789' } });
    fireEvent.input(screen.getByLabelText(/empresa/i), { target: { value: 'Minha Empresa' } });
    fireEvent.input(screen.getByLabelText(/Nos fale mais sobre o seu negócio./i), { target: { value: 'Mensagem de teste' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));

    await waitFor(() => {
      const errorMessage = screen.getByText('Por favor, preencha os seguintes campos: email');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('CT02-02: Email inválido', async () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.input(screen.getByLabelText(/telefone/i), { target: { value: '123456789' } });
    fireEvent.input(screen.getByLabelText(/empresa/i), { target: { value: 'Minha Empresa' } });
    fireEvent.input(screen.getByLabelText(/Nos fale mais sobre o seu negócio./i), { target: { value: 'Mensagem de teste' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'emailinvalido' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    const errorMessage = await screen.findByText('Formato de email inválido.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('CT02-03: Email válido', () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'joao@example.com' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    expect(screen.queryByText('O campo Email é obrigatório.')).not.toBeInTheDocument();
    expect(screen.queryByText('Formato de email inválido.')).not.toBeInTheDocument();
  });

  test('CT03-01:Exibição de snackbar ao tentar enviar formulário com campos vazios', async () => {
    render(<FormCTA />);
    fireEvent.click(screen.getByLabelText(/enviar/i));
    const errorMessage = await screen.findByText('Por favor, preencha os seguintes campos: nome, email, telefone, empresa, mensagem');
    expect(errorMessage).toBeInTheDocument();
  });
});



