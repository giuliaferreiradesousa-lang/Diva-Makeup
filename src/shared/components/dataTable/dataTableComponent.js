export function renderDataTable(config) {
    var html = '';

    // Ajuste de resiliência: Garante que "actions" exista e verifica se há alguma ativa
    var actions = config.actions || {};
    var hasActions = actions.edit || actions.delete;

    html += '<div class="diva-table-wrapper">';
    html += '<table class="diva-table">';
    html += '<thead>';
    html += '<tr>';

    // Renderiza as colunas dinâmicas
    for (var i = 0; i < config.columns.length; i++) {
        html += '<th>' + config.columns[i].label + '</th>';
    }

    // Só renderiza o cabeçalho se houver ações configuradas
    if (hasActions) {
        html += '<th>Ações</th>';
    }

    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    // Renderiza as linhas da tabela
    for (var j = 0; j < config.data.length; j++) {
        var item = config.data[j];
        html += '<tr>';

        for (var k = 0; k < config.columns.length; k++) {
            var column = config.columns[k];

            // CORREÇÃO 1: Usa o "type" genérico em vez da chave hardcoded
            if (column.type === "image") {
                html +=
                    '<td>' +
                    '<img class="table-image" src="' + item[column.key] + '">' +
                    '</td>';
            } else {
                html +=
                    '<td>' +
                    item[column.key] +
                    '</td>';
            }
        }

        // Só renderiza a célula de ações se de fato houver botões ativos
        if (hasActions) {
            html += '<td>';
            // CORREÇÃO 2: Adicionada a div contendo a sua classe flexbox do CSS
            html += '<div class="table-actions">';

            if (actions.edit) {
                html +=
                    '<button class="table-btn table-btn-edit" data-id="' + item.id + '">' +
                    'Editar' +
                    '</button>';
            }

            if (actions.delete) {
                html +=
                    '<button class="table-btn table-btn-delete" data-id="' + item.id + '">' +
                    'Excluir' +
                    '</button>';
            }

            html += '</div>';
            html += '</td>';
        }

        html += '</tr>';
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';

    return html;
}