import { Form } from "../../shared/components/Form/Form.js";

export class RegistroForm {
  constructor(containerQuery) {
    // Parâmetro padrão resolvido via fallback clássico em conformidade com as restrições
    this.container = document.querySelector(containerQuery || "#app");
  }

  /**
   * Injeta o HTML estruturado a partir do motor declarativo global de Form
   * e mapeia as referências necessárias do DOM.
   */
  render() {
    if (!this.container) {
      console.warn("Container para RegistroForm não encontrado.");
      return;
    }

    // 1. Geração dos campos de input utilizando os componentes e atalhos globais
    var nomeField = Form.Input({
      id: "nome",
      name: "nome",
      label: "Nome Completo",
      required: true,
      placeholder: " "
    }) + '<span class="error-message" id="nome-error"></span>';

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
      label: "Senha (Mínimo 6 caracteres)",
      required: true,
      placeholder: " "
    }) + '<span class="error-message" id="senha-error"></span>';

    var confirmarField = Form.Password({
      id: "confirmar",
      name: "confirmar",
      label: "Confirmar Senha",
      required: true,
      placeholder: " "
    }) + '<span class="error-message" id="confirmar-error"></span>';

    // 2. Organização estrutural em colunas (Full Width) e grid semântico
    var nomeColumn = Form.Column({ size: 12, content: nomeField });
    var emailColumn = Form.Column({ size: 12, content: emailField });
    var senhaColumn = Form.Column({ size: 12, content: senhaField });
    var confirmarColumn = Form.Column({ size: 12, content: confirmarField });

    var formGrid = Form.Grid(
      nomeColumn +
      emailColumn +
      senhaColumn +
      confirmarColumn
    );

    // 3. Configuração e encapsulamento do botão de ação primária
    var submitButton = Form.Button({
      type: "submit",
      className: "btn-login",
      text: "<span>Registar Conta</span>"
    });

    var formActions = Form.Actions(submitButton);

    // 4. Acoplamento da árvore de nós estruturada no container da SPA
    this.container.innerHTML =
      '<div class="login-card">' +
      '<div class="login-header">' +
      '<h1>Criar Conta</h1>' +
      '<p>Junte-se à Diva e tenha acesso a produtos exclusivos de beleza.</p>' +
      '</div>' +
      '<form novalidate>' +
      formGrid +
      formActions +
      '</form>' +
      '<div class="login-footer">' +
      '<p>Já possui conta? <a href="../pages/login.html">Entrar agora</a></p>' +
      '</div>' +
      '</div>';

    // 5. Mapeamento cirúrgico dos elementos no DOM para persistência de estado
    this.form = this.container.querySelector("form");

    this.inputs = {
      nome: this.container.querySelector("#nome"),
      email: this.container.querySelector("#email"),
      senha: this.container.querySelector("#senha"),
      confirmar: this.container.querySelector("#confirmar")
    };

    this.errors = {
      nome: this.container.querySelector("#nome-error"),
      email: this.container.querySelector("#email-error"),
      senha: this.container.querySelector("#senha-error"),
      confirmar: this.container.querySelector("#confirmar-error")
    };
  }

  /**
   * Recolhe os valores atuais do formulário num objeto chave-valor simples
   */
  getValues() {
    return {
      nome: this.inputs.nome.value,
      email: this.inputs.email.value,
      senha: this.inputs.senha.value,
      confirmar: this.inputs.confirmar.value
    };
  }

  /**
   * Higieniza as mensagens de erro e remove as classes visuais de violação
   */
  clearErrors() {
    // Substituído o Object.keys().forEach() antigo por um laço clássico for...in
    for (var key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        this.errors[key].textContent = "";
        this.inputs[key].classList.remove("input-error");
      }
    }
  }

  /**
   * Injeta a mensagem de feedback de erro e direciona o foco do utilizador
   */
  showError(field, message) {
    if (this.errors[field] && this.inputs[field]) {
      this.errors[field].textContent = message;
      this.inputs[field].classList.add("input-error");
      this.inputs[field].focus();
    }
  }

  /**
   * Realiza o reset nativo dos campos do formulário
   */
  reset() {
    this.form.reset();
  }
}