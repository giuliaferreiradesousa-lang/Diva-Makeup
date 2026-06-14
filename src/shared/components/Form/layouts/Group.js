// shared/components/Form/layouts/Group.js

export function Group(props){

    props = props || {};

    return (

        '<div class="diva-form-group-wrapper">' +

            (
                props.title

                ? '<h4 class="diva-form-group-title">' +
                    props.title +
                  '</h4>'

                : ''
            ) +

            (props.content || '') +

        '</div>'

    );

}