import { getCurrentDateTime } from '../helpers/date.helper';

//chmod +x node_modules/.bin/cypress  // Torna o comando cypress executável
// npx cypress open  // Abre a interface gráfica do Cypress

//CT-ES-01 - Caso de Teste para a Criação de Edital Simples

describe('Criação de Edital Simples - Grupo 12', () => {
  beforeEach(() => {
    //CT-ES-01 passos 1 e 2
    cy.typelogin(
      'https://novo-sig.ledes.net/login',     // URL
      'grupo12_gestor@sig.com',              // E-mail do usuário
      'Grupo12@sig'                           // Senha do usuário
    );
  });

   it.only('Realiza login no sistema e cria um edital simples', () => { //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
    
    //CT-ES-01 passos 3,4 e 5
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital
    cy.get('[data-cy="nome"]').type('Grupo-12 E.S. 001/2025 Eduã-Emerson', { delay: 0 }); //Preenche o campo "Nome" do Edital
    
    //CT-ES-01 passos 6 e 7
    cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 })); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão
   
    //CT-ES-01 passos 8
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
    
    //CT-ES-01 passos 9 e 10
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital

    //Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
  });

});
