/**
 * Componente de Modal Genérico para Operações do CRUD (Update e Delete)
 * * Regras mantidas:
 * 1. Proibido uso de Arrow Functions (=>)
 * 2. Proibido métodos modernos de array (.map, .filter, etc) - Uso exclusivo de 'for'/'while'
 * 3. Proibido desestruturação complexa
 * 4. Manipulação nativa do DOM
 */

/**
 * Exibe um modal genérico baseado em configurações estruturadas.
 * * @param {Object} config Objeto de configuração do modal.
 * @param {string} config.tipo Tipo do modal: 'update' ou 'delete'.
 * @param {string} config.titulo O título que aparecerá no cabeçalho do modal.
 * @param {Object} config.dadosObjeto Os dados atuais do item (ex: o produto completo).
 * @param {Array} config.camposFormulario Campos do formulário (apenas para tipo 'update').
 * @param {string} config.mensagemDeletar Mensagem customizada de exclusão (apenas para tipo 'delete').
 * @param {Function} config.callbackConfirmar Função executada ao salvar ou confirmar a exclusão.
 */
function exibirModal(config) {
    // Extração segura de propriedades (sem desestruturação complexa)
    var tipo = config.tipo || 'update';
    var titulo = config.titulo || 'Confirmação';
    var dadosObjeto = config.dadosObjeto;
    var camposFormulario = config.camposFormulario || [];
    var mensagemDeletar = config.mensagemDeletar || 'Tem certeza que deseja remover este registro?';
    var callbackConfirmar = config.callbackConfirmar;

    // 1. Criação do overlay (fundo escuro)
    var overlay = document.createElement('div');
    overlay.className = 'diva-modal-overlay';

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            fecharModal(overlay);
        }
    });

    // 2. Criação da caixa do modal
    var modalBox = document.createElement('div');
    modalBox.className = 'diva-modal-box';

    // 3. Cabeçalho do modal
    var header = document.createElement('div');
    header.className = 'diva-modal-header';

    var headerTitle = document.createElement('h2');
    headerTitle.className = 'diva-modal-title';
    headerTitle.textContent = titulo;

    var closeIcon = document.createElement('button');
    closeIcon.className = 'diva-modal-close-icon';
    closeIcon.innerHTML = '&times;';
    closeIcon.addEventListener('click', function () {
        fecharModal(overlay);
    });

    header.appendChild(headerTitle);
    header.appendChild(closeIcon);
    modalBox.appendChild(header);

    // 4. Corpo do modal (Condicional baseado no tipo)
    var body = document.createElement('div');
    body.className = 'diva-modal-body';

    var inputsReferencia = [];

    if (tipo === 'delete') {
        // Se for deleção, injeta apenas o texto explicativo de confirmação
        var textMessage = document.createElement('p');
        textMessage.className = 'diva-modal-text';
        textMessage.textContent = mensagemDeletar;
        body.appendChild(textMessage);
    } else {
        // Se for update, monta a estrutura de formulário dinâmico
        for (var i = 0; i < camposFormulario.length; i++) {
            var configCampo = camposFormulario[i];

            var fieldGroup = document.createElement('div');
            fieldGroup.className = 'diva-modal-field-group';

            var label = document.createElement('label');
            label.className = 'diva-modal-label';
            label.textContent = configCampo.label;

            var input = document.createElement('input');
            input.className = 'diva-modal-input';
            input.type = configCampo.type || 'text';
            input.name = configCampo.name;

            if (dadosObjeto && dadosObjeto[configCampo.name] !== undefined) {
                input.value = dadosObjeto[configCampo.name];
            }

            fieldGroup.appendChild(label);
            fieldGroup.appendChild(input);
            body.appendChild(fieldGroup);

            inputsReferencia.push({
                name: configCampo.name,
                element: input
            });
        }
    }

    modalBox.appendChild(body);

    // 5. Rodapé do modal com botões
    var footer = document.createElement('div');
    footer.className = 'diva-modal-footer';

    var btnCancel = document.createElement('button');
    btnCancel.className = 'diva-modal-btn diva-modal-btn-cancel';
    btnCancel.textContent = 'Cancelar';
    btnCancel.addEventListener('click', function () {
        fecharModal(overlay);
    });

    var btnAction = document.createElement('button');

    // Altera a cor e o texto do botão principal dependendo da ação
    if (tipo === 'delete') {
        btnAction.className = 'diva-modal-btn diva-modal-btn-danger';
        btnAction.textContent = 'Excluir';
    } else {
        btnAction.className = 'diva-modal-btn diva-modal-btn-save';
        btnAction.textContent = 'Salvar';
    }

    btnAction.addEventListener('click', function () {
        if (tipo === 'delete') {
            // Deleção: Retorna diretamente o objeto original selecionado para o callback tratar
            if (callbackConfirmar) {
                callbackConfirmar(dadosObjeto);
            }
            fecharModal(overlay);
        } else {
            // Edição: Coleta dados atualizados e mescla
            var dadosAtualizados = {};

            for (var j = 0; j < inputsReferencia.length; j++) {
                var ref = inputsReferencia[j];
                dadosAtualizados[ref.name] = ref.element.value;
            }

            var objetoFinal = {};
            if (dadosObjeto) {
                for (var keyOriginal in dadosObjeto) {
                    if (dadosObjeto.hasOwnProperty(keyOriginal)) {
                        objetoFinal[keyOriginal] = dadosObjeto[keyOriginal];
                    }
                }
            }

            for (var keyAtualizada in dadosAtualizados) {
                if (dadosAtualizados.hasOwnProperty(keyAtualizada)) {
                    objetoFinal[keyAtualizada] = dadosAtualizados[keyAtualizada];
                }
            }

            if (callbackConfirmar) {
                callbackConfirmar(objetoFinal);
            }
            fecharModal(overlay);
        }
    });

    footer.appendChild(btnCancel);
    footer.appendChild(btnAction);
    modalBox.appendChild(footer);

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
}

function fecharModal(modalElement) {
    if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
    }
}

// Expõe globalmente
window.exibirModal = exibirModal;