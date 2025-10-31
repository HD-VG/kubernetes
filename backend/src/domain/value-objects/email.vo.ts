/* eslint-disable prettier/prettier */
export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.ensureIsValidEmail(email);
    this.value = email.toLowerCase();
  }

  public getValue(): string {
    return this.value;
  }

  private ensureIsValidEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      throw new Error(`El email ${email} no tiene un formato válido.`);
    }

    const forbiddenDomains = ['tempmail.com', 'fakeemail.com'];
    const domain = email.split('@')[1];

    if (forbiddenDomains.includes(domain)) {
      throw new Error(`El dominio ${domain} no está permitido.`);
    }
  }
}
