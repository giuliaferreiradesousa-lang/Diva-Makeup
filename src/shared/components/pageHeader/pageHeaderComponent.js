export function PageHeader(props){

    return (

        '<div class="diva-page-header">' +

            '<div class="diva-page-header-content">' +

                '<h1 class="diva-page-header-title">' +

                    (props.title || '') +

                '</h1>' +

                '<p class="diva-page-header-subtitle">' +

                    (props.subtitle || '') +

                '</p>' +

            '</div>' +

            '<div class="diva-page-header-actions">' +

                (props.actions || '') +

            '</div>' +

        '</div>'

    );

}