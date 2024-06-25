import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormCTA } from './FormCTA';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock the URL_BACKEND import
jest.mock('../config', () => ({
    URL_BACKEND: 'https://backend7-rho.vercel.app/api/form',
}));


describe('FormCTA Component', () => {
  test('CT01-01: Nome vazio', () => {
    render(<FormCTA />);
    fireEvent.click(screen.getByLabelText(/enviar/i));
    // Expect the error message to be present in the document after submission
    expect(screen.getByText('O campo Nome é obrigatório.')).toBeInTheDocument();
  });
  test('CT01-02: Nome preenchido', () => {
    render(<FormCTA />);
//CT01-02	Nome preenchido	João	Nenhuma mensagem de erro
    fireEvent.input(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    // Expect the error message to be absent in the document after submission
    expect(screen.queryByText('O campo Nome é obrigatório.')).not.toBeInTheDocument();
  });

  test('CT02-01: Email vazio', () => {
    render(<FormCTA />);
    fireEvent.click(screen.getByLabelText(/enviar/i));
    expect(screen.getByText('O campo Email é obrigatório.')).toBeInTheDocument();
  });
  
  test('CT02-02: Email inválido', () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'emailinvalido' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    // Expect the error message for invalid email format to be present in the document after submission
    expect(screen.getByText('Formato de email inválido.')).toBeInTheDocument();
  });
  
  test('CT02-03: Email válido', () => {
    render(<FormCTA />);
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'joao@example.com' } });
    fireEvent.click(screen.getByLabelText(/enviar/i));
    // Expect no error message for email after submission with a valid email
    expect(screen.queryByText('O campo Email é obrigatório.')).not.toBeInTheDocument();
    expect(screen.queryByText('Formato de email inválido.')).not.toBeInTheDocument();
  });

});