/* =========================================================
   COMPONENT: aboutFormComponent.js
   Descrição: Formulário institucional para a secção Sobre Nós,
              refatorado para utilizar o motor genérico Form.
   ========================================================= */

import { Form } from "../../../shared/components/form/Form.js";

export function aboutFormComponent() {

    return (

        '<form id="about-image-form">' +

        Form.Section({

            title: "Média Institucional (Sobre Nós)",

            content:

                Form.Grid(

                    /* Linha do Campo de Upload de Ficheiro */
                    Form.Column({

                        size: 12,

                        content:

                            Form.File({

                                id: "about-image-upload",

                                label: "Upload de Imagem",

                                accept: "image/*"

                            }) +

                            /* Contentor de Preview exigido pelo Controlador */
                            '<div id="about-image-preview" class="image-preview"></div>'

                    }) +

                    /* Linha do Campo de Texto Alternativo (SEO/Acessibilidade) */
                    Form.Column({

                        size: 12,

                        content:

                            Form.Input({

                                id: "about-image-alt",

                                name: "about-image-alt",

                                label: "Texto Alternativo (Alt)",

                                placeholder: "Ex: Fachada da Loja Diva Makeup",

                                required: true

                            })

                    })

                )

        }) +

        /* Secção de Ações e Submissão Padronizada */
        Form.Actions(

            Form.Button({

                type: "submit",

                text: "Adicionar Imagem"

            })

        ) +

        '</form>'

    );

}