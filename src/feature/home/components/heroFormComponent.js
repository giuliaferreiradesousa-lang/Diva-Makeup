import { Form }
from "../../../shared/components/form/Form.js";

export function heroFormComponent(){

    return (

        '<form id="hero-form">' +

            Form.Section({

                title:"Banner Principal",

                content:

                    Form.Input({

                        id:"hero-title",

                        label:"Título",

                        placeholder:
                        "Digite o título principal",

                        required:true

                    }) +

                    Form.Textarea({

                        id:"hero-subtitle",

                        label:"Subtítulo",

                        placeholder:
                        "Digite o subtítulo",

                        required:true

                    }) +

                    Form.File({

                        id:"hero-image",

                        label:"Imagem do Banner",

                        accept:"image/*"

                    }) +

                    '<div id="image-preview"></div>'

            }) +

            Form.Button({

                type:"submit",

                text:"Salvar Banner"

            }) +

        '</form>'

    );

}