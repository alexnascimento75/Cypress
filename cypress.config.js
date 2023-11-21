const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,  // Altura da tela com 1080 px
    viewportWidth:  1980,  // Altura da tela com 1980 px
    baseUrl:'https://blazedemo.com', // Endereço do Objeto de Teste
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
