
describe('Buscar por voos',() => {  // Inicio describe

context(' Não logado', () => { // Inicio context

    // Importar a massa de teste
    const massaVoos = require('../../fixtures/massaVoos')
    
    beforeEach(() => { // Inicio before

        cy.visit('/') // Abre o navegadorda urlBase

    }) // Final before

    // Primeiro Teste 

    it('Buscar voos entre São Paolo e Cairo', () => {
        // Veja se o título da guia/aba é igual a 'BlazeDemo'
        cy.title().should('eq','BlazeDemo')

        // Seleciona o combo Origem pelo CssSelector
        // Identificando que deve ser o primeiro (0)
        // Selecionando a opção 'São Paolo'
        cy.get('select.form-inline') 
            .eq(0)
            .select('São Paolo')

        cy.get('select.form-inline') 
            .eq(1)
            .select('Cairo')

        // Clicar no botão Find Flights / Procurar voos
        cy.get('.btn.btn-primary')
            .click()
        // Transição para a segunda página Reserve
        // Validar o título da aba / guia
        cy.title().should('eq', 'BlazeDemo - reserve')

        // Validar o cabeçalho da página
        cy.get('.container h3')
            .should('have.text', 'Flights from São Paolo to Cairo: ')

            // Clicar no botão do primeiro vôo
            cy.get('input.btn.btn-small')
            .eq(0)
            .click()

        // Transição para a página  Purchase

        // Validar o título da aba / guia
            cy.title().should('eq', 'BlazeDemo Purchase')
            
        // Escrever o primeiro nome
            cy.get('#inputName').type('Max')

        // Selecionar a bandeira do cartão
            cy.get('#cardType')
            .select('American Express')

        // Marcar o checkbox Remember Me
            cy.get('#rememberMe')
            .check()

        // Clicar no botão Purchase Flight
            cy.get('.btn.btn-primary').click()

        // Transição para a página

        // Validar o título da aba / guia
            cy.title().should('eq','BlazeDemo Confirmation')

        // Validar a mensagem de agradecimento
            cy.get('.container h1')
                .should('have.text', 'Thank you for your purchase today!')

        // Validar o preço
            cy.get('.table').contains('td', 'Amount')
                .siblings()
                .should('contain', '555 USD')


        });

        // Segundo Teste
        // Teste Data Driven (usando massa de teste)
        massaVoos.array.forEach(({origem, destino, voo, nome, bandeira}) => {

            it(`Buscar voos entre ${origem} e ${destino} - Data Sriven`, () => {
        // Veja se o título da guia/aba é igual a 'BlazeDemo'
                cy.title().should('eq','BlazeDemo')

        // Seleciona o combo Origem pelo CssSelector
        // Identificando que deve ser o primeiro (0)
        // Selecionando a opção 'via massa de teste'
                cy.get('select.form-inline') 
                    .eq(0)
                    .select(origem)

                cy.get('select.form-inline') 
                    .eq(1)
                    .select(destino)

        // Clicar no botão Find Flights / Procurar voos
                cy.get('.btn.btn-primary')
                    .click()
        // Transição para a segunda página Reserve
        // Validar o título da aba / guia
                cy.title().should('eq', 'BlazeDemo - reserve')

        // Validar o cabeçalho da página
                cy.get('.container h3')
                    .should('have.text', `Flights from ${origem} to ${destino}: `)

        // Clicar no botão relativo ao vôo
            cy.get('input.btn.btn-small')
            .eq(voo)
            .click()

        // Transição para a página  Purchase

        // Validar o título da aba / guia
            cy.title().should('eq', 'BlazeDemo Purchase')
            
        // Escrever o primeiro nome
            cy.get('#inputName').type(nome)

        // Selecionar a bandeira do cartão
            cy.get('#cardType')
            .select(bandeira)

        // Marcar o checkbox Remember Me
            cy.get('#rememberMe')
            .check()

        // Clicar no botão Purchase Flight
            cy.get('.btn.btn-primary').click()

        // Transição para a página

        // Validar o título da aba / guia
            cy.title().should('eq','BlazeDemo Confirmation')

        // Validar a mensagem de agradecimento
            cy.get('.container h1')
                .should('have.text', 'Thank you for your purchase today!')

        // Validar o preço
            cy.get('.table').contains('td', 'Amount')
                .siblings()
                .should('contain', '555 USD')


            }) // Final do teste / it
            
        });  // Final do ForEach

    }); // Final context

    })  // Final describe