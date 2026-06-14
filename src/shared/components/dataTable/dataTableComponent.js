export function renderDataTable(config) {

    var html = '';

    html += '<div class="diva-table-wrapper">';

    html += '<table class="diva-table">';

    html += '<thead>';
    html += '<tr>';

    for (var i = 0; i < config.columns.length; i++) {

        html +=
        '<th>' +
            config.columns[i].label +
        '</th>';

    }

    html += '<th>Ações</th>';

    html += '</tr>';
    html += '</thead>';

    html += '<tbody>';

    for (var j = 0; j < config.data.length; j++) {

        var item = config.data[j];

        html += '<tr>';

        for (var k = 0; k < config.columns.length; k++) {

            var column = config.columns[k];

            if(column.key === "imagem"){

                html +=
                '<td>' +
                    '<img class="table-image" src="' + item[column.key] + '">' +
                '</td>';

            }else{

                html +=
                '<td>' +
                    item[column.key] +
                '</td>';

            }

        }

        html += '<td>';

        if(config.actions.edit){

            html +=
            '<button class="table-btn table-btn-edit" data-id="' + item.id + '">' +
                'Editar' +
            '</button>';

        }

        if(config.actions.delete){

            html +=
            '<button class="table-btn table-btn-delete" data-id="' + item.id + '">' +
                'Excluir' +
            '</button>';

        }

        html += '</td>';

        html += '</tr>';
    }

    html += '</tbody>';

    html += '</table>';

    html += '</div>';

    return html;
}