/* =========================================================
   COMPONENT: aboutListComponent.js
   Descrição: Componente responsável por renderizar a estrutura
              base e os cards de mídia do módulo Sobre Nós.
   ========================================================= */

export function aboutListComponent() {
    return '<div id="admin-about-list" class="admin-list-container"></div>';
}

export function renderAboutCardsHtml(aboutImages) {
    var htmlList = "";
    
    for (var i = 0; i < aboutImages.length; i++) {
        var img = aboutImages[i];
        htmlList += 
        '<div class="admin-slide-card" style="display:flex; align-items:center; gap:15px; margin-bottom:15px; padding:15px; border:1px solid #ddd; border-radius:8px;">' +
            '<img src="' + img.url + '" alt="' + img.alt + '" style="width:100px; height:100px; object-fit:cover; border-radius:8px;">' +
            '<div class="admin-slide-info" style="flex:1;">' +
                '<h3>' + img.alt + '</h3>' +
            '</div>' +
            '<div class="admin-slide-actions">' +
                // AJUSTE: Removido onclick inline, adicionado data-id e classe genérica
                '<button class="about-btn about-btn-delete" data-id="' + img.id + '" style="background-color:#e74c3c; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer;">' +
                    'Excluir' +
                '</button>' +
            '</div>' +
        '</div>';
    }
    
    return htmlList;
}