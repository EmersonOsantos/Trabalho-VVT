import { getCurrentDateTime } from '../helpers/date.helper';
import 'cypress-iframe';
import 'cypress-real-events';
//chmod +x node_modules/.bin/cypress  // Torna o comando cypress executável
// npx cypress open  // Abre a interface gráfica do Cypress

describe('Criação de Edital Médio - Grupo 12', () => {
  beforeEach(() => {
    cy.typelogin(
      'https://novo-sig.ledes.net/login',
      'grupo12_gestor@sig.com',
      'Grupo12@sig'
    );
  });

  it.only('Realiza login no sistema e cria um edital medio', () => {
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // nome do Edital
    cy.get('[data-cy="nome"]').type('Grupo-12 E.M. 001/2025 Eduã-Emerson', { delay: 0 },);

    // Restrições
    cy.get('[data-cy="restricoes"]').click();
    // Definir Duração do Projeto em Meses
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('8');
    // Pesquisador pode submeter várias propostas
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();


    // próxima seção
    cy.contains('Próximo').click();

    // Texto do Termo
    cy.get('[data-cy="termoDeAceite"]')
      .click()
      .realType('Termo de Aceite Grupo-12 E.M. 001/2025 Eduã-Emerson', { delay: 0 },);

    // próxima seção
    cy.contains('Próximo').click();
    
    
    // Texto do Edital
    cy.get('[data-cy="texto"]')
      .click()
      .realType('Texto do Edital Grupo-12 E.M. 001/2025 Eduã-Emerson', { delay: 0 },);

    // próxima seção
    cy.contains('Próximo').click();

    // Abrangência
    cy.get('[data-cy="abrangencia"]').click();
    cy.get('[data-cy="estado-mato-grosso-do-s"]').click(); 
    cy.get('[data-cy="estado-mato-grosso"]').click(); 

    // Período de Submissão
    cy.get('[data-cy="cronograma"]').click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 }));
    cy.get('[data-cy="chamada-confirmar"]').click();

    // Orçamento > Programa
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();

    // Perguntas > Indicadores de Produção
    cy.get('[data-cy="perguntas"]').click();
    cy.get('[data-cy="indicadores-de-producao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="producao-bibliog"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="producao-tecnica"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="indicador-de-pro"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    // Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

  });
});
