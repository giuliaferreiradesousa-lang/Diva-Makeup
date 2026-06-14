/* =========================================================
   COMPONENT: categoryListComponent.js
   Descrição: Acopla os dados de categorias ao componente 
              genérico reutilizável de dataTable.
   ========================================================= */

import { renderDataTable } from "../../../shared/components/dataTable/dataTableComponent.js";

export function categoryListComponent(categories) {
    return renderDataTable({
        columns: [
            {
                key: "imagem",
                label: "Imagem",
                type: "image"
            },
            {
                key: "nome",
                label: "Nome"
            },
            {
                key: "descricao",
                label: "Descrição"
            }
        ],
        data: categories,
        actions: {
            edit: true,
            delete: true
        }
    });
}