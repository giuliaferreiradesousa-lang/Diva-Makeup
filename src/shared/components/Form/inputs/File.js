// shared/components/Form/inputs/File.js

export function File(props){

    props = props || {};

    return (

        '<div class="diva-form-group">' +

            '<label class="diva-form-label">' +

                (props.label || '') +

            '</label>' +

            '<input ' +

                'id="' +
                (props.id || '') +
                '" ' +

                'type="file" ' +

                'accept="' +
                (props.accept || '*') +
                '" ' +

                'class="diva-form-file">' +

        '</div>'

    );

}