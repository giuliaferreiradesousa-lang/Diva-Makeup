export const PRODUTO_PLACEHOLDER = "https://via.placeholder.com/300x300?text=Produto";

export function escaparHtml(valor) {
  return String(valor === undefined || valor === null ? "" : valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatarPreco(preco) {
  var valor = Number(preco);
  if (!Number.isFinite(valor)) {
    valor = 0;
  }

  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export function obterImagemProduto(produto) {
  if (!produto || !produto.imagem || String(produto.imagem).trim() === "") {
    return PRODUTO_PLACEHOLDER;
  }

  var imagem = String(produto.imagem);

  // A home está quatro níveis abaixo da raiz onde a pasta assets é mantida.
  if (imagem.indexOf("assets/") === 0) {
    return "../../../../" + imagem;
  }

  return imagem;
}

export function productCarouselCardComponent(produto) {
  var categoria = produto && (produto.categoria || produto.categoryName)
    ? (produto.categoria || produto.categoryName)
    : "Sem Categoria";
  var imagem = obterImagemProduto(produto);
  var produtoId = produto && produto.id !== undefined ? produto.id : "";

  return '<article class="vitrine-card" data-product-id="' + escaparHtml(produtoId) + '">' +
      '<div class="vitrine-image-container">' +
        '<img src="' + escaparHtml(imagem) + '" alt="' + escaparHtml(produto && produto.nome) + '" class="vitrine-image" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=\'true\';this.src=\'' + PRODUTO_PLACEHOLDER + '\';}else{this.onerror=null;this.classList.add(\'vitrine-image-fallback\');}" />' +
      '</div>' +
      '<div class="vitrine-info">' +
        '<span class="vitrine-category">' + escaparHtml(categoria) + '</span>' +
        '<h3 class="vitrine-title">' + escaparHtml(produto && produto.nome) + '</h3>' +
        '<p class="vitrine-price">' + formatarPreco(produto && produto.preco) + '</p>' +
        '<a href="../../products/pages/products.html" class="btn-detalhes">Ver Catálogo</a>' +
      '</div>' +
    '</article>';
}

export function productCarouselCardsComponent(produtos) {
  if (!Array.isArray(produtos)) {
    return "";
  }

  return produtos.map(productCarouselCardComponent).join("");
}

export function productCarouselComponent(categorias, produtos) {
  var filtros = '<button type="button" class="btn-secondary product-filter active" data-category="Todos" aria-pressed="true">Todos</button>';

  for (var i = 0; i < categorias.length; i++) {
    var categoria = categorias[i];
    filtros += '<button type="button" class="btn-secondary product-filter" data-category="' + escaparHtml(categoria.nome) + '" aria-pressed="false">' +
      '<span aria-hidden="true">' + escaparHtml(categoria.icone) + '</span> ' + escaparHtml(categoria.nome) +
    '</button>';
  }

  return '<section class="vitrine-section product-carousel-section" aria-labelledby="product-carousel-title">' +
      '<h2 id="product-carousel-title" class="section-title">Destaques Diva</h2>' +
      '<div class="product-filters" role="group" aria-label="Filtrar produtos por categoria">' + filtros + '</div>' +
      '<div class="products-carousel-shell">' +
        '<button type="button" class="carousel-btn products-carousel-btn products-carousel-prev" data-carousel-direction="-1" aria-label="Ver produtos anteriores">&#10094;</button>' +
        '<div id="products-carousel-track" class="vitrine-grid products-carousel-track" tabindex="0" aria-live="polite">' +
          productCarouselCardsComponent(produtos) +
        '</div>' +
        '<button type="button" class="carousel-btn products-carousel-btn products-carousel-next" data-carousel-direction="1" aria-label="Ver próximos produtos">&#10095;</button>' +
      '</div>' +
      '<p class="vitrine-empty products-carousel-empty" hidden>Nenhum produto encontrado nesta categoria.</p>' +
    '</section>';
}
