/* =========================================================
   CATEGORIES.JS — Página de Listagem de Categorias (Catálogo)
   
   Este arquivo monta a página de exibição e filtragem de 
   categorias para o catálogo público. Toda a manipulação de 
   CRUD foi movida para o admin e a interface agora consome
   o ecossistema genérico de Form.
   ========================================================= */

import { getCategories } from "./services/categoryService.js";
import { navbarComponent } from "../../shared/components/navbar/navbarComponent.js";
import { footerComponent } from "../../shared/components/footer/footerComponent.js";
import { initNavbar } from "../../shared/components/navbar/navbarController.js";
// Integração com o motor genérico de formulários do sistema
import { Form } from "../../shared/components/Form/Form.js";

/* --------------------------------------------------
   PARTE 1: MONTAR NAVBAR E FOOTER
   -------------------------------------------------- */
document.getElementById("navbar").innerHTML = navbarComponent();
document.getElementById("footer").innerHTML = footerComponent();

/* --------------------------------------------------
   PARTE 2: BUSCAR CATEGORIAS E EXIBIR NO CATÁLOGO
   -------------------------------------------------- */

/* Monta o HTML de cada categoria para exibição limpa na tela */
function exibirCategorias(termoBusca) {
  if (termoBusca === undefined) {
    termoBusca = "";
  }

  var categorias = getCategories();
  var container = document.getElementById("categories-container");

  if (!container) {
    return;
  }

  // Limpa o grid de renderização anterior
  container.innerHTML = "";

  var termoMinusculo = termoBusca.toLowerCase();

  // Percorre o array usando o laço de repetição tradicional for
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var nomeMinusculo = cat.nome.toLowerCase();

    // Filtra pelo termo de busca digitado ou selecionado
    if (nomeMinusculo.indexOf(termoMinusculo) === -1) {
      continue;
    }

    // Concatena o card representacional limpo
    container.innerHTML = container.innerHTML +
      '<article class="category-card">' +
      '<img src="' + cat.imagem + '" alt="' + cat.nome + '">' +
      '<div class="category-content">' +
      '<h3>' + cat.nome + '</h3>' +
      '<p>' + cat.descricao + '</p>' +
      '</div>' +
      '</article>';
  }
}

// Inicializa a renderização dos cards na tela
exibirCategorias();

/* --------------------------------------------------
   PARTE 3: GERENCIAMENTO DE FILTROS (DROPDOWN)
   -------------------------------------------------- */

/* Monta o HTML do dropdown de filtro de categorias utilizando o Form genérico */
function carregarFiltroDropdown() {
  var containerOpcoes = document.getElementById("filter-dropdown-list");
  var header = document.getElementById("filter-dropdown-header");
  var categorias = getCategories();

  if (!containerOpcoes || !header) return;

  containerOpcoes.innerHTML = "";

  // 1. Opção Padrão (Todas) injetada a partir do componente purificado Form.Radio
  containerOpcoes.innerHTML = containerOpcoes.innerHTML +
    Form.Radio({
      name: "filterCategoryRadio",
      value: "",
      label: "Todas as categorias",
      checked: true
    });

  // 2. Renderização das categorias dinâmicas mapeadas com o laço for e o componente Form.Radio
  for (var i = 0; i < categorias.length; i++) {
    containerOpcoes.innerHTML = containerOpcoes.innerHTML +
      Form.Radio({
        name: "filterCategoryRadio",
        value: categorias[i].nome,
        label: categorias[i].nome,
        checked: false
      });
  }

  header.addEventListener("click", function () {
    containerOpcoes.classList.toggle("show");
  });

  // 3. Captura reativa de mudanças nos controles de rádio
  var radios = document.getElementsByName("filterCategoryRadio");
  for (var j = 0; j < radios.length; j++) {
    radios[j].addEventListener("change", function () {
      // Ajuste de Resiliência: Como o componente genérico encapsula o texto dentro de um <span>,
      // acessamos a propriedade de texto do elemento irmão de forma limpa e performática.
      var nomeSelecionado = this.nextElementSibling ? this.nextElementSibling.textContent : this.value;
      var valorFiltro = this.value;

      header.innerHTML = nomeSelecionado + " ▼";
      containerOpcoes.classList.remove("show");

      exibirCategorias(valorFiltro);
    });
  }
}

// Ativa as configurações finais da página
carregarFiltroDropdown();
initNavbar();