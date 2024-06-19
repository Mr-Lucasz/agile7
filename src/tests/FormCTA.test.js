import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormCTA } from '../components/FormCTA';

describe('FormCTA Component', () => {
  test('Nome vazio', () => {
    render(<FormCTA />);
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);
    expect(screen.getByText('O campo Nome é obrigatório.')).toBeInTheDocument();
  });

  test('Nome preenchido', () => {
    render(<FormCTA />);
    const nomeInput = screen.getByLabelText('Nome');
    fireEvent.change(nomeInput, { target: { value: 'João' } });
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);
    expect(screen.queryByText('O campo Nome é obrigatório.')).not.toBeInTheDocument();
  });
});