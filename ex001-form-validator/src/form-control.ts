import validator from 'validator';

const SHOW_ERROR_MESSAGE = 'show-error-message';

export default class FormControl {
  private readonly form!: HTMLFormElement;

  constructor(formClassName: string) {
    try {
      this.form = document.querySelector(formClassName) as HTMLFormElement;
    } catch (error) {
      console.log('form error');
      return;
    }

    if (!this.form) return;
    this.init();
  }

  public init(): void {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate();
    });
  }

  private validate(): void {
    this.clearErrors();

    let error = false;
    const username = this.form.querySelector('.username') as HTMLInputElement;
    const email = this.form.querySelector('.email') as HTMLInputElement;
    const password = this.form.querySelector('.password') as HTMLInputElement;
    const confirmPassword = this.form.querySelector('.confirm-password') as HTMLInputElement;

    error = this.isValidUsername(username) ? error : true;
    error = this.isValidEmail(email) ? error : true;
    error = this.isValidPassword(password) ? error : true;
    error = this.isValidConfirmPassword(confirmPassword, password) ? error : true;

    if (!error) this.form.submit();
  }

  private isValidUsername(username: HTMLInputElement): boolean {
    const value = username.value;

    if (!value || !value.trim()) {
      return this.addErrors(username, 'campo obrigatório');
    }

    if (value.length < 3 || value.length > 50) {
      return this.addErrors(username, 'o campo deve conter entre 3 e 50 caracteres');
    }

    if (value.match(/\W/)) {
      return this.addErrors(username, 'o campo deve conter apenas números e letras!');
    }

    return true;
  }

  private isValidEmail(email: HTMLInputElement): boolean {
    const value = email.value;

    if (!value || !value.trim()) {
      return this.addErrors(email, 'campo obrigatório');
    }

    if (!validator.isEmail(value)) {
      return this.addErrors(email, 'e-mail inválido');
    }

    return true;
  }

  private isValidPassword(password: HTMLInputElement): boolean {
    const value = password.value;

    if (!value || !value.trim()) {
      return this.addErrors(password, 'campo obrigatório');
    }

    if (value.length < 8) {
      return this.addErrors(password, 'o campo deve conter pelo menos 8 caracteres');
    }

    return true;
  }

  private isValidConfirmPassword(
    confirmPassword: HTMLInputElement,
    password: HTMLInputElement,
  ): boolean {
    const valueConfirmPassword = confirmPassword.value;
    const valuePassword = password.value;

    if (!valueConfirmPassword) {
      return this.addErrors(confirmPassword, 'campo obrigatório');
    }

    if (valueConfirmPassword !== valuePassword) {
      return this.addErrors(confirmPassword, 'a senhas devem ser iguais');
    }

    return true;
  }

  private clearErrors(): void {
    this.form.querySelectorAll('.' + SHOW_ERROR_MESSAGE).forEach((container) => {
      container.classList.remove(SHOW_ERROR_MESSAGE);
    });
  }

  private addErrors(field: HTMLElement, errorMsg: string): false {
    const inputContainer = field.parentElement as HTMLDivElement;
    const errorMessage = field.nextElementSibling as HTMLSpanElement;

    inputContainer.classList.add(SHOW_ERROR_MESSAGE);
    errorMessage.innerText = errorMsg;

    return false;
  }
}
