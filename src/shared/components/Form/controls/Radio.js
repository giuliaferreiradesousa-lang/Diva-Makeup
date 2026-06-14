// shared/components/Form/controls/Radio.js

export function Radio(props){

    props = props || {};

    return (

        '<label class="diva-radio">' +

            '<input ' +

                'type="radio" ' +

                'name="' +
                (props.name || '') +
                '" ' +

                'value="' +
                (props.value || '') +
                '" ' +

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