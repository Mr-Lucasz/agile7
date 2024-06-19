import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormCTA from '../components/FormCTA';

describe('FormCTA Component', () => {
  test('CT01-01: Nome vazio exibe mensagem de erro', () => {
    render(<FormCTA />);
    
    // Encontra o botão de submissão e clica nele sem preencher o campo "Nome"
    const submitButton = screen.getByText('Enviar');
    fireEvent.click(submitButton);
    
    // Verifica se a mensagem de erro é exibida
    expect(screen.getByText('O campo Nome é obrigatório.')).toBeInTheDocument();
  });

  test('CT01-02: Nome preenchido não exibe mensagem de erro', () => {
    render(<FormCTA />);
    
    // Preenche o campo "Nome"
    const nomeInput = screen.getByLabelText('Nome');
    fireEvent.change(nomeInput, { target: { value: 'João' } });
    
    // Encontra o botão de submissão e clica nele
    const submitButton = screen.getByText('Enviar');
    fireEvent.click(submitButton);
    
    // Verifica se a mensagem de erro não é exibida
    expect(screen.queryByText('O campo Nome é obrigatório.')).not.toBeInTheDocument();
  });
});