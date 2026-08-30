import test from "node:test";
import assert from "node:assert/strict";

import {
  PRODUTO_PLACEHOLDER,
  escaparHtml,
  formatarPreco,
  obterImagemProduto,
  productCarouselCardComponent,
  productCarouselCardsComponent,
  productCarouselComponent
} from "../src/feature/home/components/productCarouselComponent.js";
import { categoriasFixas, produtosFixos } from "../src/feature/home/services/productCarouselService.js";

test("escapa conteúdo vindo do localStorage antes de renderizar", function() {
  assert.equal(escaparHtml('<img src="x"> &'), "&lt;img src=&quot;x&quot;&gt; &amp;");
});

test("formata preço no padrão visual brasileiro", function() {
  assert.equal(formatarPreco("49.90"), "R$ 49,90");
  assert.equal(formatarPreco("valor inválido"), "R$ 0,00");
});

test("usa o placeholder solicitado quando a imagem não foi informada", function() {
  assert.equal(obterImagemProduto({ imagem: "" }), PRODUTO_PLACEHOLDER);
  assert.equal(obterImagemProduto(null), PRODUTO_PLACEHOLDER);
  assert.equal(obterImagemProduto({ imagem: "produto.jpg" }), "produto.jpg");
  assert.equal(
    obterImagemProduto({ imagem: "assets/img/produtos/vitamina-c.jpg" }),
    "../../../../assets/img/produtos/vitamina-c.jpg"
  );
});

test("card reutiliza todas as classes atuais da vitrine e não mostra exclusão", function() {
  var html = productCarouselCardComponent(produtosFixos[0]);

  assert.match(html, /class="vitrine-card"/);
  assert.match(html, /class="vitrine-image-container"/);
  assert.match(html, /class="vitrine-image"/);
  assert.match(html, /class="vitrine-info"/);
  assert.match(html, /class="vitrine-category"/);
  assert.match(html, /class="vitrine-title"/);
  assert.match(html, /class="vitrine-price"/);
  assert.match(html, /class="btn-detalhes"/);
  assert.match(html, /this\.src='https:\/\/via\.placeholder\.com\/300x300\?text=Produto'/);
  assert.match(html, /classList\.add\('vitrine-image-fallback'\)/);
  assert.doesNotMatch(html, /excluir|btn-delete/i);
});

test("lista de cards renderiza todos os produtos recebidos", function() {
  var html = productCarouselCardsComponent(produtosFixos);
  var cards = html.match(/class="vitrine-card"/g) || [];

  assert.equal(cards.length, 5);
  assert.equal(productCarouselCardsComponent(null), "");
});

test("tela do carrossel renderiza os filtros fixos com o padrão btn-secondary", function() {
  var html = productCarouselComponent(categoriasFixas, produtosFixos);
  var filtros = html.match(/class="btn-secondary product-filter(?: active)?"/g) || [];

  assert.equal(filtros.length, 4);
  assert.match(html, />Todos<\/button>/);
  assert.match(html, /✨.*Skincare/);
  assert.match(html, /💄.*Maquiagem/);
  assert.match(html, /💁‍♀️.*Cabelo/);
  assert.match(html, /class="vitrine-grid products-carousel-track"/);
  assert.equal((html.match(/class="vitrine-card"/g) || []).length, 5);
  assert.doesNotMatch(html, /excluir|btn-delete/i);
});
