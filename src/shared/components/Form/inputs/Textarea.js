// shared/components/Form/inputs/Textarea.js

export function Textarea(props){

    props = props || {};

    return (

        '<div class="diva-form-group">' +

            '<label class="diva-form-label">' +

                (props.label || '') +

            '</label>' +

            '<textarea ' +

                'id="' +
                (props.id || '') +
                '" ' +

                'placeholder="' +
                (props.placeholder || '') +
                '" ' +

                (
                    props.required
                    ? 'required '
                    : ''
                ) +

                'class="diva-form-textarea">' +

                (props.value || '') +

            '</textarea>' +

        '</div>'

    );

}