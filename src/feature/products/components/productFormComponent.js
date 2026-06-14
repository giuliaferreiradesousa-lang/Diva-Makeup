import { Form }
  from "../../../shared/components/form/Form.js";

export function productFormComponent() {

  return (

    '<form id="product-form">' +

    Form.Section({

      title: "Informações do Produto",

      content:

        Form.Grid(

          Form.Column({

            size: 12,

            content:

              Form.File({

                id: "product-image-input",

                label: "Imagem do Produto",

                accept: "image/*"

              })

          }) +

          Form.Column({

            size: 12,

            content:

              Form.Input({

                id: "nome",

                name: "nome",

                label: "Nome do Produto",

                placeholder:
                  "Ex: Batom Matte Velvet Rose",

                required: true

              })

          }) +

          Form.Column({

            size: 6,

            content:

              Form.Number({

                id: "preco",

                name: "preco",

                label: "Preço",

                placeholder: "0,00",

                required: true

              })

          }) +

          Form.Column({

            size: 6,

            content:

              Form.Select({

                id: "categoria",

                label: "Categoria",

                options: [

                  {
                    value: "",
                    label: "Selecione"
                  }

                ],

                required: true

              })

          }) +

          Form.Column({

            size: 12,

            content:

              Form.Textarea({

                id: "descricao",

                label: "Descrição",

                placeholder:
                  "Descreva o produto"

              })

          }) +

          Form.Column({

            size: 6,

            content:

              Form.Textarea({

                id: "modoUso",

                label: "Modo de Uso",

                placeholder:
                  "Ex: Aplicar duas vezes ao dia"

              })

          }) +

          Form.Column({

            size: 6,

            content:

              Form.Textarea({

                id: "ingredientes",

                label: "Ingredientes",

                placeholder:
                  "Ex: Água, Glicerina..."

              })

          })

        )

    }) +

    Form.Actions(

      Form.Button({

        type: "submit",

        text: "Salvar Produto"

      })

    ) +

    '</form>'

  );

}