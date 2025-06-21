import { findIndex, first } from 'cypress/types/lodash';
import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      'https://novo-sig.ledes.net',// [URL do sistema]
      'grupo12_gestor@sig.com', // [E-mail do usuário]
      'Grupo12@sig', // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it.only('Realiza login no sistema e cria um edital completo', () => { //Teste edital completo, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital
    cy.get('[data-cy="nome"]').type(
      'Grupo-12 E.C. 012/2025 Eduã - Emerson', //Edite essa linha para preencher o nome do Edital
      { delay: 0 },
    ); //Preenche o campo "Nome" do Edital

    cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"
    
    cy.get('[data-cy="termo-de-aceite"]').click(); //Clica na aba Termo de Aceite para seguir para a página de Termo de Aceite
    cy.get('[data-cy="termoDeAceite"]').then(el => {
      const editor = (el[0] as any).ckeditorInstance; // Assert type as any to bypass TS error
      editor.setData('Termo de Aceite Grupo-12 E.C. 012/2025 Eduã - Emerson'); // Preenche o campo "Termo de Aceite"
    }); // Add the missing closing bracket and parenthesis

    cy.get('[data-cy="texto-do-edital"]').click(); //Clica na aba Texto do Edital para seguir para a página de Texto do Edital
    cy.get('[data-cy="texto"]').then(el => {
      const editor = (el[0] as any).ckeditorInstance; // Assert type as any to bypass TS error
      editor.setData('Texto do Edital Grupo-12 E.C. 012/2025 Eduã - Emerson'); // Preenche o campo "Texto do Edital"
    }); // Add the missing closing bracket and parenthesis

    cy.get('[data-cy="abrangencia"]').click(); //Clica na aba Abrangência para seguir para a página de Abrangência
    cy.get('[data-cy="estado-todos"]').click(); //Clica na opção "Todos os Estados" para selecionar a Abrangência do Edital
    
    //Informações Complementares

    cy.get('[data-cy="informacoes-complementares"]').click(); //Clica na aba Informações Complementares para seguir para a página de Informações Complementares
    

    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Informação Complementar
    cy.get('.MuiGrid-grid-xs-7 > .MuiGrid-container').click(); //Clica no campo de seleção de Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta.0.pergunta"]').type(
      'Pergunta 1 - Grupo-12 E.C. 012/2025 Eduã - Emerson', { delay: 0 },); // Preenche o campo "Pergunta" da Informação Complementar
    cy.get(':nth-child(3) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click();//Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get(':nth-child(5) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Obrigatoriedade
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Obrigatoriedade
    

    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-content > :nth-child(1)').click(); //Clica no campo de seleção de Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta.1.pergunta"]').type(
      'Pergunta 2 - Grupo-12 E.C. 012/2025 Eduã - Emerson', { delay: 0 },); // Preenche o campo "Pergunta" da Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-2-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(3) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click(); //Clica no campo de seleção de Tipo de Resposta
    //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click();//Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-2-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(5) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Obrigatoriedade
    //Clica no campo de seleção de Obrigatoriedade
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Obrigatoriedade
    

    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-content > :nth-child(1)').click(); //Clica no campo de seleção de Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta.2.pergunta"]').type(
      'Pergunta 3 - Grupo-12 E.C. 012/2025 Eduã - Emerson', { delay: 0 },); // Preenche o campo "Pergunta" da Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-3-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(3) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click(); //Clica no campo de seleção de Tipo de Resposta
    //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click();//Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-3-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(5) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Obrigatoriedade
    //Clica no campo de seleção de Obrigatoriedade
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Obrigatoriedade
    

    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-content > :nth-child(1)').click(); //Clica no campo de seleção de Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta.3.pergunta"]').type(
      'Pergunta 4 - Grupo-12 E.C. 012/2025 Eduã - Emerson', { delay: 0 },); // Preenche o campo "Pergunta" da Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-4-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(3) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click(); //Clica no campo de seleção de Tipo de Resposta
    //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click();//Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-4-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(5) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Obrigatoriedade
    //Clica no campo de seleção de Obrigatoriedade
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Obrigatoriedade
    

    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-content > :nth-child(1)').click(); //Clica no campo de seleção de Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta.4.pergunta"]').type(
      'Pergunta 5 - Grupo-12 E.C. 012/2025 Eduã - Emerson', { delay: 0 },); // Preenche o campo "Pergunta" da Informação Complementar
    cy.get('[data-cy="informacaoComplementarPergunta-pergunta-5-grupo-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > [style="width: 100%; min-height: 450px; margin-top: 6rem;"] > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiGrid-container > :nth-child(3) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click(); //Clica no campo de seleção de Tipo de Resposta
    //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="data"]').click();//Seleciona a opção "Data" no campo de seleção de Tipo de Resposta
   
    
    // Fim de Informações Complementares

        
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addYears: 1 }),
    ); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
   
    cy.get('[data-cy="rubricas"]').click(); //Clica na aba Rubricas para seguir para a página de Rubricas
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Rubrica
    cy.get(':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path').click(); //Clica no campo de seleção de Rubrica
    cy.get('[data-cy="diarias"]').click(); //Seleciona a opção "Diárias" no campo de seleção de Rubrica
    cy.get(':nth-child(2) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Tipo de Rubrica
    cy.get('[data-cy="capital"]').click(); //Seleciona a opção "Capital" no campo de seleção de Tipo de Rubrica
    cy.get('[data-cy="editalRubrica-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Rubrica


    //Faixas de financiamento

    cy.get('[data-cy="faixas-de-financiamento"]').click(); //Clica na aba Faixas de Financiamento para seguir para a página de Faixas de Financiamento
    
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(
      'Faixa 1',    
      { delay: 0 },
    ); //Preenche o campo "Nome" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type('1000',{ delay: 0 }); //Preenche o campo "Valor Mínimo" da Faixa de Financiamento com o valor 1000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('5000',{ delay: 0 }); //Preenche o campo "Valor Máximo" da Faixa de Financiamento com o valor 5000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(
      'Observação da Faixa de Financiamento 1', //Edite essa linha para preencher a observação da Faixa de Financiamento      
      { delay: 0 },
    ); //Preenche o campo "Observação" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Faixa de Financiamento
    

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(
      'Faixa 2',    
      { delay: 0 },
    ); //Preenche o campo "Nome" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('10000',{ delay: 0 }); //Preenche o campo "Valor Máximo" da Faixa de Financiamento com o valor 5000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(
      'Observação da Faixa de Financiamento 2', //Edite essa linha para preencher a observação da Faixa de Financiamento      
      { delay: 0 },
    ); //Preenche o campo "Observação" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Faixa de Financiamento
    

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(
      'Faixa 3',    
      { delay: 0 },
    ); //Preenche o campo "Nome" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('20000',{ delay: 0 }); //Preenche o campo "Valor Máximo" da Faixa de Financiamento com o valor 5000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(
      'Observação da Faixa de Financiamento 3', //Edite essa linha para preencher a observação da Faixa de Financiamento      
      { delay: 0 },
    ); //Preenche o campo "Observação" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Faixa de Financiamento
    

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(
      'Faixa 4',    
      { delay: 0 },
    ); //Preenche o campo "Nome" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('40000',{ delay: 0 }); //Preenche o campo "Valor Máximo" da Faixa de Financiamento com o valor 5000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(
      'Observação da Faixa de Financiamento 4', //Edite essa linha para preencher a observação da Faixa de Financiamento      
      { delay: 0 },
    ); //Preenche o campo "Observação" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Faixa de Financiamento
    

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(
      'Faixa 5',     
      { delay: 0 },
    ); //Preenche o campo "Nome" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type('50000',{ delay: 0 }); //Preenche o campo "Valor Máximo" da Faixa de Financiamento com o valor 5000
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(
      'Observação da Faixa de Financiamento 5', //Edite essa linha para preencher a observação da Faixa de Financiamento      
      { delay: 0 },
    ); //Preenche o campo "Observação" da Faixa de Financiamento
    cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Faixa de Financiamento
    

    //Fim de Faixas de financiamento


    //Documentos

    cy.get('[data-cy="documentos"]').click(); //Clica na aba Documentos para seguir para a página de Documentos
    cy.get('[data-cy="documentos-da-proposta"]').click(); //Clica na aba Documentos da Proposta para seguir para a página de Documentos da Proposta
      
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento da Proposta
    cy.get('.MuiAccordionSummary-expandIconWrapper').click(); //Clica no campo de seleção de Documento da Proposta
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type(
      'Documento 1',{ delay: 0 },
    ); //Preenche o campo "Nome" do Documento da Proposta
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type(
      'Descrição do Documento 1',{ delay: 0 },
    ); //Preenche o campo "Descrição" do Documento da Proposta  
    cy.get('[data-testId="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Tipo de Documento
    cy.get('[data-cy="pdf"]').click(); //Seleciona a opção "PDF" no campo de seleção de Tipo de Documento
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(
      '10',{ delay: 0 },  
    ); //Preenche o campo "Tamanho do Arquivo" do Documento da Proposta com o valor 1000
    cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').click(); //Marca a opção "Arquivo de Submissão Obrigatória" do Documento da Proposta
    


    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento da Proposta
    cy.get('[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"] > path',).click({force: true}); //Clica no campo de seleção de Documento da Proposta
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]').type(
      'Documento 2',{ delay: 0 },
    ); //Preenche o campo "Nome" do Documento da Proposta
    cy.get('[data-cy="documentoPropostaEdital.1.descricao"]').type(
      'Descrição do Documento 2',{ delay: 0 },
    ); //Preenche o campo "Descrição" do Documento da Proposta  
    cy.get('[data-cy="documentoPropostaEdital-documento-2-expandable-item"] > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiAccordion-region > .MuiAccordionDetails-root > .MuiGrid-direction-xs-column > :nth-child(2) > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Tipo de Documento
    //Clica no campo de seleção de Tipo de Documento
    cy.get('[data-cy="pdf"]').click(); //Seleciona a opção "PDF" no campo de seleção de Tipo de Documento
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').type(
      '9',{ delay: 0 },  
    ); //Preenche o campo "Tamanho do Arquivo" do Documento da Proposta com o valor 1000
    



    cy.get('[data-cy="documentos-pessoais"]').click(); //Clica na aba Documentos Pessoais para seguir para a página de Documentos Pessoais
    
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento Pessoal
    cy.get('[data-testId="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Documento Pessoal
    cy.get('[data-cy="rg"]').click();//Seleciona a opção "RG" no campo de seleção de Documento Pessoal
    cy.get('[data-cy="documentoPessoalEdital.0.obrigatorio"]').click(); //Marca a opção "Obrigatório" do Documento Pessoal
    
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento Pessoal
    cy.get(':nth-child(2) > .MuiGrid-grid-xs-10 > .css-v3z1wi > .array-item-container > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Documento Pessoal
    cy.get('[data-cy="cpf"]').click(); //Seleciona a opção "CPF" no campo de seleção de Documento Pessoal
    cy.get('[data-cy="documentoPessoalEdital.1.obrigatorio"]').click(); //Marca a opção "Obrigatório" do Documento Pessoal
    
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento Pessoal
    cy.get(':nth-child(3) > .MuiGrid-grid-xs-10 > .css-v3z1wi > .array-item-container > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Documento Pessoal
    cy.get('[data-cy="titulo-de-eleito"]').click(); //Seleciona a opção "Título de Eleitor" no campo de seleção de Documento Pessoal
    cy.get('[data-cy="documentoPessoalEdital.2.obrigatorio"]').click(); //Marca a opção "Obrigatório" do Documento Pessoal
 /*   
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento Pessoal
    cy.get(':nth-child(4) > .MuiGrid-grid-xs-10 > .css-v3z1wi > .array-item-container > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Documento Pessoal
    cy.get('#mui-202-option-1').click(); //Seleciona a opção "Certidão de Nascimento" no campo de seleção de Documento Pessoal
*/
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); //Clica no botão "Adicionar" para criar um novo Documento Pessoal
    cy.get(':nth-child(5) > .MuiGrid-grid-xs-10 > .css-v3z1wi > .array-item-container > .MuiGrid-container > :nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Documento Pessoal
    cy.get('[data-cy="comprovante-de-r"]').click(); //Seleciona a opção "Comprovante de Residência" no campo de seleção de Documento Pessoal
    cy.get('[data-cy="documentoPessoalEdital.4.obrigatorio"]').click(); //Marca a opção "Obrigatório" do Documento Pessoal
    

    //Fim de Documentos 
  
   
   
    //Perguntas

    cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas
    cy.get('[data-cy="descricao-do-projeto"]').click(); //Clica na opção "Descrição do Projeto" para selecionar a Pergunta "Descrição do Projeto"
   
    cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta
    cy.get('.MuiAccordionSummary-expandIconWrapper>[data-testid="ExpandMoreIcon"]').click(); //Clica no campo de seleção de Pergunta
    cy.get('[data-cy="pergunta.0.pergunta"]').type(
      'Pergunta 1 - Grupo-12 E.C. 012/2025 Eduã - Emerson', 
      { delay: 0 },
    ); //Preenche o campo "Pergunta" da Pergunta
    cy.get('[data-cy="pergunta.0.tipoResposta"]').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click(); //Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="pergunta.0.obrigatoria"]').click(); //Marca a opção "Obrigatória" do Pergunta
    cy.get('[data-cy="pergunta.0.descritiva.tipoRestricao"]').click(); //Clica no campo de seleção de Tipo de Restrição
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Tipo de Restrição
 

    cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta
    cy.get('[data-cy="pergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"] > path',).click({force: true}); //Clica no campo de seleção de Pergunta
    cy.get('[data-cy="pergunta.1.pergunta"]').type(
      'Pergunta 2 - Grupo-12 E.C. 012/2025 Eduã - Emerson', 
      { delay: 0 },
    ); //Preenche o campo "Pergunta" da Pergunta
    cy.get('[data-cy="pergunta.1.tipoResposta"]').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click(); //Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="pergunta.1.obrigatoria"]').click(); //Marca a opção "Obrigatória" do Pergunta
    cy.get('[data-cy="pergunta.1.descritiva.tipoRestricao"]').click(); //Clica no campo de seleção de Tipo de Restrição
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Tipo de Restrição

    cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta
    cy.get('[data-cy="pergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"] > path',).click({force: true}); //Clica no campo de seleção de Pergunta 
    cy.get('[data-cy="pergunta.2.pergunta"]').type(
      'Pergunta 3 - Grupo-12 E.C. 012/2025 Eduã - Emerson', 
      { delay: 0 },
    ); //Preenche o campo "Pergunta" da Pergunta
    cy.get('[data-cy="pergunta.2.tipoResposta"]').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click(); //Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="pergunta.2.obrigatoria"]').click(); //Marca a opção "Obrigatória" do Pergunta
    cy.get('[data-cy="pergunta.2.descritiva.tipoRestricao"]').click(); //Clica no campo de seleção de Tipo de Restrição
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Tipo de Restrição

    cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta
    cy.get('[data-cy="pergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"] > path',).click({force: true}); //Clica no campo de seleção de Pergunta
    cy.get('[data-cy="pergunta.3.pergunta"]').type(
      'Pergunta 4 - Grupo-12 E.C. 012/2025 Eduã - Emerson', 
      { delay: 0 },
    ); //Preenche o campo "Pergunta" da Pergunta
    cy.get('[data-cy="pergunta.3.tipoResposta"]').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click(); //Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="pergunta.3.obrigatoria"]').click(); //Marca a opção "Obrigatória" do Pergunta
    cy.get('[data-cy="pergunta.3.descritiva.tipoRestricao"]').click(); //Clica no campo de seleção de Tipo de Restrição
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Tipo de Restrição
    
    cy.get('[data-cy="pergunta-adicionar"]').click(); //Clica no botão "Adicionar" para criar uma nova Pergunta
    cy.get('[data-cy="pergunta--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper > [data-testid="ExpandMoreIcon"] > path',).click({force: true}); //Clica no campo de seleção de Pergunta
    cy.get('[data-cy="pergunta.4.pergunta"]').type(
      'Pergunta 5 - Grupo-12 E.C. 012/2025 Eduã - Emerson', 
      { delay: 0 },
    ); //Preenche o campo "Pergunta" da Pergunta
    cy.get('[data-cy="pergunta.4.tipoResposta"]').click(); //Clica no campo de seleção de Tipo de Resposta
    cy.get('[data-cy="descritiva"]').click(); //Seleciona a opção "Descritiva" no campo de seleção de Tipo de Resposta  
    cy.get('[data-cy="pergunta.4.obrigatoria"]').click(); //Marca a opção "Obrigatória" do Pergunta
    cy.get('[data-cy="pergunta.4.descritiva.tipoRestricao"]').click(); //Clica no campo de seleção de Tipo de Restrição
    cy.get('[data-cy="sem-limitacao"]').click(); //Seleciona a opção "Sem Limitação" no campo de seleção de Tipo de Restrição

    //Fim de Perguntas

    //Indicadores de Produção
 
      
    cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica na aba Indicadores de Produção para seguir para a página de Indicadores de Produção
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
    cy.get('[data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('[data-cy="indicador-de-pro"]').click(); //Seleciona o Indicador de Produção "Número de artigos publicados em periódicos indexados"
    cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
    cy.get('[data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('[data-cy="producao-bibliog"]').click(); //Seleciona o Indicador de Produção "Produção Bibliográfica"
    cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
    cy.get('[data-testid="ArrowDropDownIcon"]').click(); //Clica no campo de seleção de Indicador de Produção
    cy.get('[data-cy="producao-tecnica"]').click(); //Seleciona o Indicador de Produção "Produção Técnica"
    cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção

   // Fim de Indicadores de Produção

 
    //bolsa edital

    cy.get('[data-cy="bolsas-do-edital"]').click(); //Clica na aba Bolsas do Edital para seguir para a página de Bolsas do Edital
    cy.get('[data-cy="bolsas"]').click(); //Clica na opção Bolsas para selecionar a aba Bolsas do Edital

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="dti-cn-pq"]').click(); //Seleciona a opção "DTI - CN - PQ" no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="a-0-h-r-880-00"]').click(); //Seleciona a opção "A 0 H R 880,00" no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').click(); //Marca a opção "Possui Quantidade de Bolsa por Proposta" da Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').type('10', { delay: 0 }); //Preenche o campo "Quantidade de Bolsa por Proposta" da Bolsa do Edital com o valor 10
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Bolsa do Edital

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="dti-cn-pq"]').click(); //Seleciona a opção "DTI - CN - PQ" no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="b-0-h-r-670-00"]').click(); //Seleciona a opção "B 0 H R 670,00" no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').click(); //Marca a opção "Possui Quantidade de Bolsa por Proposta" da Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').type('8', { delay: 0 }); //Preenche o campo "Quantidade de Bolsa por Proposta" da Bolsa do Edital com o valor 8
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Bolsa do Edital
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="dti-cn-pq"]').click(); //Seleciona a opção "DTI - CN - PQ" no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="c-0-h-r-240-00"]').click();//Seleciona a opção "C 0 H R 240,00" no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').click(); //Marca a opção "Possui Quantidade de Bolsa por Proposta" da Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').type('6', { delay: 0 }); //Preenche o campo "Quantidade de Bolsa por Proposta" da Bolsa do Edital com o valor 6
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Bolsa do Edital
    
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="dct"]').click();//Seleciona a opção "DCT" no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="i-0-h-r-4-484-00"]').click();//Seleciona a opção "I 0 H R 4.484,00" no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').click(); //Marca a opção "Possui Quantidade de Bolsa por Proposta" da Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').type('4', { delay: 0 }); //Preenche o campo "Quantidade de Bolsa por Proposta" da Bolsa do Edital com o valor 4
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Bolsa do Edital

    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar uma nova Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click(); //Clica no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="dct"]').click();//Seleciona a opção "DCT" no campo de seleção de Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click(); //Clica no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="ii-0-h-r-5-220-0"]').click(); //Seleciona a opção "II 0 H R 5.220,00" no campo de seleção de Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').click(); //Marca a opção "Possui Quantidade de Bolsa por Proposta" da Bolsa do Edital
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').type('2', { delay: 0 }); //Preenche o campo "Quantidade de Bolsa por Proposta" da Bolsa do Edital com o valor 2
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações da Bolsa do Edital
    
    //Fim de Bolsa edital

    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital
    
    

    //Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
  });

});
