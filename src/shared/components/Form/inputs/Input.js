// shared/components/Form/inputs/Input.js

export function Input(props) {

    props = props || {};

    return (

        '<div class="diva-form-group">' +

            (
                props.label

                ? '<label ' +
                    'class="diva-form-label" ' +
                    'for="' + (props.id || '') + '">' +

                    props.label +

                  '</label>'

                : ''
            ) +

            '<input ' +

                'id="' +
                (props.id || '') +
                '" ' +

                'name="' +
                (props.name || '') +
                '" ' +

                'type="' +
                (props.type || 'text') +
                '" ' +

                (
                    props.value !== undefined

                    ? 'value="' +
                      props.value +
                      '" '

                    : ''
                ) +

                'placeholder="' +
                (props.placeholder || '') +
                '" ' +

                (
                    props.required
                    ? 'required '
                    : ''
                ) +

                (
                    props.disabled
                    ? 'disabled '
                    : ''
                ) +

                'class="diva-form-input">' +

        '</div>'

    );

}