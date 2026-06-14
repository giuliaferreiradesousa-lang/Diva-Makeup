import { renderDataTable } from "../../../shared/components/dataTable/dataTableComponent.js";

export function productListComponent(produtos){

    return renderDataTable({

        columns:[
            {
                key:"imagem",
                label:"Imagem",
                type:"image"
            },
            {
                key:"nome",
                label:"Nome"
            },
            {
                key:"categoryName",
                label:"Categoria"
            },
            {
                key:"preco",
                label:"Preço"
            }
        ],

        data:produtos,

        // AJUSTE AQUI: Ative o edit para renderizar ambos os botões
        actions:{
            edit: true,
            delete: true
        }

    });

}