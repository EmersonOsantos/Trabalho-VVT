import { cli } from 'cypress';
import { getCurrentDateTime } from '../helpers/date.helper';
import 'cypress-real-events';

//chmod +x node_modules/.bin/cypress  // Torna o comando cypress executável
// npx cypress open  // Abre a interface gráfica do Cypress

//CT-EC-01 - Criação de Edital Completo

describe('Criação de Edital Completo - Grupo 12', () => {
  beforeEach(() => {
    
    // CT-EC-01 Passos 1 e 2
    cy.typelogin(
      'https://novo-sig.ledes.net/login',
      'grupo12_gestor@sig.com',
      'Grupo12@sig'
    );
  });

  it.only('Cria um edital completo conforme orientações da atividade 2', () => {
    // CT-EC-01 Passos 3 e 4
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // CT-EC-01 Passo 5
    cy.get('[data-cy="nome"]').type('Grupo-12 E.C. 001/2025 Eduã-Emerson', { delay: 0 },);

    // CT-EC-01 Passo 6
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('10');
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // CT-EC-01 Passo 7
    cy.contains('Próximo').click();
    cy.get('[data-cy="termoDeAceite"]').then(el => {
      const editor = (el[0] as any).ckeditorInstance; 
      editor.setData('Termo de Aceite Grupo-12 E.C. 001/2025 Eduã - Emerson');
    });

    // CT-EC-01 Passo 8
    cy.contains('Próximo').click();
    cy.get('[data-cy="texto"]').then(el => {
      const editor = (el[0] as any).ckeditorInstance; 
      editor.setData('Texto do Edital Grupo-12 E.C. 012/2025 Eduã - Emerson');
    });

    //CT-EC-01 Passo 9
    cy.contains('Próximo').click();
    cy.get('[data-cy="abrangencia"]').click();
    cy.get('[data-cy="estado-todos"]').click();

    // CT-EC-01 Passo 10
    cy.contains('Próximo').click();
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy-index="perguntaInfoId-item-0"]').click();
    cy.wait(100); 
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy-index="perguntaInfoId-item-1"]').click();
    cy.wait(100); 
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy-index="perguntaInfoId-item-2"]').click();
    cy.wait(100); 
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy-index="perguntaInfoId-item-3"]').click();
    cy.wait(100); 
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy-index="perguntaInfoId-item-4"]').click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // CT-EC-01 Passo 11
    cy.get('[data-cy="cronograma"]').click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 }));
    cy.get('[data-cy="chamada-confirmar"]').click();

    // CT-EC-01 Passo 12
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.wait(100); 
    cy.get('[data-cy-index="programaId-item-0"]').click();

     // Rubricas
    cy.get('[data-cy="rubricas"]').click();
    const rubricas = [
    'diarias',
    'hospedagem-e-ali',
    'servicos-de-terc',
    'material-de-cons',
    'material-permane',
    'passagens',
    'pessoal',
    'encargos',
    'bolsa'
     ];

    rubricas.forEach((id) => {
        cy.get('[data-cy="add-button"]').click();
        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
        cy.get(`[data-cy="${id}"]`).click();
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
        cy.get('[data-cy="custeio"]').click();
        cy.get('[data-cy="editalRubrica-confirmar"]').click();
      });

    // Faixas de Financiamento
    cy.get('[data-cy="faixas-de-financiamento"]').click();

    let valorMinimo = 1000;
    let incremento = 1000;

    for (let i = 0; i < 5; i++) {
      const valorMaximo = valorMinimo + incremento;

      cy.get('[data-cy="add-button"]').click();
      cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(`Faixa ${i + 1}`, { delay: 0 });
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').clear().type(`${valorMinimo}`);
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').clear().type(`${valorMaximo}`);
      cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();

      valorMinimo = valorMaximo + 1;
    }


    // CT-EC-01 Passo 13
    cy.contains('Próximo').click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
    cy.get('.MuiGrid-grid-xs-7 > .MuiGrid-container').eq(0).click();
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type('Plano de Trabalho');
    cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click();
    cy.get('[data-cy="pdf"]').click();
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type('10', { delay: 0 },);
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
    cy.get('.MuiGrid-grid-xs-7 > .MuiGrid-container').eq(1).click();
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]').type('Currículo Lattes');
    cy.get('[data-cy="documentoPropostaEdital.1.formatoArquivo"]').click();
    cy.get('[data-cy="pdf"]').click();
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').type('5', { delay: 0 },);
    cy.get('[data-cy=next-button]').click();

    // Documentos Pessoais
    const documentosPessoais = [
      'cpf',
      'rg',
      'comprovante-de-r',
      'titulo-de-eleito',
      'passaporte'
    ];

    cy.get('[data-cy="documentos-pessoais"]').click();

    documentosPessoais.forEach((docId, i) => {
      cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
      cy.get(`[data-cy="documentoPessoalEdital.${i}.documentoPessoalId"]`).click();
      cy.get(`[data-cy="${docId}"]`).click();
    });


    //CT-EC-01 Passo 14
    cy.get('[data-cy=next-button]').click();

    const perguntasDescProjeto = [
      'o-estado-da-arte',
      'impactos-esperad',
      'riscos-e-ativida',
      'referencia-bibli',
      'metodos-e-materi'
    ];

    perguntasDescProjeto.forEach((id) => {
      // Abre o seletor de perguntas
      cy.wait(100);
      cy.get('[data-cy="perguntaDescId"]').click();
      cy.wait(100);
      // Seleciona uma pergunta diferente
      cy.get(`[data-cy="${id}"]`).first().click();
      cy.wait(100);
      cy.get('[data-cy="pergunta-adicionar"]').click();

      cy.wait(200);
    });


    // Indicadores de Produção
    cy.get('[data-cy="indicadores-de-producao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="producao-cultura"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="indicador-de-pro"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="teste"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    // CT-EC-01 Passo 15
    const bolsas = [
      { modalidade: 'at', nivel: 'nm-r-560-00' },
      { modalidade: 'dct', nivel: 'i-0-h-r-4-484-00' },
      { modalidade: 'dti-cn-pq', nivel: 'a-0-h-r-880-00' },
      { modalidade: 'exp', nivel: 'a-r-5-200-00' },
      { modalidade: 'set', nivel: 'a-0-h-1-180-00' }
    ];

    cy.get('[data-cy="next-button"]').click();

    bolsas.forEach(({ modalidade, nivel }) => {
      cy.get('[data-cy="add-button"]').click();

      // Seleciona a modalidade
      cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
      cy.get(`[data-cy="${modalidade}"]`).click();

      // Seleciona o nível correspondente
      cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
      cy.get(`[data-cy="${nivel}"]`).click();

      // Confirma
      cy.get('[data-cy="bolsaEdital-confirmar"]').click();
    });

    // CT-EC-01 Passo 16 e 17
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();
  });
});
