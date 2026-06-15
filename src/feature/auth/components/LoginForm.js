import { Form } from "../../../shared/components/Form/Form.js";

export class LoginForm {
  constructor(containerQuery) {
    // Fallback tradicional seguindo as regras de restrição de sintaxe moderna
    this.container = document.querySelector(containerQuery || "#app");
  }

  /**
   * Injeta o HTML dinamicamente utilizando o ecossistema global de Form
   * e captura as referências do DOM para controle do fluxo de validação.
   */
  render() {
    if (!this.container) {
      console.warn("Container para LoginForm não encontrado.");
      return;
    }

    // 1. Construção dos campos através dos atalhos semânticos do motor global de formulários
    var emailField = Form.Email({
      id: "email",
      name: "email",
      label: "E-mail",
      required: true,
      placeholder: " "
    }) + '<span class="error-message" id="email-error"></span>';

    var senhaField = Form.Password({
      id: "senha",
      name: "senha",
      label: "Senha",
      required: true,
      placeholder: " "
    }) + '<span class="error-message" id="senha-error"></span>';

    // 2. Encapsulamento estrutural em Grid e Colunas semânticas de tamanho 12 (Full Width)
    var emailColumn = Form.Column({ size: 12, content: emailField });
    var senhaColumn = Form.Column({ size: 12, content: senhaField });

    var formGrid = Form.Grid(emailColumn + senhaColumn);

    // 3. Configuração declarativa do botão de submissão do formulário
    var submitButton = Form.Button({
      type: "submit",
      className: "btn-login",
      text: "<span>Entrar na Conta</span>"
    });

    var formActions = Form.Actions(submitButton);

    // 4. Injeção da árvore unificada no container da Single Page Application (SPA)
    this.container.innerHTML =
      '<div class="login-card">' +
      '<div class="login-header">' +
      '<h1>Seja bem-vinda</h1>' +
      '<p>Entre para conferir suas linhas de beleza favoritas e gerenciar seus pedidos.</p>' +
      '</div>' +
      '<form novalidate>' +
      formGrid +
      formActions +
      '</form>' +
      '<div class="login-footer">' +
      '<p>Não possui conta? <a href="../pages/register.html">Criar minha conta</a></p>' +
      '</div>' +
      '</div>';

    // 5. Mapeamento cirúrgico dos elementos recém-acoplados ao DOM
    this.form = this.container.querySelector("form");
    this.emailInput = this.container.querySelector("#email");
    this.senhaInput = this.container.querySelector("#senha");
    this.emailError = this.container.querySelector("#email-error");
    this.senhaError = this.container.querySelector("#senha-error");
  }

  /**
   * Coleta os estados atuais dos inputs em formato chave-valor estruturado
   */
  getValues() {
    return {
      email: this.emailInput.value,
      senha: this.senhaInput.value
    };
  }

  /**
   * Limpa os estados de erro visual e mensagens textuais
   */
  clearErrors() {
    this.emailError.textContent = "";
    this.senhaError.textContent = "";
    this.emailInput.classList.remove("input-error");
    this.senhaInput.classList.remove("input-error");
  }

  /**
   * Aplica o estado de erro visual e transfere o foco para o elemento violado
   */
  showError(field, message) {
    if (field === "email") {
      this.emailError.textContent = message;
      this.emailInput.classList.add("input-error");
      this.emailInput.focus();
    } else if (field === "senha") {
      this.senhaError.textContent = message;
      this.senhaInput.classList.add("input-error");
      this.senhaInput.focus();
    }
  }
}