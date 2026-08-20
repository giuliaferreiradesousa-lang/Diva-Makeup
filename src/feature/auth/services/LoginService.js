import { findUserByEmail } from "../../../core/storage.js";

export class LoginService {
  
  static authenticate(email, senha) {
    email = email.trim().toLowerCase();
    // Boa Prática (Regra de Negócio Isolada): Verificação do admin acontece na camada Service.
    if (email === "admin@divamakeup.com" && senha === "admin123") {
      var usuarioAdmin = {
        nome: "Administrador",
        email: "admin@divamakeup.com",
        role: "admin"
      };
      return { success: true, user: usuarioAdmin };
    }

    const user = findUserByEmail(email);

    if (!user) {
      return { success: false, errorType: "email", message: "Usuário não encontrado" };
    }

    if (user.senha !== senha) {
      return { success: false, errorType: "senha", message: "Senha incorreta" };
    }

    return { success: true, user };
  }

  static createSession(user) {
    // Boa Prática (Tratamento de Erros): Previne que falhas na API de Storage quebrem o fluxo.
    try {
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
      return true;
    } catch (e) {
      console.error("Erro ao salvar sessão:", e);
      return false;
    }
  }
}
