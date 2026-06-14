// shared/components/Form/helpers/Button.js

export function Button(props){

    props = props || {};

    return (

        '<button ' +

            'type="' +
            (props.type || 'button') +
            '" ' +

            'class="' +
            (props.className || 'diva-btn-primary') +
            '">' +

            (props.icon || '') +

            (props.text || 'Botão') +

        '</button>'

    );

}