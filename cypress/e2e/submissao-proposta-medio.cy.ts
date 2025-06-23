import { delay } from "cypress/types/bluebird";
import { first } from "cypress/types/lodash";

//chmod +x node_modules/.bin/cypress  // Torna o comando cypress executável
// npx cypress open  // Abre a interface gráfica do Cypress
// npx cypress run  // Executa os testes em modo headless (sem interface gráfica)
// npx cypress run --spec cypress/e2e/submissao-proposta-medio.cy.ts  // Executa um teste específico

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      'https://novo-sig.ledes.net/login',     //  URL correta
      'grupo12_pesq@sig.com',               //  E-mail
      'Grupo12@sig' // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
 it('Realiza a submissão de uma proposta ao Edital Médio', () => {
    // Acessa Home e Editais
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.get('[data-cy="editais-ver-mais"]').click();

    // Localiza o edital médio recém-criado
    cy.get('.MuiInputBase-input').click();
    cy.get('.MuiInputBase-input').type('Grupo-12 E.M');
    cy.get('[data-cy="visualizar-edital-grupo-12-e-m-001"]').first().click();
    
    

    // Inicia a criação da proposta
    cy.get('[data-cy="criar-proposta"]').click();

    // Preenchimento da proposta
    cy.get('[data-cy="tituloDoProjeto"]').type('Projeto de Pesquisa Edital Médio - Grupo 12',{ delay: 0 });
    

    cy.get('[data-cy="resumo"]').type('Resumo do projeto submetido por Cypress para o Edital Médio.',{ delay: 0 });
    cy.get('[data-cy="introducao"]').type('Introdução ao projeto e seus objetivos.',{ delay: 0 });
    cy.get('[data-cy="justificativa"]').type('Justificativa da proposta.',{ delay: 0 });
    cy.get('[data-cy="objetivos"]').type('Objetivos gerais e específicos da proposta.',{ delay: 0 });
    cy.get('[data-cy="metodologia"]').type('Metodologia da pesquisa.',{ delay: 0 });
    cy.get('[data-cy="resultadosEsperados"]').type('Resultados esperados da execução do projeto.',{ delay: 0 });
    cy.get('[data-cy="referencias"]').type('Referências bibliográficas principais.',{ delay: 0 });

    // Cronograma e orçamento (mínimo para submissão)
    cy.get('[data-cy="cronograma-atividades"]').click();
    cy.get('[data-cy="add-atividade"]').click();
    cy.get('[data-cy="atividadeUnsaved.nome"]').type('Atividade 1');

    cy.get('[data-cy="atividade-confirmar"]').click();

    // Rubricas e orçamento simplificado
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="add-item-orcamento"]').click();
    cy.get('[data-cy="rubricaId"]').click();
    cy.get('[data-cy-index="rubricaId-item-0"]').click();
    cy.get('[data-cy="valorSolicitado"]').type('5000');
    cy.get('[data-cy="orcamento-confirmar"]').click();

    // Finalizar submissão
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-submeter"]').click();

    // Verificação final
    cy.contains('Proposta submetida com sucesso').should('be.visible');
    cy.get('[data-cy="breadcrumb-home"]').click();
    cy.contains('Projeto de Pesquisa Edital Médio - Grupo 12').should('be.visible');
  });
});