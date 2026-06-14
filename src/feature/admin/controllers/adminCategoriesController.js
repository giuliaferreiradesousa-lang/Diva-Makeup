/* =========================================================
   CONTROLLER: adminCategoriesController.js
   Descrição: Controla o formulário de cadastro, delegação de
              eventos e modais do CRUD de categorias.
   ========================================================= */

import { getCategories, createCategory, deleteCategory, updateCategory } from "../../categories/services/categoryService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { categoryListComponent } from "../../categories/components/categoryListComponent.js";

export function carregarModuloCategorias() {
    var form = document.getElementById("category-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var nome = document.getElementById("nome").value.trim();
            var desc = document.getElementById("descricao").value.trim();

            if (!nome || !desc) {
                showToast("Preencha todos os campos obrigatórios.", 3000, "error");
                return;
            }

            var imgInput = document.getElementById("imagem");
            var file = imgInput && imgInput.files && imgInput.files[0];

            if (file) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var category = {
                        id: new Date().getTime(),
                        nome: nome,
                        descricao: desc,
                        imagem: evt.target.result
                    };
                    createCategory(category);
                    showToast("Categoria cadastrada!", 3000);
                    form.reset();
                    renderListaCategorias();
                };
                reader.readAsDataURL(file);
            } else {
                var category = {
                    id: new Date().getTime(),
                    nome: nome,
                    descricao: desc,
                    imagem: ""
                };
                createCategory(category);
                showToast("Categoria cadastrada!", 3000);
                form.reset();
                renderListaCategorias();
            }
        });
    }

    // Configura a escuta centralizada de cliques na tabela
    configurarAcoesDasCategorias();

    // Renderiza a listagem inicial
    renderListaCategorias();
}

function renderListaCategorias() {
    var categorias = getCategories();
    var listContainer = document.getElementById("admin-categories-list");
    if (!listContainer) return;

    if (categorias.length === 0) {
        listContainer.innerHTML = "<p style='color:#666; padding: 12px;'>Nenhuma categoria cadastrada.</p>";
        return;
    }

    // Renderiza usando o componente reutilizável padronizado
    listContainer.innerHTML = categoryListComponent(categorias);
}

function configurarAcoesDasCategorias() {
    var container = document.getElementById("admin-categories-list");
    if (!container) return;

    container.addEventListener("click", function (event) {
        var elementoClicado = event.target;

        // Filtra apenas cliques nos botões de ação da DataTable
        if (!elementoClicado.classList.contains("table-btn")) return;

        var idCategoria = elementoClicado.getAttribute("data-id");
        var categorias = getCategories();
        var categoriaSelecionada = null;

        for (var i = 0; i < categorias.length; i++) {
            if (categorias[i].id == idCategoria) {
                categoriaSelecionada = categorias[i];
                break;
            }
        }

        if (!categoriaSelecionada) return;

        // AÇÃO: ATUALIZAR CATEGORIA (UPDATE)
        if (elementoClicado.classList.contains("table-btn-edit")) {
            if (window.exibirModal) {
                window.exibirModal({
                    tipo: "update",
                    titulo: "Editar Categoria",
                    dadosObjeto: categoriaSelecionada,
                    camposFormulario: [
                        { name: "nome", label: "Nome da Categoria", type: "text" },
                        { name: "descricao", label: "Descrição", type: "text" }
                    ],
                    callbackConfirmar: function (dadosAtualizados) {
                        if (!dadosAtualizados.nome || !dadosAtualizados.descricao) {
                            showToast("Todos os campos do formulário são obrigatórios.", 3000, "error");
                            return;
                        }

                        updateCategory(idCategoria, dadosAtualizados);
                        showToast("Categoria atualizada com sucesso!", 3000);
                        renderListaCategorias();
                    }
                });
            }
        }

        // AÇÃO: REMOVER CATEGORIA (DELETE)
        if (elementoClicado.classList.contains("table-btn-delete")) {
            if (window.exibirModal) {
                window.exibirModal({
                    tipo: "delete",
                    titulo: "Excluir Categoria",
                    dadosObjeto: categoriaSelecionada,
                    mensagemDeletar: 'Tem certeza que deseja excluir a categoria "' + categoriaSelecionada.nome + '"? Isso afetará os produtos vinculados a ela.',
                    callbackConfirmar: function (categoriaParaDeletar) {
                        deleteCategory(categoriaParaDeletar.id);
                        showToast("Categoria excluída!", 3000);
                        renderListaCategorias();
                    }
                });
            }
        }
    });
}