// shared/components/Form/helpers/Section.js

export function Section(props){

    props = props || {};

    return (

        '<section class="diva-form-section">' +

            '<h3 class="diva-form-section-title">' +

                (props.title || '') +

            '</h3>' +

            (props.content || '') +

        '</section>'

    );

}