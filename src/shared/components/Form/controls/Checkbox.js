// shared/components/Form/controls/Checkbox.js

export function Checkbox(props){

    props = props || {};

    return (

        '<label class="diva-checkbox">' +

            '<input ' +
                'type="checkbox" ' +
                'id="' + (props.id || '') + '" ' +

                (
                    props.checked
                    ? 'checked '
                    : ''
                ) +

            '>' +

            '<span>' +

                (props.label || '') +

            '</span>' +

        '</label>'

    );

}