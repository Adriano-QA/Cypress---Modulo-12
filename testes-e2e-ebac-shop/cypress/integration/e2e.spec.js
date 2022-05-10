/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereço.page'
const perfil = require('../fixtures/perfil.json')
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        var quantidade = 3
        cy.visit('produtos/')
        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.button-variable-item-S').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Argus All-Weather Tank” foram adicionados no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('.woocommerce-info > .showlogin').click()
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-button').click()
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[0].nome,
            dadosEndereco[0].sobrenome,
            dadosEndereco[0].empresa,
            dadosEndereco[0].pais,
            dadosEndereco[0].endereco,
            dadosEndereco[0].numero,
            dadosEndereco[0].cidade,
            dadosEndereco[0].estado,
            dadosEndereco[0].cep,
            dadosEndereco[0].telefone,
            dadosEndereco[0].email)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
    });


})