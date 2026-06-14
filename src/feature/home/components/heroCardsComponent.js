export function heroCardsComponent(slides){

    var html = '';

    for(var i = 0; i < slides.length; i++){

        var slide = slides[i];

        html +=

        '<div class="admin-slide-card">' +

            '<img ' +
            'src="' +
            (slide.imagem || '') +
            '" ' +
            'alt="' +
            slide.titulo +
            '">' +

            '<div class="admin-slide-info">' +

                '<h3>' +
                    slide.titulo +
                '</h3>' +
                '<p>' +
                    slide.subtitulo +
                '</p>' +

            '</div>' +

            '<div class="admin-slide-actions">' +

                // AJUSTE: Classes e data-id padronizados (sem onclick inline)
                '<button ' +
                'class="slide-btn slide-btn-edit" ' +
                'data-id="' + slide.id + '">' +
                    'Editar' +
                '</button>' +

                '<button ' +
                'class="slide-btn slide-btn-delete" ' +
                'data-id="' + slide.id + '">' +
                    'Excluir' +
                '</button>' +

            '</div>' +

        '</div>';

    }

    return html;

}