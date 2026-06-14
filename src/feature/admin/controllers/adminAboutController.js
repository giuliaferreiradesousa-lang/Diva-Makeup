/* =========================================================
   CONTROLLER: adminAboutController.js
   Descrição: Orquestra o upload, renderização e acionamento
              de modais da feature Sobre Nós.
   ========================================================= */

import { getAboutImages, createAboutImage, deleteAboutImage } from "../../about/services/aboutService.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { renderAboutCardsHtml } from "../../about/components/aboutListComponent.js";

export function carregarModuloAbout() {
    inicializarLogicaAbout();
    configurarAcoesAbout(); // Ativa a delegação de eventos para cliques
    renderizarImagensAbout();
}

function inicializarLogicaAbout() {
    var aboutForm = document.getElementById("about-image-form");
    var inputImage = document.getElementById("about-image-upload");
    var inputAlt = document.getElementById("about-image-alt");
    var imagePreview = document.getElementById("about-image-preview");

    if (!aboutForm) return;

    var base64Image = null;

    inputImage.addEventListener("change", function(evento) {
        var file = evento.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                base64Image = e.target.result;
                imagePreview.innerHTML = '<img src="' + base64Image + '" alt="Preview" style="max-width:200px; border-radius:8px; margin-top:10px;">';
            };
            reader.readAsDataURL(file);
        }
    });

    aboutForm.addEventListener("submit", function(evento) {
        evento.preventDefault();
        var altValor = inputAlt.value.trim();

        if (!base64Image) {
            showToast("Por favor, selecione uma imagem.", 3000, "error");
            return;
        }

        var aboutImages = getAboutImages();

        // Regra de Negócio: Limite máximo de 1 imagem para esta seção
        if (aboutImages.length >= 1) {
            showToast("O limite máximo é de 1 imagem para o Sobre Nós. Exclua a imagem atual para adicionar uma nova.", 4000, "error");
            return;
        }

        var novaImagem = {
            id: new Date().getTime(),
            alt: altValor || "Imagem da seção Sobre Nós",
            url: base64Image
        };

        createAboutImage(novaImagem);
        showToast("Imagem adicionada com sucesso!", 3000);

        aboutForm.reset();
        base64Image = null;
        imagePreview.innerHTML = "";
        renderizarImagensAbout();
    });
}

function renderizarImagensAbout() {
    var aboutImages = getAboutImages();
    var adminAboutList = document.getElementById("admin-about-list");
    if (!adminAboutList) return;
    
    if (aboutImages.length === 0) {
        adminAboutList.innerHTML = "<p style='color:#666; padding: 12px;'>Nenhuma imagem cadastrada na seção Sobre.</p>";
        return;
    }

    // Injeta a string de HTML estruturada gerada pelo componente
    adminAboutList.innerHTML = renderAboutCardsHtml(aboutImages);
}

/**
 * Escuta os cliques de exclusão de forma centralizada por delegação de eventos no elemento pai
 */
function configurarAcoesAbout() {
    var container = document.getElementById("admin-about-list");
    if (!container) return;

    container.addEventListener("click", function(event) {
        var elementoClicado = event.target;

        // Filtra para garantir que o clique ocorreu especificamente no botão de exclusão
        if (!elementoClicado.classList.contains("about-btn-delete")) return;

        var idImagem = elementoClicado.getAttribute("data-id");
        var aboutImages = getAboutImages();
        var imagemSelecionada = null;

        // Laço tradicional para mapear a imagem alvo
        for (var i = 0; i < aboutImages.length; i++) {
            if (aboutImages[i].id == idImagem) {
                imagemSelecionada = aboutImages[i];
                break;
            }
        }

        if (!imagemSelecionada) return;

        // FLUXO DE EXCLUSÃO USANDO O MODAL UNIFICADO
        if (window.exibirModal) {
            window.exibirModal({
                tipo: "delete",
                titulo: "Excluir Imagem institucional",
                dadosObjeto: imagemSelecionada,
                mensagemDeletar: 'Tem certeza que deseja remover a imagem do Sobre Nós com a descrição "' + imagemSelecionada.alt + '"?',
                callbackConfirmar: function(midiaParaDeletar) {
                    // Executa a remoção segura via Service
                    deleteAboutImage(midiaParaDeletar.id);
                    showToast("Imagem removida com sucesso!", 3000);
                    
                    // Atualiza a interface gráfica imediatamente
                    renderizarImagensAbout();
                }
            });
        }
    });
}