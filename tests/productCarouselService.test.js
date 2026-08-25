import test from "node:test";
import assert from "node:assert/strict";

import {
  categoriasFixas,
  produtosFixos,
  getTodosProdutos,
  filtrarProdutosPorCategoria
} from "../src/feature/home/services/productCarouselService.js";

test("expõe exatamente as três categorias fixas solicitadas", function() {
  assert.deepEqual(categoriasFixas, [
    { id: 1, nome: "Skincare", icone: "✨", fixo: true },
    { id: 2, nome: "Maquiagem", icone: "💄", fixo: true },
    { id: 3, nome: "Cabelo", icone: "💁‍♀️", fixo: true }
  ]);
});

test("expõe exatamente os cinco produtos fixos solicitados", function() {
  assert.equal(produtosFixos.length, 5);
  assert.deepEqual(produtosFixos.map(function(produto) { return produto.id; }), [101, 102, 103, 104, 105]);
  assert.ok(produtosFixos.every(function(produto) { return produto.fixo === true; }));
});

test("une produtos fixos aos produtos da chave produtos sem gravar no localStorage", function() {
  var produtoSalvo = { id: 999, nome: "Produto salvo", categoria: "Cabelo", preco: "10.00" };
  var valorOriginal = JSON.stringify([produtoSalvo]);
  var leituras = [];
  var storage = {
    getItem: function(chave) {
      leituras.push(chave);
      return valorOriginal;
    },
    setItem: function() {
      assert.fail("getTodosProdutos não deve alterar o localStorage");
    }
  };

  var resultado = getTodosProdutos(storage);

  assert.deepEqual(leituras, ["produtos"]);
  assert.equal(resultado.length, 6);
  assert.deepEqual(resultado[5], produtoSalvo);
  assert.equal(storage.getItem("produtos"), valorOriginal);
});

test("mantém os produtos fixos quando o localStorage contém JSON inválido", function() {
  var avisoOriginal = console.warn;
  console.warn = function() {};

  try {
    var resultado = getTodosProdutos({ getItem: function() { return "{inválido"; } });
    assert.deepEqual(resultado, produtosFixos);
  } finally {
    console.warn = avisoOriginal;
  }
});

test("filtra todosProdutos pela categoria sem alterar o array recebido", function() {
  var produtos = [
    { id: 1, categoria: "Skincare" },
    { id: 2, categoria: "Maquiagem" },
    { id: 3, categoryName: "Skincare" }
  ];

  var skincare = filtrarProdutosPorCategoria(produtos, "Skincare");
  var todos = filtrarProdutosPorCategoria(produtos, "Todos");

  assert.deepEqual(skincare.map(function(produto) { return produto.id; }), [1, 3]);
  assert.deepEqual(todos, produtos);
  assert.notEqual(todos, produtos);
  assert.equal(produtos.length, 3);
  assert.deepEqual(filtrarProdutosPorCategoria(null, "Skincare"), []);
});
