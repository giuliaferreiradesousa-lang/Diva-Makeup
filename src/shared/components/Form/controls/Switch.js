// shared/components/Form/controls/Switch.js

export function Switch(props){

    props = props || {};

    return (

        '<label class="diva-switch">' +

            '<input ' +

                'type="checkbox" ' +

                'id="' +
                (props.id || '') +
                '" ' +

                (
                    props.checked
                    ? 'checked '
                    : ''
                ) +

            '>' +

            '<span class="diva-switch-slider"></span>' +

            '<span class="diva-switch-label">' +

                (props.label || '') +

            '</span>' +

        '</label>'

    );

}