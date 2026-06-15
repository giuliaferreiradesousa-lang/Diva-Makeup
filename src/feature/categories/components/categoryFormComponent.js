/* =========================================================
   COMPONENT: categoryFormComponent.js
   Descrição: Gera a estrutura HTML para a criação de novas 
              categorias utilizando o motor genérico Form.
   ========================================================= */

import { Form } from "../../../shared/components/Form/Form.js";

export function categoryFormComponent() {
  var formHeader =
    '<div class="form-header">' +
    '<h2>Nova Categoria</h2>' +
    '<p>Cadastre divisões de produtos para organizar sua loja virtual.</p>' +
    '</div>';

  // Construção dos campos utilizando as definições tipadas do Form global
  var nomeColumn = Form.Column({
    size: 12,
    content: Form.Input({
      id: "nome",
      name: "nome",
      label: "Nome da Categoria",
      placeholder: "Ex: Maquiagem de Olhos, Skincare",
      required: true
    })
  });

  var descricaoColumn = Form.Column({
    size: 12,
    content: Form.Textarea({
      id: "descricao",
      name: "descricao",
      label: "Descrição da Categoria",
      placeholder: "Descreva quais produtos fazem parte desta categoria...",
      required: true
    })
  });

  var imagemColumn = Form.Column({
    size: 12,
    content: Form.File({
      id: "imagem",
      name: "imagem",
      label: "Imagem da Categoria (Upload)",
      accept: "image/*",
      required: true
    })
  });

  // Agrupamento estrutural em Grid Responsivo
  var formGrid = Form.Grid(nomeColumn + descricaoColumn + imagemColumn);

  // Botão padronizado com suporte a ícones nativos
  var submitButton = Form.Button({
    type: "submit",
    className: "btn-save-category",
    text: '<i class="fas fa-save"></i> Salvar Categoria'
  });

  var formActions = Form.Actions(submitButton);

  return (
    '<form id="category-form" class="admin-category-form">' +
    formHeader +
    formGrid +
    formActions +
    '</form>'
  );
}