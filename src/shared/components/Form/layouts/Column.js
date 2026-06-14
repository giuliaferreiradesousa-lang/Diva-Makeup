// shared/components/Form/layouts/Column.js

export function Column(props){

    props = props || {};

    return (

        '<div ' +

            'class="diva-form-column ' +

            'diva-col-' +

            (props.size || 12) +

            '">' +

            (props.content || '') +

        '</div>'

    );

}