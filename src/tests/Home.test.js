import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Header} from '../components/Header.jsx';

describe('RT08 - Visualizar seções "Sobre Nós", "Nossos Serviços" e "Para Clientes"', () => {
    test('deve exibir as seções "Sobre Nós", "Nossos Serviços" e "Para Clientes"', () => {
        render(<Header />);
    
        const sobreNosLink = screen.getByRole('link', { name: /Sobre Nós/i });
        expect(sobreNosLink).toBeInTheDocument();
        const nossosServicosLink = screen.getByRole('link', { name: /Nossos Serviços/i });
        expect(nossosServicosLink).toBeInTheDocument();
        const paraClientesLink = screen.getByRole('link', { name: /Para Clientes/i });
        expect(paraClientesLink).toBeInTheDocument();
      });
  });