import { Form }
  from "../../../shared/components/form/Form.js";

export function productFormComponent() {

  return (

    '<form id="product-form">' +

    Form.Section({

      title: "Informações do Produto",

      content:

        Form.Row(

          Form.File({

            id: "product-image-input",

            label: "Imagem",

            accept: "image/*"

          })

        ) +

        Form.Input({

          id: "nome",

          name: "nome",

          label: "Nome do Produto",

          placeholder:
            "Ex: Batom Matte Velvet Rose",

          required: true

        }) +

        Form.Row(

          Form.Number({

            id: "preco",

            name: "preco",

            label: "Preço",

            placeholder: "0,00",

            required: true

          }) +

          '<div class="diva-form-group">' +

          '<label class="diva-form-label">' +

          'Categoria' +

          '</label>' +

          '<div class="custom-dropdown">' +

          '<div id="category-dropdown-header" class="dropdown-header">' +

          'Selecione ▼' +

          '</div>' +

          '<div id="category-dropdown-list" class="dropdown-list">' +

          '</div>' +

          '</div>' +

          '</div>'

        ) +

        Form.Textarea({

          id: "descricao",

          label: "Descrição",

          placeholder:
            "Descreva o produto"

        }) +

        Form.Textarea({

          id: "modoUso",

          label: "Modo de Uso",

          placeholder:
            "Ex: Aplicar duas vezes ao dia"

        }) +

        Form.Textarea({

          id: "ingredientes",

          label: "Ingredientes",

          placeholder:
            "Ex: Água, Glicerina..."

        })

    }) +

    Form.Button({

      type: "submit",

      text: "Salvar Produto"

    }) +

    '</form>'

  );

}