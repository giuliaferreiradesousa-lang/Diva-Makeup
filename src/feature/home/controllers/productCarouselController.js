import { productCarouselCardsComponent } from "../components/productCarouselComponent.js";
import { filtrarProdutosPorCategoria } from "../services/productCarouselService.js";

export function atualizarCarrosselProdutos(section, todosProdutos, categoria) {
  var track = section.querySelector(".products-carousel-track");
  var mensagemVazia = section.querySelector(".products-carousel-empty");
  var filtros = section.querySelectorAll(".product-filter");
  var produtosFiltrados = filtrarProdutosPorCategoria(todosProdutos, categoria);

  track.innerHTML = productCarouselCardsComponent(produtosFiltrados);
  track.scrollLeft = 0;
  mensagemVazia.hidden = produtosFiltrados.length > 0;

  for (var i = 0; i < filtros.length; i++) {
    var estaAtivo = filtros[i].dataset.category === categoria;
    filtros[i].classList.toggle("active", estaAtivo);
    filtros[i].setAttribute("aria-pressed", String(estaAtivo));
  }

  return produtosFiltrados;
}

export function moverCarrosselProdutos(track, direcao) {
  if (!track || typeof track.scrollBy !== "function") {
    return false;
  }

  var distancia = Math.max(track.clientWidth * 0.85, 280);
  track.scrollBy({
    left: direcao < 0 ? -distancia : distancia,
    behavior: "smooth"
  });

  return true;
}

export function iniciarCarrosselProdutos(todosProdutos, root) {
  var documentRoot = root || document;
  var section = documentRoot.querySelector(".product-carousel-section");

  if (!section) {
    return false;
  }

  section.addEventListener("click", function(evento) {
    var filtro = evento.target.closest(".product-filter");
    var controle = evento.target.closest(".products-carousel-btn");

    if (filtro) {
      atualizarCarrosselProdutos(section, todosProdutos, filtro.dataset.category);
      return;
    }

    if (controle) {
      var track = section.querySelector(".products-carousel-track");
      moverCarrosselProdutos(track, Number(controle.dataset.carouselDirection));
    }
  });

  return true;
}
