// **** command + D seleciona varias linhas e pode alterar todas ao mesmo tempo

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
    /*executar todas as vezes e não preisar repetir*/
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    /*should executa em até 4 segundos outro exemplo 'not.be.equal',*/
  })

  it('preenche os campos obrigatorios e envia o formulário', () => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) //criado um texto que irá repetir 10 vezes

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira Campos')
    cy.get('#email').type('faelpetra@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 }) //chamou a variavel, outra forma-> cy.get('#open-text-area').type('Obrigado!')
    cy.contains('button', 'Enviar').click() //cy.get('button[type="submit"]').click() 
    /*inspeciona elemento para garantir o botão*/

    cy.get('.success').should('be.visible') //Teste de comentário
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira Campos')
    cy.get('#email').type('faelpetra@gmail,com') //coloquei virgula para validar
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()//cy.get('button[type="submit"]').click() 
    /*inspeciona elemento para garantir o botão*/

    cy.get('.error').should('be.visible') //Teste para exibir mensagem de erro
  })

  it('campo telefone continua vazio quando preenchido com um valor não numerico', () => {
    cy.get('#phone')
      .type('abcde') //tentei digitar letra mas não aceita
      .should('have.value', '') //validou que está vazio

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira Campos')
    cy.get('#email').type('faelpetra@gmail.com') //coloquei virgula para validar
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check() //marcou o checkbox telefone que tornou ele obrigatorio  cy.get('#phone-checkbox').click() 
    cy.contains('button', 'Enviar').click()//cy.get('button[type="submit"]').click() 
    /*inspeciona elemento para garantir o botão*/

    cy.get('.error').should('be.visible') //Teste para exibir mensagem de erro
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {


    cy.get('#firstName')
      .type('Rafael')
      .should('have.value', 'Rafael')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Oliveira Campos')
      .should('have.value', 'Oliveira Campos')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('faelpetra@gmail.com')
      .should('have.value', 'faelpetra@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('99999999999')
      .should('have.value', '99999999999')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains('button', 'Enviar').click()//cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible') //Teste para exibir mensagem de erro

  })

  it('envia o formulario com sucesso usando um comando customizado', () => {

    const data = {       //criando uma variavel para receber os valores e passar para o comando em commands.js
      fisrtName: 'Rafael',
      lastName: 'Oliveira Campos',
      email: 'faelpetra@gmail.com',
      text: 'Teste.'

    }

    cy.fillMandatoryFieldsAndSubmit(data) // cy.fillMandatoryFieldsAndSubmit()  
    /*cria em commands.js o comando customizado 
    importa no e2e.js para ser visivel o comando
    */
    cy.get('.success').should('be.visible') //Teste de comentário
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') // Pelo texto começa em Maiusculo
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product') //# identifica pelo ID
      .select('mentoria') // minusculo pega pelo value
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product') //# identifica pelo ID
      .select(1) // Blog é o indice 1 o zero é o selecione
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      // pelo seletor do cypress veio cy.get(':nth-child(4) > input') e não é legal ser por ele
      // indo pelo especionar do navegador
      .check()
      .should('be.checked') // .should('not.be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]') // lista com os 3 elementos
      .each(typeOfService => { //um por vez, cada elemento do array
        cy.wrap(typeOfService) //empacotar o elemento de um por um do array e executa 1 por vez
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check() // pegou um seletor CSS mais genérico e marcou os 2
      .should('be.checked')
      .last() //pegando somente o último
      .uncheck()
      .should('not.be.checked') // deu certo porque eu pedi o last que selecionou o ultimo
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        //console.log(input) //procurando no console do Cypress
        // console.log (input[0].files[0].name) //apresentou o resultado
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      //drag-drop simula um usuário arrastando o arquivo para ser feito o upload
      .should(input => {
        //console.log(input) //procurando no console do Cypress
        // console.log (input[0].files[0].name) //apresentou o resultado
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') // fixture é a pasta e depois dá um nome alias
    cy.get('#file-upload')
      .selectFile('@sampleFile', { action: 'drag-drop' })  // @ para chamar o nome do alias
      //drag-drop simula um usuário arrastando o arquivo para ser feito o upload
      .should(input => {
        //console.log(input) //procurando no console do Cypress
        // console.log (input[0].files[0].name) //apresentou o resultado
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      //utilizando assim ele busca a tag e o titulo para ser mais assertivo
      .should('have.attr', 'href', 'privacy.html') //verifica que abriu esse html
      .and('have.attr', 'target', '_blank') //por padrão navegadores abrem em nova aba, teste para abrir em nova aba


  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target') //remove para acessar na mesma página e não abrir em outra ABA
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })





})






















/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
*/