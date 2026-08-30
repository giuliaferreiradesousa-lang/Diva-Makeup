import test from "node:test";
import assert from "node:assert/strict";

import {
  atualizarCarrosselProdutos,
  moverCarrosselProdutos,
  iniciarCarrosselProdutos
} from "../src/feature/home/controllers/productCarouselController.js";

function criarBotaoFiltro(categoria) {
  var classes = new Set(["product-filter"]);
  var atributos = {};

  return {
    dataset: { category: categoria },
    classList: {
      toggle: function(classe, ativo) {
        if (ativo) classes.add(classe);
        else classes.delete(classe);
      },
      contains: function(classe) { return classes.has(classe); }
    },
    setAttribute: function(nome, valor) { atributos[nome] = valor; },
    getAttribute: function(nome) { return atributos[nome]; }
  };
}

function criarSection() {
  var track = {
    innerHTML: "",
    scrollLeft: 100,
    clientWidth: 500,
    chamadasScroll: [],
    scrollBy: function(opcoes) { this.chamadasScroll.push(opcoes); }
  };
  var mensagem = { hidden: true };
  var filtros = [criarBotaoFiltro("Todos"), criarBotaoFiltro("Skincare"), criarBotaoFiltro("Cabelo")];
  var listener = null;

  return {
    track: track,
    mensagem: mensagem,
    filtros: filtros,
    querySelector: function(seletor) {
      if (seletor === ".products-carousel-track") return track;
      if (seletor === ".products-carousel-empty") return mensagem;
      return null;
    },
    querySelectorAll: function(seletor) {
      return seletor === ".product-filter" ? filtros : [];
    },
    addEventListener: function(tipo, callback) {
      if (tipo === "click") listener = callback;
    },
    dispararClique: function(alvo) { listener({ target: alvo }); }
  };
}

test("atualiza cards, estado vazio e filtro ativo", function() {
  var section = criarSection();
  var produtos = [
    { id: 1, nome: "A", preco: 10, categoria: "Skincare" },
    { id: 2, nome: "B", preco: 20, categoria: "Cabelo" }
  ];

  var resultado = atualizarCarrosselProdutos(section, produtos, "Skincare");

  assert.equal(resultado.length, 1);
  assert.match(section.track.innerHTML, /data-product-id="1"/);
  assert.doesNotMatch(section.track.innerHTML, /data-product-id="2"/);
  assert.equal(section.track.scrollLeft, 0);
  assert.equal(section.mensagem.hidden, true);
  assert.equal(section.filtros[1].classList.contains("active"), true);
  assert.equal(section.filtros[1].getAttribute("aria-pressed"), "true");

  atualizarCarrosselProdutos(section, produtos, "Maquiagem");
  assert.equal(section.mensagem.hidden, false);
  assert.equal(section.track.innerHTML, "");
});

test("move o carrossel suavemente nas duas direções", function() {
  var section = criarSection();

  assert.equal(moverCarrosselProdutos(section.track, 1), true);
  assert.deepEqual(section.track.chamadasScroll[0], { left: 425, behavior: "smooth" });

  moverCarrosselProdutos(section.track, -1);
  assert.deepEqual(section.track.chamadasScroll[1], { left: -425, behavior: "smooth" });
  assert.equal(moverCarrosselProdutos(null, 1), false);
});

test("inicializa os eventos de filtro e navegação da tela", function() {
  var section = criarSection();
  var produtos = [
    { id: 1, nome: "A", preco: 10, categoria: "Skincare" },
    { id: 2, nome: "B", preco: 20, categoria: "Cabelo" }
  ];
  var root = { querySelector: function() { return section; } };

  assert.equal(iniciarCarrosselProdutos(produtos, root), true);

  section.dispararClique({
    closest: function(seletor) {
      return seletor === ".product-filter" ? section.filtros[1] : null;
    }
  });
  assert.match(section.track.innerHTML, /data-product-id="1"/);

  var controle = { dataset: { carouselDirection: "1" } };
  section.dispararClique({
    closest: function(seletor) {
      return seletor === ".products-carousel-btn" ? controle : null;
    }
  });
  assert.equal(section.track.chamadasScroll.length, 1);

  assert.equal(iniciarCarrosselProdutos(produtos, { querySelector: function() { return null; } }), false);
});
