import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen, fireEvent } from '@testing-library/react';
import FormCTA from '../components/FormCTA';

const feature = loadFeature('./src/tests/features/FormCTA.feature');

defineFeature(feature, test => {
  test('Nome vazio', ({ given, when, then }) => {
    given('o usuário está na página de captação de leads', () => {
      render(<FormCTA />);
    });

    when('o usuário submete o formulário sem preencher o campo "Nome"', () => {
      const submitButton = screen.getByText('Enviar');
      fireEvent.click(submitButton);
    });

    then('o sistema deve exibir uma mensagem de erro indicando que o campo "Nome" é obrigatório', () => {
      // Ensure this expect statement is inside the `then` block
      expect(screen.getByText('O campo Nome é obrigatório.')).toBeInTheDocument();
    });
  });

  test('Nome preenchido', ({ given, when, and, then }) => {
    given('o usuário está na página de captação de leads', () => {
      render(<FormCTA />);
    });

    when('o usuário preenche o campo "Nome" com "João"', () => {
      const nomeInput = screen.getByLabelText('Nome');
      fireEvent.change(nomeInput, { target: { value: 'João' } });
    });

    and('o usuário submete o formulário', () => {
      const submitButton = screen.getByText('Enviar');
      fireEvent.click(submitButton);
    });

    then('o sistema não deve exibir nenhuma mensagem de erro', () => {
      // Ensure this expect statement is inside the `then` block
      expect(screen.queryByText('O campo Nome é obrigatório.')).not.toBeInTheDocument();
    });
  });
});