export const categoriasFixas = Object.freeze([
  { id: 1, nome: "Skincare", icone: "✨", fixo: true },
  { id: 2, nome: "Maquiagem", icone: "💄", fixo: true },
  { id: 3, nome: "Cabelo", icone: "💁‍♀️", fixo: true }
]);

export const produtosFixos = Object.freeze([
  { id: 101, nome: "Hidratante Facial Vitamina C", preco: "49.90", categoria: "Skincare", imagem: "assets/img/produtos/vitamina-c.jpg", fixo: true },
  { id: 102, nome: "Lip Tint Natural Rosa", preco: "29.90", categoria: "Maquiagem", imagem: "assets/img/produtos/lip-tint.jpg", fixo: true },
  { id: 103, nome: "Shampoo Sólido de Coco", preco: "34.90", categoria: "Cabelo", imagem: "assets/img/produtos/shampoo.jpg", fixo: true },
  { id: 104, nome: "Sérum Ácido Hialurônico", preco: "69.90", categoria: "Skincare", imagem: "assets/img/produtos/serum.jpg", fixo: true },
  { id: 105, nome: "Máscara de Argila Verde", preco: "39.90", categoria: "Skincare", imagem: "assets/img/produtos/argila.jpg", fixo: true }
]);

/**
 * Une os cinco produtos da landing aos produtos já cadastrados pelo usuário.
 * A leitura é intencionalmente somente-leitura para manter o localStorage intacto.
 */
export function getTodosProdutos(storage) {
  var localStorage = storage || globalThis.localStorage;

  try {
    const todosProdutos = [...produtosFixos, ...(JSON.parse(localStorage.getItem('produtos')) || [])];
    return todosProdutos;
  } catch (erro) {
    console.warn("Não foi possível ler os produtos salvos. Exibindo os produtos fixos.", erro);
    return [...produtosFixos];
  }
}

/**
 * Filtra a coleção completa sem alterar o array original.
 */
export function filtrarProdutosPorCategoria(produtos, categoria) {
  if (!Array.isArray(produtos)) {
    return [];
  }

  if (!categoria || categoria === "Todos") {
    return [...produtos];
  }

  return produtos.filter(function(produto) {
    return produto && (produto.categoria === categoria || produto.categoryName === categoria);
  });
}
