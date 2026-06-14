/* ================================================
   ABOUT.JS — Lógica / Orquestrador da Página Sobre Nós
   ================================================ */

import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
import { aboutComponent } from "./components/aboutComponent.js";
import { getAboutImages } from "./services/aboutService.js"; // Importa a camada de dados
import { showToast } from "../../shared/components/toast/toastComponent.js"; // Importa a função de toast para feedback ao usuário

/* Inicializa a página injetando os componentes globais e dados */
function inicializarAbout() {
  var navbarEl = document.getElementById("navbar");
  var contentEl = document.getElementById("content");
  var footerEl = document.getElementById("footer");

  if (navbarEl) {
    navbarEl.innerHTML = navbarComponent();
  }

  if (contentEl) {
    // CORREÇÃO: Orquestrador busca os dados na service e alimenta o componente puro
    var dadosImagensConfiguradas = getAboutImages();
    contentEl.innerHTML = aboutComponent(dadosImagensConfiguradas);
  }

  if (footerEl) {
    footerEl.innerHTML = footerComponent();
  }

  initNavbar();
  configurarFormularioContato();
}

/* Configura o evento de submit do formulário de contato */
function configurarFormularioContato() {
  var formContato = document.getElementById("form-contato");

  if (formContato) {
    formContato.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o recarregamento da página

      // Exibe uma mensagem de sucesso para o usuário
      showToast("Mensagem enviada com sucesso! Retornaremos em breve.", 4000); // Duração de 4 segundos

      // Limpa os campos do formulário
      formContato.reset();
    });
  }
}

// Executa a inicialização ao carregar o arquivo
inicializarAbout();