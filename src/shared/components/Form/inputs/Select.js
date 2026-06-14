// shared/components/Form/inputs/Select.js

export function Select(props){

    props = props || {};

    var optionsHtml = '';

    var options = props.options || [];

    for(var i = 0; i < options.length; i++){

        var option = options[i];

        optionsHtml +=

        '<option ' +

            (
                props.value == option.value
                ? 'selected '
                : ''
            ) +

            'value="' +
            option.value +
            '">' +

            option.label +

        '</option>';

    }

    return (

        '<div class="diva-form-group">' +

            '<label class="diva-form-label">' +

                (props.label || '') +

            '</label>' +

            '<select ' +

                'id="' +
                (props.id || '') +
                '" ' +

                (
                    props.required
                    ? 'required '
                    : ''
                ) +

                'class="diva-form-select">' +

                optionsHtml +

            '</select>' +

        '</div>'

    );

}