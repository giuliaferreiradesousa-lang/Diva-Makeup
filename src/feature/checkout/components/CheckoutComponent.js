/* =========================================================
   COMPONENT: CheckoutComponent.js
   Descrição: Componente puro (stateless) responsável por retornar
              o template string estruturado do checkout.
   ========================================================= */

import { Form } from "../../../shared/components/Form/Form.js";

export function CheckoutComponent(props) {
  // Garantia de fallbacks tradicionais para evitar desestruturações complexas
  props = props || {};
  var cartItems = props.cartItems || [];
  var totals = props.totals || { totalValue: 0 };

  var itemsHtml = "";

  // Substituído o .map() e arrow function por um laço clássico for
  if (cartItems.length === 0) {
    itemsHtml = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
  } else {
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var itemPriceTotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');

      itemsHtml +=
        '<div class="checkout-item">' +
        '<img src="' + item.imagem + '" alt="' + item.nome + '" onerror="this.src=\'https://via.placeholder.com/150?text=Diva+Makeup\'">' +
        '<div class="checkout-item-details">' +
        '<h4>' + item.nome + '</h4>' +
        '<p>Cor: ' + item.corSelecionada + '</p>' +
        '<p>Qtd: ' + item.quantidade + '</p>' +
        '</div>' +
        '<div class="checkout-item-price">' +
        'R$ ' + itemPriceTotal +
        '</div>' +
        '</div>';
    }
  }

  var totalValueFormatted = totals.totalValue.toFixed(2).replace('.', ',');

  // 1. Construção declarativa dos campos de entrega usando o motor Form
  var cepInput = Form.Input({ id: "cep", name: "cep", label: "CEP", placeholder: "00000-000", required: true });
  var ruaInput = Form.Input({ id: "rua", name: "rua", label: "Rua", placeholder: "Rua das Flores", required: true });
  var numeroInput = Form.Input({ id: "numero", name: "numero", label: "Número", placeholder: "123", required: true });
  var bairroInput = Form.Input({ id: "bairro", name: "bairro", label: "Bairro", placeholder: "Centro", required: true });
  var cidadeInput = Form.Input({ id: "cidade", name: "cidade", label: "Cidade / Estado", placeholder: "São Paulo - SP", required: true });

  // 2. Agrupamento em colunas estruturadas e linhas de Grid responsivo
  var row1 = Form.Grid(Form.Column({ size: 6, content: cepInput }) + Form.Column({ size: 6, content: ruaInput }));
  var row2 = Form.Grid(Form.Column({ size: 6, content: numeroInput }) + Form.Column({ size: 6, content: bairroInput }));
  var row3 = Form.Grid(Form.Column({ size: 12, content: cidadeInput }));

  // 3. Opções de pagamento geradas a partir do componente purificado Form.Radio
  var radioPix = Form.Radio({ name: "pagamento", value: "pix", label: "Pix", checked: true });
  var radioCard = Form.Radio({ name: "pagamento", value: "cartao", label: "Cartão de Crédito" });
  var paymentOptionsHtml = '<div class="payment-options">' + radioPix + radioCard + '</div>';

  // 4. Campos extras ocultos para inserção de dados do Cartão de Crédito
  var ccNum = Form.Input({ id: "cc-num", placeholder: "Número do Cartão" });
  var ccVal = Form.Input({ id: "cc-val", placeholder: "Validade (MM/AA)" });
  var ccCvv = Form.Input({ id: "cc-cvv", placeholder: "CVV" });

  var ccFieldsHtml =
    '<div id="credit-card-fields" class="credit-card-fields hidden">' +
    Form.Grid(Form.Column({ size: 12, content: ccNum })) +
    Form.Grid(Form.Column({ size: 6, content: ccVal }) + Form.Column({ size: 6, content: ccCvv })) +
    '</div>';

  // 5. Botão de submissão padronizado
  var submitButton = Form.Button({
    type: "submit",
    className: "btn-checkout",
    text: "Finalizar Pedido",
    icon: '<i class="fas fa-lock"></i> '
  });

  // Injeta o estado 'disabled' inicial em conformidade com as propriedades do botão nativo
  submitButton = submitButton.replace('<button', '<button disabled');

  return (
    '<div class="checkout-layout">' +
    '' +
    '<section class="checkout-form-section">' +
    '<h2>Dados de Entrega</h2>' +
    '<form id="checkout-form">' +
    row1 + row2 + row3 +
    '<h2 class="payment-title">Forma de Pagamento</h2>' +
    paymentOptionsHtml +
    ccFieldsHtml +
    Form.Actions(submitButton) +
    '</form>' +
    '</section>' +

    '' +
    '<aside class="checkout-summary-section">' +
    '<h2>Resumo do Pedido</h2>' +
    '<div class="checkout-items-container">' +
    itemsHtml +
    '</div>' +
    '<div class="checkout-totals">' +
    '<div class="totals-row">' +
    '<span>Subtotal</span>' +
    '<span>R$ ' + totalValueFormatted + '</span>' +
    '</div>' +
    '<div class="totals-row">' +
    '<span>Frete</span>' +
    '<span>Grátis</span>' +
    '</div>' +
    '<div class="totals-row total-final">' +
    '<span>Total</span>' +
    '<span>R$ ' + totalValueFormatted + '</span>' +
    '</div>' +
    '</div>' +
    '</aside>' +
    '</div>'
  );
}