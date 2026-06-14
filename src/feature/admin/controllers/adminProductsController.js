import { getCategories } from "../../categories/services/categoryService.js";
import { getProductsWithCategory, createProduct, deleteProduct, updateProduct } from "../../products/services/productServices.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { productListComponent } from "../../products/components/productListComponent.js";

export function carregarModuloProdutos() {
    var form = document.getElementById("product-form");

    // Configurar Dropdown Customizado de Categorias
    var categoryDropdownList = document.getElementById("category-dropdown-list");
    var categoryDropdownHeader = document.getElementById("category-dropdown-header");
    var selectedCategoryId = null;

    if (categoryDropdownList && categoryDropdownHeader) {
        var categorias = getCategories();
        var htmlCategorias = "";
        for (var i = 0; i < categorias.length; i++) {
            htmlCategorias += '<div class="dropdown-item" data-id="' + categorias[i].id + '">' + categorias[i].nome + '</div>';
        }
        categoryDropdownList.innerHTML = htmlCategorias;

        var items = categoryDropdownList.querySelectorAll('.dropdown-item');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener("click", function (e) {
                var item = e.target;
                categoryDropdownHeader.textContent = item.textContent;
                selectedCategoryId = item.getAttribute("data-id");
                categoryDropdownList.style.display = "none";
            });
        }

        categoryDropdownHeader.addEventListener("click", function () {
            categoryDropdownList.style.display = categoryDropdownList.style.display === "block" ? "none" : "block";
        });
    }

    // Configurar Input de Imagem com Preview Base64
    var imgInput = document.getElementById("product-image-input");
    var imgPreview = document.getElementById("product-image-preview");
    var uploadPlaceholder = document.getElementById("upload-placeholder");
    var base64ProductImage = null;

    if (imgInput) {
        imgInput.addEventListener("change", function (e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    base64ProductImage = evt.target.result;
                    imgPreview.src = base64ProductImage;
                    imgPreview.style.display = "block";
                    if (uploadPlaceholder) uploadPlaceholder.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Evento de Submit do Formulário de Criação (Create)
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nome = document.getElementById("nome").value.trim();
            var preco = parseFloat(document.getElementById("preco").value);
            var desc = document.getElementById("descricao").value.trim();

            if (!nome || isNaN(preco) || !desc || !selectedCategoryId) {
                showToast("Preencha todos os campos, incluindo a categoria.", 3000, "error");
                return;
            }

            var product = {
                nome: nome,
                preco: preco,
                descricao: desc,
                categoryId: selectedCategoryId,
                imagem: base64ProductImage || ""
            };

            createProduct(product);
            showToast("Produto salvo!", 3000);
            form.reset();
            imgPreview.style.display = "none";
            imgPreview.src = "";
            if (uploadPlaceholder) uploadPlaceholder.style.display = "flex";
            categoryDropdownHeader.textContent = "Selecione ▼";
            selectedCategoryId = null;
            base64ProductImage = null;

            renderizarListaProdutos();
        });
    }

    // Inicializa a escuta de ações da tabela (Update/Delete) via Delegação de Eventos
    configurarAcoesDaTabela();

    // Renderiza a tabela pela primeira vez ao carregar o módulo
    renderizarListaProdutos();
}

/**
 * Renderiza os dados atualizados dos produtos injetando a string HTML no container da página
 */
function renderizarListaProdutos() {
    var produtos = getProductsWithCategory();
    var container = document.getElementById("admin-products-list");

    if (!container) return;

    container.innerHTML = productListComponent(produtos);
}

/**
 * Centraliza a escuta de cliques nos botões de Editar e Excluir gerados pela DataTable
 */
function configurarAcoesDaTabela() {
    var container = document.getElementById("admin-products-list");
    if (!container) return;

    container.addEventListener("click", function (event) {
        var elementoClicado = event.target;

        // Se o elemento clicado não for um botão de ação da tabela, ignora o fluxo
        if (!elementoClicado.classList.contains("table-btn")) return;

        var idProduto = elementoClicado.getAttribute("data-id");
        var produtos = getProductsWithCategory();
        var produtoSelecionado = null;

        // Laço de repetição tradicional para mapear o produto pelo ID
        for (var i = 0; i < produtos.length; i++) {
            if (produtos[i].id == idProduto) {
                produtoSelecionado = produtos[i];
                break;
            }
        }

        if (!produtoSelecionado) return;

        // FLUXO DE ATUALIZAÇÃO (UPDATE)
        if (elementoClicado.classList.contains("table-btn-edit")) {
            window.exibirModal({
                tipo: "update",
                titulo: "Editar Produto",
                dadosObjeto: produtoSelecionado,
                camposFormulario: [
                    { name: "nome", label: "Nome do Produto", type: "text" },
                    { name: "preco", label: "Preço", type: "number" },
                    { name: "descricao", label: "Descrição", type: "text" }
                ],
                callbackConfirmar: function (dadosAtualizados) {
                    // Converte o preço capturado pelo input em float antes de salvar no LocalStorage
                    dadosAtualizados.preco = parseFloat(dadosAtualizados.preco);

                    if (!dadosAtualizados.nome || isNaN(dadosAtualizados.preco) || !dadosAtualizados.descricao) {
                        showToast("Preencha todos os campos do formulário de edição.", 3000, "error");
                        return;
                    }

                    // Envia a ID e os campos alterados para o service persistir
                    updateProduct(idProduto, dadosAtualizados);
                    showToast("Produto atualizado com sucesso!", 3000);

                    // Atualiza a interface gráfica imediatamente
                    renderizarListaProdutos();
                }
            });
        }

        // FLUXO DE EXCLUSÃO (DELETE)
        if (elementoClicado.classList.contains("table-btn-delete")) {
            window.exibirModal({
                tipo: "delete",
                titulo: "Excluir Produto",
                dadosObjeto: produtoSelecionado,
                mensagemDeletar: 'Tem certeza que deseja excluir o produto "' + produtoSelecionado.nome + '" permanentemente?',
                callbackConfirmar: function (produtoParaDeletar) {
                    // Executa a remoção do banco local usando o service
                    deleteProduct(produtoParaDeletar.id);
                    showToast("Produto excluído!", 3000);

                    // Recarrega a tabela limpa
                    renderizarListaProdutos();
                }
            });
        }
    });
}