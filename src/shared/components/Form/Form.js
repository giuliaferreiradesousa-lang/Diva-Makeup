export var Form = {

    Input: function (props) {

        return (
            '<div class="diva-form-group">' +

            (props.label
                ? '<label class="diva-form-label" for="' + props.id + '">' +
                props.label +
                '</label>'
                : '') +

            '<input ' +
            'id="' + (props.id || '') + '" ' +
            'name="' + (props.name || '') + '" ' +
            'type="' + (props.type || 'text') + '" ' +
            (props.value !== undefined
                ? 'value="' + props.value + '" '
                : '') + '" ' +
            'placeholder="' + (props.placeholder || '') + '" ' +
            (props.required ? 'required ' : '') +
            'class="diva-form-input">' +

            '</div>'
        );

    },

    Textarea: function (props) {

        return (
            '<div class="diva-form-group">' +

            '<label class="diva-form-label">' +
            props.label +
            '</label>' +

            '<textarea ' +
            'id="' + props.id + '" ' +
            'placeholder="' + (props.placeholder || '') + '" ' +
            'class="diva-form-textarea">' +

            (props.value || '') +

            '</textarea>' +

            '</div>'
        );

    },

    Select: function (props) {

        var optionsHtml = '';

        for (var i = 0; i < props.options.length; i++) {

            var option = props.options[i];

            var selected = '';

            if (props.value == option.value) {
                selected = 'selected';
            }

            optionsHtml +=

                '<option ' +
                selected +
                ' value="' +
                option.value +
                '">' +

                option.label +

                '</option>';
        }
    },

    File: function (props) {

        return (

            '<div class="diva-form-group">' +

            '<label class="diva-form-label">' +
            props.label +
            '</label>' +

            '<input ' +
            'id="' + props.id + '" ' +
            'type="file" ' +
            'accept="' + (props.accept || '*') + '" ' +
            'class="diva-form-file">' +

            '</div>'

        );

    },

    Checkbox: function (props) {

        return (

            '<label class="diva-checkbox">' +

            '<input ' +
            'type="checkbox" ' +
            'id="' + props.id + '" ' +
            (props.checked ? 'checked' : '') +
            '>' +

            '<span>' +
            props.label +
            '</span>' +

            '</label>'

        );

    },

    Radio: function (props) {

        return (

            '<label class="diva-radio">' +

            '<input ' +
            'type="radio" ' +
            'name="' + props.name + '" ' +
            'value="' + props.value + '" ' +
            (props.checked ? 'checked' : '') +
            '>' +

            '<span>' +
            props.label +
            '</span>' +

            '</label>'

        );

    },

    Switch: function (props) {

        return (

            '<label class="diva-switch">' +

            '<input ' +
            'type="checkbox" ' +
            'id="' + props.id + '" ' +
            (props.checked ? 'checked' : '') +
            '>' +

            '<span class="diva-switch-slider"></span>' +

            '<span class="diva-switch-label">' +
            props.label +
            '</span>' +

            '</label>'

        );

    },

    Hidden: function (props) {

        return (

            '<input ' +
            'type="hidden" ' +
            'id="' + props.id + '" ' +
            'value="' + (props.value || '') + '">'

        );

    },

    Row: function (content) {

        return (

            '<div class="diva-form-row">' +

            content +

            '</div>'

        );

    },

    Section: function (props) {

        return (

            '<section class="diva-form-section">' +

            '<h3 class="diva-form-section-title">' +
            props.title +
            '</h3>' +

            props.content +

            '</section>'

        );

    }



};

/* ==========================================
   INPUTS ESPECIALIZADOS
========================================== */

Form.Email = function (props) {

    props = props || {};
    props.type = "email";

    return Form.Input(props);

};

Form.Password = function (props) {

    props = props || {};
    props.type = "password";

    return Form.Input(props);

};

Form.Number = function (props) {

    props = props || {};
    props.type = "number";

    return Form.Input(props);

};

Form.Date = function (props) {

    props = props || {};
    props.type = "date";

    return Form.Input(props);

};

Form.Time = function (props) {

    props = props || {};
    props.type = "time";

    return Form.Input(props);

};

Form.Color = function (props) {

    props = props || {};
    props.type = "color";

    return Form.Input(props);

};

Form.Search = function (props) {

    props = props || {};
    props.type = "search";

    return Form.Input(props);

};

Form.Url = function (props) {

    props = props || {};
    props.type = "url";

    return Form.Input(props);

};

Form.Tel = function (props) {

    props = props || {};
    props.type = "tel";

    return Form.Input(props);

};

Form.Range = function (props) {

    props = props || {};
    props.type = "range";

    return Form.Input(props);

};

Form.Button = function(props){

    return (

        '<button ' +

            'type="' +
            (props.type || 'button') +
            '" ' +

            'class="' +
            (props.className || 'diva-btn-primary') +
            '">' +

            (props.icon || '') +

            props.text +

        '</button>'

    );

};