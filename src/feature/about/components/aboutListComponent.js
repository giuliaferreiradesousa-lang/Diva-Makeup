/* =========================================================
   COMPONENT: aboutListComponent.js
   Descrição: Componente responsável por renderizar a estrutura
              base e a tabela de mídia do módulo Sobre Nós.
   ========================================================= */

import { renderDataTable } from "../../../shared/components/dataTableComponent.js";

export function aboutListComponent() {
    return '<div id="admin-about-list" class="admin-list-container"></div>';
}

export function renderAboutCardsHtml(aboutImages) {
    // Configuração declarativa para o motor da tabela genérica do sistema
    var config = {
        columns: [
            { label: "Imagem", key: "url", type: "image" },
            { label: "Texto Alternativo (Alt)", key: "alt", type: "text" }
        ],
        data: aboutImages,
        actions: {
            edit: false,
            delete: true
        }
    };

    // Retorna o HTML padronizado com as classes semânticas globais
    return renderDataTable(config);
}