import { setStorageData, getStorageData } from "../../../core/storage.js";
import { showToast } from "../../../shared/components/toast/toastComponent.js";
import { heroCardsComponent } from "../../home/components/heroCardsComponent.js";

export function carregarModuloHome() {
    inicializarLogicaHome();
    configurarAcoesDosSlides(); // Inicializa o ouvinte de eventos da listagem
    carregarConfiguracoes();
}

function inicializarLogicaHome() {
    var heroForm = document.getElementById("hero-form");
    var inputTitle = document.getElementById("hero-title");
    var inputSubtitle = document.getElementById("hero-subtitle");
    var inputImage = document.getElementById("hero-image");
    var imagePreview = document.getElementById("image-preview");

    if (!heroForm) return;

    var base64Image = null;

    inputImage.addEventListener("change", function (evento) {
        var file = evento.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                base64Image = e.target.result;
                imagePreview.innerHTML = '<img src="' + base64Image + '" alt="Preview do Banner">';
            };
            reader.readAsDataURL(file);
        }
    });

    heroForm.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var tituloValor = inputTitle.value.trim();
        var subtituloValor = inputSubtitle.value.trim();

        if (!tituloValor || !subtituloValor) {
            showToast("Por favor, preencha o título e o subtítulo.", 3000, "error");
            return;
        }

        var heroSlides = getStorageData("heroConfig");
        if (!heroSlides || !Array.isArray(heroSlides)) {
            heroSlides = [];
        }

        if (heroSlides.length >= 3) {
            showToast("O limite máximo é de 3 slides.", 3000, "error");
            return;
        }

        var novoSlide = {
            id: new Date().getTime(),
            titulo: tituloValor,
            subtitulo: subtituloValor,
            imagem: base64Image
        };

        heroSlides.push(novoSlide);
        setStorageData("heroConfig", heroSlides);
        showToast("Slide adicionado com sucesso!", 3000);

        heroForm.reset();
        base64Image = null;
        imagePreview.innerHTML = "";
        renderizarSlidesAdmin();
    });
}

function carregarConfiguracoes() {
    renderizarSlidesAdmin();
}

function renderizarSlidesAdmin() {
    var heroSlides = getStorageData("heroConfig");

    if (!heroSlides || !Array.isArray(heroSlides)) {
        heroSlides = [];
    }

    var container = document.getElementById("admin-slides-list");

    if (!container) {
        return;
    }

    if (heroSlides.length === 0) {
        container.innerHTML = '<p>Nenhum slide cadastrado.</p>';
        return;
    }

    container.innerHTML = heroCardsComponent(heroSlides);
}

/**
 * Escuta os cliques de Editar e Excluir de forma centralizada por delegação de eventos
 */
function configurarAcoesDosSlides() {
    var container = document.getElementById("admin-slides-list");
    if (!container) return;

    container.addEventListener("click", function (event) {
        var elementoClicado = event.target;

        // Se o clique não foi em um botão de ação do slide, interrompe
        if (!elementoClicado.classList.contains("slide-btn")) return;

        var idSlide = elementoClicado.getAttribute("data-id");
        var heroSlides = getStorageData("heroConfig");
        if (!heroSlides || !Array.isArray(heroSlides)) return;

        // Busca o slide correspondente via laço 'for' tradicional
        var slideSelecionado = null;
        for (var i = 0; i < heroSlides.length; i++) {
            if (heroSlides[i].id == idSlide) {
                slideSelecionado = heroSlides[i];
                break;
            }
        }

        if (!slideSelecionado) return;

        // AÇÃO: EDITAR SLIDE (UPDATE)
        if (elementoClicado.classList.contains("slide-btn-edit")) {
            if (window.exibirModal) {
                window.exibirModal({
                    tipo: "update",
                    titulo: "Editar Slide",
                    dadosObjeto: slideSelecionado,
                    camposFormulario: [
                        { name: "titulo", label: "Título", type: "text" },
                        { name: "subtitulo", label: "Subtítulo", type: "text" }
                    ],
                    callbackConfirmar: function (dadosAtualizados) {
                        var heroSlidesAtuais = getStorageData("heroConfig");

                        for (var j = 0; j < heroSlidesAtuais.length; j++) {
                            if (heroSlidesAtuais[j].id == idSlide) {
                                heroSlidesAtuais[j].titulo = dadosAtualizados.titulo;
                                heroSlidesAtuais[j].subtitulo = dadosAtualizados.subtitulo;
                                break;
                            }
                        }

                        setStorageData("heroConfig", heroSlidesAtuais);
                        showToast("Slide atualizado com sucesso!", 3000);
                        renderizarSlidesAdmin();
                    }
                });
            }
        }

        // AÇÃO: REMOVER SLIDE (DELETE)
        if (elementoClicado.classList.contains("slide-btn-delete")) {
            if (window.exibirModal) {
                window.exibirModal({
                    tipo: "delete",
                    titulo: "Excluir Slide",
                    dadosObjeto: slideSelecionado,
                    mensagemDeletar: 'Tem certeza que deseja remover o slide "' + slideSelecionado.titulo + '"?',
                    callbackConfirmar: function (slideParaDeletar) {
                        var heroSlidesAtuais = getStorageData("heroConfig");
                        var restantes = [];

                        // Filtro manual (Uso estrito de 'for' tradicional conforme regras de negócio)
                        for (var k = 0; k < heroSlidesAtuais.length; k++) {
                            if (heroSlidesAtuais[k].id != slideParaDeletar.id) {
                                restantes.push(heroSlidesAtuais[k]);
                            }
                        }

                        setStorageData("heroConfig", restantes);
                        showToast("Slide excluído com sucesso!", 3000);
                        renderizarSlidesAdmin();
                    }
                });
            }
        }
    });
}